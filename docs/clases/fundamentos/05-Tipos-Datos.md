# Guía de Tipos de Datos y Expresiones en Pseudocódigo

En esta etapa de la materia, dejaremos de ver los algoritmos como simples pasos y empezaremos a entender la **naturaleza de la información** que procesamos. Para que un algoritmo sea funcional, debemos definir qué tipo de datos estamos manipulando.

---

## 1. Los 5 Tipos de Datos Fundamentales
Tanto las variables como las constantes deben pertenecer a un tipo de dato específico. En nuestro pseudocódigo, manejaremos cinco categorías:



| Tipo de Dato | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Entero** | Números sin decimales ($-\infty$ a $+\infty$). | `22`, `-5`, `0` |
| **Real** | Números que incluyen decimales. | `18.5`, `3.1416`, `-0.5` |
| **Carácter** | Una única unidad del teclado, encerrada en comillas simples. | `'A'`, `'7'`, `'@'`, `' '` |
| **Cadena** | Secuencia de caracteres (texto) encerrada en comillas dobles. | `"Hola Mundo"`, `"UDONE"`, `"5"` |
| **Lógico** | Representa premisas de cumplimiento (Booleano). | `Verdadero`, `Falso` |

### Notas de Importancia:
* **La ilusión del número:** Si escribes `"5"` (Cadena) o `'5'` (Carácter), **no es un número**. No puedes sumarle 1 ni realizar operaciones matemáticas con él; el computador lo trata como un dibujo o un texto.
* **Capacidad de los Enteros:** En pseudocódigo el límite es infinito, pero recuerda que en lenguajes reales (como Java o Python) el espacio en memoria es limitado.

---

## 2. Compatibilidad y Mutabilidad
No todos los datos pueden mezclarse libremente. Existe una jerarquía de "capacidad":

* **De Real a Entero:** Un `Real` puede contener a un `Entero` (porque $5$ se puede ver como $5.0$), pero un `Entero` **no** puede recibir un `Real` sin perder información (truncamiento).
* **De Cadena a Carácter:** Una `Cadena` puede contener un solo `Carácter`, pero un `Carácter` no tiene espacio para una `Cadena`.

---

## 3. Operadores Aritméticos: DIV y MOD

*📽️ **Video explicativo:** [Operaciones matemáticas, relacionales y lógicas](https://youtu.be/WGQw7HfOOao)*

Además de las operaciones clásicas ($+$, $-$, $*$, $/$), existen dos operadores cruciales para la lógica de programación:

1.  **DIV (División Entera):** Devuelve el resultado de la división truncado, sin decimales. Es como las divisiones de primaria antes de sacar la coma.
    * *Ejemplo:* `10 DIV 3 = 3`
2.  **MOD (Residuo/Módulo):** Devuelve lo que sobra de esa división entera.
    * *Ejemplo:* `10 MOD 3 = 1`



> **¿Para qué sirve?** El `MOD` es extremadamente útil para saber si un número es par (si `numero MOD 2 = 0`) o para determinar múltiplos.

3.  **Potenciación:** En nuestro estándar, utilizaremos el doble asterisco `**` para representar potencias (ej: `2**3` para $2^3$).

---

## 4. Operadores de Comparación y Relacionales
La computación se basa en la evaluación de premisas. Estos operadores siempre devuelven un valor **Lógico** (`Verdadero` o `Falso`).

* **Operadores:** `=`, `<>` (Diferente), `>`, `<`, `>=`, `<=`
* **Regla de Oro:** A diferencia de la notación matemática ($10 < x < 20$), en programación solo se permite comparar **dos miembros a la vez**. Para rangos complejos, usaremos operadores lógicos.
* **Comparación de Cadenas:** Se realiza por orden de "diccionario" (alfabético).
    * `"Árbol" < "Zapato"` es `Verdadero`.

---

## 5. Operadores Lógicos (Y, O, NO)
Permiten combinar comparaciones para crear premisas más complejas:
* **Y (AND):** Es restrictivo: requiere que todo sea verdadero (ambas condiciones deben ser ciertas).
* **O (OR):** Es inclusivo: basta con que una parte sea verdadera (o una de las condiciones).
* **NO (NOT):** Invierte el valor (lo que es verdadero pasa a ser falso).

---

## 6. Concatenación
La concatenación es la unión de dos o más datos en una sola cadena de texto.
* **En nuestro pseudocódigo:** Usaremos la **coma (`,`)** para unir elementos.
* **Ejemplos:**
    * `"Goles anotados: ", 3` $\rightarrow$ `"Goles anotados: 3"`
    * `"Bienvenido ", nombre_usuario`
    * **Nota:** No es recomendable concatenar con valores `Lógicos`, ya que el resultado (`"Estado: Verdadero"`) suele ser confuso para el usuario final.

---

## 7. Jerarquía de Operaciones (Orden de Prioridad)
Cuando una expresión tiene muchos operadores, el computador resuelve en este orden estricto:

1.  **Paréntesis `( )`:** Rompen cualquier regla y se resuelven de adentro hacia afuera.
2.  **Potencia / Raíz**
3.  **Multiplicación, División, MOD, DIV**
4.  **Suma y Resta**
5.  **Comparaciones** (`=`, `<>`, etc.)
6.  **Operadores Lógicos** (Primero `NO`, luego `Y`, finalmente `O`)



---

### Recordatorio para el examen:
Al redactar tus algoritmos, asegúrate de que el tipo de dato que declaras en la sección de **Variables** coincida con el uso que le das en el **Inicio**. Si declaras un `Entero`, no intentes guardarle un nombre.


