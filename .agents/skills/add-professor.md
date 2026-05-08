# Agregar Profesor

**Descripción**: Skill diseñado para agregar un nuevo profesor (personaje evaluador) al sistema interactivo de evaluación por IA.

## Requisitos de Activación
- El usuario debe proporcionar una breve descripción de la personalidad y estilo de evaluación del nuevo profesor.
- Opcionalmente, un nombre y nivel de dificultad.

## Flujo de Trabajo (Workflow)

1. **Recolección de Información**:
   - Lee el prompt del usuario donde describe cómo evalúa el nuevo profesor.
   - Extrae: `name`, `difficultyLevel`, `shortStory`. Si faltan, invéntalos basándote en la descripción.

2. **Generación del Prompt Behavior**:
   - Analiza la descripción proporcionada.
   - Genera una instrucción clara (prompt) dirigida a la IA (Gemini).
   - Esta instrucción (`promptBehavior`) debe estipular qué nivel de detalle de código dará, cómo responderá ante errores, y el tono general de sus respuestas.
   - NO debes incluir las reglas básicas de sintaxis UDONE en este prompt (flechas de asignación, apóstrofes), ya que el servicio global las inyecta automáticamente. Concéntrate solo en la **personalidad** y **profundidad de la ayuda**.

3. **Modificación del Fixture**:
   - Abre el archivo `src/core/data/professorsData.ts`.
   - Crea un nuevo objeto que cumpla con la interfaz `Professor` (`id`, `name`, `difficultyLevel`, `shortStory`, `promptBehavior`).
   - El `id` debe ser único, en formato `snake_case` (ej. `prof_chill`).
   - Inserta este objeto al final del arreglo `professorsData`.

4. **Verificación**:
   - Asegúrate de que el archivo compile correctamente en TypeScript.
   - Opcionalmente, ejecuta un formateador si el proyecto dispone de uno.

5. **Notificación al Usuario**:
   - Confirma que el profesor ha sido agregado y proporciona un breve resumen de cómo quedó su `promptBehavior`.
