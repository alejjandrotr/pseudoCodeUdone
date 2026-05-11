import { GoogleGenAI } from "@google/genai";
import { Professor } from "../types/professor.types";
import { UDONE_RULES, getOrCreateUdoneCache } from "./udone-cache.service";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface EvaluationResult {
  text: string;
  cached: boolean;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cachedTokens?: number;
  };
}

// ─── Helper: build the per-request user prompt ─────────────────────────────

function buildUserPrompt(
  codigoUsuario: string,
  enunciado: string,
  professor: Professor
): string {
  return `
**Tu Rol:** ${professor.name}
**Nivel de Dificultad/Ayuda:** ${professor.difficultyLevel}

**Enunciado del Ejercicio:**
${enunciado}

**Código del Estudiante:**
${codigoUsuario}

════════════════════════════════════════════════
COMPORTAMIENTO REQUERIDO (personalidad del profesor):
${professor.promptBehavior}

════════════════════════════════════════════════
FORMATO DE RESPUESTA (consola de comandos — texto plano, sin Markdown, sin \`\`\`):

[UDONE Evaluator v2.0 - Rol: ${professor.name}]
----------------------------------------------
ANÁLISIS DE SINTAXIS:
> [Lista cada violación de notación con su corrección, o confirma que la notación es correcta]

ANÁLISIS LÓGICO:
> [Evalúa si el algoritmo resuelve correctamente el enunciado. Explica por qué sí o por qué no.]

[SIMULACIÓN — solo si la lógica es válida o parcialmente válida]
> Input simulado: [valores inventados coherentes con el enunciado]
> Output simulado: [resultado de ejecutar el algoritmo con esos valores]

----------------------------------------------
VEREDICTO FINAL: [APROBADO | APROBADO CON OBSERVACIONES | RECHAZADO]
Puntuación estimada: X/10
`;
}

// ─── Main evaluation function ───────────────────────────────────────────────

export const evaluarPseudocodigo = async (
  codigoUsuario: string,
  enunciado: string,
  professor: Professor,
  apiKey: string,
  modelName: string = "gemini-1.5-flash"
): Promise<EvaluationResult> => {

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const userPrompt = buildUserPrompt(codigoUsuario, enunciado, professor);

  // ── Try Context Caching path (Option 1 + 2) ──────────────────────────────
  const cacheName = await getOrCreateUdoneCache(apiKey, modelName);

  if (cacheName) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          cachedContent: cacheName,
        },
      });

      const text = response.text ?? "";
      const meta = response.usageMetadata;

      return {
        text,
        cached: true,
        usage: meta ? {
          promptTokens: meta.promptTokenCount ?? 0,
          completionTokens: meta.candidatesTokenCount ?? 0,
          totalTokens: meta.totalTokenCount ?? 0,
          cachedTokens: meta.cachedContentTokenCount ?? 0,
        } : undefined,
      };
    } catch (err: any) {
      // Cache may have expired mid-request — fall through to full-prompt path
      console.warn("[evaluarPseudocodigo] Cached request failed, using fallback:", err?.message);
    }
  }

  // ── Fallback: System Instructions path (Option 2 only) ───────────────────
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: UDONE_RULES,
      },
    });

    const text = response.text ?? "";
    const meta = response.usageMetadata;

    return {
      text,
      cached: false,
      usage: meta ? {
        promptTokens: meta.promptTokenCount ?? 0,
        completionTokens: meta.candidatesTokenCount ?? 0,
        totalTokens: meta.totalTokenCount ?? 0,
      } : undefined,
    };
  } catch (error: any) {
    console.error("Error evaluating pseudocode:", error);
    if (
      error?.message?.includes("API key not valid") ||
      error?.message?.includes("API_KEY_INVALID")
    ) {
      throw new Error("API_KEY_INVALID");
    }
    throw new Error("EVALUATION_FAILED");
  }
};
