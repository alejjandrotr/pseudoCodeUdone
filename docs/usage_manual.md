# Manual de Uso e Instalación (Usage Manual)

Esta guía explica cómo levantar el entorno local del tutorial de pseudocódigo UDONE y las consideraciones generales de uso.

## Requisitos Previos
- **Node.js** (v18 o superior)
- **Gestor de Paquetes:** `npm`, `yarn` o `pnpm`.
- Una clave API de Google Generative AI (Gemini).

## Instalación y Ejecución Local
1. Clona el repositorio e ingresa a la carpeta del proyecto.
   ```bash
   cd d:\proyects\2026\tutorial-pseudocodigo
   ```
2. Instala las dependencias necesarias.
   ```bash
   npm install
   ```
3. Levanta el servidor de desarrollo utilizando Vite.
   ```bash
   npm run dev
   ```
4. Abre la URL local sugerida (usualmente `http://localhost:5173/`).

## Guía de Uso del Sandbox Evaluador (Estudiantes)
1. **Configuración de IA:** 
   - Dirígete a la sección "Ver Ejercicios".
   - Presiona el botón "Configurar IA" en la esquina superior derecha.
   - Pega tu `API_KEY` de Gemini y presiona Guardar (Se almacenará de forma segura y local en tu navegador).
2. **Evaluación:**
   - Selecciona un ejercicio.
   - En la pestaña "Intentarlo Yo Mismo", ingresa el código respetando las normas de asignación (`<-`) y cadenas (`''`).
   - Elige el nivel de ayuda y presiona "Evaluar Ejecución".

## Preparación para Producción (Vercel/Firebase)
El proyecto usa dependencias compatibles con despliegue estático continuo.
1. Ejecuta el comando de construcción:
   ```bash
   npm run build
   ```
2. La carpeta generada `dist/` es la requerida para ser cargada en el servidor de Firebase Hosting o Vercel CLI sin configuraciones adicionales de backend.
