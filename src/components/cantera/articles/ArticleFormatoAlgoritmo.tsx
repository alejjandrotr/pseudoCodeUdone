import React from 'react';
import { P, PageSection, Callout, CodeBlock } from '../ArticlePageComponents';

export const ArticleFormatoAlgoritmo: React.FC = () => (
  <div>
    <P>
      Todo algoritmo, por definición, es <strong className="text-slate-100">finito</strong> y debe
      tener una estructura clara para ser interpretado correctamente. Muchos estudiantes olvidan la
      cabecera, pero es vital para identificar el proceso.
    </P>

    <PageSection title="Estructura Estándar">
      <P>La estructura que seguiremos en clase es la siguiente:</P>
      <CodeBlock
        code={`Algoritmo Nombre_Del_Algoritmo

Declaración
    Constantes:
        <Nombre> = <Valor>
    Variables:
        <Nombre_Variable>: <Tipo_de_dato>

Inicio
    // Aquí van las acciones y operaciones
Fin`}
      />
    </PageSection>

    <PageSection title="Las 3 Zonas del Algoritmo">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            zone: 'Cabecera',
            keyword: 'Algoritmo',
            desc: 'Declara el nombre que identifica el proceso. Es la "firma" del algoritmo.',
            color: 'brand',
          },
          {
            zone: 'Declaración',
            keyword: 'Declaración',
            desc: 'Define todos los elementos que se usarán: constantes, tipos y variables.',
            color: 'violet',
          },
          {
            zone: 'Cuerpo',
            keyword: 'Inicio ... Fin',
            desc: 'Contiene las instrucciones y operaciones que resuelven el problema.',
            color: 'emerald',
          },
        ].map(({ zone, keyword, desc, color }) => (
          <div
            key={zone}
            className={`p-4 rounded-xl border bg-slate-800/20 border-${color}-500/20 hover:bg-slate-800/30 transition-colors`}
          >
            <p className={`text-xs font-bold uppercase tracking-widest text-${color}-400 mb-1`}>
              {zone}
            </p>
            <code className="text-sm font-mono text-slate-100 block mb-2">{keyword}</code>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </PageSection>

    <Callout variant="exam">
      <strong className="text-slate-100">Regla de oro:</strong> Nunca omitas la cabecera{' '}
      <code className="bg-slate-800 text-brand-200 px-1.5 py-0.5 rounded text-xs font-mono">Algoritmo Nombre</code>.
      El examen evalúa la estructura completa, no solo el cuerpo lógico.
    </Callout>

    <PageSection title="Ejemplo Completo">
      <P>
        Un algoritmo que lee la edad de un estudiante y determina si es mayor de edad:
      </P>
      <CodeBlock
        code={`Algoritmo Verificar_Mayor_Edad

Declaración
    Constantes:
        MAYORIA = 18
    Variables:
        edad: Entero
        es_mayor: Lógico

Inicio
    Leer edad
    es_mayor <- edad >= MAYORIA
    Si es_mayor Entonces
        Escribir "Es mayor de edad"
    Sino
        Escribir "Es menor de edad"
    Fin Si
Fin`}
      />
    </PageSection>
  </div>
);
