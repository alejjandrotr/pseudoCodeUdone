import { GoogleGenAI } from "@google/genai";
import { Professor } from "../types/professor.types";

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

export const evaluarRazonamientoMundial = async (
  request: RazonamientoRequest,
  apiKey: string,
  modelName: string = "gemini-2.5-flash"
): Promise<RazonamientoResult> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });

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
- Si el texto tiene coherencia lógica y estructura clara: +2.0 puntos.

Debes retornar obligatoriamente un JSON estructurado de la siguiente forma sin bloques markdown de código:
{
  "notaTotal": number,
  "aprobado": boolean,
  "comentarioGeneral": string,
  "puntosFuertes": string[],
  "puntosDebiles": string[],
  "recomendaciones": string[]
}`;

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
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json"
      },
    });

    const rawText = response.text ?? "";
    const parsed = JSON.parse(rawText.trim()) as RazonamientoResult;

    // Asegurar tipos y rangos correctos
    return {
      notaTotal: Math.min(10, Math.max(0, Number(parsed.notaTotal || 0))),
      aprobado: parsed.notaTotal >= 5.0,
      comentarioGeneral: parsed.comentarioGeneral || "Evaluación finalizada.",
      puntosFuertes: Array.isArray(parsed.puntosFuertes) ? parsed.puntosFuertes : [],
      puntosDebiles: Array.isArray(parsed.puntosDebiles) ? parsed.puntosDebiles : [],
      recomendaciones: Array.isArray(parsed.recomendaciones) ? parsed.recomendaciones : []
    };
  } catch (error) {
    console.error("Error al evaluar razonamiento grupal:", error);
    
    // Fallback amigable
    const isMockApproved = request.respuesta.length > 50;
    const mockNota = isMockApproved ? 8.5 : 3.0;
    return {
      notaTotal: mockNota,
      aprobado: isMockApproved,
      comentarioGeneral: `[Profesor Contingencia] Saludos del ${request.professor.name}. Hemos recibido tu razonamiento grupal. Hubo una interrupción en el servidor de inteligencia artificial, pero tu propuesta de lógica para la clasificatoria del mundial ha sido registrada. Consultar con tu docente en alejjandroclases@gmail.com para detalles de la corrección.`,
      puntosFuertes: isMockApproved ? ["Entregaron a tiempo", "Describieron una idea general de comparación"] : [],
      puntosDebiles: isMockApproved ? [] : ["La explicación es demasiado corta o ausente."],
      recomendaciones: ["Revisar con el profesor los casos de empates complejos."]
    };
  }
};
