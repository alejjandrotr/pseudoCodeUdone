# Práctica con Matrices

A continuación, analizaremos una serie de ejercicios prácticos que nos ayudarán a consolidar el uso de ciclos anidados y el manejo de matrices bidimensionales.

## 1. Suma Global de Elementos

**Planteamiento:** Supóngase que nos piden llenar una matriz de 3x3 con números enteros proporcionados por el usuario y, al finalizar, calcular la suma total de todos los elementos que tiene esa matriz.

\`\`\`text
Algoritmo Suma_Matriz
Declaracion
  Variables
    Mat : matriz de Enteros [3, 3]
    i, j : Entero
    sumaTotal : Entero

Inicio
  sumaTotal <- 0

  // Lectura y sumatoria simultánea
  Para i <- 1 Hasta 3 Hacer
    Para j <- 1 Hasta 3 Hacer
      Escribir "Ingrese número para celda [", i, ",", j, "]:"
      Leer Mat[i, j]
      
      // Acumulamos el valor ingresado
      sumaTotal <- sumaTotal + Mat[i, j]
    Fin Para
  Fin Para

  Escribir "La suma de todos los elementos de la matriz es: ", sumaTotal
Fin
\`\`\`

### Diseño
- Añadir aquí el componente de "Laboratorio Interactivo" que se usó en la primera sección del curso.
- Configurar el laboratorio para desarrollar una "grillita" visual de tamaño `3x3`, de tal forma que el estudiante pueda ver cómo se cargan los números en cada casilla y cómo va incrementando la sumatoria paso a paso.

---

## 2. Comparación Estricta de Matrices

**Planteamiento:** Dadas dos matrices de igual dimensión (ej. 4x4), genere una nueva matriz resultante. Esta nueva matriz debe conservar los números que son idénticos y que se encuentran en la misma posición en ambas matrices originales. Todo número que no coincida exactamente en valor y posición debe cambiarse por un `0`.

\`\`\`text
Algoritmo Comparacion_Matrices
Declaracion
  Variables
    MatA, MatB, MatResult : matriz de Enteros [4, 4]
    i, j : Entero

Inicio
  // Asumiendo que MatA y MatB ya contienen datos...
  
  Para i <- 1 Hasta 4 Hacer
    Para j <- 1 Hasta 4 Hacer
      Si MatA[i, j] = MatB[i, j] Entonces
        MatResult[i, j] <- MatA[i, j]
      Sino
        MatResult[i, j] <- 0
      Fin Si
    Fin Para
  Fin Para
Fin
\`\`\`

---

## 3. Matriz Transpuesta (Cambio de Dimensiones)

**Planteamiento:** Se tiene una matriz de 4 filas por 2 columnas (4x2). Se requiere desarrollar un algoritmo que lleve esos datos a una nueva matriz transpuesta, la cual será de 2 filas por 4 columnas (2x4). Es decir, las filas de la original se convierten en las columnas de la nueva.

\`\`\`text
Algoritmo Transponer_Matriz
Declaracion
  Variables
    Original : matriz de Enteros [4, 2]
    Transpuesta : matriz de Enteros [2, 4]
    i, j : Entero

Inicio
  // Asumiendo que Original ya contiene datos...

  // Recorremos la matriz original de 4 filas y 2 columnas
  Para i <- 1 Hasta 4 Hacer
    Para j <- 1 Hasta 2 Hacer
      // El truco de la transposición: 
      // El índice de fila (i) pasa a ser la columna
      // El índice de columna (j) pasa a ser la fila
      Transpuesta[j, i] <- Original[i, j]
    Fin Para
  Fin Para
Fin
\`\`\`

*Nota: Observa cuidadosamente la asignación `Transpuesta[j, i] <- Original[i, j]`. La fila `i` de la original alimenta la columna `i` de la transpuesta.*
