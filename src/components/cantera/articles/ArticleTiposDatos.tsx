import React from 'react';
import {
  P, PageSection, PageSubSection, UL, DefItem, ListItem, NumberedItem,
  InlineCode, Callout, YouTubeEmbed, DataTypesTable, OperatorBadge, OL,
} from '../ArticlePageComponents';

const DATA_TYPES = [
  {
    tipo: 'Entero',
    descripcion: 'Números sin decimales, positivos o negativos.',
    ejemplo: '22, -5, 0, 100',
    accent: 'text-sky-300',
  },
  {
    tipo: 'Real',
    descripcion: 'Números que incluyen parte decimal.',
    ejemplo: '18.5, 3.1416, -0.5',
    accent: 'text-indigo-300',
  },
  {
    tipo: 'Carácter',
    descripcion: (
      <>
        Una única unidad del teclado, encerrada en{' '}
        <InlineCode>' '</InlineCode> comillas simples.
      </>
    ),
    ejemplo: "'A', '7', '@', ' '",
    accent: 'text-amber-300',
  },
  {
    tipo: 'Cadena',
    descripcion: (
      <>
        Secuencia de caracteres (texto), encerrada en{' '}
        <InlineCode>" "</InlineCode> comillas dobles.
      </>
    ),
    ejemplo: '"Hola Mundo", "UDONE", "5"',
    accent: 'text-emerald-300',
  },
  {
    tipo: 'Lógico',
    descripcion: 'Representa premisas de cumplimiento (Booleano).',
    ejemplo: 'Verdadero, Falso',
    accent: 'text-rose-300',
  },
];

