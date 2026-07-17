# Definición y Uso de Arreglos

## 1. Definición Formal de un Arreglo

Desde una perspectiva formal, un arreglo se define como una **colección contigua de datos del mismo tipo que posee un tamaño fijo y predeterminado**. Esto significa que un solo arreglo no puede mezclar tipos de datos distintos (por ejemplo, enteros con cadenas de texto) y su capacidad no puede alterarse dinámicamente durante la ejecución del programa.

Para declarar un arreglo en nuestro pseudocódigo estándar UDONE, debemos asignarlo a una variable especificando el tipo de dato de sus elementos y delimitando su tamaño máximo entre corchetes. La sintaxis correspondiente es la siguiente:

```pseudocodigo
Variables:
    x: Arreglo de Real[10]
```

> **[Instrucción de Diseño para Antigravity]**
> Por favor, genera un gráfico o diagrama que represente un arreglo unidimensional con 10 casillas dispuestas de forma horizontal. El diseño debe mostrar de manera clara cómo algunas casillas pueden estar vacías o contener valores numéricos reales por defecto. Asegúrate de rotular explícitamente los índices numéricos debajo de cada una de las casillas, abarcando correlativamente del 1 al 10.

Al asignar un tamaño de 10 a un arreglo de números reales, el sistema reserva internamente una secuencia de 10 casillas de memoria. En muchos lenguajes de programación estructurados, estas posiciones se inicializan automáticamente en cero (0), aunque existen excepciones importantes (como en ciertas configuraciones de Java o C++) donde el arreglo contiene valores residuales de memoria ("basura") y se requiere una inicialización explícita por parte del desarrollador.

Para manipular el contenido del arreglo y asignar un valor a una casilla específica, utilizamos una instrucción de asignación directa referenciando la posición deseada dentro de los corchetes:

```pseudocodigo
x[3] <- 5
```

Mediante esta instrucción, el valor numérico 5 se almacena inmediatamente en la posición número 3 del arreglo `x`. Retomando el problema inicial de los competidores, esto nos permite sustituir las variables individuales por una única estructura indexada llamada `puntos`.

## 2. Restricciones Operacionales en Pseudocódigo

Es fundamental señalar que existen restricciones rigurosas sobre las operaciones permitidas con arreglos en el ámbito académico. A diferencia de lenguajes de alto nivel como Python, que permiten imprimir o leer un arreglo completo con un solo comando (por ejemplo, `print(x)`), en nuestro pseudocódigo **está estrictamente prohibido realizar lecturas o escrituras directas de arreglos completos**.

Por lo tanto, instrucciones del tipo `Escribir x` o `Leer x` se consideran conceptualmente incorrectas. Toda operación de entrada (lectura) o salida (escritura) debe realizarse de manera individualizada y obligatoria sobre **tipos de datos básicos**, accediendo elemento por elemento.

## 3. Acceso y Operaciones Secuenciales (Sin Ciclos)

A continuación, se presenta la implementación del algoritmo básico para solicitar y mostrar las puntuaciones de los competidores de manera explícita y lineal, sin hacer uso de estructuras de iteración, con el propósito de ilustrar el acceso directo a cada posición de memoria.

```pseudocodigo
Algoritmo Registro_Puntuaciones_Secuencial
Variables:
    puntos: Arreglo de Real[10]
Inicio
    // Entrada de datos manual posición por posición
    Escribir "Indique los puntos del jugador 1: "
    Leer puntos[1]
    Escribir "Indique los puntos del jugador 2: "
    Leer puntos[2]
    Escribir "Indique los puntos del jugador 3: "
    Leer puntos[3]
    Escribir "Indique los puntos del jugador 4: "
    Leer puntos[4]
    Escribir "Indique los puntos del jugador 5: "
    Leer puntos[5]
    Escribir "Indique los puntos del jugador 6: "
    Leer puntos[6]
    Escribir "Indique los puntos del jugador 7: "
    Leer puntos[7]
    Escribir "Indique los puntos del jugador 8: "
    Leer puntos[8]
    Escribir "Indique los puntos del jugador 9: "
    Leer puntos[9]
    Escribir "Indique los puntos del jugador 10: "
    Leer puntos[10]
    
    // Salida de datos manual de las puntuaciones registradas
    Escribir "Las puntuaciones ingresadas son:"
    Escribir "Jugador 1: ", puntos[1]
    Escribir "Jugador 2: ", puntos[2]
    Escribir "Jugador 3: ", puntos[3]
    Escribir "Jugador 4: ", puntos[4]
    Escribir "Jugador 5: ", puntos[5]
    Escribir "Jugador 6: ", puntos[6]
    Escribir "Jugador 7: ", puntos[7]
    Escribir "Jugador 8: ", puntos[8]
    Escribir "Jugador 9: ", puntos[9]
    Escribir "Jugador 10: ", puntos[10]
Fin
```

> **[Instrucción de Diseño para Antigravity]**
> Diseña un esquema práctico en forma de cuadrícula de libro de texto basado en el ejercicio anterior. La cuadrícula debe mostrar de manera didáctica el estado dinámico del arreglo. Es requisito indispensable que incorpores las posiciones numéricas debajo de cada celda. Antes de representar visualmente cada lectura o inserción de datos, aplica un resaltado de color distintivo sobre la casilla específica a la que se está accediendo, permitiendo al estudiante notar claramente cómo se resuelven las operaciones sobre los índices antes de alterar o consultar los datos correspondientes. Puedes utilizar el formato que usamos en los ciclos repetitivos para poder ver también el estado de las otras variables.
