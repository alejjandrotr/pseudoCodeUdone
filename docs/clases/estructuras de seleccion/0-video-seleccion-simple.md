# Apoyo Visual: Estructuras de Selección (Parte 1)

**Fecha de creación del artículo:** 12/05/2026  
**Referencia de Video:** Publicado originalmente el 23/02/2021  
**Enlace al video:** [YouTube - Estructuras de Selección (SI #009)](https://www.youtube.com/watch?v=jEehW5m7eVE&list=PLYTHFZ-AWGsZ83CA7Ru04pKCtwS4vPUf1&index=4)

---

## 1. Introducción
Hasta ahora, nuestros algoritmos han sido lineales: ejecutan la instrucción A, luego la B y luego la C. Pero en el mundo real, los programas no siempre siguen un flujo fijo. A veces, necesitamos ejecutar ciertas líneas de código solo en momentos específicos, dependiendo de una condición.

Un programa debe ser capaz de reaccionar según los datos que suministra el usuario. Para lograr esto, utilizamos las **estructuras de selección**.

## 2. ¿Qué es una Condición?
Una condición es una expresión lógica que nos permite determinar el camino que debe seguir nuestro algoritmo. Es, en esencia, una pregunta que solo tiene dos respuestas posibles: **Verdadero** o **Falso**.

### Ejemplos de la vida real:
*   **Caso Cine:** ¿Hay entradas disponibles? Si la respuesta es Sí (Verdadero), procedemos a comprar.
*   **Caso Descuento:** ¿La edad del usuario es mayor a 60 años? Si es Sí, otorgamos el descuento de tercera edad.

## 3. Tipos de Selección
Existen tres tipos principales de estructuras de selección:
1.  **Simple (SI-ENTONCES):** Se ejecuta una acción solo si se cumple la condición.
2.  **Doble (SI-ENTONCES-SINO):** Ofrece una alternativa. Si no se cumple la condición, se hace otra cosa.
3.  **Múltiple (SEGÚN-CASO):** Permite evaluar múltiples opciones (como elegir una acción distinta para cada signo del zodiaco).

## 4. La Condición Simple: Estructura y Sintaxis
Esta sección se enfoca en la **Selección Simple**. Esta permite ejecutar un bloque de instrucciones solo si el resultado de una operación lógica es Verdadero.

### Sintaxis en Pseudocódigo:
```pseudocode
Si (condición) Entonces
    // Bloque de instrucciones a ejecutar
    Escribir "La condición se cumplió"
Fin Si
```

> [!TIP]
> **Nota de estilo:** Es fundamental usar la sangría (indentación). Al dejar un espacio a la derecha dentro del bloque Si, le indicamos visualmente a quien lee el código qué instrucciones dependen de esa condición.

## 5. Operadores y Tablas de Verdad
Para construir condiciones complejas, utilizamos operadores relacionales y lógicos:
*   **Relacionales:** `>`, `<`, `>=`, `<=`, `==` (igual), `<>` (diferente).
*   **Lógicos:** NO (NOT), Y (AND), O (OR).

### Resumen de Operadores Lógicos:
| A | B | A Y B (AND) | A O B (OR) |
| :--- | :--- | :--- | :--- |
| V | V | **V** | **V** |
| V | F | F | **V** |
| F | V | F | **V** |
| F | F | F | F |

*   El **"Y"** solo es verdadero si ambas partes se cumplen.
*   El **"O"** es falso solo si ambas partes fallan.

## 6. Ejercicio Práctico: El Mayor de Dos Números
**Reto:** Escribir un algoritmo que lea dos números y determine cuál es el mayor.

### Análisis:
*   **Entrada:** num1, num2 (Enteros).
*   **Salida:** Un mensaje indicando cuál es el mayor.

### Algoritmo en Pseudocódigo:
```pseudocode
Algoritmo MayorDeDosNumeros
    Variables: 
        num1, num2: Entero
Inicio
    Escribir "Indique el número 1:"
    Leer num1
    Escribir "Indique el número 2:"
    Leer num2

    Si (num1 > num2) Entonces
        Escribir "El primer número es el mayor"
    Fin Si

    Si (num2 > num1) Entonces
        Escribir "El segundo número es el mayor"
    Fin Si
Fin
```

### Prueba de Escritorio:
1.  **Si el usuario ingresa 12 y 25:** La primera condición es falsa ($12 > 25 \rightarrow F$), la segunda es verdadera ($25 > 12 \rightarrow V$). Resultado: "El segundo número es el mayor".
2.  **Si el usuario ingresa 75 y 75:** Ambas condiciones resultan falsas. El programa termina sin mostrar nada.

> [!NOTE]
> **Recomendación para el alumno:** Siempre es mejor que el programa dé una respuesta. ¿Cómo podrías modificar el código para que avise si los números son iguales? ¡Pruébalo en tu cuaderno!
