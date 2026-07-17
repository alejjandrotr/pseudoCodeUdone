# Ordenamiento de Arreglos

## 1. Introducción al Ordenamiento
El ordenamiento es una de las operaciones más comunes y fundamentales en el procesamiento de datos. Consiste en organizar los elementos de un arreglo en un orden específico, generalmente de forma ascendente (de menor a mayor) o descendente (de mayor a menor). 

Tener los datos ordenados no solo facilita la visualización para el usuario final, sino que es un requisito indispensable para aplicar algoritmos de búsqueda más eficientes, como la Búsqueda Binaria.

## 2. El Método de la Burbuja (Bubble Sort)
Existen múltiples algoritmos de ordenamiento (Selección, Inserción, Quicksort, etc.). Sin embargo, el **Método de la Burbuja** es el más clásico y sencillo de comprender para iniciarse en la manipulación de arreglos.

Su lógica se basa en recorrer el arreglo repetidas veces, comparando elementos adyacentes (vecinos). Si el elemento actual es mayor que el siguiente, se intercambian sus posiciones. Este proceso se repite hasta que el arreglo completo esté ordenado (los elementos más grandes "burbujean" hacia el final).

### Funcionamiento Paso a Paso
Supongamos que tenemos el arreglo: `[5, 3, 8, 1]`
1. **Primera pasada:**
   - Compara 5 y 3 (5 > 3). Intercambia: `[3, 5, 8, 1]`
   - Compara 5 y 8 (5 < 8). No hace nada: `[3, 5, 8, 1]`
   - Compara 8 y 1 (8 > 1). Intercambia: `[3, 5, 1, 8]`
   *(El 8 ya está en su posición final).*
2. **Segunda pasada:**
   - Compara 3 y 5 (3 < 5). No hace nada.
   - Compara 5 y 1 (5 > 1). Intercambia: `[3, 1, 5, 8]`
   *(El 5 ya está en su posición).*
3. Y así sucesivamente hasta que ninguna pareja de vecinos necesite intercambiarse.

## 3. Ejercicio: Implementación del Ordenamiento Burbuja
A continuación, se muestra el pseudocódigo estándar para ordenar un arreglo de tamaño $N$ de forma ascendente. Observa el uso de una variable temporal auxiliar `aux` para poder realizar el intercambio de valores sin perder los datos.

```pseudocodigo
Algoritmo OrdenamientoBurbuja
Variables:
    numeros: arreglo [5] de Entero
    i, j, aux, N: Entero

Inicio
    N <- 5
    // Llenamos el arreglo con datos desordenados
    numeros[1] <- 15
    numeros[2] <- 3
    numeros[3] <- 8
    numeros[4] <- 1
    numeros[5] <- 9

    // Ciclo externo: controla las pasadas totales
    Para i <- 1 Hasta N - 1 Con Paso 1 Hacer
        // Ciclo interno: compara vecinos
        Para j <- 1 Hasta N - i Con Paso 1 Hacer
            Si (numeros[j] > numeros[j + 1]) Entonces
                // Intercambio usando variable auxiliar
                aux <- numeros[j]
                numeros[j] <- numeros[j + 1]
                numeros[j + 1] <- aux
            Fin Si
        Fin Para
    Fin Para

    // Escritura del arreglo ordenado
    Escribir "Arreglo ordenado:"
    Para i = 1 Hasta N Inc 1
        Escribir numeros[i]
    Fin Para
Fin
```

> [!TIP]
> **Optimización del ciclo interno:** Observa que el ciclo interno `j` termina en `N - i`. Esto se debe a que en cada pasada exterior `i`, el elemento más grande queda fijo en su posición correcta al final, por lo que no hace falta volver a compararlo en las pasadas subsiguientes.

## 4. Ordenamiento por Selección (Selection Sort)
Este algoritmo divide el arreglo en dos partes: una ordenada y otra desordenada. En cada pasada, busca el elemento más pequeño en la parte desordenada y lo intercambia con el primer elemento desordenado, expandiendo así la parte ordenada.

### Ejercicio: Implementación de Selección
```pseudocodigo
Algoritmo OrdenamientoSeleccion
Variables:
    numeros: arreglo [5] de Entero
    i, j, pos_menor, aux, N: Entero

Inicio
    N <- 5
    // Asume que el arreglo ya está lleno con datos desordenados
    
    Para i <- 1 Hasta N - 1 Con Paso 1 Hacer
        pos_menor <- i
        
        // Buscamos el menor en el resto del arreglo
        Para j <- i + 1 Hasta N Con Paso 1 Hacer
            Si (numeros[j] < numeros[pos_menor]) Entonces
                pos_menor <- j
            Fin Si
        Fin Para
        
        // Si encontramos uno menor diferente al actual, intercambiamos
        Si (pos_menor <> i) Entonces
            aux <- numeros[i]
            numeros[i] <- numeros[pos_menor]
            numeros[pos_menor] <- aux
        Fin Si
    Fin Para
Fin
```

## 5. Ordenamiento por Inserción (Insertion Sort)
La inserción funciona de forma similar a como ordenaríamos cartas en nuestra mano. Toma un elemento de la parte desordenada y lo inserta en su posición correcta dentro de la parte que ya está ordenada, desplazando los demás elementos mayores hacia la derecha para hacerle espacio.

### Ejercicio: Implementación de Inserción
```pseudocodigo
Algoritmo OrdenamientoInsercion
Variables:
    numeros: arreglo [5] de Entero
    i, j, actual, N: Entero

Inicio
    N <- 5
    // Asume que el arreglo ya está lleno con datos desordenados
    
    Para i = 2 Hasta N Inc 1
        actual <- numeros[i]
        j <- i - 1
        
        // Desplazamos los elementos mayores hacia la derecha
        Mientras (j >= 1 Y numeros[j] > actual) Hacer
            numeros[j + 1] <- numeros[j]
            j <- j - 1
        Fin Mientras
        
        // Insertamos el elemento en su posición correcta
        numeros[j + 1] <- actual
    Fin Para
Fin
```
