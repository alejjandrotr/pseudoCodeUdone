import { GoogleGenAI, Type } from "@google/genai";
import { Professor } from "../types/professor.types";
import { PrivateExercise, ParcialAttemptResult } from "../types/evaluacion.types";
import { buildUdoneRulesForContext } from "./udone-cache.service";
import {
  DEFAULT_GEMINI_MODEL,
  THINKING_LEVEL_BALANCED,
  classifyGeminiError,
  normalizeGeminiModel,
  parseJsonResponse,
} from "./geminiConfig";

export interface BatchEvaluationRequest {
  parcialId: string;
  professor: Professor;
  ejercicios: PrivateExercise[];
  respuestas: { [exerciseId: string]: string }; // idEjercicio -> codigoUsuario
}

const ERROR_CODES = [
  "sintaxis_udone",
  "fin_si_faltante",
  "fin_caso_faltante",
  "variable_no_declarada",
  "condicion_invalida",
  "error_logico",
] as const;

function buildBatchUserPrompt(
  professor: Professor,
  ejercicios: PrivateExercise[],
  respuestas: { [exerciseId: string]: string }
): string {
  const ejerciciosDetalle = ejercicios
    .map((ex, index) => {
      const respuestaUsuario =
        respuestas[ex.id] || "// No se entregó respuesta para este ejercicio";
      return `
════════════════════════════════════════════════
EJERCICIO ${index + 1} (ID: ${ex.id}) - Puntos Máximos: ${ex.puntosMaximos}
Categoría: ${ex.categoria}
Enunciado:
${ex.enunciado}

Solución Oficial Esperada:
${ex.solucionOficial.pseudocodigo}

Código del Estudiante:
${respuestaUsuario}
`;
    })
    .join("\n");

  return `
Eres el evaluador del sistema UDONE. Tu rol es actuar como el **${professor.name}** (Nivel de ayuda: ${professor.difficultyLevel}).

DEBES evaluar el examen del estudiante que consta de ${ejercicios.length} ejercicios. La calificación total máxima es **10.0 puntos**. Cada ejercicio tiene un puntaje máximo asignado (usualmente ${10 / ejercicios.length} puntos).
La nota de aprobación es **5.0 puntos** (cualquier nota estrictamente menor que 5.0 es reprobado).

════════════════════════════════════════════════
COMPORTAMIENTO REQUERIDO SEGÚN TU PERSONALIDAD DE PROFESOR:
${professor.promptBehavior}

*   **Prof. Mentor:** Es paciente, anima al alumno, detalla cada error sintáctico o lógico y le da la solución corregida amigablemente.
*   **Prof. Guía:** Da pistas, no da el código completo exacto corregido pero da fragmentos similares para inspirarle y guiarle.
*   **Prof. Conceptual:** Explica conceptualmente qué está mal de forma teórica. NUNCA da código ni soluciones en sus explicaciones.
*   **Prof. Estricto:** Es cortante. Señala solo las líneas o partes donde se equivocó (ej: "Error en línea 3"). No explica teoría.
*   **Prof. Implacable:** Es seco y rudo. Solo dice CORRECTO o INCORRECTO de forma cortante, sin dar explicaciones largas. (Nota: Para la evaluación consolidada, debe dar calificaciones numéricas pero su comentario general debe ser intimidante y extremadamente corto, ej: "Rendimiento deficiente. Reprobado." o "Trabajo aceptable.").

════════════════════════════════════════════════
LISTA DE EJERCICIOS A EVALUAR:
${ejerciciosDetalle}

════════════════════════════════════════════════
CÓDIGOS VÁLIDOS PARA "erroresComunes" (deja [] si no hay errores):
- "sintaxis_udone": Incumplimiento de las reglas formales de notación UDONE.
- "fin_si_faltante": Falta el cierre FIN SI de una selección doble o simple.
- "fin_caso_faltante": Falta el cierre FIN CASO de una selección múltiple.
- "variable_no_declarada": Se usa una variable sin estar en la DECLARACIÓN.
- "condicion_invalida": Expresión de condición mal estructurada lógicamente.
- "error_logico": El algoritmo no resuelve el problema planteado.
`;
}

