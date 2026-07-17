import React from 'react';
import { P, PageSection, YouTubeEmbed, Strong, Callout } from '../ArticlePageComponents';
import { BookOpen } from 'lucide-react';

export const ArticleVideoArreglos1: React.FC = () => {
  return (
    <div>
      <P>
        A continuación te presentamos un recurso audiovisual diseñado para introducir el concepto de las Estructuras de Datos, específicamente los Arreglos Unidimensionales.
      </P>

      <YouTubeEmbed 
        videoId="GpEiQR7gM_I" 
        title="Datos 1 - Arreglos (1/5)" 
      />

      <PageSection title="Introducción: ¿Por qué necesitamos estructuras de datos?">
        <P>
          A menudo, al desarrollar algoritmos, necesitamos almacenar y mantener en memoria una gran cantidad de información al mismo tiempo (por ejemplo, guardar los nombres de muchas personas). Si usamos variables tradicionales, tendríamos que declarar individualmente cientos o miles de ellas, lo cual es ineficiente y difícil de manejar.
        </P>
        <Callout variant="tip">
          Las <Strong>estructuras de datos</Strong> resuelven este problema permitiendo almacenar y organizar múltiples valores bajo un formato más complejo sin necesidad de declarar un número masivo de variables separadas.
        </Callout>
      </PageSection>

      <PageSection title="Clasificación de los Tipos de Datos">
        <P>
          Los datos en programación se pueden dividir de la siguiente forma:
        </P>
        <ul className="list-disc list-inside text-slate-300 space-y-2 mt-4 ml-2">
          <li><Strong>Datos Simples:</Strong> Enteros, reales, caracteres y lógicos (booleanos).</li>
          <li>
            <Strong>Datos Estructurados:</Strong>
            <ul className="list-disc list-inside ml-6 mt-1 text-slate-400">
              <li><Strong>Estáticos:</Strong> Su tamaño está definido desde que comienza la ejecución del programa (no evoluciona o cambia de tamaño durante la ejecución). Ejemplos: arreglos, matrices, registros, ficheros y cadenas.</li>
            </ul>
          </li>
        </ul>
      </PageSection>

      <PageSection title="¿Qué es un Arreglo?">
        <P>
          Un arreglo (o vector) es una estructura de datos estructurada y estática capaz de guardar y organizar diferentes datos en una sola variable. A los valores almacenados dentro del arreglo se accede a través de un <Strong>índice</Strong> o posición.
        </P>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6">
          <h3 className="text-brand-400 font-bold mb-3 flex items-center gap-2">
            <BookOpen size={16} /> Elementos principales de un arreglo
          </h3>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li><Strong>Tamaño:</Strong> La cantidad total de elementos o posiciones que el arreglo puede guardar (ej. 10 posiciones, desde la 0 hasta la 9, o de la 1 a la 10 según el lenguaje).</li>
            <li><Strong>Índice / Posición:</Strong> El número que identifica la casilla específica donde se encuentra guardado un elemento dentro de la estructura.</li>
            <li><Strong>Tipo de Dato:</Strong> El contenido que guarda cada casilla (puede ser de tipo entero, cadena, carácter, real, e incluso otros arreglos o estructuras complejas).</li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="Declaración de un Arreglo">
        <P>
          Para declarar un arreglo de manera general, se sigue una sintaxis similar a la de una variable tradicional pero especificando su dimensión y naturaleza:
        </P>
        <ol className="list-decimal list-inside text-slate-300 space-y-2 mt-4 ml-2 mb-6">
          <li><Strong>Identificador:</Strong> El nombre que le asignamos al arreglo para identificarlo en nuestro algoritmo.</li>
          <li><Strong>Palabras Reservadas:</Strong> El uso de las palabras clave como `arreglo` y `de` para indicar al compilador la estructura.</li>
          <li><Strong>Tamaño:</Strong> El número de posiciones o casillas.</li>
          <li><Strong>Tipo de Dato:</Strong> El tipo de información que albergará.</li>
        </ol>
        
        <P className="text-slate-400 text-sm italic">Ejemplo de sintaxis conceptual:</P>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-emerald-400 my-2">
          [Nombre de variable]: arreglo [Tamaño] de [Tipo de dato]
        </div>
      </PageSection>

      <PageSection title="Operaciones Básicas">
        <P>
          Las operaciones fundamentales que se pueden realizar sobre los arreglos incluyen:
        </P>
        <ul className="list-disc list-inside text-slate-300 space-y-2 mt-4 ml-2">
          <li><Strong>Asignación:</Strong> Guardar un valor en una posición específica.</li>
          <li><Strong>Lectura:</Strong> Obtener el valor almacenado en un índice.</li>
          <li><Strong>Escritura:</Strong> Mostrar los datos.</li>
          <li><Strong>Recorrido mediante ciclos:</Strong> Utilizar estructuras repetitivas para interactuar con todas las posiciones del arreglo de manera automatizada.</li>
        </ul>
      </PageSection>
    </div>
  );
};
