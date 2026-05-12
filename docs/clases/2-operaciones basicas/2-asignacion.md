# Asignación (Guardar Datos)

La **asignación** es el proceso de dar un valor a las variables. A diferencia de las constantes, una variable es un espacio en la memoria donde guardamos un valor que queremos utilizar, un valor que hayamos calculado a través de algún proceso, o simplemente información temporal.

A continuación, veremos cómo cambia el valor de las variables dentro de un algoritmo mientras este se ejecuta.

## Ejercicio 1: Área de un Cuadrado

Calculemos el área de un cuadrado asignando un valor al lado y luego calculando el resultado.

```pseudocodigo
Algoritmo AreaCuadrado
    lado <- 5
    area <- lado * lado
    Escribir "El área del cuadrado es: " + area
FinAlgoritmo
```

## Ejercicio 2: Cálculo de Velocidad

La velocidad se calcula dividiendo la distancia entre el tiempo. Vamos a asignar valores a estas variables y calcular el resultado.

```pseudocodigo
Algoritmo CalculoVelocidad
    distancia <- 100
    tiempo <- 2
    velocidad <- distancia / tiempo
    Escribir "La velocidad es: " + velocidad + " km/h"
FinAlgoritmo
```

## Ejercicio 3: Guardar Nombre y Cédula

Las variables no solo guardan números, también pueden guardar texto.

```pseudocodigo
Algoritmo RegistroPersona
    nombre <- "Juan Pérez"
    cedula <- "V-12345678"
    Escribir "Registrado: " + nombre + " con CI: " + cedula
FinAlgoritmo
```

## Diseño

- Crear un componente visual para **ver las variables en memoria**.
- **Layout:** Mostrar el código junto con un panel de "Memoria" o "Variables" que indique el estado actual de cada variable.
- **Interactividad:**
  - Animaciones con pequeño delay para ver cómo se van moviendo y actualizando los valores de las variables al darle Play o al hacer hover sobre las líneas.
  - Permitir al usuario **modificar** los valores de las variables antes de correr el ejercicio para ver cómo cambia el resultado.
- **Estética:** Moderno, representaciones visuales claras de las "cajas" de variables.
