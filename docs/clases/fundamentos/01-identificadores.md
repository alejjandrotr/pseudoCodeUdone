# 1. Los Identificadores

*📽️ **Video explicativo:** [Reglas de nombrado y estándares](https://youtu.be/3EbbEJnrFxw)*

Un identificador es, en esencia, el nombre que le asignamos a los elementos dentro de un programa (variables, constantes, algoritmos, funciones, etc.). Para que el computador (y otros programadores) puedan entender nuestro código, debemos seguir reglas estrictas.

## El Puente entre la Idea y el Código

Antes de escribir una sola línea de pseudocódigo, debemos entender cómo fluye la información.

*   **Diagramas de Flujo:** Son la representación gráfica secuencial de las instrucciones. Aunque para programas complejos pueden volverse extensos, son vitales para visualizar procesos cortos.
*   **Pseudocódigo:** Es nuestra herramienta de diseño. No es un lenguaje rígido, pero en nuestra clase seguiremos un estándar en español que facilita la transición hacia lenguajes reales (que usualmente están en inglés).
*   **Ciclo de Vida de un Dato:** Todo programa sigue el patrón: Entrada $\rightarrow$ Procesamiento $\rightarrow$ Salida.

## Reglas Obligatorias

Para que un identificador sea válido, debe cumplir con lo siguiente:

*   **Inicio:** Debe comenzar siempre con una letra (mayúscula o minúscula).
*   **Caracteres permitidos:** Solo se permiten letras, números y el carácter de subrayado o "piso" (_). Es el único símbolo especial admitido.
*   **Sin espacios:** No se pueden incluir espacios en blanco.
*   **Unicidad:** No se puede utilizar el mismo nombre para dos elementos distintos dentro del mismo ámbito del programa.
*   **Sensibilidad (Papel vs. Código):** Aunque en lenguajes modernos se diferencia entre mayúsculas y minúsculas (case-sensitive), para efectos de nuestras evaluaciones escritas en hoja, no se penalizará la diferencia entre estas al evaluar las variables.

## Recomendaciones de "Buen Código" y Nomenclatura

No basta con que el nombre sea válido; debe ser útil. Nombrar variables es una de las tareas más difíciles en programación. Un buen nombre puede ahorrar horas de lectura a un colega o a ti mismo en el futuro.

*   **CamelCase:** Aunque existen varios estilos, un estándar recomendado es iniciar en minúscula y usar mayúsculas para separar palabras (ej: `nombreEstudiante`, `notaFinalExamen`).
*   **Contexto:** Evita variables de una sola letra como `a` o `x`, a menos que su ámbito sea extremadamente reducido (3 o 4 líneas). Es preferible un nombre largo y descriptivo que uno corto y ambiguo.
*   **Nombres significativos:** El identificador debe representar lo que contiene. Es preferible usar `monto_total` o `nombre_estudiante`.
*   **Verbos para acciones:** Si el identificador nombra una función o método, usa verbos que describan qué hace (ej: `calcular_promedio()`, `registrar_gol()`).
*   **Evita abreviaturas:** El contexto debe estar en el nombre. No obligues al lector a adivinar qué significa una sigla.
