# Jugando un poco con Matrices

Las matrices no sólo sirven para guardar datos aburridos o números de encuestas. Al ser una representación perfecta de un "tablero" o "cuadrícula" (grid), podemos utilizarlas para crear juegos, simulaciones de tableros de ajedrez o laberintos.

En esta sección, veremos ejercicios mucho más dinámicos y visuales. Para comprenderlos a la perfección, nos apoyaremos fuertemente en los simuladores visuales, de tal manera que puedas ver cómo los algoritmos van "pintando" o "recorriendo" las casillas.

---

## 1. Rescate en el Laberinto (Búsqueda Bidimensional)

**Planteamiento:** Imagina que tenemos una matriz que representa un laberinto. Esta matriz está llena de caracteres que representan caminos vacíos (`.`) o paredes (`#`). Sabemos que un individuo se perdió en el laberinto y su posición está marcada con una gran `X`. Debes recorrer la matriz y, al encontrarlo, devolver por pantalla sus coordenadas exactas (fila y columna).

\`\`\`text
Algoritmo Rescate_Laberinto
Declaracion
  Constantes
    FILAS = 5
    COLS = 5
  Variables
    Laberinto : matriz de Caracteres [FILAS, COLS]
    i, j : Entero
    encontrado : Logico

Inicio
  // Asumiendo que el Laberinto ya fue llenado previamente con '.', '#' y una 'X'
  encontrado <- Falso

  Para i <- 1 Hasta FILAS Hacer
    Para j <- 1 Hasta COLS Hacer
      Si Laberinto[i, j] = 'X' Entonces
        Escribir "¡Individuo rescatado en la fila ", i, " y columna ", j, "!"
        encontrado <- Verdadero
      Fin Si
    Fin Para
  Fin Para
  
  Si encontrado = Falso Entonces
    Escribir "El individuo no está en el laberinto."
  Fin Si
Fin
\`\`\`

---

## 2. Simetría de una Matriz

**Planteamiento:** Una matriz cuadrada es **simétrica** si el elemento de la fila `i` y columna `j` es exactamente igual al elemento de la fila `j` y columna `i` (es decir, `M[i, j] = M[j, i]`). Haga un algoritmo que verifique si una matriz de 4x4 es simétrica o no.

\`\`\`text
Algoritmo Verificar_Simetria
Declaracion
  Variables
    M : matriz de Enteros [4, 4]
    i, j : Entero
    esSimetrica : Logico

Inicio
  // Asumimos que la matriz ya tiene datos
  esSimetrica <- Verdadero

  Para i <- 1 Hasta 4 Hacer
    Para j <- 1 Hasta 4 Hacer
      // Comparamos el espejo a través de la diagonal principal
      Si M[i, j] <> M[j, i] Entonces
        esSimetrica <- Falso
      Fin Si
    Fin Para
  Fin Para

  Si esSimetrica = Verdadero Entonces
    Escribir "La matriz SÍ es simétrica."
  Sino
    Escribir "La matriz NO es simétrica."
  Fin Si
Fin
\`\`\`

---

## 3. La Torre de Ajedrez

**Planteamiento:** Suponga que tenemos un tablero de ajedrez (una matriz de 8x8) inicialmente lleno de espacios en blanco. La pieza de la Torre está colocada en la posición `[5, 5]`. Muestre todas las casillas que la Torre alumbraría (es decir, donde se puede mover). Coloque una `'T'` donde está la torre, y marque con una `'O'` las casillas hacia donde se puede mover (la misma fila completa y la misma columna completa).

\`\`\`text
Algoritmo Torre_Ajedrez
Declaracion
  Constantes
    N = 8
  Variables
    Tablero : matriz de Caracteres [N, N]
    i, j : Entero

Inicio
  // 1. Inicializar el tablero en blanco
  Para i <- 1 Hasta N Hacer
    Para j <- 1 Hasta N Hacer
      Tablero[i, j] <- ' '
    Fin Para
  Fin Para

  // 2. Colocar la Torre
  Tablero[5, 5] <- 'T'

  // 3. Marcar los movimientos permitidos (Fila 5 y Columna 5)
  Para i <- 1 Hasta N Hacer
    // Marcamos la columna 5
    Si i <> 5 Entonces
      Tablero[i, 5] <- 'O'
    Fin Si
    
    // Marcamos la fila 5
    Si i <> 5 Entonces
      Tablero[5, i] <- 'O'
    Fin Si
  Fin Para

  // Mostrar Tablero
  Para i <- 1 Hasta N Hacer
    Para j <- 1 Hasta N Hacer
      Escribir Tablero[i, j] // Sin saltar de línea idealmente
    Fin Para
  Fin Para
Fin
\`\`\`

---

## 4. El Caballo de Ajedrez

**Planteamiento:** Usando un tablero de ajedrez de 8x8 en blanco, coloque un Caballo (`'C'`) en la posición `[4, 4]`. Marque con una `'X'` todas las casillas a las que el caballo puede saltar (recuerde que el caballo se mueve en forma de "L": dos casillas en una dirección y una en la perpendicular).

\`\`\`text
Algoritmo Caballo_Ajedrez
Declaracion
  Constantes
    N = 8
  Variables
    Tablero : matriz de Caracteres [N, N]
    i, j, fC, cC : Entero

Inicio
  // 1. Inicializar el tablero
  Para i <- 1 Hasta N Hacer
    Para j <- 1 Hasta N Hacer
      Tablero[i, j] <- ' '
    Fin Para
  Fin Para

  // Posición del caballo
  fC <- 4
  cC <- 4
  Tablero[fC, cC] <- 'C'

  // El caballo tiene 8 posibles movimientos en L. 
  // Evaluamos cada uno y si está dentro de los límites del tablero (1 a 8), lo marcamos.

  // 2 Arriba
  Si (fC - 2 >= 1) Y (cC - 1 >= 1) Entonces Tablero[fC - 2, cC - 1] <- 'X'
  Si (fC - 2 >= 1) Y (cC + 1 <= N) Entonces Tablero[fC - 2, cC + 1] <- 'X'

  // 2 Abajo
  Si (fC + 2 <= N) Y (cC - 1 >= 1) Entonces Tablero[fC + 2, cC - 1] <- 'X'
  Si (fC + 2 <= N) Y (cC + 1 <= N) Entonces Tablero[fC + 2, cC + 1] <- 'X'

  // 2 Izquierda
  Si (fC - 1 >= 1) Y (cC - 2 >= 1) Entonces Tablero[fC - 1, cC - 2] <- 'X'
  Si (fC + 1 <= N) Y (cC - 2 >= 1) Entonces Tablero[fC + 1, cC - 2] <- 'X'

  // 2 Derecha
  Si (fC - 1 >= 1) Y (cC + 2 <= N) Entonces Tablero[fC - 1, cC + 2] <- 'X'
  Si (fC + 1 <= N) Y (cC + 2 <= N) Entonces Tablero[fC + 1, cC + 2] <- 'X'
Fin
\`\`\`

### Diseño
- Instanciar laboratorios visuales con **grillas interactivas**.
- **Laberinto:** Una grilla 5x5 que tenga un botón de "Iniciar Rescate". Al pulsarlo, debe recorrer visualmente pintando de un color el camino de búsqueda, deteniéndose en la casilla `X` y resaltándola de verde.
- **Simetría:** Una grilla 4x4 que muestre una animación rebotando entre la posición `[i,j]` y su espejo `[j,i]`.
- **Ajedrez (Torre y Caballo):** Dos grillas de 8x8 diseñadas visualmente como un tablero de ajedrez (blanco/negro). Debe mostrar una animación de la pieza posicionándose en el centro y luego propagando los caracteres `O` o `X` en las celdas de destino permitidas.
