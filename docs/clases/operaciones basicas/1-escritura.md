# Escritura (Mostrar Datos)

La **escritura** es el acto de mostrar información por pantalla para que el usuario pueda estar informado de lo que el software que estamos creando está realizando o necesita. Es la principal forma en que nuestro algoritmo se comunica con el exterior.

A continuación, veremos cómo funciona la escritura mediante distintos ejercicios prácticos. En la pantalla verás el código a la derecha y el resultado en una consola (como un terminal de Windows) a la izquierda.

## Ejercicio 1: Un simple Hola Mundo

El clásico primer ejercicio en programación. Simplemente le decimos al computador que muestre un texto en la pantalla.

```pseudocodigo
Algoritmo HolaMundo
    Escribir "Hola mundo"
FinAlgoritmo
```

## Ejercicio 2: Uso de Constantes

Podemos mostrar textos y también combinarlos (concatenarlos). En este ejercicio no usamos variables, solo constantes de texto que unimos en una sola instrucción.

```pseudocodigo
Algoritmo SaludoConstante
    Escribir "Hola " + "Bienvenido al sistema " + "de aprendizaje."
FinAlgoritmo
```

> **Nota:** El signo `+` nos permite unir (concatenar) distintos fragmentos de texto antes de mostrarlos en pantalla.

## Ejercicio 3: Combinando Textos y Números

En este último ejercicio, usaremos varias instrucciones `Escribir` combinando textos, concatenación y números de una forma ingeniosa.

```pseudocodigo
Algoritmo MuestraDatos
    Escribir "--- SISTEMA DE INFORMACIÓN ---"
    Escribir "El año actual es: " + 2026
    Escribir "Temperatura: " + 25 + " grados"
FinAlgoritmo
```

## Diseño

- Crear un componente de "Visual Code Tracer".
- **Layout:** Dividir en dos columnas. Izquierda: Consola negra tipo terminal de Windows. Derecha: Código fuente.
- **Interactividad:**
  - Botón de "Play" para ejecutar línea a línea.
  - Al pasar el puntero (hover) sobre cada línea de código en la derecha, la consola en la izquierda debe mostrar el resultado hasta esa línea seleccionada.
- **Estética:** Interfaz muy bonita, interactiva, animaciones fluidas al escribir texto en la consola. Diseño dinámico y premium.