function buildBatchResponseSchema(ejercicios: PrivateExercise[]) {
  const desgloseProperties: Record<string, object> = {};
  const requiredExerciseIds: string[] = [];

  for (const ex of ejercicios) {
    requiredExerciseIds.push(ex.id);
    desgloseProperties[ex.id] = {
      type: Type.OBJECT,
      properties: {
        puntuacion: {
          type: Type.NUMBER,
          description: `Puntuación otorgada al ejercicio ${ex.id} (0.0 a ${ex.puntosMaximos})`,
        },
        feedback: {
          type: Type.STRING,
          description: "Corrección/consejos detallados basados en la personalidad del profesor.",
        },
        erroresComunes: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            enum: [...ERROR_CODES],
          },
          description: "Lista de códigos de errores detectados o arreglo vacío si no hay errores.",
        },
      },
      required: ["puntuacion", "feedback", "erroresComunes"],
    };
  }

  return {
    type: Type.OBJECT,
    properties: {
      notaTotal: {
        type: Type.NUMBER,
        description: "Suma de puntuaciones de todos los ejercicios (0.0 a 10.0).",
      },
      aprobado: {
        type: Type.BOOLEAN,
        description: "true si notaTotal >= 5.0, false de lo contrario.",
      },
      comentarioGeneral: {
        type: Type.STRING,
        description: "Comentario consolidado del examen imitando la personalidad del profesor.",
      },
      desgloseEjercicios: {
        type: Type.OBJECT,
        properties: desgloseProperties,
        required: requiredExerciseIds,
      },
    },
    required: ["notaTotal", "aprobado", "comentarioGeneral", "desgloseEjercicios"],
  };
}

export const evaluarParcialConsolidado = async (
  request: BatchEvaluationRequest,
  apiKey: string,
  modelName: string = DEFAULT_GEMINI_MODEL
): Promise<ParcialAttemptResult> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const resolvedModel = normalizeGeminiModel(modelName);
  const combinedEnunciados = request.ejercicios
    .map((ex) => `${ex.categoria}\n${ex.enunciado}`)
    .join("\n");
  const combinedRespuestas = request.ejercicios
    .map((ex) => request.respuestas[ex.id] || "")
    .join("\n");

  const udoneRules = buildUdoneRulesForContext(combinedEnunciados, combinedRespuestas);
  const userPrompt = buildBatchUserPrompt(
    request.professor,
    request.ejercicios,
    request.respuestas
  );

  try {
    const response = await ai.models.generateContent({
      model: resolvedModel,
      contents: userPrompt,
      config: {
        systemInstruction: `${udoneRules}\n\nRetorna ÚNICAMENTE el objeto JSON estructurado según el esquema definido.`,
        responseMimeType: "application/json",
        responseSchema: buildBatchResponseSchema(request.ejercicios),
        thinkingConfig: {
          thinkingLevel: THINKING_LEVEL_BALANCED,
        },
      },
    });

    const parsedResult = parseJsonResponse<ParcialAttemptResult>(response.text ?? "");

    const saneado: ParcialAttemptResult = {
      notaTotal: 0,
      aprobado: false,
      comentarioGeneral: parsedResult.comentarioGeneral || "Evaluación finalizada.",
      desgloseEjercicios: {},
    };

    request.ejercicios.forEach((ex) => {
      const original = parsedResult.desgloseEjercicios?.[ex.id] || {
        puntuacion: 0,
        feedback: "No se pudo generar retroalimentación específica.",
        erroresComunes: [],
      };

      saneado.desgloseEjercicios[ex.id] = {
        puntuacion: Math.min(ex.puntosMaximos, Math.max(0, Number(original.puntuacion || 0))),
        feedback: original.feedback || "Sin comentarios individuales.",
        erroresComunes: Array.isArray(original.erroresComunes) ? original.erroresComunes : [],
      };
    });

    const sumaNotas = Object.values(saneado.desgloseEjercicios).reduce(
      (acc, current) => acc + current.puntuacion,
      0
    );
    saneado.notaTotal = Math.min(10, Math.max(0, Number(sumaNotas.toFixed(1))));
    saneado.aprobado = saneado.notaTotal >= 5.0;

    return saneado;
  } catch (error: unknown) {
    console.error("[evaluarParcialConsolidado] Error en llamada batch a Gemini:", error);
    throw new Error(classifyGeminiError(error));
  }
};
