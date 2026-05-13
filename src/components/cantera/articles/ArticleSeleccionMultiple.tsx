import React from 'react';
import { P, Strong, CodeBlock } from '../ArticlePageComponents';
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise';

export const ArticleSeleccionMultiple: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none prose-invert">
      <P>
        Cuando tenemos una variable que puede tomar muchos valores específicos (como un menú de opciones o los días de la semana), usar muchos <Strong>Si - Sino</Strong> anidados puede volverse confuso. Para estos casos, UDONE utiliza la estructura <Strong>Caso</Strong>.
      </P>

      <h2 className="text-2xl font-bold text-brand-400 mb-6">1. Sintaxis en UDONE</h2>
      <CodeBlock code={`Caso <Variable>
  Valor1: <Instrucciones>
  Valor2: <Instrucciones>
  Sino: <Instrucciones_por_defecto>
Fin Caso`} />

      <h2 className="text-2xl font-bold text-brand-400 mb-6">2. Ejemplo Práctico: Menú de Comida</h2>
      <P>
        Imagina un sistema de pedidos donde el usuario elige una opción del 1 al 3. Si elige otro número, el sistema debe dar un error.
      </P>

      <InteractiveFlowExercise 
        title="Ejercicio: Menú del Día"
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 200, y: 30 },
          { id: 'print_menu', type: 'io', label: 'Mostrar Menú', x: 200, y: 80 },
          { id: 'io_read', type: 'io', label: 'Leer opcion', x: 200, y: 130 },
          { id: 'cond_case', type: 'condition', label: 'Caso opcion', x: 200, y: 200 },
          
          { id: 'print_1', type: 'io', label: 'Pabellón', x: 50, y: 280 },
          { id: 'print_2', type: 'io', label: 'Asado', x: 150, y: 280 },
          { id: 'print_3', type: 'io', label: 'Pescado', x: 250, y: 280 },
          { id: 'print_err', type: 'io', label: 'Inválido', x: 350, y: 280 },
          
          { id: 'end', type: 'end', label: 'Fin', x: 200, y: 360 }
        ]}
        edges={[
          { from: 'start', to: 'print_menu' },
          { from: 'print_menu', to: 'io_read' },
          { from: 'io_read', to: 'cond_case' },
          
          { from: 'cond_case', to: 'print_1', label: '1' },
          { from: 'cond_case', to: 'print_2', label: '2' },
          { from: 'cond_case', to: 'print_3', label: '3' },
          { from: 'cond_case', to: 'print_err', label: 'Sino' },
          
          { from: 'print_1', to: 'end' },
          { from: 'print_2', to: 'end' },
          { from: 'print_3', to: 'end' },
          { from: 'print_err', to: 'end' }
        ]}
        code={[
          'Algoritmo Menu_Restaurante',
          'Declaración',
          '  Variables:',
          '    opcion: Entero',
          'Inicio',
          '  Escribir "1. Pabellón, 2. Asado, 3. Pescado"',
          '  Leer opcion',
          '  Caso opcion',
          '    1: Escribir "Elegiste: Pabellón"',
          '    2: Escribir "Elegiste: Asado"',
          '    3: Escribir "Elegiste: Pescado"',
          '    Sino: Escribir "Opción no válida"',
          '  Fin Caso',
          'Fin'
        ]}
        plan={{
          start: { nodeId: 'start', line: 6, action: 'print', output: '> Iniciando...' },
          print_menu: { nodeId: 'print_menu', line: 7, action: 'print', output: '1. Pabellón, 2. Asado, 3. Pescado' },
          io_read: { nodeId: 'io_read', line: 8, action: 'wait_input', variable: 'opcion', output: 'Elija su opción (1-3):' },
          cond_case: { 
            nodeId: 'cond_case', 
            line: 9, 
            action: 'eval_cond',
            evalNext: (vars) => {
              const op = Number(vars.opcion);
              if (op === 1) return 'print_1';
              if (op === 2) return 'print_2';
              if (op === 3) return 'print_3';
              return 'print_err';
            }
          },
          print_1: { nodeId: 'print_1', line: 10, action: 'print', output: 'Elegiste: Pabellón' },
          print_2: { nodeId: 'print_2', line: 11, action: 'print', output: 'Elegiste: Asado' },
          print_3: { nodeId: 'print_3', line: 12, action: 'print', output: 'Elegiste: Pescado' },
          print_err: { nodeId: 'print_err', line: 13, action: 'print', output: 'Opción no válida' },
          end: { nodeId: 'end', line: 15, action: 'end', output: '> Fin.' }
        }}
        initialMemory={[
          { name: 'opcion', value: null, type: 'number' }
        ]}
      />

      <h2 className="text-2xl font-bold text-brand-400 mt-12 mb-6">Reglas Importantes del "Caso"</h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-300">
        <li><strong>Variable de control</strong>: Normalmente es de tipo Entero o Carácter.</li>
        <li><strong>Valores específicos</strong>: No se usa para rangos (como "mayor que 10"), sino para valores exactos.</li>
        <li><strong>El Sino</strong>: Es opcional, pero se recomienda usarlo para atrapar cualquier valor que no hayamos previsto.</li>
      </ul>
    </div>
  );
};
