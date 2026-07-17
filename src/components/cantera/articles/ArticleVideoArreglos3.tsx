import React from 'react';
import { P, PageSection, YouTubeEmbed, Strong, Callout, CodeBlock, InlineCode } from '../ArticlePageComponents';

export const ArticleVideoArreglos3: React.FC = () => {
  return (
    <div>
      <P>
        En esta sesión cerramos la teoría básica de los arreglos explicando cómo se pueden integrar de forma óptima con las estructuras repetitivas, específicamente el ciclo Para (For), resolviendo el problema de la redundancia al llenar o mostrar datos.
      </P>

      <YouTubeEmbed 
        videoId="QwzSE30uPK0" 
        title="Datos I - Arreglos (ciclos) (3/5)" 
      />

      <PageSection title="1. Introducción: Arreglos y Ciclos">
        <P>
          El uso de la estructura de datos tipo <Strong>arreglo</Strong> está intrínsecamente ligado al uso de <Strong>ciclos</Strong> (estructuras repetitivas).
        </P>
        <P>
          Manejar un arreglo de gran tamaño (por ejemplo, 50 o 100 posiciones) haciendo asignaciones, lecturas o escrituras de forma manual (posición por posición) resulta ineficiente y poco práctico. Para evitar esto, el ciclo <Strong>PARA</Strong> (o <InlineCode>FOR</InlineCode>) se convierte en la herramienta fundamental y más típica para recorrer, modificar o mostrar los datos de un arreglo completo.
        </P>
      </PageSection>

      <PageSection title="2. El Ciclo PARA (FOR) en los Arreglos">
        <P>
          El ciclo <InlineCode>PARA</InlineCode> nos permite definir una variable índice (generalmente <InlineCode>i</InlineCode>) que irá aumentando automáticamente su valor paso a paso, lo cual coincide perfectamente con las posiciones secuenciales de un arreglo.
        </P>

        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejemplo Práctico: Lectura y Escritura Diferida</h3>
        <P>
          Supongamos que necesitamos solicitar 10 números al usuario, guardarlos todos y, <Strong>solo después de tenerlos todos</Strong>, mostrarlos en pantalla.
        </P>
        
        <div className="space-y-6 my-6">
          <div>
            <h4 className="text-brand-400 font-bold mb-2">1. Declaración</h4>
            <P>Definimos nuestro arreglo (ej. <InlineCode>numeros[10]</InlineCode>) y la variable índice <InlineCode>i</InlineCode>.</P>
          </div>
          
          <div>
            <h4 className="text-brand-400 font-bold mb-2">2. Fase de Lectura (Llenado del Arreglo)</h4>
            <P>Usamos un ciclo <InlineCode>PARA</InlineCode> que vaya desde la primera posición hasta el final del arreglo:</P>
            <CodeBlock code={`Para i = 1 Hasta 10 Inc 1
    Escribir "Indique el número para la posición ", i
    Leer numeros[i]
Fin Para`} />
            <P className="mt-2 text-sm text-slate-400">
              En este bloque, el ciclo se encarga de pedir y guardar dinámicamente cada número introducido en su casilla correspondiente sin necesidad de crear 10 variables distintas.
            </P>
          </div>
          
          <div>
            <h4 className="text-brand-400 font-bold mb-2">3. Fase de Escritura (Mostrar los Datos)</h4>
            <P>Una vez lleno, podemos usar otro ciclo <InlineCode>PARA</InlineCode> para recorrer el arreglo y mostrar su contenido:</P>
            <CodeBlock code={`Para i = 1 Hasta 10 Inc 1
    Escribir "El número en la posición ", i, " es: ", numeros[i]
Fin Para`} />
          </div>
        </div>
      </PageSection>

      <PageSection title="3. Detalles en la Programación Real">
        <P>
          Al llevar esta lógica a un lenguaje de programación real, hay que tener en cuenta un detalle crucial sobre los índices:
        </P>
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
          <li><Strong>En Pseudocódigo:</Strong> Usualmente se asume que la primera posición de un arreglo es la número <Strong>1</Strong>.</li>
          <li><Strong>En Programación Real:</Strong> En la gran mayoría de los lenguajes de programación, los arreglos (arrays) son <InlineCode>Zero-indexed</InlineCode>, lo que significa que <Strong>comienzan en la posición 0</Strong>. Por ende, un arreglo de tamaño 10, irá desde el índice 0 hasta el 9.</li>
        </ul>

        <Callout variant="tip">
          <Strong>Buenas Prácticas: Uso de Constantes</Strong><br/>
          Para hacer el código más flexible, es una excelente práctica no colocar directamente el tamaño del arreglo en las condiciones del ciclo (los llamados "números mágicos" como 10 o 5). En su lugar, se recomienda declarar una variable o constante (ej. <InlineCode>MAX = 10</InlineCode>) que defina el tamaño del arreglo.
          <br/><br/>
          De esta forma, si el día de mañana necesitas que tu arreglo guarde 20 elementos en lugar de 10, solo cambias el valor de la constante en la cabecera del programa, y todos los ciclos que dependan de ella se ajustarán automáticamente.
        </Callout>

        <Callout variant="info">
          <Strong>Mejorando la Experiencia del Usuario (UX) en Consola</Strong><br/>
          Como los arreglos en programación empiezan en 0, si muestras los índices directamente al usuario (ej. "Ingrese número en posición 0"), puede resultarle confuso.
          <br/><br/>
          Para solucionar esto, puedes hacer una pequeña operación matemática visual al momento de escribir en pantalla, sumando + 1 a la variable del ciclo: <InlineCode>Escribir "Ingrese número en la posición ", (i + 1)</InlineCode>.
          <br/>
          De esta manera, internamente el programa sigue trabajando con la posición 0, pero el usuario lee "posición 1", brindando una interacción más natural.
        </Callout>
      </PageSection>
    </div>
  );
};
