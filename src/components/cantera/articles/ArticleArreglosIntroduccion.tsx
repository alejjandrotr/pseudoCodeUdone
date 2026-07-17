import React from 'react';
import { P, PageSection, CodeBlock, Strong, InlineCode } from '../ArticlePageComponents';
import { BookOpen, Sparkles } from 'lucide-react';

export const ArticleArreglosIntroduccion: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cabecera Hero con Imagen Generada por IA */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
        <img 
          src="/images/arreglos_intro.png" 
          alt="Representación abstracta de arreglos en memoria"
          className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-mono rounded-full font-bold mb-3 backdrop-blur-md">
            <Sparkles size={14} /> Colecciones de Datos
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Arreglos Unidimensionales
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm leading-relaxed">
            Estructuras fundamentales que permiten almacenar y procesar múltiples valores del mismo tipo en posiciones contiguas de memoria.
          </p>
        </div>
      </div>

      <P>
        En el ámbito de la resolución de problemas mediante la programación, con frecuencia nos encontramos con la necesidad de almacenar y procesar múltiples valores bajo un mismo contexto.
      </P>
      
      <PageSection title="Motivación: El Problema de la Escalabilidad">
        <P>
          Imagine, por ejemplo, una competencia deportiva en la cual participan 10 personas y requerimos almacenar las puntuaciones de cada una de ellas. Con las herramientas básicas de variables primitivas que conocemos hasta ahora, nos veríamos obligados a declarar diez variables distintas (por ejemplo: <InlineCode>puntos1</InlineCode>, <InlineCode>puntos2</InlineCode>, <InlineCode>puntos3</InlineCode>, ..., <InlineCode>puntos10</InlineCode>).
        </P>
        
        <P>
          Al analizar esta aproximación, se hace evidente que lo único que diferencia a una variable de otra es el número identificador al final de su nombre. Además, si quisiéramos solicitar los datos al usuario en un formato convencional, tendríamos que repetir las instrucciones secuencialmente:
        </P>
        
        <CodeBlock code={`Escribir "Indique los puntos del jugador 1: "
Leer puntos1
Escribir "Indique los puntos del jugador 2: "
Leer puntos2
// ... y así sucesivamente`} />
        
        <P>
          Este enfoque manual resulta ineficiente y sumamente engorroso a medida que crece el volumen de información. En escenarios reales del desarrollo de software, las colecciones de datos no se limitan a 10 elementos; pueden alcanzar los 20,000 competidores o requerir el almacenamiento simultáneo de flujos masivos de datos.
        </P>
      </PageSection>

      <PageSection title="La Solución: Colecciones de Datos">
        <P>
          Para resolver esta problemática de escalabilidad, la programación introduce las estructuras de colecciones de datos. Una de las colecciones más simples y fundamentales que existen son los <Strong>arreglos</Strong> (conocidos en la bibliografía técnica como <em>arrays</em> o vectores).
        </P>
        
        <div className="bg-brand-500/10 border-l-4 border-brand-500 p-5 rounded-r-xl my-6 flex items-start gap-4">
          <div className="bg-brand-500/20 p-2 rounded-lg text-brand-400 shrink-0">
            <BookOpen size={20} />
          </div>
          <p className="text-slate-300 leading-relaxed text-sm">
            Aunque los arreglos pueden estructurarse en múltiples dimensiones, en esta sección nos enfocaremos exclusivamente en el estudio de los <Strong>arreglos estáticos unidimensionales</Strong>, caracterizados por tener una única dimensión y un límite de tamaño fijo y definido desde su creación.
          </p>
        </div>
      </PageSection>
    </div>
  );
};
