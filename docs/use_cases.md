# Casos de Uso del Sistema (Use Cases)

Este documento especifica los flujos de usuario siguiendo las directivas de Behavior-Driven Development (BDD). Se debe implementar el código satisfaciendo exactamente estas condiciones.

---

## UC-01: Navegación de Teoría
**Descripción:** El estudiante necesita consultar las normas teóricas, estructuras de control y acciones básicas del pseudocódigo estricto de UDONE.

- **Apartado Técnico (Skills Requeridos):** 
  - `React Functional Components`: Para modularizar cada sección (Ej. `<Section title="...">`).
  - `Tailwind Styling`: Para implementar un diseño visualmente atractivo (Glassmorphism, gradientes, animaciones CSS).
  - `State Management (useState)`: Para controlar la apertura/cierre de los paneles acordeón.

**Criterio de Aceptación:**
- **Given** que el usuario está en la página de inicio.
- **When** hace clic en "Acciones Básicas" o en una estructura de control.
- **Then** el sistema debe expandir la información teórica y mostrar bloques de código formateados.

---

## UC-02: Configuración de API Key (Autenticación Delegada)
**Descripción:** El estudiante necesita ingresar su API Key personal de Google Gemini para usar el sistema de corrección inteligente.

- **Apartado Técnico (Skills Requeridos):**
  - `LocalStorage API`: Para persistir la API Key en el navegador de forma segura entre recargas.
  - `React State Management`: Para enlazar el Input Text con la memoria reactiva.
  - `DOM Manipulation`: Para renderizar un Modal Superpuesto o una pantalla de ajustes sin alterar la ruta.

**Criterio de Aceptación:**
- **Given** que el usuario presiona "Configurar IA" en la vista de ejercicios.
- **When** ingresa su API Key y presiona "Guardar".
- **Then** el sistema almacena la clave en `localStorage` bajo el identificador `gemini_api_key` y cierra el modal automáticamente.

---

## UC-03: Sandbox de Evaluación IA
**Descripción:** El estudiante escribe un pseudocódigo y solicita al agente que evalúe si cumple con los requerimientos lógicos y de notación, decidiendo el nivel de ayuda (0% a 100%).

- **Apartado Técnico (Skills Requeridos):**
  - `Prompt Engineering`: Para inyectar el código, la clave y las reglas estrictas (<- , comillas simples) en un template literal hacia la API de Google.
  - `Async/Await & Fetching`: Para manejar promesas de la librería `@google/generative-ai`.
  - `Error Handling (Try/Catch)`: Para capturar excepciones como API Key inválida, cuota agotada o fallos de red.
  - `UI Feedback`: Para mostrar loaders spinners mientras la promesa está en estado `pending`.

**Criterio de Aceptación:**
- **Given** que el estudiante seleccionó el nivel de ayuda "50%" y escribió código con el operador de asignación `=`.
- **When** presiona "Evaluar Ejecución".
- **Then** el sistema muestra un estado de carga y, una vez recibe respuesta, simula una consola mostrando el error: "Estás usando mal la asignación, recuerda que se usa la flecha" (sin mostrar el código corregido explícitamente).

---

## UC-04: Consulta de Soluciones Oficiales
**Descripción:** El estudiante requiere comparar su propio código contra el modelo de respuesta oficial proporcionado por la profesora.

- **Apartado Técnico (Skills Requeridos):**
  - `React Component Composition`: Para crear "Tabs" navegables sin recargar la página.
  - `Data Mapping`: Para leer el JSON local o módulo JS que contiene las respuestas (Pseudocódigo, C, TS).

**Criterio de Aceptación:**
- **Given** que el estudiante está dentro de un Ejercicio.
- **When** hace clic en la pestaña "Ver Solución Oficial" y luego en "TypeScript".
- **Then** el sistema cambia inmediatamente la vista del editor por un bloque de texto que muestra el código oficial escrito en TypeScript.
