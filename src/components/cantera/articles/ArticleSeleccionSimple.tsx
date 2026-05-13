import React from 'react';
import { P, PageSection, Callout, Strong, UL, ListItem, OL, NumberedItem, CodeBlock, InlineCode } from '../ArticlePageComponents';
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise';

export const ArticleSeleccionSimple: React.FC = () => (
  <div>
    <P>
      El segundo artículo de nuestra serie corresponde al <Strong>Si (If)</Strong>. Es una estructura de selección simple que permite ejecutar un bloque de código si se cumple una condición específica. Siempre dependemos de una operación de "pregunta" hacia nuestras variables o constantes para determinar el camino a seguir.
    </P>

    <PageSection title="La Pregunta: Operadores Relacionales">
      <P>Para que el algoritmo pueda decidir, debemos recordar cómo funcionan los operadores que nos permiten obtener resultados <Strong>booleanos</Strong> (Verdadero o Falso):</P>
      <UL>
        <ListItem><Strong>Mayor que</Strong>: <InlineCode>&gt;</InlineCode></ListItem>
        <ListItem><Strong>Menor que</Strong>: <InlineCode>&lt;</InlineCode></ListItem>
        <ListItem><Strong>Mayor o igual que</Strong>: <InlineCode>&gt;=</InlineCode></ListItem>
        <ListItem><Strong>Menor o igual que</Strong>: <InlineCode>&lt;=</InlineCode></ListItem>
        <ListItem><Strong>Igual a</Strong>: <InlineCode>=</InlineCode></ListItem>
        <ListItem><Strong>Diferente de</Strong>: <InlineCode>&lt;&gt;</InlineCode> (En UDONE preferimos <InlineCode>&lt;&gt;</InlineCode> sobre <InlineCode>!=</InlineCode>)</ListItem>
      </UL>
    </PageSection>

    <PageSection title="Uniendo Condiciones: Operadores Lógicos">
      <P>También podemos usar operadores para unir varias preguntas en una sola decisión utilizando el <Strong>Y (AND)</Strong> y el <Strong>O (OR)</Strong>.</P>
      <P>Esto nos permite, por ejemplo, verificar que un número sea par <Strong>Y</Strong> a la vez sea múltiplo de 5.</P>

      {/* Tablas de Verdad */}
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
          <h4 className="text-brand-300 font-bold text-center mb-3 uppercase text-sm tracking-wider">Tabla de Verdad: Y (AND)</h4>
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="py-2 font-medium">P</th>
                <th className="py-2 font-medium">Q</th>
                <th className="py-2 font-bold text-brand-400">P Y Q</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 font-mono">
              <tr className="border-b border-slate-700/30"><td className="py-2">V</td><td className="py-2">V</td><td className="py-2 text-emerald-400 font-bold">V</td></tr>
              <tr className="border-b border-slate-700/30"><td className="py-2">V</td><td className="py-2">F</td><td className="py-2 text-red-400 font-bold">F</td></tr>
              <tr className="border-b border-slate-700/30"><td className="py-2">F</td><td className="py-2">V</td><td className="py-2 text-red-400 font-bold">F</td></tr>
              <tr><td className="py-2 pt-3">F</td><td className="py-2 pt-3">F</td><td className="py-2 pt-3 text-red-400 font-bold">F</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-400 text-center mt-3">Solo es Verdadero si <Strong>ambas</Strong> lo son.</p>
        </div>
        
        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
          <h4 className="text-brand-300 font-bold text-center mb-3 uppercase text-sm tracking-wider">Tabla de Verdad: O (OR)</h4>
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="py-2 font-medium">P</th>
                <th className="py-2 font-medium">Q</th>
                <th className="py-2 font-bold text-brand-400">P O Q</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 font-mono">
              <tr className="border-b border-slate-700/30"><td className="py-2">V</td><td className="py-2">V</td><td className="py-2 text-emerald-400 font-bold">V</td></tr>
              <tr className="border-b border-slate-700/30"><td className="py-2">V</td><td className="py-2">F</td><td className="py-2 text-emerald-400 font-bold">V</td></tr>
              <tr className="border-b border-slate-700/30"><td className="py-2">F</td><td className="py-2">V</td><td className="py-2 text-emerald-400 font-bold">V</td></tr>
              <tr><td className="py-2 pt-3">F</td><td className="py-2 pt-3">F</td><td className="py-2 pt-3 text-red-400 font-bold">F</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-400 text-center mt-3">Es Verdadero si <Strong>al menos una</Strong> lo es.</p>
        </div>
      </div>
      
      <div className="mb-4 mt-6">
        <h3 className="text-lg font-semibold text-brand-300 mb-3">El manejo de Rangos</h3>
        <P>Un uso muy común es verificar si un número <InlineCode>x</InlineCode> está en un rango (por ejemplo, entre 1 y 10). En programación, esto <Strong>debe</Strong> expresarse como dos condiciones unidas:</P>
      </div>

      <Callout variant="warning">
        <P className="mb-2"><Strong>Correcto</Strong>: <InlineCode>(x &gt;= 1) Y (x &lt;= 10)</InlineCode></P>
        <P className="mb-0"><Strong>Incorrecto</Strong>: <InlineCode>1 &lt; x &lt; 10</InlineCode> (Las operaciones encadenadas no existen en pseudocódigo).</P>
      </Callout>
    </PageSection>

    <PageSection title="Sintaxis en Pseudocódigo UDONE">
      <P>Para escribirlo correctamente, debes seguir este orden estricto:</P>
      <OL>
        <NumberedItem n={1} label="La palabra reservada Si">
          Es el inicio de la estructura de decisión.
        </NumberedItem>
        <NumberedItem n={2} label="Paréntesis obligatorios">
          Que contienen la condición o pregunta a evaluar.
        </NumberedItem>
        <NumberedItem n={3} label="La palabra Entonces">
          Indica qué hacer si la respuesta es verdadera.
        </NumberedItem>
        <NumberedItem n={4} label="El bloque de código a ejecutar">
          Las instrucciones internas (con sangría).
        </NumberedItem>
        <NumberedItem n={5} label="La instrucción Fin Si">
          Marca el cierre definitivo de la estructura.
        </NumberedItem>
      </OL>
      <div className="mt-4">
        <CodeBlock code={`Si (Condición) Entonces
    // Código que se ejecuta si es Verdadero
Fin Si`} />
      </div>
    </PageSection>

    <PageSection title="Ejemplo Práctico: Control de Velocidad">
      <P>Imagina un sistema que solo debe alertar si un conductor va muy rápido. Si va a velocidad normal, el sistema no hace nada.</P>
      <P><Strong>Enunciado:</Strong> Diseñe un algoritmo que reciba la velocidad de un vehículo y, si supera los 80 km/h, muestre un mensaje de advertencia.</P>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-brand-300 mb-3">Solución:</h3>
        <CodeBlock code={`Algoritmo Alerta_Velocidad
  Variables:
    velocidad: Real

Inicio
  Escribir "Ingrese la velocidad actual (km/h): "
  Leer velocidad

  Si (velocidad > 80) Entonces
    Escribir "¡ADVERTENCIA! Estás excediendo el límite permitido."
  Fin Si

  Escribir "Fin del monitoreo."
Fin`} />
      </div>
    </PageSection>
    
    <PageSection title="Visualización del Flujo">
      <P>
        En nuestra plataforma interactiva (Laboratorio de Flujo), podrás ver cómo se mueve el flujo a través de este tipo de diagramas. Observa cómo el "hilo" de ejecución llega al rombo y decide si entrar al bloque o saltárselo.
      </P>
      
      {/* Interactive Flow Lab Embedded */}
      <InteractiveFlowExercise 
        title="Laboratorio: Alerta de Velocidad"
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 100, y: 30 },
          { id: 'io_print', type: 'io', label: 'Escribir', x: 100, y: 80 },
          { id: 'io_read', type: 'io', label: 'Leer velocidad', x: 100, y: 130 },
          { id: 'cond_vel', type: 'condition', label: 'velocidad > 80', x: 100, y: 200 },
          { id: 'print_warn', type: 'io', label: 'Escribir "ADVERTENCIA"', x: 180, y: 270 },
          { id: 'print_end', type: 'io', label: 'Escribir "Fin..."', x: 100, y: 340 },
          { id: 'end', type: 'end', label: 'Fin', x: 100, y: 410 }
        ]}
        edges={[
          { from: 'start', to: 'io_print' },
          { from: 'io_print', to: 'io_read' },
          { from: 'io_read', to: 'cond_vel' },
          { from: 'cond_vel', to: 'print_warn', label: 'V' },
          { from: 'cond_vel', to: 'print_end', label: 'F' },
          { from: 'print_warn', to: 'print_end' },
          { from: 'print_end', to: 'end' }
        ]}
        code={[
          'Algoritmo Alerta_Velocidad',
          'Declaración',
          '  Variables:',
          '    velocidad: Real',
          'Inicio',
          '  Escribir "Ingrese la velocidad actual (km/h): "',
          '  Leer velocidad',
          '  Si (velocidad > 80) Entonces',
          '    Escribir "¡ADVERTENCIA! Estás excediendo el límite."',
          '  Fin Si',
          '  Escribir "Fin del monitoreo."',
          'Fin'
        ]}
        plan={{
          start: { nodeId: 'start', line: 5, action: 'print', output: '> Iniciando algoritmo...' },
          io_print: { nodeId: 'io_print', line: 6, action: 'print', output: 'Ingrese la velocidad actual (km/h): ' },
          io_read: { nodeId: 'io_read', line: 7, action: 'wait_input', variable: 'velocidad', output: '' },
          cond_vel: {
            nodeId: 'cond_vel',
            line: 8,
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.velocidad) > 80 ? 'print_warn' : 'print_end')
          },
          print_warn: { nodeId: 'print_warn', line: 9, action: 'print', output: '¡ADVERTENCIA! Estás excediendo el límite permitido.' },
          print_end: { nodeId: 'print_end', line: 11, action: 'print', output: 'Fin del monitoreo.' },
          end: { nodeId: 'end', line: 12, action: 'end', output: '> Fin del algoritmo.' }
        }}
        initialMemory={[{ name: 'velocidad', value: null, type: 'number' }]}
      />
    </PageSection>
  </div>
);
