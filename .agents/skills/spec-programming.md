# Spec Programming Skill

## Descripción General
Esta skill define el comportamiento esperado del Agente de Inteligencia Artificial para seguir la metodología **Spec Programming** (Programación Orientada a Especificaciones). 
En este enfoque, **nunca** se debe escribir o modificar código directamente sin antes haber definido, revisado y estructurado las especificaciones de negocio (BDD, Casos de Uso, Criterios de Aceptación).

## Reglas de Ejecución del Agente
1. **Spec First:** Cuando el usuario solicita una nueva funcionalidad, el agente debe primero buscar o generar un archivo de especificación (`.md` en la carpeta `docs/`) que defina el caso de uso.
2. **Acceptance Criteria:** Toda especificación debe tener criterios de aceptación claros y un "Apartado Técnico (Skills)" donde se detallen las competencias requeridas.
3. **Validación:** Antes de codificar, el agente debe solicitar aprobación al usuario sobre la especificación redactada.
4. **Implementación:** El código generado debe cumplir estrictamente con lo redactado en la especificación, sin desviaciones.
5. **Spec Update:** Si durante el desarrollo surge un borde no contemplado (edge case), el agente debe actualizar el archivo de especificaciones **antes** de implementar la solución en código.

## Formato de Especificación Recomendado
- **Título de la Funcionalidad**
- **Descripción General**
- **Casos de Uso (BDD - Given/When/Then)**
- **Apartado Técnico (Skills requeridos)**
- **Criterios de Aceptación**

Al usar esta skill, te aseguras de mantener un sistema autodocumentado, testeable y resistente a variaciones en la arquitectura.
