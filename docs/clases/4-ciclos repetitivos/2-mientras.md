# Capítulo 2: El Ciclo "Mientras" (While)

El ciclo **Mientras** es el bucle fundamental en el diseño algorítmico. Su funcionamiento se basa en la evaluación continua de una condición lógica antes de permitir la ejecución de su bloque de instrucciones.

---

## Concepto Fundacional

Para entender el ciclo Mientras, imagina que es una estructura condicional **Si (If)** potenciada. Ambos evalúan una condición:
- En un **Si**, si la condición es verdadera, el bloque interno se ejecuta **una sola vez** y el programa continúa.
- En un **Mientras**, si la condición es verdadera, el bloque interno se ejecuta, pero al llegar al final del bloque, **el flujo vuelve arriba** para evaluar la condición otra vez de manera sucesiva.

```mermaid
graph TD
    A([Inicio del ciclo]) --> B{¿Condición\n(Verdadera)?}
    B -- SÍ --> C[Ejecutar Bloque de Código]
    C --> D[Modificar variables de control]
    D --> B
    B -- NO --> E([Cierre del ciclo / Fin Mientras])

    style A fill:#00ff88,stroke:#00ff88,color:#000
    style E fill:#00ff88,stroke:#00ff88,color:#000
    style B fill:#ff00ff,stroke:#ff00ff,stroke-width:3px,color:#fff
    style C fill:#00d9ff,stroke:#00d9ff,color:#000
    style D fill:#ff9f43,stroke:#ff9f43,color:#000
    
    linkStyle 1 stroke:#00ff88,stroke-width:3px
    linkStyle 4 stroke:#ff0055,stroke-width:3px
```

---

## Prevención de Ciclos Infinitos

> [!WARNING]
> Un ciclo Mientras continuará ejecutándose eternamente si la condición evaluada nunca cambia a **Falsa**. 

Es un requisito crítico de diseño asegurar que, en algún punto del flujo interno del ciclo, el conjunto de instrucciones modifique las variables de la condición para que esta alcance el valor de falsedad. **Al diseñar cualquier ciclo, siempre se debe planificar explícitamente cómo se va a salir de él.**

---

## Sintaxis y Estructura en UDONE

Para escribir correctamente un ciclo Mientras en nuestro pseudocódigo, seguimos la siguiente estructura estricta:

```pseudocodigo
Mientras (Condición_Lógica) Hacer
    // Instrucciones que se repiten
    // Modificación de variables de control
Fin Mientras
```

> [!IMPORTANT]
> **Regla de Sintaxis UDONE:** El uso de los paréntesis `( )` para contener la condición es estrictamente obligatorio. No olvides colocar la palabra reservada `Hacer` al inicio y cerrar siempre la estructura con `Fin Mientras`.

---

## Mecanismos de Control para la Condición

Existen dos enfoques principales para controlar la ejecución y el cierre de este ciclo en la lógica de programación:

### 1. Control por interacción del usuario
Se evalúa una respuesta directa proporcionada por el usuario en cada iteración para decidir si el ciclo continúa. Es ideal cuando no sabemos de antemano cuántos datos ingresará la persona.

*   *Ejemplo cotidiano:* Preguntar activamente al final del ciclo: `¿Desea continuar introduciendo datos? [S/N]`. El ciclo se detendrá inmediatamente si el usuario responde "N".

### 2. Control por lógica interna del sistema
Se evalúa mediante operaciones y variables automáticas gestionadas internamente por el algoritmo.

*   *Ejemplo cotidiano:* Si necesitamos procesar un grupo cerrado de 100 personas para determinar cuántas son mayores de 18 años, el ciclo está claramente acotado para repetirse exactamente 100 veces a medida que el sistema lee e incrementa de forma automática sus registros numéricos.

---

## Conceptos Clave: Contadores, Acumuladores y Banderas

Para construir algoritmos robustos con ciclos, es indispensable dominar tres tipos de variables especiales con funciones específicas:

### 1. Contadores
Son variables simples que incrementan o decrementan su valor en una cantidad fija y constante con cada iteración. Lo más común es el incremento unitario (de 1 en 1).
- **Propósito:** Contar cuántas veces ocurre un evento o cuántas iteraciones se han realizado.
- **Sintaxis estándar:** `contador <- contador + 1`

### 2. Acumuladores
Son variables destinadas a almacenar sumas acumulativas de valores variables.
- **Propósito:** Sumar montos cambiantes a lo largo del tiempo.
- **Sintaxis estándar:** `total <- total + precio_producto`
- *Ejemplo:* El total de una factura de compras en un supermercado se construye sumando de manera sucesiva el precio de cada producto que el usuario decide llevar.

