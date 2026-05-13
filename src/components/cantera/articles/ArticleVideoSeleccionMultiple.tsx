import React from 'react';
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise';

export const ArticleVideoSeleccionMultiple: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none prose-invert">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Apoyo Visual: Selección Múltiple</h1>
        <p className="text-slate-400">
          En este video exploramos la estructura <strong>CASO</strong>, ideal para cuando una sola variable puede tomar múltiples valores exactos.
        </p>
      </div>

      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl mb-12">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/SD-pMKS_PJY" 
          title="Estructura de Selección Múltiple"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      <h2 className="text-2xl font-bold text-brand-400 mb-6">1. Características Principales</h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-300">
        <li><strong>Solo igualdad</strong>: No evalúa rangos (mayor/menor).</li>
        <li><strong>Tipos discretos</strong>: Funciona con Enteros, Caracteres o Cadenas.</li>
        <li><strong>Eficiencia visual</strong>: Mucho más limpio que anidar 7 bloques Si-Sino.</li>
      </ul>

      <InteractiveFlowExercise 
        title="Ejercicio: Días de la Semana"
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 200, y: 10 },
          { id: 'io_print', type: 'io', label: 'Escribir', x: 200, y: 50 },
          { id: 'io_read', type: 'io', label: 'Leer numDia', x: 200, y: 90 },
          { id: 'case_dia', type: 'condition', label: 'Caso numDia', x: 200, y: 160 },
          
          { id: 'd1', type: 'io', label: 'Lunes', x: 20, y: 260 },
          { id: 'd2', type: 'io', label: 'Martes', x: 70, y: 260 },
          { id: 'd3', type: 'io', label: 'Miércoles', x: 120, y: 260 },
          { id: 'd4', type: 'io', label: 'Jueves', x: 170, y: 260 },
          { id: 'd5', type: 'io', label: 'Viernes', x: 230, y: 260 },
          { id: 'd6', type: 'io', label: 'Sábado', x: 280, y: 260 },
          { id: 'd7', type: 'io', label: 'Domingo', x: 330, y: 260 },
          { id: 'd_err', type: 'io', label: 'Error', x: 380, y: 260 },
          
          { id: 'end', type: 'end', label: 'Fin', x: 200, y: 340 }
        ]}
        edges={[
          { from: 'start', to: 'io_print' },
          { from: 'io_print', to: 'io_read' },
          { from: 'io_read', to: 'case_dia' },
          
          { from: 'case_dia', to: 'd1', label: '1' },
          { from: 'case_dia', to: 'd2', label: '2' },
          { from: 'case_dia', to: 'd3', label: '3' },
          { from: 'case_dia', to: 'd4', label: '4' },
          { from: 'case_dia', to: 'd5', label: '5' },
          { from: 'case_dia', to: 'd6', label: '6' },
          { from: 'case_dia', to: 'd7', label: '7' },
          { from: 'case_dia', to: 'd_err', label: 'Sino' },
          
          { from: 'd1', to: 'end' },
          { from: 'd2', to: 'end' },
          { from: 'd3', to: 'end' },
          { from: 'd4', to: 'end' },
          { from: 'd5', to: 'end' },
          { from: 'd6', to: 'end' },
          { from: 'd7', to: 'end' },
          { from: 'd_err', to: 'end' }
        ]}
        code={[
          'Algoritmo DiasSemana',
          'Declaración',
          '  Variables:',
          '    numDia: Entero',
          'Inicio',
          '  Escribir "Indique el número del día (1-7):"',
          '  Leer numDia',
          '  Caso numDia',
          '    1: Escribir "Lunes"',
          '    2: Escribir "Martes"',
          '    3: Escribir "Miércoles"',
          '    4: Escribir "Jueves"',
          '    5: Escribir "Viernes"',
          '    6: Escribir "Sábado"',
          '    7: Escribir "Domingo"',
          '    Sino: Escribir "No existe"',
          '  Fin Caso',
          'Fin'
        ]}
        plan={{
          start: { nodeId: 'start', line: 5, action: 'print', output: '> Iniciando...' },
          io_print: { nodeId: 'io_print', line: 6, action: 'print', output: 'Indique el número del día (1-7):' },
          io_read: { nodeId: 'io_read', line: 7, action: 'wait_input', variable: 'numDia', output: '' },
          case_dia: { 
            nodeId: 'case_dia', 
            line: 8, 
            action: 'eval_cond',
            evalNext: (vars) => {
              const d = Number(vars.numDia);
              if (d >= 1 && d <= 7) return `d${d}`;
              return 'd_err';
            }
          },
          d1: { nodeId: 'd1', line: 9, action: 'print', output: 'Hoy es Lunes' },
          d2: { nodeId: 'd2', line: 10, action: 'print', output: 'Hoy es Martes' },
          d3: { nodeId: 'd3', line: 11, action: 'print', output: 'Hoy es Miércoles' },
          d4: { nodeId: 'd4', line: 12, action: 'print', output: 'Hoy es Jueves' },
          d5: { nodeId: 'd5', line: 13, action: 'print', output: 'Hoy es Viernes' },
          d6: { nodeId: 'd6', line: 14, action: 'print', output: 'Hoy es Sábado' },
          d7: { nodeId: 'd7', line: 15, action: 'print', output: 'Hoy es Domingo' },
          d_err: { nodeId: 'd_err', line: 16, action: 'print', output: 'Error: Día inválido' },
          end: { nodeId: 'end', line: 18, action: 'end', output: '> Fin.' }
        }}
        initialMemory={[
          { name: 'numDia', value: null, type: 'number' }
        ]}
      />
    </div>
  );
};
