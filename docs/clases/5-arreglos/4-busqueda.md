# Búsqueda en Arreglos

## 1. Introducción
Una vez que tenemos información almacenada en un arreglo, la operación lógica siguiente es poder encontrar si un elemento específico existe dentro de él y, de ser así, en qué posición se encuentra. Existen múltiples técnicas para realizar esto, dependiendo de lo que busquemos y de si el arreglo está ordenado o no.

## 2. Búsqueda Secuencial (Lineal)
Es el método más sencillo y directo. Consiste en recorrer el arreglo desde la primera posición hasta la última, comparando cada elemento con el valor que estamos buscando.

* **Ventaja:** Funciona en cualquier arreglo, sin importar si los datos están ordenados o desordenados.
* **Desventaja:** Es ineficiente para arreglos muy grandes, ya que en el peor de los casos (el elemento no existe o está en la última posición), el algoritmo tendrá que revisar absolutamente todas las casillas.

### Ejercicio: Búsqueda Secuencial
```pseudocodigo
Algoritmo BusquedaSecuencial
Variables:
    edades: arreglo [5] de Entero
    i, valor_buscado, posicion: Entero
    encontrado: Logico

Inicio
    // Llenado (pueden estar desordenados)
    edades[1] <- 45
    edades[2] <- 22
    edades[3] <- 18
    edades[4] <- 30
    edades[5] <- 55

    valor_buscado <- 30
    encontrado <- Falso
    posicion <- 0

    Para i = 1 Hasta 5 Inc 1
        Si (edades[i] = valor_buscado) Entonces
            encontrado <- Verdadero
            posicion <- i
        Fin Si
    Fin Para

    Si (encontrado = Verdadero) Entonces
        Escribir "El valor fue encontrado en la posición: ", posicion
    Sino
        Escribir "El valor no existe en el arreglo."
    Fin Si
Fin
```

## 3. Búsqueda del Número Mayor
Otra operación sumamente común es encontrar cuál es el valor más grande dentro de un arreglo. Para hacer esto, no se requiere que el arreglo esté ordenado.

La lógica es simple:
1. Asumimos que el **primer elemento** del arreglo es el mayor (nuestro punto de partida).
2. Recorremos el resto del arreglo.
3. Si encontramos un número más grande que nuestro `mayor` actual, lo actualizamos.

### Ejercicio: Encontrar el Mayor
```pseudocodigo
Algoritmo BuscarMayor
Variables:
    notas: arreglo [5] de Real
    i: Entero
    mayor: Real

Inicio
    // Llenamos el arreglo con notas
    notas[1] <- 14.5
    notas[2] <- 19.0
    notas[3] <- 10.5
    notas[4] <- 16.0
    notas[5] <- 08.5

    // Asumimos que el primero es el mayor
    mayor <- notas[1]

    // Recorremos desde la segunda posición hasta el final
    Para i = 2 Hasta 5 Inc 1
        Si (notas[i] > mayor) Entonces
            mayor <- notas[i]
        Fin Si
    Fin Para

    Escribir "La nota más alta es: ", mayor
Fin
```

## 4. Búsqueda del Número Menor
La búsqueda del elemento más pequeño sigue exactamente la misma lógica que la búsqueda del mayor, pero invertimos la condición: buscamos aquellos que sean estrictamente menores.

### Ejercicio: Encontrar el Menor
```pseudocodigo
Algoritmo BuscarMenor
Variables:
    notas: arreglo [5] de Real
    i: Entero
    menor: Real

Inicio
    // Llenamos el arreglo con notas
    notas[1] <- 14.5
    notas[2] <- 19.0
    notas[3] <- 10.5
    notas[4] <- 16.0
    notas[5] <- 08.5

    // Asumimos que el primero es el menor
    menor <- notas[1]

    // Recorremos desde la segunda posición hasta el final
    Para i = 2 Hasta 5 Inc 1
        Si (notas[i] < menor) Entonces
            menor <- notas[i]
        Fin Si
    Fin Para

    Escribir "La nota más baja es: ", menor
Fin
```

## 5. Búsqueda Binaria
La búsqueda binaria es un algoritmo drásticamente más rápido y eficiente, pero tiene una **condición estricta: el arreglo debe estar previamente ordenado.**

En lugar de revisar posición por posición, la búsqueda binaria evalúa el elemento que se encuentra justo en la **mitad** del arreglo:
1. Si el valor buscado es igual al elemento central, terminamos.
2. Si el valor buscado es menor que el elemento central, sabemos que debe estar en la mitad izquierda (porque el arreglo está ordenado). Descartamos por completo la mitad derecha.
3. Si el valor buscado es mayor, sabemos que debe estar en la mitad derecha.
4. Repetimos el proceso con la mitad restante hasta encontrarlo o hasta que no queden elementos.

### Ejercicio: Implementación de Búsqueda Binaria
En el siguiente ejemplo usamos un ciclo `Mientras` porque no sabemos de antemano cuántas divisiones tendremos que hacer.

```pseudocodigo
Algoritmo BusquedaBinaria
Variables:
    edades: arreglo [7] de Entero
    valor_buscado, centro, limite_inf, limite_sup: Entero
    encontrado: Logico

Inicio
    // El arreglo DEBE estar ordenado
    edades[1] <- 10
    edades[2] <- 15
    edades[3] <- 22
    edades[4] <- 30
    edades[5] <- 45
    edades[6] <- 50
    edades[7] <- 60

    valor_buscado <- 45
    encontrado <- Falso
    
    limite_inf <- 1
    limite_sup <- 7

    Mientras (limite_inf <= limite_sup Y encontrado = Falso) Hacer
        centro <- (limite_inf + limite_sup) / 2  // División entera
        
        Si (edades[centro] = valor_buscado) Entonces
            encontrado <- Verdadero
        Sino
            Si (edades[centro] < valor_buscado) Entonces
                // Descartamos la mitad izquierda
                limite_inf <- centro + 1
            Sino
                // Descartamos la mitad derecha
                limite_sup <- centro - 1
            Fin Si
        Fin Si
    Fin Mientras

    Si (encontrado = Verdadero) Entonces
        Escribir "El valor fue encontrado en la posición: ", centro
    Sino
        Escribir "El valor no existe."
    Fin Si
Fin
```

> [!IMPORTANT]
> **Eficiencia:** Para un arreglo de un millón (1,000,000) de elementos, la búsqueda secuencial podría necesitar hasta 1,000,000 de comparaciones. ¡La búsqueda binaria encontraría la respuesta en un máximo de **20 comparaciones**!
