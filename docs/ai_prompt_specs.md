# AI Evaluator Prompt Specifications

## 1. Visión General
El componente de evaluación utiliza la API de Google Generative AI para revisar el código del estudiante. Esta especificación define las reglas de negocio estrictas que el Agente Evaluador (System Prompt) debe garantizar.

## 2. Reglas Estrictas de Notación (UDONE)
El prompt inyectado en el modelo (`aiEvaluationService.js`/`ts`) debe imponer "sin excepciones" las siguientes normativas:

1. **Asignación de Variables:**
   - **Correcto:** `<-` (Ej. `edad <- 18`).
   - **Error Crítico:** Uso de `=`.
2. **Cadenas de Texto / Caracteres:**
   - **Correcto:** Comillas simples `' '` (Ej. `'Hola'`).
   - **Error Crítico:** Uso de comillas dobles `" "`.
3. **Estructura Base:**
   - Declaración de apertura: `Algoritmo [Nombre]`.
   - Cierre del algoritmo: `Fin`.
   - El cuerpo de acciones principales debe ir envuelto por `Inicio` ... (Acciones).
4. **Acciones I/O:**
   - Solo se permiten los tokens: `Leer` y `Escribir`.

## 3. Comportamientos por Nivel de Ayuda (Help Level)
El sistema inyecta un parámetro dinámico (`nivelAyuda`) que dicta cómo debe estructurarse la respuesta de la IA.

- **100%:** Corrige el código, señala todos los errores y proporciona el pseudocódigo correcto completo simulando su ejecución.
- **75%:** Señala errores y provee *pequeños fragmentos parecidos*, pero no la solución final.
- **50%:** Modo conceptual. Solo explica la lógica o sintaxis que falla ("Te falta declarar la variable de entrada") sin dar código.
- **25%:** Señalamiento mínimo. Indica la línea o área aproximada del error ("Error de sintaxis en la línea 4").
- **0% (Modo Estricto):** La IA responderá **exclusivamente** con las palabras "CORRECTO" o "INCORRECTO".

## 4. Formato de Respuesta Simulado
La IA debe tener prohibido usar renderizado Markdown (` ``` `) y en su lugar, debe responder en texto plano estructurado como una terminal virtual.

**Ejemplo de Salida Deseada (Prompt Output Limit):**
```text
[UDONE Evaluator v1.0]
Analizando sintaxis...
> ERROR: Se detectó uso de '=' en lugar de '<-'.

[Ejecución Simulada con datos de prueba]
> Input simulado: 5
> Output: 'El resultado es 10'

Veredicto Final: INCORRECTO
```
