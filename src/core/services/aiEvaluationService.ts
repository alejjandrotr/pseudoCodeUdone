import { GoogleGenAI } from "@google/genai";
import { Professor } from "../types/professor.types";
import { buildUdoneRulesForContext } from "./udone-cache.service";
import {
  DEFAULT_GEMINI_MODEL,
  THINKING_LEVEL_FAST,
  classifyGeminiError,
  normalizeGeminiModel,
} from "./geminiConfig";

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

[SIMULACIÓN / PRUEBA DE ESCRITORIO DEL CÓDIGO DEL ESTUDIANTE]
> Input de prueba: [valores de entrada de prueba coherentes con el enunciado]
> Traza con el código del estudiante: [ejecuta paso a paso el código escrito por el estudiante usando ese input]
> Output producido por su código: [resultado EXACTO que arroja el código del estudiante al ejecutarse, incluso si tiene errores lógicos o produce valores incorrectos]
> Output esperado según enunciado: [resultado correcto que debió producir. Si difiere del output del estudiante, explica brevemente por qué falló su lógica]

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
  modelName: string = DEFAULT_GEMINI_MODEL
): Promise<EvaluationResult> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const resolvedModel = normalizeGeminiModel(modelName);
  const systemInstruction = buildUdoneRulesForContext(enunciado, codigoUsuario);
  const userPrompt = buildUserPrompt(codigoUsuario, enunciado, professor);

  try {
    const response = await ai.models.generateContent({
      model: resolvedModel,
      contents: userPrompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: THINKING_LEVEL_FAST,
        },
      },
    });

    const text = (response.text ?? "").trim();
    if (!text) {
      throw new Error("EMPTY_RESPONSE");
    }

    const meta = response.usageMetadata;
    const cachedTokens = meta?.cachedContentTokenCount ?? 0;

    return {
      text,
      cached: cachedTokens > 0,
      usage: meta
        ? {
            promptTokens: meta.promptTokenCount ?? 0,
            completionTokens: meta.candidatesTokenCount ?? 0,
            totalTokens: meta.totalTokenCount ?? 0,
            cachedTokens,
          }
        : undefined,
    };
  } catch (error: unknown) {
    console.error("Error evaluating pseudocode:", error);
    throw new Error(classifyGeminiError(error));
  }
};
