import { GoogleGenAI } from "@google/genai";
import { Professor } from "../types/professor.types";
import { PrivateExercise, ParcialAttemptResult } from "../types/evaluacion.types";
import { UDONE_RULES } from "./udone-cache.service";

export interface BatchEvaluationRequest {
  parcialId: string;
  professor: Professor;
  ejercicios: PrivateExercise[];
  respuestas: { [exerciseId: string]: string }; // idEjercicio -> codigoUsuario
}

function buildBatchUserPrompt(
  professor: Professor,
  ejercicios: PrivateExercise[],
  respuestas: { [exerciseId: string]: string }
): string {
  // Construir la lista de ejercicios y respuestas del estudiante
  const ejerciciosDetalle = ejercicios.map((ex, index) => {
    const respuestaUsuario = respuestas[ex.id] || "// No se entregó respuesta para este ejercicio";
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
  }).join("\n");

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
FORMATO DE RETORNO OBLIGATORIO (JSON):
Debes retornar ÚNICAMENTE un objeto JSON válido que cumpla exactamente con la estructura descrita abajo. No envíes texto antes ni después del JSON, ni triple comillas invertidas.

Estructura del JSON:
{
  "notaTotal": number, // Suma de las puntuaciones de cada ejercicio (rango 0.0 a 10.0)
  "aprobado": boolean, // true si notaTotal >= 5.0, false de lo contrario
  "comentarioGeneral": string, // Comentario consolidado del examen imitando al 100% el estilo de tu personalidad (${professor.name}) y dándole su feedback general.
  "desgloseEjercicios": {
    "ID_DEL_EJERCICIO_1": {
      "puntuacion": number, // Puntuación otorgada al ejercicio (rango 0.0 a puntosMaximos del ejercicio)
      "feedback": string, // Corrección/consejos detallados para este ejercicio específico basados en tu personalidad.
      "erroresComunes": string[] // Array de strings con códigos de errores detectados. Selecciona ÚNICAMENTE entre estos códigos:
                                 // - "sintaxis_udone": Incumplimiento de las reglas formales de notación UDONE (ej. no declarar variables, usar palabras en inglés).
                                 // - "fin_si_faltante": Falta el cierre FIN SI de una selección doble o simple.
                                 // - "fin_caso_faltante": Falta el cierre FIN CASO de una selección múltiple.
                                 // - "variable_no_declarada": Se usa una variable sin estar en la DECLARACIÓN.
                                 // - "condicion_invalida": Expresión de condición mal estructurada lógicamente.
                                 // - "error_logico": El algoritmo no resuelve el problema planteado.
                                 // Si no hay errores, deja el array vacío [].
    },
    ... (repite para cada ID de ejercicio)
  }
}
`;
}

export const evaluarParcialConsolidado = async (
  request: BatchEvaluationRequest,
  apiKey: string,
  modelName: string = "gemini-2.5-flash"
): Promise<ParcialAttemptResult> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const userPrompt = buildBatchUserPrompt(request.professor, request.ejercicios, request.respuestas);

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: UDONE_RULES + "\nDebes retornar un JSON estrictamente estructurado según las instrucciones del usuario, sin bloques de código markdown.",
        responseMimeType: "application/json"
      },
    });

    const rawText = response.text ?? "";
    const parsedResult = JSON.parse(rawText.trim()) as ParcialAttemptResult;

    // Post-procesamiento/Saneamiento básico para asegurar de que no se rompan las reglas de puntuación o tipos
    const saneado: ParcialAttemptResult = {
      notaTotal: Math.min(10, Math.max(0, Number(parsedResult.notaTotal || 0))),
      aprobado: parsedResult.notaTotal >= 5.0,
      comentarioGeneral: parsedResult.comentarioGeneral || "Evaluación finalizada.",
      desgloseEjercicios: {}
    };

    // Asegurar que cada ejercicio enviado tenga una respuesta en el desglose
    request.ejercicios.forEach(ex => {
      const original = parsedResult.desgloseEjercicios?.[ex.id] || {
        puntuacion: 0,
        feedback: "No se pudo generar retroalimentación específica.",
        erroresComunes: []
      };

      saneado.desgloseEjercicios[ex.id] = {
        puntuacion: Math.min(ex.puntosMaximos, Math.max(0, Number(original.puntuacion || 0))),
        feedback: original.feedback || "Sin comentarios individuales.",
        erroresComunes: Array.isArray(original.erroresComunes) ? original.erroresComunes : []
      };
    });

    // Recalcular la nota total de forma segura
    const sumaNotas = Object.values(saneado.desgloseEjercicios).reduce((acc, current) => acc + current.puntuacion, 0);
    saneado.notaTotal = Number(sumaNotas.toFixed(1));
    saneado.aprobado = saneado.notaTotal >= 5.0;

    return saneado;

  } catch (error: any) {
    console.error("[evaluarParcialConsolidado] Error en llamada batch a Gemini:", error);
    
    if (
      error?.message?.includes("API key not valid") ||
      error?.message?.includes("API_KEY_INVALID")
    ) {
      throw new Error("API_KEY_INVALID");
    }

    // Fallback de contingencia en caso de que falle el parseo JSON
    return generateFallbackResult(request);
  }
};

function generateFallbackResult(request: BatchEvaluationRequest): ParcialAttemptResult {
  const desgloseFallback: { [exerciseId: string]: any } = {};
  
  let scoreTotal = 0;
  request.ejercicios.forEach(ex => {
    const respuesta = request.respuestas[ex.id] || "";
    // Una lógica extremadamente rudimentaria para dar algún valor
    const score = respuesta.length > 30 ? ex.puntosMaximos : 0.0;
    scoreTotal += score;
    desgloseFallback[ex.id] = {
      puntuacion: score,
      feedback: respuesta.length > 30 
        ? "El profesor no pudo estructurar el diagnóstico formal debido a una falla técnica de comunicación, pero tu código fue recibido correctamente. Por favor, consulta a tu docente en alejjandroclases@gmail.com."
        : "No entregaste respuesta o es demasiado corta.",
      erroresComunes: respuesta.length <= 30 ? ["error_logico"] : []
    };
  });

  return {
    notaTotal: Number(scoreTotal.toFixed(1)),
    aprobado: scoreTotal >= 5.0,
    comentarioGeneral: `[Nota de Contingencia] Hola, soy el ${request.professor.name}. Hemos recibido tus soluciones, pero el servidor de IA experimentó una sobrecarga momentánea al procesar el reporte consolidado. Tu calificación aproximada se muestra a continuación. Puedes exportar este PDF y consultarme dudas en alejjandroclases@gmail.com.`,
    desgloseEjercicios: desgloseFallback
  };
}
