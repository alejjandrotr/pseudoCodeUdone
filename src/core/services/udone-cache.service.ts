import s from "../data/udone-syntax.json";

// ─── Núcleo UDONE Compacto (siempre incluido) ───────────────────────────────
// Formato denso para minimizar tokens de entrada sin perder precisión sintáctica.

const UDONE_CORE_RULES = `ROL: Evaluador estricto de pseudocódigo según la Notación UDONE (Universidad de Oriente).

REGLAS BASE UDONE:
1. Estructura (orden obligatorio): Algoritmo <Nombre> (sin paréntesis) -> Declaración [Constantes: <Nom> = <Val> | Tipos: ... | Variables: <v1, v2>: <Tipo>] -> Inicio -> ... -> Fin.
2. E/S: ${s.entrada_salida.lectura_formato} | ${s.entrada_salida.escritura_formato} (concatenar solo con "${s.concatenacion.separador}"; prohibidos: +, &).
3. Asignación: "${s.asignacion.correcto}" (ej: ${s.asignacion.ejemplo_correcto}). Prohibidos en Inicio..Fin: ${s.asignacion.incorrecto.join(", ")}. El "=" solo se usa en Constantes, comparaciones y cabecera de Para.
4. Tipos: Entero | Real (división / entre enteros da Real) | Carácter ('A') | Cadena ("txt") | Lógico (${s.tipos_de_dato.logico.valores.join("/")}; prohibidos: ${s.tipos_de_dato.logico.prohibido.join(", ")}).
5. Aritméticos: +, -, *, /, ${s.operadores_aritmeticos.div_entera}, ${s.operadores_aritmeticos.modulo_residuo}, ${s.operadores_aritmeticos.potenciacion}. Prohibidos: %, //, ^.
6. Relacionales: =, <>, >, <, >=, <= (prohibido !=). Lógicos: ${s.operadores_logicos.and}, ${s.operadores_logicos.or}, ${s.operadores_logicos.not} (prohibidos: AND, OR, NOT, &&, ||, !).
7. Jerarquía: () > ** > *,/,DIV,MOD > +,- > relacionales > NO > Y > O.
8. Identificadores: inician con letra; letras, números y guion bajo (_) permitidos (NO penalizar "_"). Prohibidos espacios, -, $, %, @, ?, !.

CRITERIO DE EVALUACIÓN:
- Marca como error cualquier sintaxis de otros lenguajes ({}, print, printf, scanf, def, function, var, let, if/else sin Entonces, ==, !=, &&, ||, etc.).
- FLEXIBILIDAD: NO penalices diferencias de tildes (Declaración/Declaracion), mayúsculas/minúsculas en reservadas/tipos/cierres (Leer/leer, Entero/entero, Fin Si/FIN SI), ni dos puntos opcionales tras Variables, Entonces o Sino.`;

// ─── Módulos UDONE Bajo Demanda ─────────────────────────────────────────────

const MODULE_SELECCION = `SELECCIÓN:
- Simple/Doble: ${s.seleccion_simple_doble.formato.replace(/\n/g, " ")} (Sino opcional; cierre Fin Si obligatorio).
- Múltiple: ${s.seleccion_multiple.formato.replace(/\n/g, " ")} (sin Entonces; para valores discretos; cierre Fin Caso obligatorio).`;

const MODULE_CICLOS = `CICLOS:
- Repetir: ${s.ciclo_repetir.formato.replace(/\n/g, " ")} (evalúa al final, ejecuta >=1 vez).
- Mientras: ${s.ciclo_mientras.formato.replace(/\n/g, " ")} (evalúa al inicio).
- Para: ${s.ciclo_para.formato.replace(/\n/g, " ")} (usa "=" en cabecera; Inc/Dec opcional, por defecto +1; prohibido "Con Paso").`;

const MODULE_ARREGLOS = `ARREGLOS:
- Vector: ${s.arreglos.vector_formato} (ej: ${s.arreglos.vector_ejemplo}), acceso ${s.arreglos.vector_acceso}.
- Matriz: ${s.arreglos.matriz_formato} (ej: ${s.arreglos.matriz_ejemplo}), acceso ${s.arreglos.matriz_acceso}.
- Índices inician en 1 por convención UDONE.`;