export const ArticleTiposDatos: React.FC = () => (
  <div>
    <P>
      En esta etapa de la materia, dejaremos de ver los algoritmos como simples pasos y
      empezaremos a entender la{' '}
      <strong className="text-slate-100">naturaleza de la información</strong> que procesamos.
      Para que un algoritmo sea funcional, debemos definir qué tipo de datos estamos manipulando.
    </P>

    <PageSection title="1. Los 5 Tipos de Datos Fundamentales">
      <P>
        Tanto las variables como las constantes deben pertenecer a un tipo de dato específico.
        En nuestro pseudocódigo, manejaremos cinco categorías:
      </P>
      <DataTypesTable rows={DATA_TYPES} />
      <PageSubSection title="Notas de Importancia">
        <UL>
          <DefItem label='La ilusión del número'>
            Si escribes <InlineCode>"5"</InlineCode> (Cadena) o <InlineCode>'5'</InlineCode>{' '}
            (Carácter), <strong className="text-slate-100">no es un número</strong>. No puedes
            sumarle 1 ni realizar operaciones matemáticas; el computador lo trata como un texto.
          </DefItem>
          <DefItem label="Capacidad de los Enteros">
            En pseudocódigo el límite es infinito, pero en lenguajes reales (Java, Python) el
            espacio en memoria es limitado.
          </DefItem>
        </UL>
      </PageSubSection>
    </PageSection>

    <PageSection title="2. Compatibilidad y Mutabilidad">
      <P>No todos los datos pueden mezclarse libremente. Existe una jerarquía de "capacidad":</P>
      <div className="grid md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <p className="text-slate-100 font-semibold mb-2">Real → Entero</p>
          <p className="text-slate-400 text-sm">
            Un <InlineCode>Real</InlineCode> puede contener a un <InlineCode>Entero</InlineCode>{' '}
            (5 = 5.0), pero un <InlineCode>Entero</InlineCode> <strong className="text-red-400">no</strong>{' '}
            puede recibir un <InlineCode>Real</InlineCode> sin perder información (truncamiento).
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <p className="text-slate-100 font-semibold mb-2">Cadena → Carácter</p>
          <p className="text-slate-400 text-sm">
            Una <InlineCode>Cadena</InlineCode> puede contener un solo <InlineCode>Carácter</InlineCode>,
            pero un <InlineCode>Carácter</InlineCode> <strong className="text-red-400">no</strong>{' '}
            tiene espacio para una <InlineCode>Cadena</InlineCode>.
          </p>
        </div>
      </div>
    </PageSection>

    <PageSection title="3. Operadores Aritméticos: DIV y MOD">
      <YouTubeEmbed videoId="WGQw7HfOOao" title="Operaciones matemáticas, relacionales y lógicas" />
      <P>
        Además de las operaciones clásicas (<InlineCode>+</InlineCode>, <InlineCode>-</InlineCode>,{' '}
        <InlineCode>*</InlineCode>, <InlineCode>/</InlineCode>), existen tres operadores cruciales:
      </P>
      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-brand-500/20 text-brand-300 rounded font-mono text-sm font-bold">DIV</span>
            <span className="text-slate-300 font-medium">División Entera</span>
          </div>
          <p className="text-slate-400 text-sm mb-2">
            Devuelve el cociente de la división <strong className="text-slate-100">sin decimales</strong>.
            Es como las divisiones de primaria antes de sacar la coma.
          </p>
          <div className="flex items-center gap-2 font-mono text-sm">
            <InlineCode>10 DIV 3</InlineCode>
            <span className="text-slate-500">=</span>
            <span className="text-emerald-300 font-bold">3</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-brand-500/20 text-brand-300 rounded font-mono text-sm font-bold">MOD</span>
            <span className="text-slate-300 font-medium">Residuo / Módulo</span>
          </div>
          <p className="text-slate-400 text-sm mb-2">
            Devuelve lo que <strong className="text-slate-100">sobra</strong> de esa división entera.
          </p>
          <div className="flex items-center gap-2 font-mono text-sm">
            <InlineCode>10 MOD 3</InlineCode>
            <span className="text-slate-500">=</span>
            <span className="text-emerald-300 font-bold">1</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-brand-500/20 text-brand-300 rounded font-mono text-sm font-bold">**</span>
            <span className="text-slate-300 font-medium">Potenciación</span>
          </div>
          <p className="text-slate-400 text-sm mb-2">
            Doble asterisco para representar potencias.
          </p>
          <div className="flex items-center gap-2 font-mono text-sm">
            <InlineCode>2**3</InlineCode>
            <span className="text-slate-500">=</span>
            <span className="text-emerald-300 font-bold">8</span>
          </div>
        </div>
      </div>
      <Callout variant="tip">
        El <InlineCode>MOD</InlineCode> es extremadamente útil para saber si un número es par:{' '}
        si <InlineCode>numero MOD 2 = 0</InlineCode>, entonces es par.
      </Callout>
    </PageSection>

    <PageSection title="4. Operadores de Comparación y Relacionales">
      <P>
        La computación se basa en la evaluación de premisas. Estos operadores siempre devuelven un
        valor <strong className="text-slate-100">Lógico</strong> (<InlineCode>Verdadero</InlineCode>{' '}
        o <InlineCode>Falso</InlineCode>).
      </P>
      <div className="flex flex-wrap gap-2 mb-4">
        <OperatorBadge op="=" label="Igual" />
        <OperatorBadge op="<>" label="Diferente" />
        <OperatorBadge op=">" label="Mayor que" />
        <OperatorBadge op="<" label="Menor que" />
        <OperatorBadge op=">=" label="Mayor o igual" />
        <OperatorBadge op="<=" label="Menor o igual" />
      </div>
      <UL>
        <DefItem label="Regla de Oro">
          A diferencia de la notación matemática (10 &lt; x &lt; 20), en programación solo se
          permite comparar <strong className="text-slate-100">dos miembros a la vez</strong>. Para
          rangos complejos, usaremos operadores lógicos.
        </DefItem>
        <DefItem label="Comparación de Cadenas">
          Se realiza por orden de diccionario (alfabético).{' '}
          <InlineCode>"Árbol" &lt; "Zapato"</InlineCode> es <InlineCode>Verdadero</InlineCode>.
        </DefItem>
      </UL>
    </PageSection>

    <PageSection title="5. Operadores Lógicos (Y, O, NO)">
      <P>Permiten combinar comparaciones para crear premisas más complejas:</P>
      <div className="grid md:grid-cols-3 gap-4 my-4">
        {[
          {
            op: 'Y (AND)',
            icon: '🔒',
            color: 'amber',
            desc: 'Es restrictivo: requiere que AMBAS condiciones sean ciertas.',
            ex: '(edad >= 18) Y (tiene_documento)',
          },
          {
            op: 'O (OR)',
            icon: '🔓',
            color: 'sky',
            desc: 'Es inclusivo: basta con que UNA de las condiciones sea cierta.',
            ex: '(es_estudiante) O (tiene_carnet)',
          },
          {
            op: 'NO (NOT)',
            icon: '🔄',
            color: 'rose',
            desc: 'Invierte el valor: lo verdadero pasa a ser falso y viceversa.',
            ex: 'NO (puerta_cerrada)',
          },
        ].map(({ op, icon, color, desc, ex }) => (
          <div
            key={op}
            className={`p-4 rounded-xl bg-${color}-500/5 border border-${color}-500/20`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span>{icon}</span>
              <span className={`font-bold text-${color}-300 font-mono`}>{op}</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">{desc}</p>
            <code className={`text-xs font-mono text-${color}-200 bg-slate-900/60 px-2 py-1 rounded block`}>
              {ex}
            </code>
          </div>
        ))}
      </div>
    </PageSection>

    <PageSection title="6. Concatenación">
      <P>
        La concatenación es la unión de dos o más datos en una sola cadena de texto. En nuestro
        pseudocódigo usaremos la <strong className="text-slate-100">coma</strong> para unir elementos.
      </P>
      <UL>
        <ListItem>
          <InlineCode>"Goles anotados: ", 3</InlineCode>
          <span className="text-slate-500 mx-2">→</span>
          <InlineCode>"Goles anotados: 3"</InlineCode>
        </ListItem>
        <ListItem>
          <InlineCode>"Bienvenido ", nombre_usuario</InlineCode>
        </ListItem>
      </UL>
      <Callout variant="warning">
        No es recomendable concatenar con valores <InlineCode>Lógicos</InlineCode>, ya que el
        resultado (<InlineCode>"Estado: Verdadero"</InlineCode>) suele ser confuso para el usuario final.
      </Callout>
    </PageSection>

    <PageSection title="7. Jerarquía de Operaciones (Orden de Prioridad)">
      <P>
        Cuando una expresión tiene muchos operadores, el computador resuelve en este orden estricto:
      </P>
      <OL>
        <NumberedItem n={1} label="Paréntesis ( )">
          Rompen cualquier regla y se resuelven de adentro hacia afuera.
        </NumberedItem>
        <NumberedItem n={2} label="Potencia / Raíz" />
        <NumberedItem n={3} label="Multiplicación, División, MOD, DIV" />
        <NumberedItem n={4} label="Suma y Resta" />
        <NumberedItem n={5} label="Comparaciones">
          =, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;=
        </NumberedItem>
        <NumberedItem n={6} label="Operadores Lógicos">
          Primero <InlineCode>NO</InlineCode>, luego <InlineCode>Y</InlineCode>, finalmente{' '}
          <InlineCode>O</InlineCode>.
        </NumberedItem>
      </OL>
      <Callout variant="exam">
        <strong className="text-slate-100">Recordatorio para el examen:</strong> Al redactar tus
        algoritmos, asegúrate de que el tipo de dato que declaras en{' '}
        <InlineCode>Variables</InlineCode> coincida con el uso que le das en{' '}
        <InlineCode>Inicio</InlineCode>. Si declaras un <InlineCode>Entero</InlineCode>, no
        intentes guardarle un nombre.
      </Callout>
    </PageSection>
  </div>
);
