import React from 'react';
import { 
  P, PageSection, PageSubSection, UL, ListItem, 
  Callout, Strong, InlineCode, CodeBlock 
} from '../ArticlePageComponents';
import { InteractiveFlowExercise } from '../interactive/InteractiveFlowExercise';

export const ArticleSeleccionDoble: React.FC = () => (
  <div>
    <P>
      Siguiendo la misma lógica de la estructura <Strong>Si</Strong>, ahora veremos el <Strong>Si...Sino (If...Else)</Strong>. Esta estructura mantiene el uso de paréntesis para la condición, pero añade una funcionalidad clave: si la operación resulta falsa, se ejecutará un bloque de código alternativo.
    </P>
    <P>
      La particularidad de esta estructura es que, en cada ejecución de nuestro programa, habrá un segmento de código que <Strong>no se ejecutará</Strong>. Al trabajar con algoritmos, veremos secciones que se activan dependiendo del flujo; es como una bifurcación en el camino donde elegimos un lado u otro.
    </P>

    <PageSection title="El concepto de Anidación">
      <P>
        Hasta ahora, hemos visto algoritmos con estructura lineal, pero en la práctica necesitamos la <Strong>Anidación</Strong>. La anidación es el acto de colocar un bloque de código dentro de otro.
      </P>
      <P>
        En nuestro caso, dentro de un bloque <Strong>Si</Strong>, podríamos colocar otro <Strong>Si</Strong>, y dentro de ese, otro más. También es muy común colocar un <Strong>Si</Strong> dentro del bloque del <Strong>Sino</Strong>. Para que esto no sea confuso, es vital seguir dos reglas de oro:
      </P>
      <UL>
        <ListItem>
          <Strong>Cerrar cada bloque:</Strong> Siempre debemos usar la instrucción <Strong>Fin Si</Strong> para indicar exactamente dónde termina cada estructura. Aunque en algunos lenguajes el cierre es implícito, aquí siempre lo marcaremos para evitar errores de lógica.
        </ListItem>
        <ListItem>
          <Strong>Indentación (Sangría):</Strong> Al abrir un bloque, debemos dar un pequeño espacio hacia la derecha. Esto nos permite diferenciar visualmente qué instrucciones pertenecen a cada nivel.
        </ListItem>
      </UL>
    </PageSection>

    <PageSection title="Sintaxis en UDONE">
      <CodeBlock code={`Si (Condición) Entonces
    // Camino Verdadero: Se ejecuta si se cumple
Sino
    // Camino Falso: Se ejecuta si NO se cumple
Fin Si`} />
    </PageSection>

    <PageSection title="Ejemplo 1: Par o Impar">
      <P>
        Un algoritmo clásico para decidir entre dos caminos exclusivos. Es la introducción perfecta a la bifurcación. El residuo de la división entre 2 nos dirá si el número es par (residuo 0) o impar (residuo 1).
      </P>
      
      <InteractiveFlowExercise 
        title="Ejercicio: Determinar Par o Impar"
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 100, y: 30 },
          { id: 'io_print', type: 'io', label: 'Escribir', x: 100, y: 80 },
          { id: 'io_read', type: 'io', label: 'Leer num', x: 100, y: 130 },
          { id: 'cond_par', type: 'condition', label: 'num MOD 2 = 0', x: 100, y: 200 },
          { id: 'print_par', type: 'io', label: 'Escribir "Es PAR"', x: 180, y: 270 },
          { id: 'print_impar', type: 'io', label: 'Escribir "Es IMPAR"', x: 20, y: 270 },
          { id: 'end', type: 'end', label: 'Fin', x: 100, y: 340 }
        ]}
        edges={[
          { from: 'start', to: 'io_print' },
          { from: 'io_print', to: 'io_read' },
          { from: 'io_read', to: 'cond_par' },
          { from: 'cond_par', to: 'print_par', label: 'V' },
          { from: 'cond_par', to: 'print_impar', label: 'F' },
          { from: 'print_par', to: 'end' },
          { from: 'print_impar', to: 'end' }
        ]}
        code={[
          'Algoritmo ParImpar',
          'Declaración',
          '  Variables:',
          '    num: Entero',
          'Inicio',
          '  Escribir "Ingrese un número:"',
          '  Leer num',
          '  Si (num MOD 2 = 0) Entonces',
          '    Escribir "El número es PAR"',
          '  Sino',
          '    Escribir "El número es IMPAR"',
          '  Fin Si',
          'Fin'
        ]}
        plan={{
          start: { nodeId: 'start', line: 5, action: 'print', output: '> Iniciando...' },
          io_print: { nodeId: 'io_print', line: 6, action: 'print', output: 'Ingrese un número:' },
          io_read: { nodeId: 'io_read', line: 7, action: 'wait_input', variable: 'num', output: '' },
          cond_par: { 
            nodeId: 'cond_par', 
            line: 8, 
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.num) % 2 === 0 ? 'print_par' : 'print_impar')
          },
          print_par: { nodeId: 'print_par', line: 9, action: 'print', output: 'El número es PAR' },
          print_impar: { nodeId: 'print_impar', line: 11, action: 'print', output: 'El número es IMPAR' },
          end: { nodeId: 'end', line: 13, action: 'end', output: '> Fin del algoritmo.' }
        }}
        initialMemory={[{ name: 'num', value: null, type: 'number' }]}
      />
    </PageSection>

    <PageSection title="Ejemplo 2: El mayor de tres números (Anidación)">
      <P>
        Este es el ejemplo perfecto para practicar la <Strong>anidación</Strong>, ya que debemos comparar el primer número con el segundo, y dependiendo del resultado, compararlo con el tercero.
      </P>

      <InteractiveFlowExercise 
        title="Ejercicio: El Mayor de Tres Números"
        nodes={[
          { id: 'start', type: 'start', label: 'Inicio', x: 200, y: 20 },
          { id: 'io_p1', type: 'io', label: 'Escribir', x: 200, y: 60 },
          { id: 'io_1', type: 'io', label: 'Leer n1', x: 200, y: 100 },
          { id: 'io_p2', type: 'io', label: 'Escribir', x: 200, y: 140 },
          { id: 'io_2', type: 'io', label: 'Leer n2', x: 200, y: 180 },
          { id: 'io_p3', type: 'io', label: 'Escribir', x: 200, y: 220 },
          { id: 'io_3', type: 'io', label: 'Leer n3', x: 200, y: 260 },
          { id: 'cond_1', type: 'condition', label: 'n1 > n2', x: 200, y: 320 },
          
          { id: 'cond_1v', type: 'condition', label: 'n1 > n3', x: 310, y: 380 },
          { id: 'cond_1f', type: 'condition', label: 'n2 > n3', x: 90, y: 380 },
          
          { id: 'print_n1', type: 'io', label: 'Escribir n1', x: 350, y: 460 },
          { id: 'print_n3a', type: 'io', label: 'Escribir n3', x: 270, y: 460 },
          
          { id: 'print_n2', type: 'io', label: 'Escribir n2', x: 50, y: 460 },
          { id: 'print_n3b', type: 'io', label: 'Escribir n3', x: 130, y: 460 },
          
          { id: 'end', type: 'end', label: 'Fin', x: 200, y: 540 }
        ]}
        edges={[
          { from: 'start', to: 'io_p1' },
          { from: 'io_p1', to: 'io_1' },
          { from: 'io_1', to: 'io_p2' },
          { from: 'io_p2', to: 'io_2' },
          { from: 'io_2', to: 'io_p3' },
          { from: 'io_p3', to: 'io_3' },
          { from: 'io_3', to: 'cond_1' },
          
          { from: 'cond_1', to: 'cond_1v', label: 'V' },
          { from: 'cond_1', to: 'cond_1f', label: 'F' },
          
          { from: 'cond_1v', to: 'print_n1', label: 'V' },
          { from: 'cond_1v', to: 'print_n3a', label: 'F' },
          
          { from: 'cond_1f', to: 'print_n2', label: 'V' },
          { from: 'cond_1f', to: 'print_n3b', label: 'F' },
          
          { from: 'print_n1', to: 'end' },
          { from: 'print_n3a', to: 'end' },
          { from: 'print_n2', to: 'end' },
          { from: 'print_n3b', to: 'end' }
        ]}
        code={[
          'Algoritmo MayorDeTres',
          'Declaración',
          '  Variables:',
          '    n1, n2, n3: Entero',
          'Inicio',
          '  Escribir "Ingrese n1:"',
          '  Leer n1',
          '  Escribir "Ingrese n2:"',
          '  Leer n2',
          '  Escribir "Ingrese n3:"',
          '  Leer n3',
          '  Si (n1 > n2) Entonces',
          '    Si (n1 > n3) Entonces',
          '      Escribir n1, " es el mayor"',
          '    Sino',
          '      Escribir n3, " es el mayor"',
          '    Fin Si',
          '  Sino',
          '    Si (n2 > n3) Entonces',
          '      Escribir n2, " es el mayor"',
          '    Sino',
          '      Escribir n3, " es el mayor"',
          '    Fin Si',
          '  Fin Si',
          'Fin'
        ]}
        plan={{
          start: { nodeId: 'start', line: 5, action: 'print', output: '> Iniciando...' },
          io_p1: { nodeId: 'io_p1', line: 6, action: 'print', output: 'Ingrese n1:' },
          io_1: { nodeId: 'io_1', line: 7, action: 'wait_input', variable: 'n1', output: '' },
          io_p2: { nodeId: 'io_p2', line: 8, action: 'print', output: 'Ingrese n2:' },
          io_2: { nodeId: 'io_2', line: 9, action: 'wait_input', variable: 'n2', output: '' },
          io_p3: { nodeId: 'io_p3', line: 10, action: 'print', output: 'Ingrese n3:' },
          io_3: { nodeId: 'io_3', line: 11, action: 'wait_input', variable: 'n3', output: '' },
          cond_1: { 
            nodeId: 'cond_1', 
            line: 12, 
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.n1) > Number(vars.n2) ? 'cond_1v' : 'cond_1f')
          },
          cond_1v: { 
            nodeId: 'cond_1v', 
            line: 13, 
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.n1) > Number(vars.n3) ? 'print_n1' : 'print_n3a')
          },
          cond_1f: { 
            nodeId: 'cond_1f', 
            line: 19, 
            action: 'eval_cond',
            evalNext: (vars) => (Number(vars.n2) > Number(vars.n3) ? 'print_n2' : 'print_n3b')
          },
          print_n1: { nodeId: 'print_n1', line: 14, action: 'print', output: 'El mayor es n1' },
          print_n3a: { nodeId: 'print_n3a', line: 16, action: 'print', output: 'El mayor es n3' },
          print_n2: { nodeId: 'print_n2', line: 20, action: 'print', output: 'El mayor es n2' },
          print_n3b: { nodeId: 'print_n3b', line: 22, action: 'print', output: 'El mayor es n3' },
          end: { nodeId: 'end', line: 25, action: 'end', output: '> Fin.' }
        }}
        initialMemory={[
          { name: 'n1', value: null, type: 'number' },
          { name: 'n2', value: null, type: 'number' },
          { name: 'n3', value: null, type: 'number' }
        ]}
      />
      
      <Callout variant="info">
        Nota cómo cada <InlineCode>Si</InlineCode> tiene su propio <InlineCode>Fin Si</InlineCode> y cómo la sangría ayuda a entender qué condición está dentro de cuál. Este es un ejemplo real de <Strong>anidación</Strong>.
      </Callout>
    </PageSection>

    <PageSection title="Otros Desafíos">
      <P>Para profundizar, puedes intentar resolver:</P>
      <UL>
        <ListItem><Strong>Piedra, Papel o Tijera:</Strong> Determinar el ganador evaluando múltiples condiciones anidadas.</ListItem>
        <ListItem><Strong>Cálculo de Sueldo:</Strong> Aplicar bonos del 50% si las horas superan las 40, y restar impuestos al final.</ListItem>
      </UL>
    </PageSection>
  </div>
);
