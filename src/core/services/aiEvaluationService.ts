import { GoogleGenerativeAI } from "@google/generative-ai";
import { Professor } from "../types/professor.types";
import s from "../data/udone-syntax.json";

// ─── Build UDONE_RULES from the JSON (all rules, no omissions) ───────────────
const UDONE_RULES = `
ROL: Actúa como un evaluador de código estricto. Tu tarea es evaluar pseudocódigo utilizando única y exclusivamente la "Notación para el trabajo de los Algoritmos en Pseudocódigo" de la Universidad de Oriente (UDONE).

════════════════════════════════════════════════
REGLAS DE SINTAXIS OBLIGATORIAS UDONE
════════════════════════════════════════════════

── 1. ESTRUCTURA BASE (orden obligatorio) ──
${s.estructura_base.orden.join("\n")}
Nota: ${s.estructura_base.nota}

── 2. ENTRADA / SALIDA ──
Lectura : ${s.entrada_salida.lectura_formato}
  Ejemplo: ${s.entrada_salida.lectura_ejemplo}
Escritura: ${s.entrada_salida.escritura_formato}
  Ejemplo: ${s.entrada_salida.escritura_ejemplo}
Nota: ${s.entrada_salida.nota}

── 3. ASIGNACIÓN ──
Correcto  : ${s.asignacion.ejemplo_correcto}   (operador: "${s.asignacion.correcto}")
Incorrecto: ${s.asignacion.ejemplo_incorrecto}
Nota: ${s.asignacion.nota}

── 4. DECLARACIÓN ──
Constantes: ${s.declaracion_constantes.formato}
  Ejemplo: ${s.declaracion_constantes.ejemplo}
  Nota: ${s.declaracion_constantes.nota}

Variables: ${s.declaracion_variables.formato}
  Ejemplo: ${s.declaracion_variables.ejemplo}
  Nota: ${s.declaracion_variables.nota}

── 5. TIPOS DE DATO ──
Entero  : ${s.tipos_de_dato.entero.descripcion} Ej: ${s.tipos_de_dato.entero.ejemplo}
Real    : ${s.tipos_de_dato.real.descripcion} Ej: ${s.tipos_de_dato.real.ejemplo}
          Nota: ${s.tipos_de_dato.real.nota}
Carácter: ${s.tipos_de_dato.caracter.descripcion} Delimitador: ${s.tipos_de_dato.caracter.delimitador} Ej: ${s.tipos_de_dato.caracter.ejemplo}
Cadena  : ${s.tipos_de_dato.cadena.descripcion} Delimitador: ${s.tipos_de_dato.cadena.delimitador} Ej: ${s.tipos_de_dato.cadena.ejemplo}
Lógico  : ${s.tipos_de_dato.logico.descripcion} Valores válidos: ${s.tipos_de_dato.logico.valores.join(", ")}
          Prohibidos: ${s.tipos_de_dato.logico.prohibido.join(", ")}

── 6. OPERADORES ARITMÉTICOS ──
Suma: ${s.operadores_aritmeticos.suma}  |  Resta: ${s.operadores_aritmeticos.resta}  |  Multiplicación: ${s.operadores_aritmeticos.multiplicacion}  |  División real: ${s.operadores_aritmeticos.division_real}
División entera: ${s.operadores_aritmeticos.div_entera}  |  Módulo/Residuo: ${s.operadores_aritmeticos.modulo_residuo}  |  Potenciación: ${s.operadores_aritmeticos.potenciacion}
Prohibidos: ${s.operadores_aritmeticos.prohibidos.join(", ")}

── 7. OPERADORES RELACIONALES ──
Igual: ${s.operadores_relacionales.igual}  |  Diferente: ${s.operadores_relacionales.diferente}  |  Mayor: ${s.operadores_relacionales.mayor}  |  Menor: ${s.operadores_relacionales.menor}  |  Mayor/igual: ${s.operadores_relacionales.mayor_igual}  |  Menor/igual: ${s.operadores_relacionales.menor_igual}
Prohibidos: ${s.operadores_relacionales.prohibidos.join(", ")}
Nota: ${s.operadores_relacionales.nota}

── 8. OPERADORES LÓGICOS ──
AND → ${s.operadores_logicos.and}  |  OR → ${s.operadores_logicos.or}  |  NOT → ${s.operadores_logicos.not}
Prohibidos: ${s.operadores_logicos.prohibidos.join(", ")}
Nota: ${s.operadores_logicos.nota}

── 9. CONCATENACIÓN EN ESCRITURA ──
Separador: "${s.concatenacion.separador}"
Ejemplo: ${s.concatenacion.ejemplo}
Prohibidos: ${s.concatenacion.prohibidos.join(", ")}

── 10. JERARQUÍA DE OPERACIONES ──
${s.jerarquia_operaciones.orden.join("\n")}

── 11. SELECCIÓN SIMPLE / DOBLE ──
${s.seleccion_simple_doble.formato}
Nota: ${s.seleccion_simple_doble.nota}

── 12. SELECCIÓN MÚLTIPLE ──
${s.seleccion_multiple.formato}
Nota: ${s.seleccion_multiple.nota}

── 13. CICLO REPETIR / HASTA ──
${s.ciclo_repetir.formato}
Nota: ${s.ciclo_repetir.nota}

── 14. CICLO MIENTRAS ──
${s.ciclo_mientras.formato}
Nota: ${s.ciclo_mientras.nota}

── 15. CICLO PARA ──
${s.ciclo_para.formato}
Ejemplo: ${s.ciclo_para.ejemplo}
Nota: ${s.ciclo_para.nota}

── 16. PROCEDIMIENTOS ──
Definición:
${s.procedimientos.definicion_formato}
Invocación: ${s.procedimientos.invocacion_formato}
Nota: ${s.procedimientos.nota}

── 17. FUNCIONES ──
${s.funciones.definicion_formato}
Nota: ${s.funciones.nota}

── 18. PARÁMETROS DE MÓDULOS ──
Entrada: ${s.parametros_modulos.entrada}  |  Salida: ${s.parametros_modulos.salida}  |  Entrada/Salida: ${s.parametros_modulos.entrada_salida}
Ejemplo: ${s.parametros_modulos.ejemplo}
Nota: ${s.parametros_modulos.nota}

── 19. ARREGLOS (VECTORES Y MATRICES) ──
Vector : ${s.arreglos.vector_formato}  →  Acceso: ${s.arreglos.vector_acceso}  →  Ejemplo: ${s.arreglos.vector_ejemplo}
Matriz : ${s.arreglos.matriz_formato}  →  Acceso: ${s.arreglos.matriz_acceso}  →  Ejemplo: ${s.arreglos.matriz_ejemplo}
Nota: ${s.arreglos.nota}

── 20. REGISTROS ──
${s.registros.definicion_formato}
Acceso: ${s.registros.acceso}
Nota: ${s.registros.nota}

── 21. ARCHIVOS ──
Declaración: ${s.archivos.declaracion}
Operaciones válidas: ${s.archivos.operaciones.join(", ")}
Nota: ${s.archivos.nota}

── 22. IDENTIFICADORES ──
Inicio: ${s.nomenclatura_identificadores.inicio}
Permitidos: ${s.nomenclatura_identificadores.caracteres_permitidos.join(", ")}
Prohibidos: ${s.nomenclatura_identificadores.prohibidos.join(", ")}
Recomendación: ${s.nomenclatura_identificadores.recomendacion}
Nota: ${s.nomenclatura_identificadores.nota}

════════════════════════════════════════════════
INSTRUCCIÓN DE EVALUACIÓN:
Analiza el pseudocódigo del estudiante. Si viola alguna de estas reglas o usa sintaxis de otros lenguajes (llaves {}, palabras reservadas como print, def, function, var, let, if/else sin Entonces, etc.), márcalo como error y explica la corrección basándote en este estándar.
════════════════════════════════════════════════
`;

// ─── Evaluación ───────────────────────────────────────────────────────────────

export interface EvaluationResult {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export const evaluarPseudocodigo = async (
  codigoUsuario: string,
  enunciado: string,
  professor: Professor,
  apiKey: string,
  modelName: string = "gemini-3.1-flash-lite-preview"
): Promise<EvaluationResult> => {

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  const systemPrompt = `
${UDONE_RULES}

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

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      text,
      usage: response.usageMetadata ? {
        promptTokens: response.usageMetadata.promptTokenCount,
        completionTokens: response.usageMetadata.candidatesTokenCount,
        totalTokens: response.usageMetadata.totalTokenCount
      } : undefined
    };
  } catch (error: any) {
    console.error("Error evaluating pseudocode:", error);
    if (error?.message?.includes("API key not valid")) {
      throw new Error("API_KEY_INVALID");
    }
    throw new Error("EVALUATION_FAILED");
  }
};
