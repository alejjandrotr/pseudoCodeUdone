# Especificación del Sistema (System Specs)

## 1. Información General
- **Nombre del Proyecto:** tutorial-pseudocodigo
- **Descripción:** Plataforma web educativa interactiva enfocada en la enseñanza y validación de notación estricta de pseudocódigo. Validada por IA bajo los estándares de la Universidad de Oriente (UDONE).
- **Entorno de Ejecución Actual:** Entorno de Desarrollo Local (`localhost` vía Vite).

## 2. Pila Tecnológica Estricta (Tech Stack)
Este proyecto debe regirse obligatoriamente por el siguiente stack, evitando tecnologías externas sin previa autorización en un Spec:

- **Core Frontend:** React v19+
- **Lenguaje Base:** TypeScript (Extensión obligatoria de `.ts` / `.tsx`). Se encuentra **restringido** el uso de JavaScript nativo para nuevas integraciones con el objetivo de prevenir errores en tiempo de ejecución.
- **Estilos (Styling):** TailwindCSS v4. 
  - Restricción: No se debe utilizar CSS tradicional para el diseño de componentes, todo debe ser manejado a través de clases de utilidad de Tailwind en los archivos TypeScript.
- **Empaquetador (Bundler):** Vite.

## 3. Arquitectura
El sistema se estructura en un modelo Single Page Application (SPA), compuesto por vistas manejadas a través de estado en memoria (Enrutamiento Simulado):
- **Home View / Acciones Básicas:** Vistas de presentación teórica de la sintaxis estándar de pseudocódigo.
- **Sandbox (Ejercicios View):** Zona interactiva donde el estudiante resuelve problemas usando notación UDONE, con asistencia de IA y feedback de compilación simulada.

## 4. Integraciones Externas
- **Servicio IA:** Google Generative AI (Modelo `gemini-2.5-flash`). 
  - Las llamadas se realizan directamente desde el cliente (Frontend).
  - La Autenticación (API Key) está delegada al cliente, quien debe suministrar su propio Token y se persistirá en `localStorage`.

## 5. Pipeline y Despliegue (CI/CD)
El proyecto debe ser empaquetado (`npm run build`) generando archivos estáticos en la carpeta `dist/`.
- **Despliegues Automáticos (Futuro):** La arquitectura está planificada para soportar plataformas de despliegue continuo Serverless.
  - Vercel y Firebase Hosting serán los objetivos de despliegue.
  - Cualquier componente debe estar pensado para ejecutarse de forma estática y manejar el enrutamiento del lado del cliente.