const MODULE_SUBPROGRAMAS = `MÓDULOS (PROCEDIMIENTOS Y FUNCIONES):
- Procedimiento: ${s.procedimientos.definicion_formato.replace(/\n/g, " ")} | Invocación: ${s.procedimientos.invocacion_formato}. No retorna valor.
- Función: ${s.funciones.definicion_formato.replace(/\n/g, " ")}. Retorna valor, se usa en expresiones (NO con Llamar).
- Parámetros: dirección obligatoria ${s.parametros_modulos.entrada} (Entrada), ${s.parametros_modulos.salida} (Salida), ${s.parametros_modulos.entrada_salida} (E/S). Ej: ${s.parametros_modulos.ejemplo}.`;

const MODULE_ESTRUCTURAS_AVANZADAS = `REGISTROS Y ARCHIVOS:
- Registro (en sección Tipos): ${s.registros.definicion_formato.replace(/\n/g, " ")}. Acceso: ${s.registros.acceso}.
- Archivo (en Variables): ${s.archivos.declaracion}. Operaciones: ${s.archivos.operaciones.join(", ")} (Conectar antes de operar).`;

// ─── Patrones de Detección Contextual ───────────────────────────────────────

const PATTERNS = {
  seleccion: /\b(si|sino|entonces|caso|fin\s+si|fin\s+caso|seleccion|selecci[oó]n|condici[oó]n|condicional|decisi[oó]n|if|else|switch|case|mayor|menor|par|impar|positivo|negativo|rango|descuento|categor[ií]a)\b/i,
  ciclos: /\b(mientras|hacer|repetir|hasta|para|fin\s+mientras|fin\s+para|ciclo|bucle|iterar|repetici[oó]n|while|for|do|inc|dec|contador|acumulador|n\s+veces|cada\s+uno|promedio\s+de\s+los)\b/i,
  arreglos: /\b(arreglo|vector|matriz|matrices|lista|elemento|elementos|[ií]ndice|ordenar|ordenamiento|burbuja|b[uú]squeda|paralelo|paralelos)\b|\[[^\]]+\]/i,
  subprogramas: /\b(procedimiento|funci[oó]n|funcion|llamar|retornar|retorno|par[aá]metro|subprograma|m[oó]dulo|modular|def|void|return)\b|[↓↑]/i,
  estructuras: /\b(registro|archivo|fichero|conectar|grabar|abrir|cerrar|renombrar|tipos:?|struct)\b/i,
};

/**
 * Construye las reglas UDONE de forma modular según el enunciado, el código
 * del estudiante y una categoría opcional. Reduce ~60-73% de tokens en
 * ejercicios básicos/intermedios sin perder precisión en ejercicios avanzados.
 */
export function buildUdoneRulesForContext(
  enunciado: string,
  codigoUsuario: string,
  categoria?: string
): string {
  const combined = `${categoria ?? ""}\n${enunciado}\n${codigoUsuario}`;
  const modules: string[] = [UDONE_CORE_RULES];

  if (PATTERNS.seleccion.test(combined)) modules.push(MODULE_SELECCION);
  if (PATTERNS.ciclos.test(combined)) modules.push(MODULE_CICLOS);
  if (PATTERNS.arreglos.test(combined)) modules.push(MODULE_ARREGLOS);
  if (PATTERNS.subprogramas.test(combined)) modules.push(MODULE_SUBPROGRAMAS);
  if (PATTERNS.estructuras.test(combined)) modules.push(MODULE_ESTRUCTURAS_AVANZADAS);

  return modules.join("\n\n");
}

// Reglas completas compactas (para exámenes multi-tema o compatibilidad)
export const UDONE_RULES = [
  UDONE_CORE_RULES,
  MODULE_SELECCION,
  MODULE_CICLOS,
  MODULE_ARREGLOS,
  MODULE_SUBPROGRAMAS,
  MODULE_ESTRUCTURAS_AVANZADAS,
].join("\n\n");

/**
 * @deprecated Explicit Caching (`ai.caches.create`) no está soportado en Gemini 4
 * (que usa Implicit Caching automático). Se mantiene el export por compatibilidad
 * y retorna null sin realizar llamadas HTTP fallidas.
 */
export async function getOrCreateUdoneCache(
  _apiKey: string,
  _modelName: string
): Promise<string | null> {
  return null;
}
