# Ejercicios Resueltos: Arreglos Unidimensionales

En esta sección pondremos en práctica todo lo aprendido (lectura, escritura, ciclos, búsquedas y operaciones avanzadas) a través de una serie de problemas clásicos resueltos paso a paso.

## 1. Invertir un Arreglo
**Problema:** Dado un arreglo de 6 elementos, invertir el orden de sus datos de forma que el primer elemento pase a ser el último, el segundo el penúltimo, y así sucesivamente, utilizando un ciclo.

```pseudocodigo
Algoritmo InvertirArreglo
Variables:
    datos: arreglo [6] de Entero
    i, aux, limite, N: Entero

Inicio
    N <- 6
    datos[1] <- 10
    datos[2] <- 20
    datos[3] <- 30
    datos[4] <- 40
    datos[5] <- 50
    datos[6] <- 60

    // Para invertir, intercambiamos los extremos avanzando hasta la mitad
    limite <- N / 2 // División entera: 3
    
    Para i = 1 Hasta limite Inc 1
        aux <- datos[i]
        datos[i] <- datos[N - i + 1]
        datos[N - i + 1] <- aux
    Fin Para

    // Resultado: [60, 50, 40, 30, 20, 10]
Fin
```

## 2. Suma de Arreglos
**Problema:** Dados dos arreglos $A$ y $B$ de tamaño 5, crear un tercer arreglo $C$ que almacene en cada posición la suma de los elementos de las mismas posiciones de $A$ y $B$.

```pseudocodigo
Algoritmo SumaArreglos
Variables:
    A, B, C: arreglo [5] de Entero
    i: Entero

Inicio
    // Llenado ficticio
    A[1]<-1
    A[2] <- 3
    A[3] <- 5
    A[4] <- 7
    A[5] <- 9
    B[1]<-2
    B[2] <- 4
    B[3] <- 6
    B[4] <- 8
    B[5] <- 10

    Para i = 1 Hasta 5 Inc 1
        C[i] <- A[i] + B[i]
    Fin Para

    // C quedará: [3, 7, 11, 15, 19]
Fin
```

## 3. Mezclar Dos Arreglos (Concatenación)
**Problema:** Dados dos arreglos $A$ y $B$ de 5 posiciones cada uno, copiar sus elementos en un arreglo $C$ de 10 posiciones, de tal forma que primero queden los elementos de $A$ y luego los de $B$.

```pseudocodigo
Algoritmo MezclarArreglos
Variables:
    A, B: arreglo [5] de Entero
    C: arreglo [10] de Entero
    i, k: Entero

Inicio
    A[1]<-1
    A[2] <- 2
    A[3] <- 3
    A[4] <- 4
    A[5] <- 5
    B[1]<-6
    B[2] <- 7
    B[3] <- 8
    B[4] <- 9
    B[5] <- 10

    k <- 1 // Índice para el arreglo C

    // 1. Copiamos el arreglo A en C
    Para i = 1 Hasta 5 Inc 1
        C[k] <- A[i]
        k <- k + 1
    Fin Para

    // 2. Copiamos el arreglo B en C, a partir del índice k actual
    Para i = 1 Hasta 5 Inc 1
        C[k] <- B[i]
        k <- k + 1
    Fin Para

    // C quedará: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Fin
```

## 4. Mostrar Números Pares
**Problema:** Dado un arreglo numérico, buscar y mostrar únicamente aquellos valores que sean números pares.

```pseudocodigo
Algoritmo MostrarPares
Variables:
    numeros: arreglo [6] de Entero
    i: Entero

Inicio
    numeros[1] <- 15
    numeros[2] <- 22
    numeros[3] <- 8
    numeros[4] <- 33
    numeros[5] <- 10
    numeros[6] <- 7

    Escribir "Los números pares son:"
    Para i = 1 Hasta 6 Inc 1
        // Un número es par si el residuo de dividirlo entre 2 es cero (MOD)
        Si (numeros[i] MOD 2 = 0) Entonces
            Escribir numeros[i]
        Fin Si
    Fin Para
Fin
```

## 5. Arreglos Paralelos: Filtro de Edad
**Problema:** Dados tres arreglos paralelos que guardan la cédula, el nombre y la edad de 5 personas. Mostrar los datos completos **solo de las personas que sean mayores de edad** (> 18 años).

