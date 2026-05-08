---
description: Cómo desplegar la aplicación de pseudocódigo en la web gratis
---

Para que tu amigo pueda ver la página, lo más sencillo es subirla a un servicio de hosting estático gratuito como **Netlify** o **Vercel**. Aquí tienes los pasos paso a paso:

### Opción 1: Netlify Drop (La más fácil, sin instalar nada)
Esta opción es ideal si no quieres usar la terminal y solo quieres compartir el link rápido.

1.  **Genera la carpeta de producción**: Asegúrate de que el proyecto está compilado. En tu terminal dentro de la carpeta del proyecto ejecuta:
    ```powershell
    npm run build
    ```
    Esto creará una carpeta llamada `dist` dentro de tu proyecto.
2.  **Sube la carpeta**: Ve a [Netlify Drop](https://app.netlify.com/drop).
3.  **Arrastra y suelta**: Toma la carpeta `dist` que se acaba de crear y suéltala en el recuadro que aparece en la web de Netlify.
4.  **Comparte el link**: Netlify te generará una URL aleatoria inmediatamente. ¡Pásale ese link a tu amigo!

### Opción 2: Vercel CLI (Desde la terminal)
Si prefieres hacerlo todo desde aquí sin abrir el navegador para arrastrar carpetas:

// turbo
1.  **Inicia el despliegue**: Ejecuta este comando en la terminal:
    ```powershell
    npx vercel
    ```
2.  **Sigue las instrucciones**:
    - Te pedirá iniciar sesión (puedes usar GitHub o Email).
    - Presiona `Y` para configurar y desplegar el proyecto.
    - Selecciona el nombre del proyecto y deja las opciones por defecto (Vite detectará todo automáticamente).
3.  **Listo**: Al terminar, te dará un enlace "Preview" y un enlace de producción.

### Recordatorio sobre la API de Gemini
> [!IMPORTANT]
> Como la aplicación usa tu propia API Key de Gemini guardada en el navegador (`localStorage`), tu amigo también tendrá que poner su propia API Key en el botón de **Configurar IA** si quiere probar el Sandbox Evaluador. Si solo quiere ver los ejercicios y las soluciones oficiales, no necesita nada adicionales.
