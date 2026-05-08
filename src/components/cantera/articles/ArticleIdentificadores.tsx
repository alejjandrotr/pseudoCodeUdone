import React from 'react';
import {
  P, PageSection, UL, DefItem, InlineCode, YouTubeEmbed,
} from '../ArticlePageComponents';

export const ArticleIdentificadores: React.FC = () => (
  <div>
    <YouTubeEmbed videoId="3EbbEJnrFxw" title="Reglas de nombrado y estándares" />

    <P>
      Un identificador es, en esencia, el <strong className="text-slate-100">nombre</strong> que le
      asignamos a los elementos dentro de un programa — variables, constantes, algoritmos, funciones,
      etc. Para que el computador (y otros programadores) puedan entender nuestro código, debemos
      seguir reglas estrictas.
    </P>

    <PageSection title="El Puente entre la Idea y el Código">
      <P>Antes de escribir una sola línea de pseudocódigo, debemos entender cómo fluye la información.</P>
      <UL>
        <DefItem label="Diagramas de Flujo">
          Son la representación gráfica secuencial de las instrucciones. Aunque para programas
          complejos pueden volverse extensos, son vitales para visualizar procesos cortos.
        </DefItem>
        <DefItem label="Pseudocódigo">
          Es nuestra herramienta de diseño. No es un lenguaje rígido, pero en nuestra clase
          seguiremos un estándar en español que facilita la transición hacia lenguajes reales
          (que usualmente están en inglés).
        </DefItem>
        <DefItem label="Ciclo de Vida de un Dato">
          Todo programa sigue el patrón:{' '}
          <span className="inline-flex items-center gap-1.5 text-sm font-mono bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700/50">
            <span className="text-brand-300">Entrada</span>
            <span className="text-slate-500">→</span>
            <span className="text-brand-300">Procesamiento</span>
            <span className="text-slate-500">→</span>
            <span className="text-brand-300">Salida</span>
          </span>
        </DefItem>
      </UL>
    </PageSection>

    <PageSection title="Reglas Obligatorias">
      <P>Para que un identificador sea válido, debe cumplir con lo siguiente:</P>
      <div className="space-y-3">
        {[
          {
            label: 'Inicio',
            desc: 'Debe comenzar siempre con una letra (mayúscula o minúscula).',
            ok: ['nombre', 'Edad', '_no_vale'],
            bad: ['1nombre', '9goles'],
          },
          {
            label: 'Caracteres permitidos',
            desc: (
              <>
                Solo se permiten letras, números y el carácter de subrayado{' '}
                <InlineCode>_</InlineCode>. Es el único símbolo especial admitido.
              </>
            ),
            ok: ['nota_1', 'totalGoles'],
            bad: ['nota-1', 'total$'],
          },
          {
            label: 'Sin espacios',
            desc: 'No se pueden incluir espacios en blanco.',
            ok: ['nombre_pais'],
            bad: ['nombre pais'],
          },
          {
            label: 'Unicidad',
            desc: 'No se puede usar el mismo nombre para dos elementos distintos en el mismo ámbito.',
          },
          {
            label: 'Sensibilidad (Papel vs. Código)',
            desc: 'En lenguajes modernos se diferencia case-sensitive, pero para evaluaciones escritas no se penalizará esta diferencia.',
          },
        ].map(({ label, desc, ok, bad }) => (
          <div
            key={label}
            className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40"
          >
            <p className="text-slate-100 font-semibold mb-1">{label}</p>
            <p className="text-slate-400 text-sm mb-2">{desc}</p>
            {(ok || bad) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {ok?.map((ex) => (
                  <span key={ex} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
                    ✓ {ex}
                  </span>
                ))}
                {bad?.map((ex) => (
                  <span key={ex} className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-300 font-mono text-xs">
                    ✗ {ex}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageSection>

    <PageSection title='Recomendaciones de "Buen Código" y Nomenclatura'>
      <P>
        No basta con que el nombre sea válido; debe ser <strong className="text-slate-100">útil</strong>.
        Nombrar variables es una de las tareas más difíciles en programación. Un buen nombre puede
        ahorrar horas de lectura a un colega — o a ti mismo en el futuro.
      </P>
      <UL>
        <DefItem label="CamelCase">
          Estándar recomendado: iniciar en minúscula y usar mayúsculas para separar palabras.{' '}
          <InlineCode>nombreEstudiante</InlineCode>, <InlineCode>notaFinalExamen</InlineCode>.
        </DefItem>
        <DefItem label="Contexto">
          Evita variables de una sola letra como <InlineCode>a</InlineCode> o{' '}
          <InlineCode>x</InlineCode>, a menos que su ámbito sea de 3 o 4 líneas. Prefiere nombres
          largos y descriptivos sobre nombres cortos y ambiguos.
        </DefItem>
        <DefItem label="Nombres significativos">
          El identificador debe representar lo que contiene. Prefiere{' '}
          <InlineCode>monto_total</InlineCode> sobre <InlineCode>mt</InlineCode>.
        </DefItem>
        <DefItem label="Verbos para acciones">
          Si el identificador nombra una función, usa verbos que describan qué hace:{' '}
          <InlineCode>calcular_promedio()</InlineCode>, <InlineCode>registrar_gol()</InlineCode>.
        </DefItem>
        <DefItem label="Evita abreviaturas">
          El contexto debe estar en el nombre. No obligues al lector a adivinar qué significa una
          sigla.
        </DefItem>
      </UL>
    </PageSection>
  </div>
);
