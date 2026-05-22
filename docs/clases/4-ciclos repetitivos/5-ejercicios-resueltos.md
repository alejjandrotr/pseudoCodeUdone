# Práctica Guiada: Ejercicios Resueltos con Estructuras Repetitivas

En esta sección pondremos en práctica los conceptos teóricos de los capítulos anteriores (Contadores, Acumuladores, Condición de Salida y Banderas) mediante la resolución detallada de problemas algorítmicos. 

Analizar estos bloques de código es una fase fundamental para desarrollar el pensamiento lógico computacional antes de enfrentarse a los proyectos de evaluación de la asignatura.

---

> [!NOTE]
> ### Mensaje para los Estudiantes
> La programación **no se trata de memorizar estructuras o líneas de código de forma rígida**. El verdadero arte del programador consiste en comprender el flujo lógico de los algoritmos y entender con total precisión cómo interactúan los **contadores** y **acumuladores** dentro de la memoria RAM de la computadora con cada ciclo e iteración. 
> 
> Te invitamos a leer con calma los siguientes ejercicios, estudiar sus análisis y realizar pruebas de escritorio manuales en tu cuaderno.

---

## Ejercicio Práctico 1: Clasificador Estadístico de Números
**Enlace de Referencia:** [Ver video explicativo de apoyo](https://youtu.be/J6q6NchWwF8)

### Enunciado del Problema:
Proponga un algoritmo que lea una serie de números enteros a fin de determinar, al finalizar la lectura (una vez que el usuario introduzca el número $0$):
1.  El total de números procesados.
2.  La cantidad de números positivos.
3.  La cantidad de números negativos.
4.  La cantidad de números pares e impares.

### Análisis de la Solución:
*   **¿Por qué usamos un ciclo Mientras?** En este problema, la cantidad de números que el usuario va a ingresar es totalmente impredecible y desconocida (depende de cuándo decida teclear el número `0` para finalizar). Debido a esto, un ciclo **Para** es técnicamente inviable, ya que este último requiere conocer de antemano el número de vueltas. Usamos el ciclo **Mientras** para mantener el flujo activo mientras `numero <> 0`.
*   **Gestión de variables:** Las 5 variables auxiliares (`cont_procesados`, `cont_positivos`, `cont_negativos`, `cont_pares`, `cont_impares`) funcionan estrictamente como **contadores**, lo que significa que se inicializan obligatoriamente en $0$ y se incrementan linealmente sumando de 1 en 1 (`+ 1`) cada vez que un número cumple con la condición de su clasificación.

### Algoritmo en Pseudocódigo (UDONE):

```pseudocodigo
Algoritmo estadisticas_numeros
    // Declaración de variables
    Definir numero, cont_procesados, cont_positivos Como Entero
    Definir cont_negativos, cont_pares, cont_impares Como Entero
    
Inicio
    // Inicialización obligatoria de contadores (Regla de Oro)
    cont_procesados <- 0
    cont_positivos <- 0
    cont_negativos <- 0
    cont_pares <- 0
    cont_impares <- 0
    
    // Lectura inicial (Establece la condición de entrada al ciclo)
    Escribir "Indique el número a procesar (Ingrese 0 para salir): "
    Leer numero
    
    Mientras (numero <> 0) Hacer
        // Contamos un número procesado más
        cont_procesados <- cont_procesados + 1
        
        // Clasificación Positivo/Negativo
        Si (numero > 0) Entonces
            cont_positivos <- cont_positivos + 1
        SiNo
            cont_negativos <- cont_negativos + 1
        Fin Si
        
        // Clasificación Par/Impar usando el operador residuo (MOD)
        Si (numero MOD 2 = 0) Entonces
            cont_pares <- cont_pares + 1
        SiNo
            cont_impares <- cont_impares + 1
        Fin Si
        
        // Modificación de la variable de control para evitar un bucle infinito
        Escribir "Indique el siguiente número (Ingrese 0 para salir): "
        Leer numero
    Fin Mientras
    
    // Impresión de totalizadores estadísticos
    Escribir "Total de números procesados: " + cont_procesados
    Escribir "Total de números positivos: " + cont_positivos
    Escribir "Total de números negativos: " + cont_negativos
    Escribir "Total de números pares: " + cont_pares
    Escribir "Total de números impares: " + cont_impares
Fin Algoritmo
```

---

## Ejercicio Práctico 2: División Mediante Restas Sucesivas
**Enlace de Referencia:** [Ver video explicativo de apoyo](https://youtu.be/J6q6NchWwF8)

### Enunciado del Problema:
Desarrolle un algoritmo matemático que permita determinar el resultado de la división entera entre un número $P$ (dividendo) y un número $S$ (divisor), utilizando exclusivamente el método de restas sucesivas.

### Análisis de la Solución:
*   **Fundamento Matemático:** La división entera consiste en averiguar cuántas veces cabe el divisor dentro del dividendo. En lugar de usar el operador `/`, podemos restar sucesivamente el divisor al dividendo.
*   **Evaluación de la Condición:** El ciclo evalúa la condición `(dividendo >= divisor)`. Mientras el dividendo sea lo suficientemente grande, le restamos el valor del divisor y aumentamos nuestro contador de divisiones en 1. Cuando el dividendo se vuelve menor que el divisor, el ciclo se detiene; el valor restante en `dividendo` representa el **residuo** de la división y el contador representa el **cociente**.

### Algoritmo en Pseudocódigo (UDONE):

```pseudocodigo
Algoritmo division_por_restas
    // Declaración de variables
    Definir p, s, dividendo, divisor, cont_divisiones Como Entero
    
Inicio
    Escribir "Indique el dividendo (P): "
    Leer p
    Escribir "Indique el divisor (S): "
    Leer s
    
    // Resguardamos las variables originales para la impresión final
    dividendo <- p
    divisor <- s
    cont_divisiones <- 0
    
    // Ciclo de restas sucesivas
    Mientras (dividendo >= divisor) Hacer
        dividendo <- dividendo - divisor
        cont_divisiones <- cont_divisiones + 1
    Fin Mientras
    
    Escribir "El resultado de dividir " + p + " entre " + s + " es: " + cont_divisiones
    Escribir "El residuo de la división entera es: " + dividendo
Fin Algoritmo
```

---

## Ejercicio Práctico 3: Sistema de Calificaciones Universitarias
**Enlace de Referencia:** [Ver video explicativo de apoyo](https://youtu.be/J6q6NchWwF8)

### Enunciado del Problema:
Un profesor evalúa su asignatura mediante 3 exámenes (50% de la nota final), 3 proyectos (20%) y 1 trabajo (30%). Proponga un algoritmo que procese las notas de $N$ cantidad de estudiantes para calcular su nota definitiva. Adicionalmente, el sistema debe totalizar: la cantidad de estudiantes aprobados (nota final $\ge$ 4.5), reprobados, y estudiantes con derecho a recuperación (nota final $>$ 3.75).

### Análisis de la Solución:
*   **Anidación de Ciclos:** Para resolver este reto, anidamos varios ciclos **Para** dentro de un ciclo **Repetir**. Los ciclos *Para* son ideales para la lectura y cálculo de las notas de cada estudiante, ya que conocemos de antemano el número fijo de actividades (3 exámenes, 3 proyectos, 1 trabajo).
*   **¿Por qué Repetir al inicio?** El ciclo **Repetir** es perfecto en esta estructura porque garantiza que procesaremos obligatoriamente a un primer estudiante de manera incondicional. Al finalizar su cálculo, se le pregunta al profesor si desea continuar (`¿Desea procesar otro estudiante? (S/N)`), deteniendo el ciclo general en el momento en que se ingrese `N` o `n` (condición de parada).

### Algoritmo en Pseudocódigo (UDONE):

```pseudocodigo
Algoritmo calculo_de_notas
    // Constantes y Variables
    Definir cant_examenes, cant_proyectos, cant_trabajos Como Entero
    Definir valor_examen, valor_proyecto, valor_trabajo Como Real
    Definir nota, nota_final Como Real
    Definir cont_aprobados, cont_reprobados, cont_reparacion, i Como Entero
    Definir continuar Como Caracter
    
Inicio
    // Configuración de cantidades académicas fijas
    cant_examenes <- 3
    cant_proyectos <- 3
    cant_trabajos <- 1
    
    // Cálculo dinámico de pesos porcentuales individuales
    valor_examen <- 0.50 / cant_examenes
    valor_proyecto <- 0.20 / cant_proyectos
    valor_trabajo <- 0.30 / cant_trabajos
    
    // Inicialización de estadísticas de control global
    cont_aprobados <- 0
    cont_reprobados <- 0
    cont_reparacion <- 0
    
    Repetir
        // LA REGLA DE ORO: Se reinicia el acumulador de nota final para cada alumno
        nota_final <- 0
        
        // Ciclo Para para los Exámenes
        Para i <- 1 Hasta cant_examenes Hacer
            Escribir "Indique la nota del examen " + i + ": "
            Leer nota
            nota_final <- nota_final + (nota * valor_examen)
        Fin Para
        
        // Ciclo Para para los Proyectos
        Para i <- 1 Hasta cant_proyectos Hacer
            Escribir "Indique la nota del proyecto " + i + ": "
            Leer nota
            nota_final <- nota_final + (nota * valor_proyecto)
        Fin Para
        
        // Ciclo Para para los Trabajos
        Para i <- 1 Hasta cant_trabajos Hacer
            Escribir "Indique la nota del trabajo " + i + ": "
            Leer nota
            nota_final <- nota_final + (nota * valor_trabajo)
        Fin Para
        
        Escribir "La nota definitiva del estudiante es: " + nota_final
        
        // Clasificación estadística del estado académico
        Si (nota_final >= 4.5) Entonces
            cont_aprobados <- cont_aprobados + 1
        SiNo
            cont_reprobados <- cont_reprobados + 1
            // Sub-condición para determinar derecho a recuperación
            Si (nota_final > 3.75) Entonces
                cont_reparacion <- cont_reparacion + 1
            Fin Si
        Fin Si
        
        // Pregunta de control de interactividad al usuario
        Escribir "¿Desea procesar otro estudiante? (S/N): "
        Leer continuar
        
    Hasta (continuar = 'N' O continuar = 'n') // Condición de parada
    
    // Resultados finales del lote procesado
    Escribir "--- ESTADÍSTICAS DEL GRUPO ---"
    Escribir "Total de Aprobados: " + cont_aprobados
    Escribir "Total de Reprobados: " + cont_reprobados
    Escribir "Total con derecho a reparación: " + cont_reparacion
Fin Algoritmo
```

---

## Ejercicio Práctico 4: Cálculo del Factorial
**Enlace de Referencia:** [Ver video explicativo de apoyo](https://youtu.be/J6q6NchWwF8)

### Enunciado del Problema:
Elabore un algoritmo que permita determinar el factorial de un número entero $N$ otorgado por el usuario (sabiendo que el factorial consiste en la multiplicación consecutiva decreciente, por ejemplo: $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$).

### Análisis de la Solución:
*   **Acumulador de Multiplicación:** A diferencia de los sumadores (cuyo valor neutro es `0`), **un acumulador de multiplicación debe inicializarse obligatoriamente en 1**. Si lo inicializáramos en `0`, cualquier multiplicación sucesiva daría como resultado final `0` debido a la propiedad del elemento absorbente.
*   **Prueba de Escritorio (Simulación para $N = 5$):**
    *   *Inicio:* `respuesta = 1`, `n = 5`.
    *   *Iteración 1:* `Mientras (5 > 1)` $\rightarrow$ Verdadero. `respuesta <- 1 * 5` ($5$). `n` decrementa a `4`.
    *   *Iteración 2:* `Mientras (4 > 1)` $\rightarrow$ Verdadero. `respuesta <- 5 * 4` ($20$). `n` decrementa a `3`.
    *   *Iteración 3:* `Mientras (3 > 1)` $\rightarrow$ Verdadero. `respuesta <- 20 * 3` ($60$). `n` decrementa a `2`.
    *   *Iteración 4:* `Mientras (2 > 1)` $\rightarrow$ Verdadero. `respuesta <- 60 * 2` ($120$). `n` decrementa a `1`.
    *   *Fin del ciclo:* `Mientras (1 > 1)` $\rightarrow$ Falso. Salida del ciclo. Resultado final: `120`.

### Algoritmo en Pseudocódigo (UDONE):

```pseudocodigo
Algoritmo factorial
    // Declaración
    Definir n, respuesta Como Entero
    
Inicio
    // Inicialización crítica del acumulador multiplicativo
    respuesta <- 1
    
    Escribir "Indique el número para calcular su factorial: "
    Leer n
    
    // Mientras sea mayor a 1, dado que multiplicar por 1 al final no cambia el valor
    Mientras (n > 1) Hacer
        respuesta <- respuesta * n
        n <- n - 1 // Decremento manual de la variable de control
    Fin Mientras
    
    Escribir "El factorial del número es: " + respuesta
Fin Algoritmo
```

---

## Ejercicio Práctico 5: Generador de Números Pares en un Rango
**Enlace de Referencia:** [Ver video explicativo de apoyo](https://youtu.be/J6q6NchWwF8)

### Enunciado del Problema:
Escribir un programa que imprima en pantalla exclusivamente todos los números pares que se encuentran dentro de un intervalo cerrado delimitado por dos números indicados por el usuario.

### Análisis de la Solución:
*   **Ciclo Para Automático:** Este ejercicio saca provecho de la capacidad del ciclo **Para** para absorber variables dinámicas. La variable de control `i` absorbe el límite inferior (`numero1`) provisto por el usuario como punto de partida, y se incrementa automáticamente de uno en uno en cada iteración hasta llegar al límite superior (`numero2`) sin necesidad de incluir ninguna instrucción manual de incremento dentro del cuerpo del bucle.

### Algoritmo en Pseudocódigo (UDONE):

```pseudocodigo
Algoritmo pares_entre_dos_numeros
    // Declaración de variables
    Definir numero1, numero2, i Como Entero
    
Inicio
    Escribir "Indique el límite inferior (primer número): "
    Leer numero1
    Escribir "Indique el límite superior (segundo número): "
    Leer numero2
    
    Escribir "Imprimiendo números pares en el rango [" + numero1 + " , " + numero2 + "]:"
    Escribir "---------------------------------------------"
    
    // El ciclo se encarga de recorrer el rango completo de forma automática
    Para i <- numero1 Hasta numero2 Hacer
        // Filtramos para imprimir solo los múltiplos de 2
        Si (i MOD 2 = 0) Entonces
            Escribir i
        Fin Si
    Para Fin // O Fin Para, dependiendo de la convención de cierre
Fin Algoritmo
```

---

## Diseño

- **Componente Interactivo:** "Interactive Practice Workbook Simulator".
- **Visualización:** Un cuaderno digital de problemas con pestañas correspondientes a cada ejercicio práctico (1 a 5).
  - Al lado izquierdo, el pseudocódigo del algoritmo correspondiente estructurado con números de línea y resaltado sintáctico.
  - Al lado derecho, un simulador de consola de terminal integrado y un panel de RAM gráfica.
- **Interactividad:**
  - El estudiante puede presionar "Ejecutar Ejercicio" e interactuar con la terminal simulada ingresando datos reales (ej: introducir números para el clasificador estadístico, o los valores de divisor/dividendo).
  - El panel de RAM gráfica representará las variables en tiempo real como celdas de memoria de colores con animaciones de "parpadeo" cuando cambien sus valores numéricos.
  - Al presionar un botón de "Ver Traza Paso a Paso", se activarán anotaciones pedagógicas emergentes sobre el pseudocódigo explicando qué hace la CPU en esa instrucción exacta.
- **Estética:** Gradientes degradados violeta neon (`#8a2be2`) y cian espacial (`#00d9ff`), interfaz de cristal semitransparente (glassmorphism) sobre fondos oscuros muy elegantes y tipografía de programación de alta legibilidad.
