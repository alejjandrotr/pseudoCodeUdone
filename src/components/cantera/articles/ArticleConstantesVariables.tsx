import React from 'react';
import {
  P, PageSection, UL, DefItem, ListItem, InlineCode, Callout,
  FormatRow, YouTubeEmbed, CodeBlock,
} from '../ArticlePageComponents';

export const ArticleConstantesVariables: React.FC = () => (
  <div>
    <YouTubeEmbed videoId="Y3NguKPAfrM" title="Diferencia entre variables y constantes, e introducción a los tipos" />

    <P>
      En programación, trabajamos con datos que se almacenan en memoria. Según su{' '}
      <strong className="text-slate-100">comportamiento durante la ejecución</strong>, los
      clasificamos en dos tipos fundamentales.
    </P>

    {/* Two-column overview */}
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Constante</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Valor <strong className="text-slate-100">fijo</strong> que no cambia durante toda la
          ejecución del programa.
        </p>
      </div>
      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">Variable</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Espacio de memoria cuyo valor puede{' '}
          <strong className="text-slate-100">cambiar</strong> a lo largo del programa.
        </p>
      </div>
    </div>

    <PageSection title="Las Constantes">
      <P>
        Son valores que no cambian durante toda la ejecución del programa. Se definen con un valor
        fijo desde el inicio y existen en dos variantes:
      </P>
      <UL>
        <DefItem label="Universales">
          Valores científicos reconocidos, como{' '}
          <InlineCode>π = 3.1416</InlineCode> o la constante de gravedad{' '}
          <InlineCode>g = 9.81 m/s²</InlineCode>.
        </DefItem>
        <DefItem label="De programa">
          Valores que definimos nosotros para el contexto del ejercicio, como{' '}
          <InlineCode>CANTIDAD_ESTUDIANTES</InlineCode> o <InlineCode>IVA</InlineCode>. Para nuestro
          programa, ese valor es una regla fija.
        </DefItem>
      </UL>
      <div className="mt-4 space-y-2">
        <FormatRow label="Formato" value="Nombre_Constante = Valor" />
        <FormatRow label="Ejemplo" value="PI = 3.1415   |   MAX_JUGADORES = 11" />
      </div>
    </PageSection>

    <PageSection title="Las Variables">
      <P>
        Son espacios de memoria cuyo valor puede cambiar o ser modificado a lo largo del programa.
      </P>
      <UL>
        <ListItem>Provienen normalmente de entradas del usuario (inputs).</ListItem>
        <ListItem>
          Resultan de operaciones matemáticas o procesos (como un acumulador de puntos en un partido
          de fútbol).
        </ListItem>
      </UL>
      <Callout variant="tip">
        <strong className="text-slate-100">Componentes esenciales:</strong> Toda variable debe tener
        un <strong className="text-slate-100">Nombre</strong> y un{' '}
        <strong className="text-slate-100">Tipo de Dato</strong> (Entero, Real, Cadena, etc.).
      </Callout>
      <div className="mt-2">
        <CodeBlock code={`Variables:\n  Entero: edad\n  Real: precio_total\n  Cadena: nombre_pais\n  Lógico: puerta_abierta`} />
      </div>
    </PageSection>

    <PageSection title="Tipos Atómicos y sus Límites">
      <P>
        En pseudocódigo tratamos los números como infinitos, pero en la realidad física de un
        computador existen restricciones importantes:
      </P>
      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <p className="text-slate-100 font-semibold mb-1">Enteros vs. Reales</p>
          <p className="text-slate-400 text-sm mb-2">
            Un resultado de división siempre debe considerarse un <InlineCode>Real</InlineCode>,
            incluso si divides dos enteros.
          </p>
          <div className="flex items-center gap-2">
            <InlineCode>5 / 2</InlineCode>
            <span className="text-slate-500 text-sm">→</span>
            <span className="font-mono text-sm text-emerald-300">2.5 (Real)</span>
            <span className="ml-2 text-xs text-red-400">no 2 (Entero)</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
          <p className="text-slate-100 font-semibold mb-1">Cadenas vs. Caracteres</p>
          <p className="text-slate-400 text-sm mb-2">
            La distinción de comillas es fundamental:
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <InlineCode>'A'</InlineCode>
              <span className="text-xs text-slate-500">= Carácter (comilla simple)</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineCode>"Hola Mundo"</InlineCode>
              <span className="text-xs text-slate-500">= Cadena (comilla doble)</span>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  </div>
);
