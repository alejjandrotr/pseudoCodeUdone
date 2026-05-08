# Lectura (Pedir Datos al Usuario)

Cuando utilizamos la instrucción **leer**, estamos dándole valor a una variable de una forma muy diferente a la asignación directa. Esta vez, los valores no son controlados directamente por nosotros en el código, sino que son proporcionados por el usuario a través del teclado.

Esto permite la modificación de lo que ocurre dentro de nuestra aplicación y la hace mucho más dinámica, ya que empezamos a interactuar activamente con el usuario.

## Ejercicio 1: Cálculo de Velocidad Interactivo

Vamos a repetir el ejercicio de la velocidad, pero esta vez los valores de distancia y tiempo los pediremos al usuario.

```pseudocodigo
Algoritmo VelocidadLectura
    Escribir "Ingrese la distancia recorrida (km):"
    Leer distancia
    Escribir "Ingrese el tiempo transcurrido (h):"
    Leer tiempo
    velocidad <- distancia / tiempo
    Escribir "La velocidad calculada es: " + velocidad + " km/h"
FinAlgoritmo
```

## Ejercicio 2: Área de un Cuadrado Interactivo

En este ejercicio, le pediremos al usuario que ingrese la medida del lado del cuadrado.

```pseudocodigo
Algoritmo AreaCuadradoLectura
    Escribir "Ingrese el lado del cuadrado:"
    Leer lado
    area <- lado * lado
    Escribir "El área del cuadrado es: " + area
FinAlgoritmo
```

## Ejercicio 3: Registro de Persona

Pediremos el nombre y la cédula directamente al usuario.

```pseudocodigo
Algoritmo RegistroPersonaLectura
    Escribir "Ingrese su nombre:"
    Leer nombre
    Escribir "Ingrese su cédula:"
    Leer cedula
    Escribir "Registro completado para: " + nombre + " - " + cedula
FinAlgoritmo
```

## Diseño

- Crear un componente interactivo para la instrucción **Leer**.
- **Interactividad:** 
  - Cuando la ejecución llega a una línea `Leer`, debe pausarse y presentar un **input (campo de texto)** en la consola para que el usuario pueda teclear un valor.
  - Si el usuario lo prefiere, puede establecer valores por defecto o dejarlos en blanco para poder comentar o probar más rápido, pero debe sentirse como una consola real esperando input.
- **Flujo:** La ejecución continúa solo después de que el usuario presione Enter o envíe el valor.
- **Estética:** Clara indicación visual de que la aplicación está "esperando" entrada de datos (cursor parpadeando, animaciones sutiles).
