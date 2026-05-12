# La Estructura de Selección Simple (Si)

El segundo artículo de nuestra serie corresponde al **Si (If)**. Es una estructura de selección simple que permite ejecutar un bloque de código si se cumple una condición específica. Siempre dependemos de una operación de "pregunta" hacia nuestras variables o constantes para determinar el camino a seguir.

## La Pregunta: Operadores Relacionales

Para que el algoritmo pueda decidir, debemos recordar cómo funcionan los operadores que nos permiten obtener resultados **booleanos** (Verdadero o Falso):

*   **Mayor que**: `>`
*   **Menor que**: `<`
*   **Mayor o igual que**: `>=`
*   **Menor o igual que**: `<=`
*   **Diferente de**: `<>` (En UDONE preferimos `<>` sobre `!=`)

---

## Uniendo Condiciones: Operadores Lógicos

También podemos usar operadores para unir varias preguntas en una sola decisión utilizando el **Y (AND)** y el **O (OR)**. 

Esto nos permite, por ejemplo, verificar que un número sea par **Y** a la vez sea múltiplo de 5.

### El manejo de Rangos
Un uso muy común es verificar si un número `x` está en un rango (por ejemplo, entre 1 y 10). En programación, esto **debe** expresarse como dos condiciones unidas:

> [!IMPORTANT]
> **Correcto**: `(x >= 1) Y (x <= 10)`
> **Incorrecto**: `1 < x < 10` (Las operaciones encadenadas no existen en pseudocódigo).

---

## Sintaxis en Pseudocódigo UDONE

Para escribirlo correctamente, debes seguir este orden estricto:

1.  La palabra reservada **Si**.
2.  **Paréntesis obligatorios** `( )` que contienen la condición.
3.  La palabra **Entonces**.
4.  El bloque de código a ejecutar (sangrado a la derecha).
5.  La instrucción **Fin Si**, que identifica el cierre de la estructura.

```pseudocode
Si (Condición) Entonces
    // Código que se ejecuta si es Verdadero
Fin Si
```

---

## Ejemplo Práctico: Control de Velocidad

Imagina un sistema que solo debe alertar si un conductor va muy rápido. Si va a velocidad normal, el sistema no hace nada.

**Enunciado:** Diseñe un algoritmo que reciba la velocidad de un vehículo y, si supera los 80 km/h, muestre un mensaje de advertencia.

### Solución:

```pseudocode
Algoritmo Alerta_Velocidad
  Variables:
    velocidad: Real

Inicio
  Escribir "Ingrese la velocidad actual (km/h): "
  Leer velocidad

  Si (velocidad > 80) Entonces
    Escribir "¡ADVERTENCIA! Estás excediendo el límite permitido."
  Fin Si

  Escribir "Fin del monitoreo."
Fin
```

---

## Visualización del Flujo

En nuestra plataforma interactiva, podrás ver cómo se mueve el flujo a través de este diagrama. Observa cómo el "hilo" de ejecución llega al rombo y decide si entrar al bloque o saltárselo.

```mermaid
graph TD
    A([Inicio]) --> B[/Leer velocidad/]
    B --> C{ (velocidad > 80) }
    C -- VERDADERO --> D[Escribir Advertencia]
    C -- FALSO --> E([Fin])
    D --> E

    style A fill:#00ff88,stroke:#00ff88,color:#000
    style E fill:#00ff88,stroke:#00ff88,color:#000
    style C fill:#ff00ff,stroke:#ff00ff,stroke-width:3px,color:#fff
    style D fill:#00d9ff,stroke:#00d9ff,color:#000
    
    linkStyle 2 stroke:#00ff88,stroke-width:3px
    linkStyle 3 stroke:#ff0055,stroke-width:2px
```
