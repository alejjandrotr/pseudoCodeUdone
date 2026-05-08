# Especificación: Componentes Interactivos para Operaciones Básicas

## Descripción General
Esta funcionalidad introduce tres componentes interactivos clave para la plataforma e-learning (Cantera), diseñados para enseñar las operaciones básicas de pseudocódigo: Escritura, Asignación y Lectura. Los componentes permitirán al usuario visualizar la ejecución paso a paso del código, inspeccionar el estado de la memoria (variables) y proveer datos de entrada de forma dinámica, logrando una experiencia visual, pedagógica y premium.

## Casos de Uso (BDD)

### 1. Visual Code Tracer (Escritura)
**Escenario: Ejecución de código y visualización de salida**
- **Given** que el usuario está viendo un ejercicio en el artículo de "Escritura"
- **When** el usuario hace clic en el botón "Play" o pasa el puntero (hover) sobre una instrucción de código
- **Then** el sistema debe resaltar la línea de código activa
- **And** la consola (simulador de terminal en el panel izquierdo) debe mostrar secuencialmente el texto resultante de las instrucciones `Escribir` procesadas hasta esa línea, utilizando animaciones fluidas.

### 2. Panel de Memoria de Variables (Asignación)
**Escenario: Inspección y mutación de variables en tiempo real**
- **Given** que el usuario está interactuando con un ejercicio de "Asignación"
- **When** la ejecución del algoritmo avanza (automáticamente vía Play o manualmente vía hover)
- **Then** el panel visual de variables debe actualizarse para reflejar los nuevos valores asignados, mostrando una sutil animación (delay) para destacar el cambio en memoria
- **And** el usuario debe poder hacer clic en las representaciones de las variables para modificar sus valores y observar cómo el flujo de ejecución o los resultados finales cambian.

### 3. Consola Interactiva de Entrada (Lectura)
**Escenario: Solicitud de datos de entrada al usuario**
- **Given** que el usuario está ejecutando un ejercicio de "Lectura"
- **When** el flujo de ejecución alcanza una instrucción `Leer`
- **Then** la ejecución del pseudocódigo debe pausarse
- **And** la consola debe habilitar un campo de entrada (input de texto) indicando visualmente que espera datos (ej. cursor parpadeando)
- **When** el usuario introduce un valor (o acepta un valor por defecto) y presiona Enter
- **Then** el valor es capturado, asignado a la variable correspondiente en el Panel de Memoria, y la ejecución del código se reanuda desde la siguiente línea.

## Apartado Técnico (Skills requeridos)
- **Frontend/UI:** React (componentes funcionales) y CSS/Tailwind (diseño premium, soporte para modo oscuro, gradientes sutiles).
- **Manejo de Estado (React):** Uso de estado para mantener sincronizados el paso actual de ejecución (`currentLine`), el entorno de memoria (`variablesState`) y la salida estándar (`consoleHistory`).
- **Simulación de Ejecución:** Lógica de parseo ligero o mapeo de líneas predefinido para saber qué variables mutan y qué se imprime por cada línea en los ejercicios dados.
- **Integración con Markdown Engine:** Capacidad de inyectar estos componentes dinámicos en el lugar exacto definido por el bloque `## Diseño` de los archivos `.md`.

## Criterios de Aceptación
1. **Sincronización:** El resaltado de la línea de código debe corresponder exactamente con el estado actual de la consola y la memoria.
2. **Interactividad Bidireccional:** El usuario puede avanzar la ejecución manualmente o dejarla correr con el botón Play.
3. **Bloqueo por Lectura:** El algoritmo no debe avanzar más allá de un `Leer` sin que exista un input por parte del usuario.
4. **Diseño Premium:** La interfaz no puede utilizar componentes básicos sin estilo. Debe sentirse "viva" mediante hover effects, transiciones suaves al cambiar valores en memoria, y una consola con fuente monoespaciada legible.
5. **Edición de Memoria:** Los campos de las variables en los ejercicios de asignación deben ser editables antes y durante la pausa de la ejecución, afectando correctamente los resultados dependientes.
