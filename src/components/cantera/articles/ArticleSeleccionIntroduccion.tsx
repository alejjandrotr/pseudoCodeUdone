import React from 'react';
import { P, PageSection, Callout, DataTypesTable, Strong } from '../ArticlePageComponents';
import { SelectionFlowDemoPage } from '../../../pages/SelectionFlowDemoPage';

export const ArticleSeleccionIntroduccion: React.FC = () => (
  <div>
    <P>
      En el mundo de la programación, no siempre queremos que nuestro código se ejecute como una simple lista de mercado, de arriba hacia abajo sin detenerse. A veces, necesitamos que nuestro algoritmo <Strong>tome decisiones</Strong>.
    </P>

    <PageSection title="¿Qué es la Selección?">
      <P>
        Una <Strong>estructura de selección</Strong> es una instrucción que nos permite ejecutar un bloque de código específico dependiendo de si se cumple o no una <Strong>condición</Strong>.
      </P>
      <P>
        Imagina que el flujo de tu programa es un camino: hasta ahora hemos caminado en línea recta (flujo secuencial). La selección es como llegar a un cruce de caminos donde, dependiendo de una señal (la condición), eliges ir por la izquierda o por la derecha.
      </P>
      <Callout variant="warning">
        <Strong>Una condición siempre se evalúa como Verdadera o Falsa (valores lógicos).</Strong>
      </Callout>
    </PageSection>

    <PageSection title="Del Código Secuencial al Flujo Alternativo">
      <P>En las lecciones anteriores, vimos que cada línea se ejecuta una tras otra. Pero con la selección, podemos <Strong>omitir</Strong> secciones enteras o elegir entre <Strong>alternativas</Strong>.</P>
      
      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-xl border bg-slate-800/20 border-slate-700">
          <h3 className="font-bold text-brand-300 mb-2">1. Clasificación de Trato</h3>
          <ul className="list-disc pl-5 text-slate-300">
            <li><Strong>Si</Strong> la persona es hombre → Mostrar "Bienvenido, Señor".</li>
            <li><Strong>Si</Strong> la persona es mujer → Mostrar "Bienvenida, Señora".</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl border bg-slate-800/20 border-slate-700">
          <h3 className="font-bold text-brand-300 mb-2">2. Validación Matemática</h3>
          <ul className="list-disc pl-5 text-slate-300">
            <li><Strong>Si</Strong> el residuo de un número dividido entre 2 es cero → El número es <Strong>Par</Strong>.</li>
            <li><Strong>Si no</Strong> → El número es <Strong>Impar</Strong>.</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl border bg-slate-800/20 border-slate-700">
          <h3 className="font-bold text-brand-300 mb-2">3. Seguridad Vial (Física)</h3>
          <ul className="list-disc pl-5 text-slate-300">
            <li><Strong>Si</Strong> la velocidad calculada es mayor a 100 km/h → Mostrar alerta.</li>
          </ul>
        </div>
      </div>
    </PageSection>

    <PageSection title="Estructuras en UDONE">
      <P>En la <Strong>Universidad de Oriente (UDONE)</Strong>, utilizaremos tres estructuras principales para manejar estas decisiones:</P>
      
      <DataTypesTable 
        rows={[
          { tipo: 'Si (If)', descripcion: 'Para ejecutar algo solo si se cumple una condición única.', ejemplo: 'Selección Simple' },
          { tipo: 'Si - Sino (If-Else)', descripcion: 'Para elegir entre dos caminos obligatorios.', ejemplo: 'Selección Doble' },
          { tipo: 'Caso (Switch/Case)', descripcion: 'Para elegir entre múltiples opciones basadas en el valor de una variable.', ejemplo: 'Selección Múltiple' }
        ]}
      />
    </PageSection>

    <PageSection title="Componente Interactivo: Laboratorio de Flujo">
      <P>
        Para facilitar el aprendizaje de las estructuras de selección, se ha implementado un componente interactivo de visualización llamado <Strong>Laboratorio de Flujo</Strong>. Este componente vincula directamente la ejecución paso a paso del pseudocódigo con su representación geométrica (diagrama de flujo) en tiempo real.
      </P>
      <ul className="list-disc pl-5 text-slate-300 mb-6 space-y-2">
        <li><Strong>Ejecución Visual Dinámica</Strong>: Observa cómo avanza el algoritmo y se pausa en cada paso clave.</li>
        <li><Strong>Trazabilidad Permanente</Strong>: Los caminos se iluminan y mantienen su color para análisis posterior.</li>
        <li><Strong>Inspección Bidireccional</Strong>: Haz clic en cualquier figura para resaltar la línea de pseudocódigo exacta.</li>
        <li><Strong>Memoria y Consola</Strong>: Ver el estado en vivo de las RAM y usar la terminal.</li>
      </ul>
      
      {/* Interactive Flow Lab Embedded */}
      <div className="mt-10 border-t border-slate-800 pt-8">
        <SelectionFlowDemoPage />
      </div>
    </PageSection>
  </div>
);
