import { ThinkingLevel } from "@google/genai";

// ─── Catálogo de Modelos Gemini Vigentes ────────────────────────────────────

export const DEFAULT_GEMINI_MODEL = "gemini-4-hydrogen" as const;

export const GEMINI_API_KEY_STORAGE_KEY = "gemini_api_key";
export const GEMINI_MODEL_STORAGE_KEY = "gemini_model";

export interface GeminiModelOption {
  id: string;
  label: string;
  description: string;
}

export const GEMINI_MODELS: readonly GeminiModelOption[] = [
  {
    id: "gemini-4-hydrogen",
    label: "Gemini 4 Hydrogen (Recomendado / Rápido y Preciso)",
    description: "Rápido y optimizado para evaluación diaria de código y pseudocódigo.",
  },
  {
    id: "gemini-4-argon",
    label: "Gemini 4 Argon (Balanceado)",
    description: "Equilibrio entre razonamiento profundo y velocidad de respuesta.",
  },
  {
    id: "gemini-4-carbon",
    label: "Gemini 4 Carbon (Máxima Inteligencia)",
    description: "Razonamiento profundo ideal para parciales complejos y entregas de proyectos.",
  },
] as const;

export type GeminiModelId = (typeof GEMINI_MODELS)[number]["id"];

const VALID_MODEL_IDS = new Set<string>(GEMINI_MODELS.map((m) => m.id));

/**
 * Normaliza un nombre de modelo. Cualquier modelo retirado/deprecado
 * (ej. gemini-1.5-*, gemini-2.0-*, gemini-2.5-*) migra automáticamente
 * a DEFAULT_GEMINI_MODEL.
 */
export function normalizeGeminiModel(modelName?: string | null): GeminiModelId {
  if (modelName && VALID_MODEL_IDS.has(modelName)) {
    return modelName as GeminiModelId;
  }
  return DEFAULT_GEMINI_MODEL;
}

/**
 * Obtiene el modelo seleccionado desde localStorage y migra automáticamente
 * configuraciones antiguas para evitar errores 404 por modelos retirados.
 */
export function getSelectedGeminiModel(): GeminiModelId {
  if (typeof localStorage === "undefined") {
    return DEFAULT_GEMINI_MODEL;
  }

  const stored = localStorage.getItem(GEMINI_MODEL_STORAGE_KEY);
  const normalized = normalizeGeminiModel(stored);

  if (stored && stored !== normalized) {
    try {
      localStorage.setItem(GEMINI_MODEL_STORAGE_KEY, normalized);
    } catch {
      // Ignorar si localStorage no permite escritura (modo privado estricto)
    }
  }

  return normalized;
}

// ─── Configuración de Thinking ──────────────────────────────────────────────

export const THINKING_LEVEL_FAST = ThinkingLevel.LOW;
export const THINKING_LEVEL_BALANCED = ThinkingLevel.MEDIUM;

// ─── Parseo Seguro de Respuestas JSON ───────────────────────────────────────

/**
 * Limpia posibles bloques de código markdown (```json ... ```) o texto
 * envolvente antes de ejecutar JSON.parse.
 */
export function parseJsonResponse<T>(rawText: string): T {
  const trimmed = (rawText ?? "").trim();
  if (!trimmed) {
    throw new Error("EMPTY_RESPONSE");
  }

  // Quitar fences markdown si el modelo los agregó pese a responseMimeType
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const cleaned = fenceMatch ? fenceMatch[1].trim() : trimmed;

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // Último intento: extraer el primer objeto JSON balanceado { ... }
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1)) as T;
    }
    throw new Error("INVALID_JSON_RESPONSE");
  }
}

// ─── Clasificación de Errores de Gemini API ─────────────────────────────────

export type GeminiErrorCode =
  | "API_KEY_MISSING"
  | "API_KEY_INVALID"
  | "QUOTA_EXCEEDED"
  | "MODEL_NOT_FOUND"
  | "EVALUATION_FAILED";

export function classifyGeminiError(error: unknown): GeminiErrorCode {
  const msg = String((error as { message?: string })?.message ?? error ?? "");
  const status = (error as { status?: number })?.status;

  if (
    msg.includes("API key not valid") ||
    msg.includes("API_KEY_INVALID") ||
    msg.includes("PERMISSION_DENIED") ||
    status === 401 ||
    status === 403
  ) {
    return "API_KEY_INVALID";
  }

  if (
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("quota") ||
    msg.includes("rate limit") ||
    status === 429
  ) {
    return "QUOTA_EXCEEDED";
  }

  if (msg.includes("NOT_FOUND") || msg.includes("is not found") || status === 404) {
    return "MODEL_NOT_FOUND";
  }

  return "EVALUATION_FAILED";
}

export function getGeminiErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "API_KEY_MISSING":
    case "API_KEY_INVALID":
      return "ERROR CRÍTICO: La API Key guardada no es válida o expiró. Abre la configuración para actualizarla.";
    case "QUOTA_EXCEEDED":
      return "ERROR DE CUOTA: Se alcanzó el límite de peticiones de tu API Key de Gemini. Espera un momento o cambia de modelo en la configuración.";
    case "MODEL_NOT_FOUND":
      return "ERROR DE MODELO: El modelo seleccionado no está disponible. Abre la configuración y selecciona un modelo vigente (ej. Gemini 4 Hydrogen).";
    default:
      return "ERROR CRÍTICO: Falló la conexión o respuesta del motor de IA. Intenta de nuevo en unos segundos.";
  }
}
