# Iterando sobre Matrices

Para poder procesar, llenar o leer una matriz completa, debemos recorrer sus posiciones una por una. Dado que una matriz tiene dos dimensiones (filas y columnas), un solo ciclo repetitivo ya no es suficiente.

Para iterar sobre una matriz, debemos **anidar ciclos repetitivos**, y habitualmente utilizamos el **Ciclo Para**.

## Ciclos Anidados y Variables de Índice

La convención más común en programación y algoritmia cuando tenemos un ciclo `Para` dentro de otro ciclo `Para` es utilizar letras secuenciales para los índices: `i`, `j`, `k`, `l`, `m`, `n`... dependiendo de cuántos niveles de anidación o dimensiones tengamos.

Dado que en este curso nos limitamos a matrices bidimensionales (2D), típicamente utilizaremos:
- **`i`** para el ciclo externo (controla las filas).
- **`j`** para el ciclo interno (controla las columnas).

> [!CAUTION]
> Es **importantísimo** que cada ciclo tenga su propia variable de índice. No se puede repetir ni utilizar de nuevo el mismo índice en un ciclo anidado, ya que se supone que cada uno se debe mover de forma independiente. Si usas la misma variable para ambos ciclos, arruinarás el conteo.

### Nombres de Variables Personalizados

Aunque `i` y `j` son convenciones matemáticas universales, **no es obligatorio** utilizarlas. Puedes darle a esa variable el nombre que consideres más descriptivo según el contexto. 

Por ejemplo, puedes utilizar variables como `x` e `y`, o ser mucho más explícito usando `fila` y `columna`. Incluso, si estás trabajando con múltiples matrices complejas, puedes usar nombres como `indexA` para referirte a la posición en la matriz A.

## Recorrido Clásico (Fila por Fila)

El recorrido más común en una matriz es leerla como si fuera un libro: de arriba hacia abajo y de izquierda a derecha. 

Para lograr esto, definimos dos ciclos `Para`:
1. El ciclo externo va desde la posición 1 hasta la cantidad máxima de **filas**.
2. El ciclo interno va desde la posición 1 hasta la cantidad máxima de **columnas**.

**Estructura del recorrido:**
\`\`\`text
Para fila <- 1 Hasta Límite_Filas Hacer
  Para columna <- 1 Hasta Límite_Columnas Hacer
    // Procesar la celda Matriz[fila, columna]
  Fin Para
Fin Para
\`\`\`

### Ejemplo Práctico: Llenar una Matriz

Supongamos que tenemos una matriz `M` de 3x3 y queremos que el usuario introduzca todos los valores desde el teclado.

\`\`\`text
Algoritmo Llenar_Matriz
Declaracion
  Variables
    M : matriz de Enteros [3, 3]
    i, j : Entero

Inicio
  // Recorremos cada fila
  Para i <- 1 Hasta 3 Hacer
    // Por cada fila, recorremos sus 3 columnas
    Para j <- 1 Hasta 3 Hacer
      Escribir "Ingrese valor para la fila ", i, " y columna ", j, ":"
      Leer M[i, j]
    Fin Para
  Fin Para
Fin
\`\`\`

## Recorrido por Columnas (Invertido)

Podemos jugar con la forma en que leemos la matriz. Si en lugar de leer fila por fila, queremos leer **columna por columna**, simplemente invertimos el orden de los ciclos `Para`. El ciclo externo controlará las columnas y el interno las filas.

**¿Para qué sirve esto?**
Imagina una competencia con 3 participantes (Ana, Juan, Pedro) que reciben puntuaciones de 3 jueces.
- **Filas:** Representan a cada participante.
- **Columnas:** Representan a cada juez.

Si nos piden calcular el *promedio de puntuaciones otorgadas por cada juez*, necesitamos sumar todos los números de una misma columna (las notas que ese juez dio a todos los participantes) antes de pasar al siguiente juez.

\`\`\`text
Para j <- 1 Hasta 3 Hacer // Juez (Columnas)
  sumaJuez <- 0
  Para i <- 1 Hasta 3 Hacer // Participante (Filas)
    sumaJuez <- sumaJuez + Puntuaciones[i, j]
  Fin Para
  Escribir "El promedio del Juez ", j, " es: ", sumaJuez / 3
Fin Para
\`\`\`

## Recorridos Especiales: La Diagonal Principal

En las **matrices cuadradas** (aquellas que tienen el mismo número de filas y de columnas, como 5x5), existe un concepto muy importante: la **Diagonal Principal**. 

La diagonal principal está formada por todos los elementos donde **el índice de la fila es exactamente igual al índice de la columna** (es decir, `i = j`). Comprende las posiciones `[1,1]`, `[2,2]`, `[3,3]`, etc.

**Ejemplo: Sumar la diagonal principal de una matriz 5x5**
\`\`\`text
sumaDiagonal <- 0
Para i <- 1 Hasta 5 Hacer
  Para j <- 1 Hasta 5 Hacer
    Si i = j Entonces
      sumaDiagonal <- sumaDiagonal + Matriz[i, j]
    Fin Si
  Fin Para
Fin Para
\`\`\`

*(Nota de optimización: En realidad, para la diagonal principal basta con un solo ciclo `Para i <- 1 Hasta 5 Hacer` y sumar directamente `Matriz[i, i]`, lo cual es mucho más eficiente).*

### Diseño
- Añadir un pequeño widget visual que muestre cómo los índices `i` y `j` cambian paso a paso en una matriz de 3x3.
- Incluir un botón de alternancia en el widget para visualizar la diferencia animada entre un **recorrido por filas** y un **recorrido por columnas**.
- Sombrear visualmente la diagonal principal en un color distinto para resaltar las posiciones donde `i = j`.
