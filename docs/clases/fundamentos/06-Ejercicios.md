Este artículo está diseñado para ser tu **laboratorio de práctica interactivo**. Si tienes configurada tu clave de IA, podrás validar tus propuestas en tiempo real; de lo siguiente, puedes usar la guía de corrección integrada.

---

# Laboratorio Interactivo: Variables, Nombres y Operaciones

¡Bienvenido, estudiante! En esta sesión vamos a poner a prueba lo aprendido sobre la anatomía de los algoritmos. Este documento está dividido en retos prácticos.

---

## Sección 1: Nombrando Variables (Desafío IA)

Para cada uno de los siguientes escenarios, propón un nombre de variable que cumpla con las reglas: **empezar con letra, sin espacios, usar solo `_` o CamelCase y ser descriptivo.**

### Ejercicios:
1.  Una variable para almacenar el **nombre de un país**.
2.  Un acumulador para los **goles anotados** por el equipo local.
3.  Una variable que indique si la **puerta de una casa** está abierta o cerrada (Lógico).
4.  El **precio final** de un producto después de aplicar impuestos.
5.  Una **constante** para el valor máximo de intentos de una contraseña.

> **Instrucciones para la IA:** Copia el siguiente bloque y envíalo junto a tu respuesta para recibir feedback inmediato.
>
> `Prompt: "Actúa como profesor de Algoritmos de la UDONE. Evalúa mi propuesta de nombre de variable para el ejercicio [Número]. Mi respuesta es: [Tu Propuesta]. Usa las reglas: inicio con letra, sin caracteres especiales excepto '_', sin espacios, y que sea significativo. Explica si es correcta o cómo mejorarla."`

---

## Sección 2: Identificación de Errores (Check de Autoevaluación)

Observa la siguiente lista de identificadores. Analiza cuáles están mal escritos y por qué. Haz clic o despliega la solución para comparar.



| Identificador | ¿Es válido? | Razón / Corrección |
| :--- | :---: | :--- |
| `1er_Puntaje` | ❌ No | **Error:** Empieza por un número. Debe ser `puntaje_1` o `primerPuntaje`. |
| `nombre estudiante` | ❌ No | **Error:** Contiene un espacio en blanco. Debe ser `nombre_estudiante`. |
| `saldo-cuenta` | ❌ No | **Error:** El guion medio `-` es un operador de resta. Usa `_`. |
| `calcularPromedio` | ✅ Sí | Es válido. Usa la nomenclatura CamelCase. |
| `¿activo?` | ❌ No | **Error:** Contiene caracteres especiales (`¿`, `?`). Solo se permite el piso. |
| `IVA%` | ❌ No | **Error:** El símbolo `%` no está permitido en identificadores. |
| `TOTAL_VENTAS` | ✅ Sí | Es válido. Común para constantes. |

---

## Sección 3: Operaciones con Variables

Resuelve las siguientes expresiones lógicas y aritméticas basándote en los valores de estas constantes predefinidas:

**Valores iniciales:**
* $A = 15$
* $B = 4$
* $C = 10$
* $D = Verdadero$
* $E = Falso$

### Ejercicios de Evaluación:

1.  **Aritmética básica:** `A + B * 2`
2.  **Uso de DIV:** `A DIV B`
3.  **Uso de MOD:** `A MOD B`
4.  **Prioridad de paréntesis:** `(A + C) DIV B`
5.  **Comparación simple:** `A <> (B * 3 + 3)`
6.  **Lógica con Y:** `(A > C) Y D`
7.  **Lógica con O:** `(B > A) O E`
8.  **Combinada:** `(A MOD 2 = 0) O (C DIV 2 = 5)`
9.  **Negación:** `NO (D Y E)`
10. **Desafío Final:** `((A + B) > C) Y (NO E)`



---

### Guía de resultados (Sección 3):
*Si quieres verificar tus cuentas:*
1. **23** | 2. **3** | 3. **3** | 4. **6** | 5. **Falso** (15 no es diferente de 15) | 6. **Verdadero** | 7. **Falso** | 8. **Verdadero** | 9. **Verdadero** | 10. **Verdadero**.

---

¿Lograste resolver los 10 ejercicios de operaciones? Si tuviste dudas con el **DIV** o el **MOD**, recuerda que el DIV es el cociente entero y el MOD es el residuo de la división. ¿Quieres que generemos una tabla de seguimiento para alguno de estos ejercicios?

## Diseño

- El usuario podrá ver los nombres de los ejercicios y, al hacer clic en "Ver Solución", se mostrará la solución del ejercicio.
- El usuario podra activar la ia para que la ia genere una nueva version de ejecicios con sus soluciones.
- El usuario podra seleccionar los ejercicios que desea resolver y la ia generara una version de ejecicios con sus soluciones.
