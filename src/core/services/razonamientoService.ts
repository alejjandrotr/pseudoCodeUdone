import { GoogleGenAI, Type } from "@google/genai";
import { Professor } from "../types/professor.types";
import {
  DEFAULT_GEMINI_MODEL,
  THINKING_LEVEL_FAST,
  classifyGeminiError,
  normalizeGeminiModel,
  parseJsonResponse,
} from "./geminiConfig";

export interface RazonamientoRequest {
  professor: Professor;
  cedulas: string[];
  respuesta: string;
}

export interface RazonamientoResult {
  notaTotal: number; // Rango 0.0 a 10.0
  aprobado: boolean; // notaTotal >= 5.0
  comentarioGeneral: string; // Comentario del profesor elegido con su personalidad
  puntosFuertes: string[]; // Lista de aciertos en su razonamiento
  puntosDebiles: string[]; // Lista de debilidades encontradas
  recomendaciones: string[]; // Qué deberían repasar o mejorar
}

const RAZONAMIENTO_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    notaTotal: {
      type: Type.NUMBER,
      description: "Calificación en escala 0.0 a 10.0.",
    },
    aprobado: {
      type: Type.BOOLEAN,
      description: "true si notaTotal >= 5.0, false de lo contrario.",
    },
    comentarioGeneral: {
      type: Type.STRING,
      description: "Comentario del profesor imitando su personalidad.",
    },
    puntosFuertes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de aciertos en el razonamiento.",
    },
    puntosDebiles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de debilidades encontradas.",
    },
    recomendaciones: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Recomendaciones concretas para mejorar.",
    },
  },
  required: [
    "notaTotal",
    "aprobado",
    "comentarioGeneral",
    "puntosFuertes",
    "puntosDebiles",
    "recomendaciones",
  ],
};

export const evaluarRazonamientoMundial = async (
  request: RazonamientoRequest,
  apiKey: string,
  modelName: string = DEFAULT_GEMINI_MODEL
): Promise<RazonamientoResult> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const resolvedModel = normalizeGeminiModel(modelName);

  const systemInstruction = `Eres un profesor evaluador de algoritmos y lógica de programación de la Universidad de Oriente (UDONE).
Evalúas una actividad grupal en la que los estudiantes explican el razonamiento lógico para determinar el primer y segundo lugar de una clasificatoria de fútbol de 4 equipos (A, B, C, D) con desempate por diferencia de goles.

Los estudiantes ya programaron en clase la simulación del torneo acumulando los puntos (3 por ganar, 1 por empatar) y la diferencia de goles (goles a favor menos goles en contra). Su tarea actual es explicar en texto (o pseudocódigo si lo prefieren, pero basta el razonamiento lógico) cómo encontrar:
1. El primer lugar (equipo con más puntos, y en caso de empate, el que tenga mayor diferencia de goles).
2. El segundo lugar (equipo con el segundo puntaje más alto, y en caso de empate, el de mayor diferencia de goles).

Debes imitar estrictamente la personalidad del profesor seleccionado:
- **Prof. Mentor:** Paciente, detallista, anima al alumno, explica qué está bien/mal y da la lógica correcta amigablemente.
- **Prof. Guía:** Da pistas, no escribe la solución exacta por ellos pero les muestra ejemplos lógicos abstractos de cómo se comparan valores para inspirarlos.
- **Prof. Conceptual:** Explica conceptualmente las comparaciones secuenciales o anidadas sin escribir código ni fórmulas precisas.
- **Prof. Estricto:** Es cortante y directo. Señala fallas lógicas breves (ej: "Error: No consideraron el caso de triple empate por goles").
- **Prof. Implacable:** Seco, rudo y minimalista. Es sumamente estricto y da comentarios generales duros y directos.

Reglas de Calificación (Escala 0.0 a 10.0, aprobación con >= 5.0):
- Si explican correctamente cómo buscar el mayor de los puntos para el 1er lugar y el segundo mayor para el 2do lugar: +5.0 puntos.
- Si resuelven correctamente el desempate por diferencia de goles usando condicionales 'Si (ptsA = ptsB) entonces ver diffA y diffB': +3.0 puntos.
- Si el texto tiene coherencia lógica y estructura clara: +2.0 puntos.`;

  const userPrompt = `
Profesor asignado: ${request.professor.name} (${request.professor.difficultyLevel})
Comportamiento deseado del profesor: ${request.professor.promptBehavior}
Cédulas de los Integrantes: ${request.cedulas.join(", ")}

Respuesta / Razonamiento entregado por el grupo de estudiantes:
════════════════════════════════════════════════
${request.respuesta}
════════════════════════════════════════════════

Por favor, califica la entrega del grupo y devuelve el JSON correspondiente.`;

  try {
    const response = await ai.models.generateContent({
      model: resolvedModel,
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: RAZONAMIENTO_RESPONSE_SCHEMA,
        thinkingConfig: {
          thinkingLevel: THINKING_LEVEL_FAST,
        },
      },
    });

    const parsed = parseJsonResponse<RazonamientoResult>(response.text ?? "");
    const nota = Math.min(10, Math.max(0, Number(parsed.notaTotal || 0)));

    return {
      notaTotal: Number(nota.toFixed(1)),
      aprobado: nota >= 5.0,
      comentarioGeneral: parsed.comentarioGeneral || "Evaluación finalizada.",
      puntosFuertes: Array.isArray(parsed.puntosFuertes) ? parsed.puntosFuertes : [],
      puntosDebiles: Array.isArray(parsed.puntosDebiles) ? parsed.puntosDebiles : [],
      recomendaciones: Array.isArray(parsed.recomendaciones) ? parsed.recomendaciones : [],
    };
  } catch (error: unknown) {
    console.error("Error al evaluar razonamiento grupal:", error);
    throw new Error(classifyGeminiError(error));
  }
};
