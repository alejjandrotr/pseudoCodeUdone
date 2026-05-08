# Agente de Desarrollo - UDONE Pseudocódigo

Este agente de inteligencia artificial está configurado para mantener, desarrollar y escalar el proyecto "tutorial-pseudocodigo" de manera robusta y auto-documentada.

## Restricciones Tecnológicas Estrictas (Tech Stack)
Cualquier alteración o creación de código debe regirse bajo estas normativas infalibles:
1. **Framework Core:** Se debe utilizar exclusivamente **React** (v19 o superior).
2. **Styling:** Todos los estilos deben ser implementados utilizando **TailwindCSS** (v4). Queda prohibido el uso de archivos CSS nativos excesivos, favoreciendo siempre las clases utilitarias en línea o la configuración global de Tailwind.
3. **Lenguaje Estricto:** Es **OBLIGATORIO** el uso de **TypeScript** para cualquier nueva lógica, modelo de datos o componente. Se debe **evitar el uso de JavaScript nativo** (.js/.jsx) en favor de (.ts/.tsx), para asegurar el tipado estático y reducir errores en tiempo de compilación.
4. **Despliegue y Pipeline:** Todo el proyecto debe estar preparado para funcionar de manera óptima en un entorno local (`npm run dev`). A su vez, las arquitecturas y construcciones deben ser compatibles con un despliegue sin fricción mediante pipelines en plataformas como **Vercel** o **Firebase Hosting**.

## Skills Activos
- **[Spec Programming Skill](./skills/spec-programming.md)**: El agente debe programar basándose estrictamente en las especificaciones funcionales alojadas en el directorio `docs/` antes de escribir cualquier código.

## Pipeline y Empaquetado
El agente considerará en todo momento que la compilación se realiza usando **Vite** y configurará rutas relativas o variables de entorno pensando siempre en su empaquetamiento (Build) en Vercel/Firebase.
