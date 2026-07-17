# Introducción a los Arreglos Unidimensionales

## Motivación

En el ámbito de la resolución de problemas mediante la programación, con frecuencia nos encontramos con la necesidad de almacenar y procesar múltiples valores bajo un mismo contexto. Imagine, por ejemplo, una competencia deportiva en la cual participan 10 personas y requerimos almacenar las puntuaciones de cada una de ellas. Con las herramientas básicas de variables primitivas que conocemos hasta ahora, nos veríamos obligados a declarar diez variables distintas (por ejemplo: `puntos1`, `puntos2`, `puntos3`, ..., `puntos10`).

Al analizar esta aproximación, se hace evidente que lo único que diferencia a una variable de otra es el número identificador al final de su nombre. Además, si quisiéramos solicitar los datos al usuario en un formato convencional, tendríamos que repetir las instrucciones secuencialmente:

```pseudocodigo
Escribir "Indique los puntos del jugador 1: "
Leer puntos1
Escribir "Indique los puntos del jugador 2: "
Leer puntos2
// ... y así sucesivamente
```

Este enfoque manual resulta ineficiente y sumamente engorroso a medida que crece el volumen de información. En escenarios reales del desarrollo de software, las colecciones de datos no se limitan a 10 elementos; pueden alcanzar los 20,000 competidores o requerir el almacenamiento simultáneo de flujos masivos de datos.

Para resolver esta problemática de escalabilidad, la programación introduce las estructuras de colecciones de datos. Una de las colecciones más simples y fundamentales que existen son los **arreglos** (conocidos en la bibliografía técnica como *arrays* o vectores). Aunque los arreglos pueden estructurarse en múltiples dimensiones, en esta seccion nos enfocaremos exclusivamente en el estudio de los **arreglos estáticos unidimensionales**, caracterizados por tener una única dimensión y un límite de tamaño fijo y definido desde su creación.
