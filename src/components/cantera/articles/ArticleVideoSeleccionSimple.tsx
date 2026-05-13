import React from 'react';
import { 
  P, PageSection, PageSubSection, UL, ListItem, 
  Callout, YouTubeEmbed, Strong, InlineCode, CodeBlock 
} from '../ArticlePageComponents';
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise';

export const ArticleVideoSeleccionSimple: React.FC = () => (
  <div>
    <P>
      En esta lección de apoyo visual, repasaremos los conceptos fundamentales de las estructuras de selección, centrándonos en la lógica detrás de la toma de decisiones en un algoritmo.
    </P>

    <YouTubeEmbed 
      videoId="jEehW5m7eVE" 
      title="Estructuras de Selección (SI #009)" 
    />

    <PageSection title="1. Introducción">
      <P>
        Hasta ahora, nuestros algoritmos han sido lineales: ejecutan la instrucción A, luego la B y luego la C. Pero en el mundo real, los programas no siempre siguen un flujo fijo. A veces, necesitamos ejecutar ciertas líneas de código solo en momentos específicos, dependiendo de una condición.
      </P>
      <P>
        Un programa debe ser capaz de reaccionar según los datos que suministra el usuario. Para lograr esto, utilizamos las <Strong>estructuras de selección</Strong>.
      </P>
    </PageSection>

    <PageSection title="2. ¿Qué es una Condición?">
      <P>
        Una condición es una expresión lógica que nos permite determinar el camino que debe seguir nuestro algoritmo. Es, en esencia, una pregunta que solo tiene dos respuestas posibles: <Strong>Verdadero</Strong> o <Strong>Falso</Strong>.
      </P>
      <PageSubSection title="Ejemplos de la vida real">
        <UL>
          <ListItem><Strong>Caso Cine:</Strong> ¿Hay entradas disponibles? Si la respuesta es Sí (Verdadero), procedemos a comprar.</ListItem>
          <ListItem><Strong>Caso Descuento:</Strong> ¿La edad del usuario es mayor a 60 años? Si es Sí, otorgamos el descuento de tercera edad.</ListItem>
        </UL>
      </PageSubSection>
    </PageSection>

    <PageSection title="3. Tipos de Selección">
      <P>Existen tres tipos principales de estructuras de selección que estudiaremos:</P>
      <OL className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
        <li><Strong>Simple (SI-ENTONCES):</Strong> Se ejecuta una acción solo si se cumple la condición.</li>
        <li><Strong>Doble (SI-ENTONCES-SINO):</Strong> Ofrece una alternativa. Si no se cumple la condición, se hace otra cosa.</li>
        <li><Strong>Múltiple (SEGÚN-CASO):</Strong> Permite evaluar múltiples opciones (como elegir una acción distinta para cada opción).</li>
      </OL>
    </PageSection>

    <PageSection title="4. La Condición Simple: Estructura y Sintaxis">
      <P>
        Esta sección se enfoca en la <Strong>Selección Simple</Strong>. Esta permite ejecutar un bloque de instrucciones solo si el resultado de una operación lógica es Verdadero.
      </P>
      <CodeBlock code={`Si (condición) Entonces
    // Bloque de instrucciones a ejecutar
    Escribir "La condición se cumplió"
Fin Si`} />
      
      <Callout variant="tip">
        <Strong>Nota de estilo:</Strong> Es fundamental usar la sangría (indentación). Al dejar un espacio a la derecha dentro del bloque Si, le indicamos visualmente a quien lee el código qué instrucciones dependen de esa condición.
      </Callout>
    </PageSection>

    <PageSection title="5. Operadores y Tablas de Verdad">
      <P>Para construir condiciones complejas, utilizamos operadores relacionales y lógicos:</P>
      <UL>
        <ListItem><Strong>Relacionales:</Strong> <InlineCode>&gt;</InlineCode>, <InlineCode>&lt;</InlineCode>, <InlineCode>&gt;=</InlineCode>, <InlineCode>&lt;=</InlineCode>, <InlineCode>=</InlineCode> (igual), <InlineCode>&lt;&gt;</InlineCode> (diferente).</ListItem>
        <ListItem><Strong>Lógicos:</Strong> <InlineCode>NO</InlineCode>, <InlineCode>Y</InlineCode>, <InlineCode>O</InlineCode>.</ListItem>
      </UL>

      <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 my-6 max-w-md mx-auto">
        <h4 className="text-brand-300 font-bold text-center mb-3 uppercase text-xs tracking-widest">Resumen Lógico (Y / O)</h4>
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="border-b border-slate-700/50 text-slate-400">
              <th className="py-2">P</th>
              <th className="py-2">Q</th>
              <th className="py-2 text-brand-400">P Y Q</th>
              <th className="py-2 text-sky-400">P O Q</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 font-mono">
            <tr className="border-b border-slate-700/30"><td className="py-2">V</td><td className="py-2">V</td><td className="py-2 text-emerald-400">V</td><td className="py-2 text-emerald-400">V</td></tr>
            <tr className="border-b border-slate-700/30"><td className="py-2">V</td><td className="py-2">F</td><td className="py-2 text-red-400">F</td><td className="py-2 text-emerald-400">V</td></tr>
            <tr className="border-b border-slate-700/30"><td className="py-2">F</td><td className="py-2">V</td><td className="py-2 text-red-400">F</td><td className="py-2 text-emerald-400">V</td></tr>
            <tr><td className="py-2 pt-2">F</td><td className="py-2 pt-2">F</td><td className="py-2 pt-2 text-red-400">F</td><td className="py-2 pt-2 text-red-400">F</td></tr>
          </tbody>
        </table>
      </div>
    </PageSection>

    <PageSection title="6. Ejercicio Práctico: El Mayor de Dos Números">
      <P>
        <Strong>Reto:</Strong> Escribir un algoritmo que lea dos números y determine cuál es el mayor.
      </P>
      
      <PageSubSection title="Análisis">
        <UL>
          <ListItem><Strong>Entrada:</Strong> <InlineCode>num1</InlineCode>, <InlineCode>num2</InlineCode> (Enteros).</ListItem>
          <ListItem><Strong>Salida:</Strong> Un mensaje indicando cuál es el mayor.</ListItem>
        </UL>
      </PageSubSection>

      <InteractiveFlowExercise 
        title="Ejercicio: Mayor de dos números"
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 100, y: 40 },
          { id: 'io_1', type: 'io', label: 'Leer num1', x: 100, y: 110 },
          { id: 'io_2', type: 'io', label: 'Leer num2', x: 100, y: 180 },
          { id: 'cond_1', type: 'condition', label: 'num1 > num2', x: 100, y: 250 },
          { id: 'print_1', type: 'io', label: 'Escribir "N1 Mayor"', x: 180, y: 320 },
          { id: 'cond_2', type: 'condition', label: 'num2 > num1', x: 100, y: 390 },
          { id: 'print_2', type: 'io', label: 'Escribir "N2 Mayor"', x: 180, y: 460 },
          { id: 'end', type: 'end', label: 'Fin', x: 100, y: 530 }
        ]}
        edges={[
          { from: 'start', to: 'io_1' },
          { from: 'io_1', to: 'io_2' },
          { from: 'io_2', to: 'cond_1' },
          { from: 'cond_1', to: 'print_1', label: 'V' },
          { from: 'cond_1', to: 'cond_2', label: 'F' },
          { from: 'print_1', to: 'cond_2' },
          { from: 'cond_2', to: 'print_2', label: 'V' },
          { from: 'cond_2', to: 'end', label: 'F' },
          { from: 'print_2', to: 'end' }
        ]}
        code={[
          'Algoritmo MayorDeDosNumeros',
          '  Variables: num1, num2: Entero',
          'Inicio',
          '  Escribir "Indique el número 1:"',
          '  Leer num1',
          '  Escribir "Indique el número 2:"',
          '  Leer num2',
          '  Si (num1 > num2) Entonces',
          '    Escribir "El primero es el mayor"',
          '  Fin Si',
          '  Si (num2 > num1) Entonces',
          '    Escribir "El segundo es el mayor"',
          '  Fin Si',
          'Fin'
        ]}
        plan={{
          start: { nodeId: 'start', line: 3, action: 'print', output: '> Iniciando...' },
          io_1: { nodeId: 'io_1', line: 5, action: 'wait_input', variable: 'num1', output: 'Indique el número 1:' },
          io_2: { nodeId: 'io_2', line: 7, action: 'wait_input', variable: 'num2', output: 'Indique el número 2:' },
          cond_1: { 
            nodeId: 'cond_1', 
            line: 8, 
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.num1) > Number(vars.num2) ? 'print_1' : 'cond_2')
          },
          print_1: { nodeId: 'print_1', line: 9, action: 'print', output: 'El primero es el mayor' },
          cond_2: { 
            nodeId: 'cond_2', 
            line: 11, 
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.num2) > Number(vars.num1) ? 'print_2' : 'end')
          },
          print_2: { nodeId: 'print_2', line: 12, action: 'print', output: 'El segundo es el mayor' },
          end: { nodeId: 'end', line: 14, action: 'end', output: '> Fin del algoritmo.' }
        }}
        initialMemory={[
          { name: 'num1', value: null, type: 'number' },
          { name: 'num2', value: null, type: 'number' }
        ]}
      />

      <Callout variant="warning">
        <Strong>Nota Importante:</Strong> Si el usuario ingresa dos números iguales (por ejemplo, 75 y 75), ambas condiciones serán falsas y el programa no mostrará ningún mensaje de "mayor". ¿Cómo podrías modificarlo para avisar que son iguales?
      </Callout>
    </PageSection>
  </div>
);

const OL: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <ol className={className}>{children}</ol>
);