### 3. Banderas (Flags / Switches)
Son variables de control lógico que actúan como interruptores para registrar si un evento específico o un cambio de estado ya ocurrió en el flujo del código.
- **Propósito:** Cambiar el flujo del programa basándose en eventos binarios.
- **Sintaxis:** Generalmente utilizan valores booleanos (`Verdadero` / `Falso`). Funcionan como una luz que se enciende o se apaga.

---

## La Regla de Oro: Inicialización de Variables

> [!CAUTION]
> Un principio algorítmico ineludible es que las tres clases de variables especiales (contadores, acumuladores y banderas) **deben ser inicializadas obligatoriamente antes de ingresar a la instrucción del ciclo**.

Ninguna variable puede ser utilizada en una operación aritmética o lógica si no cuenta con un valor previo asignado en memoria, ya que el sistema no debe trabajar con datos indefinidos o "basura" en la memoria RAM.

- **Contadores:** Comúnmente se inicializan en `0` (o en `1`, según la lógica del algoritmo).
- **Acumuladores:** Comúnmente se inicializan en `0` (elemento neutro de la suma) o en `1` si se trata de multiplicaciones acumuladas (elemento neutro de la multiplicación).
- **Banderas:** Deben comenzar con un estado lógico explícito (`Verdadero` o `Falso`) antes de ser evaluadas por primera vez en la condición del ciclo.

---

## Ejemplo Práctico: Multiplicación mediante Sumas Sucesivas

Para consolidar lo aprendido, resolveremos un problema clásico: **Multiplicar dos números enteros positivos sin utilizar el operador de multiplicación (`*`)**, implementando en su lugar sumas repetidas controladas por un contador y un acumulador.

### Explicación de la Lógica:
Multiplicar `5 x 3` equivale matemáticamente a sumar el número `5` un total de `3` veces (`5 + 5 + 5 = 15`).
- Usaremos un **acumulador** (inicializado en `0`) para ir guardando la suma del primer número.
- Usaremos un **contador** (inicializado en `0`) que avanzará de 1 en 1 para registrar cuántas veces hemos sumado.
- El ciclo `Mientras` se ejecutará **mientras** el contador sea menor que el segundo número.

### Algoritmo en Pseudocódigo UDONE:

```pseudocodigo
Algoritmo Multiplicacion_Por_Sumas
Variables:
    multiplicando: Entero  // El número que se va a sumar (ej: 5)
    multiplicador: Entero  // Cuántas veces se sumará (ej: 3)
    resultado: Entero      // Acumulador para el total
    controlador: Entero    // Contador para controlar las iteraciones

Inicio
    // Entrada de datos
    Escribir "Ingrese el número a multiplicar (Multiplicando): "
    Leer multiplicando
    Escribir "Ingrese cuántas veces lo desea multiplicar (Multiplicador): "
    Leer multiplicador

    // LA REGLA DE ORO: Inicialización de variables antes del ciclo
    resultado <- 0
    controlador <- 0

    // Estructura cíclica Mientras
    Mientras (controlador < multiplicador) Hacer
        resultado <- resultado + multiplicando     // Suma sucesiva (Acumulador)
        controlador <- controlador + 1              // Avance constante (Contador)
    Fin Mientras

    // Salida de resultados
    Escribir "El resultado de la multiplicación es: " + resultado
Fin
```

---

## Diseño

- **Componente Interactivo:** "Interactive Successive Sums Lab".
- **Layout:** Pantalla dividida en dos columnas:
  - **Izquierda:** Panel de ejecución paso a paso con controles de simulación (`Play`, `Pausa`, `Siguiente Paso`, `Reiniciar`) y la tabla en vivo de variables de memoria (RAM) mostrando los cambios de `multiplicando`, `multiplicador`, `resultado` y `controlador`.
  - **Derecha:** Visualizador interactivo de código UDONE con resaltado en vivo de la línea que se está ejecutando.
- **Interactividad:**
  - Los estudiantes pueden cambiar los valores iniciales de entrada directamente desde campos de texto.
  - Al dar clic en "Siguiente Paso", se ejecuta una iteración del ciclo. El acumulador se ilumina de verde cuando se le añade el valor y el contador parpadea en naranja cuando incrementa de valor.
  - Alerta dinámica de advertencia si el estudiante introduce un multiplicador muy grande para explicar cómo el tiempo de ejecución crece linealmente.
- **Estética:** Aspecto oscuro moderno, animaciones fluidas tipo consola, fuentes monoespaciadas de alta lectura y efectos visuales de flujo lógico en tiempo real.
