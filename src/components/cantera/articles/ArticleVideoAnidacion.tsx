import React from 'react'
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise'

export const ArticleVideoAnidacion: React.FC = () => {
  return (
    <div className='prose prose-slate max-w-none prose-invert'>
      <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8'>
        <h1 className='text-3xl font-bold text-white mb-4'>
          Apoyo Visual: Estructuras Anidadas
        </h1>
        <p className='text-slate-400'>
          En este video exploramos el concepto de <strong>anidamiento</strong>:
          colocar una decisión dentro de otra para resolver problemas complejos
          de múltiples niveles.
        </p>
      </div>

      <div className='aspect-video w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl mb-12'>
        <iframe
          className='w-full h-full'
          src='https://www.youtube.com/embed/Of1Aqk3aD6o'
          title='Estructuras de Selección Anidada'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>

      <h2 className='text-2xl font-bold text-brand-400 mb-6'>
        1. ¿Qué es el anidamiento?
      </h2>
      <p>
        Anidar consiste en colocar un bloque <code>Si</code> dentro de las
        instrucciones de otro bloque <code>Si</code> (ya sea en el camino
        verdadero o en el <code>Sino</code>).
      </p>

      <div className='bg-amber-500/10 border-l-4 border-amber-500 p-4 my-6 italic text-slate-300'>
        "La indentación (el sangrado a la izquierda) es vital para no perderse
        entre tantos niveles de decisión."
      </div>

      <h2 className='text-2xl font-bold text-brand-400 mb-6'>
        2. Caso de Estudio: Clasificación de Triángulos
      </h2>
      <p>
        Para clasificar un triángulo, primero debemos saber si las medidas
        pueden formar uno. Solo si la respuesta es afirmativa, procedemos a
        preguntar si es Equilátero, Isósceles o Escaleno.
      </p>

      <InteractiveFlowExercise
        title='Ejercicio: Clasificador de Triángulos'
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 200, y: 10 },
          { id: 'io_pa', type: 'io', label: 'Escribir', x: 200, y: 50 },
          { id: 'io_a', type: 'io', label: 'Leer a', x: 200, y: 90 },
          { id: 'io_pb', type: 'io', label: 'Escribir', x: 200, y: 130 },
          { id: 'io_b', type: 'io', label: 'Leer b', x: 200, y: 170 },
          { id: 'io_pc', type: 'io', label: 'Escribir', x: 200, y: 210 },
          { id: 'io_c', type: 'io', label: 'Leer c', x: 200, y: 250 },
          {
            id: 'cond_exist',
            type: 'condition',
            label: '¿Es Triángulo?',
            x: 200,
            y: 310
          },
          {
            id: 'cond_equi',
            type: 'condition',
            label: '¿Equilátero?',
            x: 310,
            y: 370
          },
          {
            id: 'cond_iso',
            type: 'condition',
            label: '¿Isósceles?',
            x: 240,
            y: 450
          },
          {
            id: 'print_no',
            type: 'io',
            label: 'No es Triángulo',
            x: 90,
            y: 370
          },
          { id: 'print_equi', type: 'io', label: 'Equilátero', x: 370, y: 450 },
          { id: 'print_iso', type: 'io', label: 'Isósceles', x: 300, y: 530 },
          { id: 'print_esca', type: 'io', label: 'Escaleno', x: 180, y: 530 },
          { id: 'end', type: 'end', label: 'Fin', x: 200, y: 610 }
        ]}
        edges={[
          { from: 'start', to: 'io_pa' },
          { from: 'io_pa', to: 'io_a' },
          { from: 'io_a', to: 'io_pb' },
          { from: 'io_pb', to: 'io_b' },
          { from: 'io_b', to: 'io_pc' },
          { from: 'io_pc', to: 'io_c' },
          { from: 'io_c', to: 'cond_exist' },

          { from: 'cond_exist', to: 'cond_equi', label: 'V' },
          { from: 'cond_exist', to: 'print_no', label: 'F' },

          { from: 'cond_equi', to: 'print_equi', label: 'V' },
          { from: 'cond_equi', to: 'cond_iso', label: 'F' },

          { from: 'cond_iso', to: 'print_iso', label: 'V' },
          { from: 'cond_iso', to: 'print_esca', label: 'F' },

          { from: 'print_no', to: 'end' },
          { from: 'print_equi', to: 'end' },
          { from: 'print_iso', to: 'end' },
          { from: 'print_esca', to: 'end' }
        ]}
        code={[
          'Algoritmo Triangulos',
          'Declaración',
          '  Variables:',
          '    a, b, c: Real',
          'Inicio',
          '  Escribir "Ingrese lado a:"',
          '  Leer a',
          '  Escribir "Ingrese lado b:"',
          '  Leer b',
          '  Escribir "Ingrese lado c:"',
          '  Leer c',
          '  Si ((a + b > c) Y (a + c > b) Y (b + c > a)) Entonces',
          '    Si (a = b) Y (b = c) Entonces',
          '      Escribir "Es un triángulo Equilátero."',
          '    Sino',
          '      Si ((a = b) O (b = c) O (a = c)) Entonces',
          '        Escribir "Es un triángulo Isósceles."',
          '      Sino',
          '        Escribir "Es un triángulo Escaleno."',
          '      Fin Si',
          '    Fin Si',
          '  Sino',
          '    Escribir "Los lados no forman un triángulo."',
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
            output: 'Ingrese lado a:'
          },
          io_a: {
            nodeId: 'io_a',
            line: 7,
            action: 'wait_input',
            variable: 'a',
            output: ''
          },
          io_pb: {
            nodeId: 'io_pb',
            line: 8,
            action: 'print',
            output: 'Ingrese lado b:'
          },
          io_b: {
            nodeId: 'io_b',
            line: 9,
            action: 'wait_input',
            variable: 'b',
            output: ''
          },
          io_pc: {
            nodeId: 'io_pc',
            line: 10,
            action: 'print',
            output: 'Ingrese lado c:'
          },
          io_c: {
            nodeId: 'io_c',
            line: 11,
            action: 'wait_input',
            variable: 'c',
            output: ''
          },
          cond_exist: {
            nodeId: 'cond_exist',
            line: 12,
            action: 'eval_cond',
            evalNext: (vars) => {
              const a = Number(vars.a || 0)
              const b = Number(vars.b || 0)
              const c = Number(vars.c || 0)
              return a + b > c && a + c > b && b + c > a
                ? 'cond_equi'
                : 'print_no'
            }
          },
          cond_equi: {
            nodeId: 'cond_equi',
            line: 13,
            action: 'eval_cond',
            evalNext: (vars) =>
              Number(vars.a) === Number(vars.b) && Number(vars.b) === Number(vars.c)
                ? 'print_equi'
                : 'cond_iso'
          },
          cond_iso: {
            nodeId: 'cond_iso',
            line: 16,
            action: 'eval_cond',
            evalNext: (vars) => {
              const a = Number(vars.a)
              const b = Number(vars.b)
              const c = Number(vars.c)
              return a === b || b === c || a === c ? 'print_iso' : 'print_esca'
            }
          },
          print_equi: {
            nodeId: 'print_equi',
            line: 14,
            action: 'print',
            output: 'Resultado: Equilátero'
          },
          print_iso: {
            nodeId: 'print_iso',
            line: 17,
            action: 'print',
            output: 'Resultado: Isósceles'
          },
          print_esca: {
            nodeId: 'print_esca',
            line: 19,
            action: 'print',
            output: 'Resultado: Escaleno'
          },
          print_no: {
            nodeId: 'print_no',
            line: 23,
            action: 'print',
            output: 'Error: No es un triángulo'
          },
          end: { nodeId: 'end', line: 26, action: 'end', output: '> Fin.' }
        }}
        initialMemory={[
          { name: 'a', value: null, type: 'number' },
          { name: 'b', value: null, type: 'number' },
          { name: 'c', value: null, type: 'number' }
        ]}
      />
    </div>
  )
}
