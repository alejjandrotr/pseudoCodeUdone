import React from 'react'
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise'
import { NumberedItem } from '../ArticlePageComponents'

export const ArticleVideoSeleccionDoble: React.FC = () => {
  return (
    <div className='prose prose-slate max-w-none prose-invert'>
      <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8'>
        <h1 className='text-3xl font-bold text-white mb-4'>
          Apoyo Visual: Estructuras de Selección Doble
        </h1>
        <p className='text-slate-400'>
          En este video profundizamos en el uso del <strong>SINO</strong> para
          manejar alternativas y evitar mensajes ausentes que confunden al
          usuario.
        </p>
      </div>

      <div className='aspect-video w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl mb-12'>
        <iframe
          className='w-full h-full'
          src='https://www.youtube.com/embed/8OiTic4ga_c'
          title='Estructuras de Selección Doble'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>

      <h2 className='text-2xl font-bold text-brand-400 mb-6'>
        1. Reto: El número equivalente a la suma de los otros dos
      </h2>
      <p>
        Un desafío común es determinar relaciones entre varios datos. Por
        ejemplo, dados tres números A, B y C, queremos saber si uno es la suma
        de los otros dos.
      </p>

      <div className='bg-blue-500/10 border-l-4 border-blue-500 p-4 my-6'>
        <p className='text-blue-200 m-0'>
          <strong>Condición lógica:</strong>{' '}
          <code>(A = B + C) O (B = A + C) O (C = A + B)</code>
        </p>
      </div>

      <h2 className='text-2xl font-bold text-brand-400 mb-6'>
        2. La Estructura SI-ENTONCES-SINO
      </h2>
      <p>
        Usar dos bloques "Si" independientes para el caso positivo y negativo es
        ineficiente. La solución profesional es la estructura doble:
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <NumberedItem n={1} label='Eficiencia'>
          El computador solo evalúa la expresión una única vez.
        </NumberedItem>
        <NumberedItem n={2} label='Claridad'>
          El código refleja fielmente que solo hay dos caminos mutuamente
          excluyentes.
        </NumberedItem>
        <NumberedItem n={3} label='Exclusividad'>
          Garantizamos que se ejecute un bloque o el otro, nunca ambos.
        </NumberedItem>
      </div>

      <InteractiveFlowExercise
        title='Ejercicio: Suma de dos números'
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 200, y: 20 },
          { id: 'io_pa', type: 'io', label: 'Escribir', x: 200, y: 60 },
          { id: 'io_a', type: 'io', label: 'Leer A', x: 200, y: 100 },
          { id: 'io_pb', type: 'io', label: 'Escribir', x: 200, y: 140 },
          { id: 'io_b', type: 'io', label: 'Leer B', x: 200, y: 180 },
          { id: 'io_pc', type: 'io', label: 'Escribir', x: 200, y: 220 },
          { id: 'io_c', type: 'io', label: 'Leer C', x: 200, y: 260 },
          {
            id: 'cond',
            type: 'condition',
            label: '¿Suma de 2?',
            x: 200,
            y: 330
          },
          { id: 'print_v', type: 'io', label: 'Escribir "SÍ"', x: 300, y: 410 },
          { id: 'print_f', type: 'io', label: 'Escribir "NO"', x: 100, y: 410 },
          { id: 'end', type: 'end', label: 'Fin', x: 200, y: 490 }
        ]}
        edges={[
          { from: 'start', to: 'io_pa' },
          { from: 'io_pa', to: 'io_a' },
          { from: 'io_a', to: 'io_pb' },
          { from: 'io_pb', to: 'io_b' },
          { from: 'io_b', to: 'io_pc' },
          { from: 'io_pc', to: 'io_c' },
          { from: 'io_c', to: 'cond' },
          { from: 'cond', to: 'print_v', label: 'V' },
          { from: 'cond', to: 'print_f', label: 'F' },
          { from: 'print_v', to: 'end' },
          { from: 'print_f', to: 'end' }
        ]}
        code={[
          'Algoritmo SumaDeDos',
          'Declaración',
          '  Variables:',
          '    A, B, C: Entero',
          'Inicio',
          '  Escribir "Ingrese A:"',
          '  Leer A',
          '  Escribir "Ingrese B:"',
          '  Leer B',
          '  Escribir "Ingrese C:"',
          '  Leer C',
          '  Si ((A = B + C) O (B = A + C) O (C = A + B)) Entonces',
          '    Escribir "Existe un número que es la suma..."',
          '  Sino',
          '    Escribir "No existe ningún número..."',
          '  Fin Si',
          'Fin'
        ]}
        plan={{
          start: {
            nodeId: 'start',
            line: 5,
            action: 'print',
            output: '> Iniciando...'
          },
          io_pa: {
            nodeId: 'io_pa',
            line: 6,
            action: 'print',
            output: 'Ingrese A:'
          },
          io_a: {
            nodeId: 'io_a',
            line: 7,
            action: 'wait_input',
            variable: 'A',
            output: ''
          },
          io_pb: {
            nodeId: 'io_pb',
            line: 8,
            action: 'print',
            output: 'Ingrese B:'
          },
          io_b: {
            nodeId: 'io_b',
            line: 9,
            action: 'wait_input',
            variable: 'B',
            output: ''
          },
          io_pc: {
            nodeId: 'io_pc',
            line: 10,
            action: 'print',
            output: 'Ingrese C:'
          },
          io_c: {
            nodeId: 'io_c',
            line: 11,
            action: 'wait_input',
            variable: 'C',
            output: ''
          },
          cond: {
            nodeId: 'cond',
            line: 12,
            action: 'eval_cond',
            evalNext: (vars) => {
              const a = Number(vars.A)
              const b = Number(vars.B)
              const c = Number(vars.C)
              return a === b + c || b === a + c || c === a + b
                ? 'print_v'
                : 'print_f'
            }
          },
          print_v: {
            nodeId: 'print_v',
            line: 13,
            action: 'print',
            output: 'SÍ: Existe la suma'
          },
          print_f: {
            nodeId: 'print_f',
            line: 15,
            action: 'print',
            output: 'NO: No existe la suma'
          },
          end: { nodeId: 'end', line: 17, action: 'end', output: '> Fin.' }
        }}
        initialMemory={[
          { name: 'A', value: null, type: 'number' },
          { name: 'B', value: null, type: 'number' },
          { name: 'C', value: null, type: 'number' }
        ]}
      />
    </div>
  )
}
