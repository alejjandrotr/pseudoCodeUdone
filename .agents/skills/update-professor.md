# Actualizar Profesor

**Descripción**: Skill diseñado para modificar el comportamiento, historia o dificultad de un profesor existente en el sistema.

## Requisitos de Activación
- El usuario debe especificar a qué profesor quiere actualizar (por nombre o ID).
- El usuario debe proporcionar los detalles del cambio (ej. "Haz que sea más estricto", "Cambia su nombre a Prof. Ninja").

## Flujo de Trabajo (Workflow)

1. **Búsqueda del Profesor**:
   - Lee el archivo `src/core/data/professorsData.ts`.
   - Localiza el objeto correspondiente al profesor que el usuario desea modificar. Si no existe o hay ambigüedad, solicita clarificación al usuario.

2. **Análisis de Modificaciones**:
   - Analiza qué campos desean ser alterados: `name`, `difficultyLevel`, `shortStory`, o `promptBehavior`.
   - Si la petición implica un cambio en cómo el profesor evalúa (su personalidad), DEBES regenerar y ajustar la propiedad `promptBehavior` para que refleje esta nueva personalidad.

3. **Aplicación de Cambios**:
   - Modifica el archivo `src/core/data/professorsData.ts` con los nuevos datos para ese objeto en específico.
   - Conserva los campos que no hayan sido mencionados por el usuario.

4. **Verificación**:
   - Asegúrate de que no se rompió la estructura del arreglo ni el tipado de TypeScript.

5. **Notificación al Usuario**:
   - Muestra un resumen en bloque de código o tabla con los valores anteriores y los valores nuevos del profesor modificado.
