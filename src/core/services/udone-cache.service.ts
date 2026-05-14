import { GoogleGenAI } from "@google/genai";
import s from "../data/udone-syntax.json";

// ─── Build UDONE_RULES (static, never changes) ─────────────────────────────
export const UDONE_RULES = `
ROL: Actúas como un evaluador de código estricto. Tu tarea es evaluar pseudocódigo utilizando única y exclusivamente la "Notación para el trabajo de los Algoritmos en Pseudocódigo" de la Universidad de Oriente (UDONE).

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
1. Analiza el pseudocódigo del estudiante. Si viola alguna de estas reglas o usa sintaxis de otros lenguajes (llaves {}, palabras reservadas como print, def, function, var, let, if/else sin Entonces, etc.), márcalo como error y explica la corrección basándote en este estándar.
2. CRITERIO DE FLEXIBILIDAD: NO penalices ni marques como error diferencias en el uso de tildes (ej: 'Declaración' vs 'Declaracion'), ni diferencias de mayúsculas/minúsculas en palabras reservadas o tipos de datos (ej: 'Leer' vs 'leer', 'Entero' vs 'entero'). Tampoco penalices el uso opcional de dos puntos (:) después de 'Variables', 'Entonces' o 'Sino'. Estos casos deben considerarse CORRECTOS.
════════════════════════════════════════════════
`;

// ─── Singleton Cache State ──────────────────────────────────────────────────
// Keyed by apiKey+model so different users/models each get their own cache
interface CacheEntry {
  name: string;
  expiry: number; // ms timestamp
}

const cacheStore = new Map<string, CacheEntry>();

/**
 * Returns an existing Gemini cache name for the UDONE rules, or creates one.
 * Uses a 1-hour TTL with a 5-minute safety margin.
 * Returns null if caching fails (service will fall back to full prompt).
 */
export async function getOrCreateUdoneCache(
  apiKey: string,
  modelName: string
): Promise<string | null> {
  const storeKey = `${apiKey}:${modelName}:v3`;
  const existing = cacheStore.get(storeKey);

  // Cache hit — still valid
  if (existing && Date.now() < existing.expiry) {
    console.debug("[UdoneCache] Cache hit:", existing.name);
    return existing.name;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const cache = await ai.caches.create({
      model: modelName,
      config: {
        systemInstruction: UDONE_RULES,
        ttl: "3600s", // 1 hour
        displayName: "udone-rules-v2",
      },
    });

    const entry: CacheEntry = {
      name: cache.name!,
      // Expire 5 minutes early to avoid edge cases
      expiry: Date.now() + 55 * 60 * 1000,
    };
    cacheStore.set(storeKey, entry);
    console.debug("[UdoneCache] Created new cache:", entry.name);
    return entry.name;
  } catch (err) {
    // Model may not support caching (e.g. flash-lite preview) — graceful fallback
    console.warn("[UdoneCache] Could not create cache, using full prompt:", err);
    cacheStore.delete(storeKey); // Clear any stale entry
    return null;
  }
}
