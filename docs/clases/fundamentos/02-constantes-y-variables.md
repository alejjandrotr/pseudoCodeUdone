# 2. Constantes y Variables

*📽️ **Video explicativo:** [Diferencia entre variables y constantes, e introducción a los tipos](https://youtu.be/Y3NguKPAfrM)*

En programación, trabajamos con datos que se almacenan en memoria. Según su comportamiento durante la ejecución, los clasificamos en dos tipos:

## Las Constantes

Son valores que no cambian durante toda la ejecución del programa. Se definen con un valor fijo desde el inicio.

*   **Universales:** Como el valor de $\pi$ (3.1416) o la constante de gravedad ($9.81 m/s^2$).
*   **De programa:** Valores que definimos nosotros para el contexto del ejercicio, como `CANTIDAD_ESTUDIANTES` o el `IVA`. Aunque no sean leyes físicas, para nuestro programa ese valor es una regla fija.

**Formato:** `Nombre_Constante = Valor`  
**Ejemplo:** `PI = 3.1415`, `MAX_JUGADORES = 11`.

## Las Variables

Son espacios de memoria cuyo valor puede cambiar o ser modificado a lo largo del programa.

*   Provienen normalmente de entradas del usuario (inputs).
*   Resultan de operaciones matemáticas o procesos (como un acumulador de puntos en un partido de fútbol).

**Componentes esenciales:** Toda variable debe tener un **Nombre** y un **Tipo de Dato** (Entero, Real, Cadena, etc.).

## Tipos Atómicos y sus Límites

En pseudocódigo tratamos los números como infinitos, pero en la realidad física de un computador:

*   **Enteros vs. Reales:** Un resultado de división siempre debe considerarse un `Real`, incluso si divides dos enteros (ej: `5 / 2 = 2.5`).
*   **Cadenas vs. Caracteres:** Recuerda la distinción de comillas. Las comillas simples `' '` son para un único símbolo (`Carácter`), mientras que las dobles `" "` son para texto de cualquier longitud (`Cadena`).
