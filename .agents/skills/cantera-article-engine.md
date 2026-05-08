# Skill: Cantera Article Engine

## Objetivo
Transformar un directorio de archivos Markdown en una plataforma de e-learning interactiva y profesional (Cantera), siguiendo principios de limpieza, accesibilidad y diseño premium.

## 1. Etapa de Validación y Escaneo
Realizar un barrido recursivo en la carpeta raíz seleccionada para organizar el contenido:
- **Validación de Metadata:** Comprobar que cada archivo `.md` tenga un título claro y una estructura coherente.
- **Mapeo de Rutas:** Inferir categorías y slugs basados en la estructura de carpetas (ej: `/fundamentos/tipos-de-datos.md` -> Categoría: "Fundamentos", Slug: `tipos-de-datos`).

## 2. Generación del Índice Maestro (Dashboard)
La página principal se generará como un **Dashboard de Contenidos**:
- **Agrupación Automática:** Crear secciones basadas en el nombre de las carpetas.
- **Cards Informativas:** Cada artículo se presentará con un resumen automático generado por la IA y un enlace a su página propia.
- **Jerarquía Visual:** Uso de `breadcrumbs` para navegación clara.

## 3. Renderizado de Artículos (React + Tailwind)
Aplicar reglas de estilo para maximizar la legibilidad y estética premium:
- **Tipografía High-Readability:** Uso de fuentes sans-serif con tamaño `text-xl` y `leading-relaxed`.
- **Code Highlighting:** Bloques de código con fondo oscuro de alto contraste, botón de "Copiar" y resaltado sintáctico preciso.
- **Layout:** Contenedores `max-w-4xl` centrados para mantener una longitud de línea óptima.

## 4. Procesamiento del Bloque de "Diseño" (Meta-Instrucciones)
La sección `## Diseño` (o `### Diseño`) al final de los archivos `.md` se trata como **props de configuración o hooks de ejecución**:
- **UI Dinámica:** Generar componentes React específicos basados en instrucciones (ej: "Añadir un simulador de consola").
- **Interactividad:** Definir estados y efectos de React (ej: "Hacer que los ejemplos cambien de color al pasar el mouse").
- **Invisible al Estudiante:** Este bloque se consume durante el procesamiento/build pero desaparece en el renderizado final del artículo.

## 5. Buscador Global Inteligente (Fuzzy Search)
Integrar una capa de búsqueda reactiva sobre el índice de artículos:
- **Indexación en Tiempo Real:** Generar un archivo JSON ligero como índice de búsqueda (títulos, etiquetas y fragmentos clave).
- **Fuzzy Search:** Implementar búsqueda difusa tolerante a errores (se recomienda `Fuse.js`) accesible mediante `Ctrl + K`.
- **Previsualización Rápida:** Mostrar fragmentos (snippets) del contexto donde se encontró el término.

## 6. Motor de Diagramas Dinámicos (Mermaid.js)
Detección y renderizado de estructuras lógicas:
- **Autodetección de Flujos:** Identificar procesos secuenciales (ej: Entrada -> Proceso -> Salida) y sugerir o insertar bloques de código `mermaid`.
- **Renderizado Nativo:** El parser de Markdown debe reconocer el lenguaje `mermaid` y renderizar gráficos vectoriales interactivos.

## 7. Experiencia de Usuario Adicional
- **Progress Tracking:** Añadir automáticamente un checkbox de "Leído" al final de cada página, persistido en `localStorage`.
- **Modo Oscuro/Claro:** Implementar un toggle de tema nativo para reducir la fatiga visual.

## Guía de Implementación Técnica
- **Parser de Markdown:** El componente de renderizado debe estar preparado para interceptar el bloque de `Diseño` y ejecutar la lógica correspondiente.
- **Componentes Dinámicos:** Utilizar una arquitectura de componentes "plug-and-play" donde la IA pueda inyectar herramientas interactivas según lo solicitado en el Markdown.