```pseudocodigo
Algoritmo FiltroMayoresDeEdad
Variables:
    cedulas: arreglo [5] de Entero
    nombres: arreglo [5] de Cadena
    edades: arreglo [5] de Entero
    i: Entero

Inicio
    cedulas[1] <- 111
    nombres[1] <- "Luis"
    edades[1] <- 15
    cedulas[2] <- 222
    nombres[2] <- "Ana"
    edades[2] <- 21
    cedulas[3] <- 333
    nombres[3] <- "Jose"
    edades[3] <- 19
    cedulas[4] <- 444
    nombres[4] <- "Mio"
    edades[4] <- 14
    cedulas[5] <- 555
    nombres[5] <- "Luz"
    edades[5] <- 25

    Escribir "Personas mayores de 18 años:"
    Para i = 1 Hasta 5 Inc 1
        Si (edades[i] > 18) Entonces
            Escribir "Cédula: ", cedulas[i], " | Nombre: ", nombres[i], " | Edad: ", edades[i]
        Fin Si
    Fin Para
Fin
```

## 6. Arreglos Paralelos: Búsqueda por Cédula
**Problema:** Utilizando los mismos arreglos paralelos, solicitar al usuario que ingrese un número de cédula y mostrar el nombre y edad de esa persona. Si la cédula no existe, indicarlo.

```pseudocodigo
Algoritmo BusquedaPorCedula
Variables:
    cedulas: arreglo [5] de Entero
    nombres: arreglo [5] de Cadena
    edades: arreglo [5] de Entero
    i, cedula_buscada, posicion: Entero
    encontrado: Logico

Inicio
    // Llenado ficticio...
    
    Escribir "Indique la cédula a buscar: "
    Leer cedula_buscada
    
    encontrado <- Falso
    posicion <- 0

    Para i = 1 Hasta 5 Inc 1
        Si (cedulas[i] = cedula_buscada) Entonces
            encontrado <- Verdadero
            posicion <- i
        Fin Si
    Fin Para

    Si (encontrado = Verdadero) Entonces
        Escribir "Persona encontrada:"
        Escribir "Nombre: ", nombres[posicion]
        Escribir "Edad: ", edades[posicion]
    Sino
        Escribir "La cédula ingresada no está registrada."
    Fin Si
Fin
```

---

## 🔥 Ejercicios Recomendados Adicionales

A continuación te presentamos un par de problemas clásicos que suelen evaluarse frecuentemente en las asignaturas de programación básica:

### 7. Promedio y Valores Superiores
**Problema:** Dado un arreglo de 5 calificaciones, calcular el promedio del grupo y luego contar cuántos estudiantes obtuvieron una nota estrictamente superior al promedio general.

```pseudocodigo
Algoritmo SuperanElPromedio
Variables:
    notas: arreglo [5] de Real
    i, cantidad_superan: Entero
    suma, promedio: Real

Inicio
    notas[1] <- 10.0
    notas[2] <- 15.5
    notas[3] <- 12.0
    notas[4] <- 19.0
    notas[5] <- 09.5

    // 1. Calculamos la suma total
    suma <- 0
    Para i = 1 Hasta 5 Inc 1
        suma <- suma + notas[i]
    Fin Para

    // 2. Calculamos el promedio
    promedio <- suma / 5
    Escribir "El promedio general es: ", promedio

    // 3. Contamos cuántos superan el promedio
    cantidad_superan <- 0
    Para i = 1 Hasta 5 Inc 1
        Si (notas[i] > promedio) Entonces
            cantidad_superan <- cantidad_superan + 1
        Fin Si
    Fin Para

    Escribir "Estudiantes con nota superior al promedio: ", cantidad_superan
Fin
```

### 8. Frecuencia de un Valor
**Problema:** Dado un arreglo numérico y un número ingresado por el usuario, contar cuántas veces se repite (frecuencia) dicho número dentro de la estructura.

```pseudocodigo
Algoritmo FrecuenciaNumero
Variables:
    datos: arreglo [7] de Entero
    i, numero_buscar, contador_frecuencia: Entero

Inicio
    datos[1] <- 5
    datos[2] <- 2
    datos[3] <- 5
    datos[4] <- 8
    datos[5] <- 5
    datos[6] <- 1
    datos[7] <- 5

    Escribir "Ingrese el número a buscar: "
    Leer numero_buscar
    
    contador_frecuencia <- 0

    Para i = 1 Hasta 7 Inc 1
        Si (datos[i] = numero_buscar) Entonces
            contador_frecuencia <- contador_frecuencia + 1
        Fin Si
    Fin Para

    Escribir "El número ", numero_buscar, " se repite ", contador_frecuencia, " veces."
Fin
```
