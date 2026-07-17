# Arreglos Paralelos y Operaciones Avanzadas

## 1. Arreglos Paralelos
En el mundo real, los datos suelen estar estrechamente relacionados. Por ejemplo, un estudiante tiene un nombre, una edad y una nota. Si aún no conocemos estructuras avanzadas (como *Registros* o *Objetos*), la forma estándar de manejar esta pequeña "base de datos" en programación estructurada es utilizando **Arreglos Paralelos**.

**¿Qué son?**
Son dos o más arreglos del **mismo tamaño** que utilizan el **mismo índice** para relacionar la información de forma lógica. 

Si tenemos `nombres[5]` y `notas[5]`, entendemos lógicamente que la nota almacenada en la casilla `notas[3]` le pertenece exactamente al estudiante cuyo nombre está guardado en `nombres[3]`.

### Ejercicio: Imprimir datos de Arreglos Paralelos
```pseudocodigo
Algoritmo ArreglosParalelos
Variables:
    nombres: arreglo [3] de Cadena
    notas: arreglo [3] de Real
    i: Entero

Inicio
    // Llenado paralelo
    nombres[1] <- "Ana"
    notas[1] <- 18.5

    nombres[2] <- "Luis"
    notas[2] <- 14.0

    nombres[3] <- "Carlos"
    notas[3] <- 19.5

    Escribir "Listado de Estudiantes y sus Calificaciones:"
    Para i = 1 Hasta 3 Inc 1
        Escribir "Estudiante: ", nombres[i], " - Nota: ", notas[i]
    Fin Para
Fin
```

> [!TIP]
> **Ordenamiento Paralelo:** Si necesitas ordenar a los estudiantes por nota (por ejemplo, con el Método de la Burbuja para que queden de mayor a menor), al momento de intercambiar `notas[j]` con `notas[j+1]`, **también debes intercambiar obligatoriamente al mismo tiempo** los valores de `nombres[j]` con `nombres[j+1]`. De lo contrario, ordenarías las notas, pero se las asignarías a las personas equivocadas.

---

## 2. Operaciones de Desplazamiento
Hasta ahora hemos asignado o reemplazado (sobrescrito) valores fijos en las posiciones de los arreglos. Pero, ¿qué pasa si queremos **Insertar** un elemento nuevo justo en el medio sin borrar el que ya existe, o **Eliminar** un dato y que no quede una casilla nula dividiendo la información? Para esto usamos **desplazamientos de memoria**.

### 2.1. Inserción de un Elemento
Para insertar un dato en una posición específica $P$, primero debemos "hacerle espacio". Esto significa mover todos los elementos desde la última posición ocupada hasta $P$ un paso hacia la derecha.
*(Nota: Para poder insertar, el arreglo físico no debe estar completamente lleno, o el último dato se perderá o el programa fallará por desbordamiento).*

```pseudocodigo
Algoritmo InsertarEnArreglo
Variables:
    datos: arreglo [6] de Entero
    i, pos_insertar, nuevo_valor, ocupados: Entero

Inicio
    // Tenemos un arreglo con capacidad para 6, pero solo 4 están lógicamente ocupados
    datos[1] <- 10
    datos[2] <- 20
    datos[3] <- 30
    datos[4] <- 40
    ocupados <- 4

    pos_insertar <- 2
    nuevo_valor <- 15

    // 1. Desplazamiento hacia la derecha (empezando obligatoriamente desde el final)
    // El paso es negativo para no sobreescribir los datos al rodarlos
    Para i = ocupados Hasta pos_insertar Dec 1
        datos[i + 1] <- datos[i]
    Fin Para

    // 2. Insertamos el nuevo valor en el "hueco" que creamos
    datos[pos_insertar] <- nuevo_valor
    
    // 3. Ahora tenemos un elemento más
    ocupados <- ocupados + 1

    // Resultado: [10, 15, 20, 30, 40, Vacío]
Fin
```

### 2.2. Eliminación de un Elemento
Para eliminar un dato en una posición $P$, hacemos el proceso inverso: movemos todos los elementos que están a la derecha de $P$ un paso hacia la izquierda, sobrescribiendo o "pisando" el valor que queremos eliminar. 

```pseudocodigo
Algoritmo EliminarDeArreglo
Variables:
    datos: arreglo [6] de Entero
    i, pos_eliminar, ocupados: Entero

Inicio
    datos[1] <- 10
    datos[2] <- 15
    datos[3] <- 20
    datos[4] <- 30
    datos[5] <- 40
    ocupados <- 5

    pos_eliminar <- 2 // Queremos eliminar el '15'

    // 1. Desplazamiento hacia la izquierda
    Para i <- pos_eliminar Hasta ocupados - 1 Con Paso 1 Hacer
        datos[i] <- datos[i + 1]
    Fin Para

    // 2. Ahora tenemos un elemento menos lógicamente
    ocupados <- ocupados - 1

    // Resultado lógico: [10, 20, 30, 40]
Fin
```
