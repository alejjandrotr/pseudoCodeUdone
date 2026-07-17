# Introducción a las Matrices

La estructura de datos más básica que hemos estudiado es el **Arreglo**. Como ya sabemos, un arreglo soporta cualquier tipo de dato primitivo (enteros, reales, caracteres, etc.). Sin embargo, en realidad, un arreglo en sí mismo es un tipo de dato estructurado. Por lo tanto, si un arreglo puede guardar cualquier tipo de dato, ¿podría guardar otro arreglo dentro de sí?

La respuesta es **sí**. Podríamos definir un arreglo que tiene dentro otro arreglo, y así sucesivamente. A esto lo conocemos como **Arreglos Multidimensionales** (arreglos de varias dimensiones).

En este curso, nos enfocaremos en estudiar únicamente los arreglos de **dos dimensiones**, a los cuales conocemos comúnmente como **Matrices**.

## ¿Qué es una Matriz?

Una matriz no es más que una colección de datos del mismo tipo, pero alojados en un arreglo multidimensional. 

Para representarlo visualmente de forma más estética y fácil de entender, en lugar de imaginar "un arreglo dentro de otro arreglo", solemos dibujarlo como una **cuadrícula o grilla** (muy parecida a las hojas de cálculo de Excel).

Al trabajar con matrices, ya no nos basta con una sola coordenada para ubicar un dato. Ahora vamos a tener **dos índices**:
1. El **índice de la fila** (el primer número).
2. El **índice de la columna** (el segundo número).

Es decir, dentro de una misma fila vamos a tener múltiples casillas que se diferencian por su posición en la columna.

## Declaración de una Matriz en Pseudocódigo

Cabe destacar que las matrices se definen indicando los límites de ambas dimensiones separados por una **coma** (`,`). 

> [!WARNING]
> En la Universidad de Oriente (UDONE), los índices de la matriz deben estar separados obligatoriamente por una coma. No se pueden utilizar los dos puntos (`:`) ni colocar corchetes separados (ej. `[4][4]`) como se hace en algunos lenguajes de programación. Debemos mantener estrictamente el formato `[filas, columnas]`.

**Sintaxis de Declaración:**
\`\`\`text
<nombre_variable> : matriz de <Tipo_Dato> [Límite_Filas, Límite_Columnas]
\`\`\`

**Ejemplo:**
\`\`\`text
Declaracion
  Variables
    MiMatriz : matriz de Reales [4, 4]
    TablaPrecios : matriz de Enteros [3, 5]
\`\`\`
En el ejemplo anterior, `MiMatriz` es una cuadrícula de 4 filas por 4 columnas (16 posiciones en total).

## Asignación, Lectura y Escritura

Al igual que ocurre con los arreglos unidimensionales, **no se puede escribir ni leer una matriz completa directamente**. No podemos hacer algo como `Leer MiMatriz`.

Para poder escribir, leer o asignar un valor dentro de una matriz, debemos señalar **exactamente una posición específica**, indicando ambos índices (fila y columna).

### Ejemplos Prácticos

**1. Asignación directa:**
\`\`\`text
Inicio
  // Asignamos el valor 15.5 en la fila 1, columna 2
  MiMatriz[1, 2] <- 15.5
  
  // Guardamos un precio en la fila 3, columna 5
  TablaPrecios[3, 5] <- 1200
Fin
\`\`\`

**2. Lectura desde el teclado:**
\`\`\`text
Inicio
  Escribir "Ingrese el valor para la primera celda (fila 1, col 1):"
  Leer MiMatriz[1, 1]
Fin
\`\`\`

**3. Escritura en pantalla:**
\`\`\`text
Inicio
  Escribir "El precio en la última celda es: ", TablaPrecios[3, 5]
Fin
\`\`\`


### Diseño
- Añadir una representación visual interactiva de una Matriz Llena (ej. 4x4 o 5x5).
- Cuando el estudiante pase el ratón (hover) sobre cualquier espacio de la matriz, la interfaz debe señalar e iluminar qué número representa "i" (la fila) y qué número representa "j" (la columna), mostrando las coordenadas exactas de esa celda.
