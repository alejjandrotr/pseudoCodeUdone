import React, { useState } from 'react';
import { P, PageSection, Callout, YouTubeEmbed, Strong, InlineCode } from '../ArticlePageComponents';
import { ArrowLeft, ArrowRight, CheckCircle2, ListFilter, HelpCircle, Code } from 'lucide-react';

export const ArticleVideoIntroduccion: React.FC = () => {
  // --- CAROUSEL STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Evitar la Redundancia de Código",
      description: "El video introduce la necesidad de automatizar la ejecución para no repetir manualmente líneas de código. Escribir 100 veces una instrucción satura la memoria y dificulta el mantenimiento del programa.",
      icon: "⚙️",
      color: "border-cyan-500 bg-cyan-500/5 text-cyan-400"
    },
    {
      title: "Condiciones de Parada en el Mundo Real",
      description: "Se establecen analogías cotidianas para comprender cuándo detenerse: contar estudiantes hasta vaciar la fila, escanear productos en la caja registradora hasta que no queden más, o limpiar platos hasta que la pila quede en cero.",
      icon: "🛒",
      color: "border-violet-500 bg-violet-500/5 text-violet-400"
    },
    {
      title: "La Categorización Lógica de Ciclos",
      description: "Los ciclos se agrupan según su naturaleza: si actúan como filtros previos (Mientras), compuertas de salida posterior (Repetir), o bloques con aforo y rango predefinido (Para).",
      icon: "📊",
      color: "border-brand-500 bg-brand-500/5 text-brand-400"
    }
  ];

  // --- PLAYGROUND STATE ---
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'mientras' | 'repetir' | 'para'>('mientras');

  const playgroundData = {
    mientras: {
      title: "Ciclo Mientras (While)",
      description: "Funciona como un filtro de entrada. Primero evalúa la condición lógica: si es Verdadera, ejecuta el bloque. Si es Falsa, el bloque nunca se ejecuta.",
      syntax: `Mientras (condicion_de_entrada) Hacer\n    // Bloque de código a repetir\n    // IMPORTANTE: Modificar variable de control\nFin Mientras`,
      behavior: "Evaluación al inicio | Cero o más iteraciones | Entra solo con Verdadero.",
      highlight: "Condición de Entrada"
    },
    repetir: {
      title: "Ciclo Repetir (Do-While / Repeat)",
      description: "Funciona como una compuerta de salida. Ejecuta el código de manera garantizada la primera vez y evalúa la condición de salida al final.",
      syntax: `Repetir\n    // Bloque de código (se ejecuta al menos 1 vez)\n    // Modificación de variable de control\nHasta (condicion_de_salida_verdadera)`,
      behavior: "Evaluación al final | Una o más iteraciones | Sale al volverse Verdadero.",
      highlight: "Condición de Parada al final"
    },
    para: {
      title: "Ciclo Para (For)",
      description: "Es el ciclo determinado. Inicializa la variable contadora, define el límite y establece el incremento o decremento en una única instrucción.",
      syntax: `Para i <- 1 Hasta limite Hacer\n    // Bloque de código\n    // NO es necesario incrementar i manualmente\nFin Para`,
      behavior: "Contador integrado | Iteraciones conocidas | Incremento automático.",
      highlight: "Control automatizado"
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <P>
        Bienvenido a este recurso complementario de apoyo visual. En esta clase grabada analizaremos de forma detallada la fundamentación e importancia de incorporar bucles a nuestros diseños de algoritmos.
      </P>

      <YouTubeEmbed 
        videoId="G3BI2fd3XWg" 
        title="Introducción a las Estructuras Repetitivas (Ciclos #013)" 
      />

      <PageSection title="1. Análisis Técnico del Video">
        <P>
          El video establece la premisa fundamental de la **optimización en la ingeniería de software**: cómo evitar la redundancia manual de instrucciones a través de la delegación lógica a la CPU.
        </P>
        <P>
          Se explica que un bucle, lazo o iteración es un mecanismo para ejecutar código dinámicamente según condiciones variables de la memoria RAM del sistema.
        </P>
      </PageSection>

      {/* --- CONCEPT CARD CAROUSEL --- */}
      <PageSection title="Conceptos Clave Analizados en la Clase">
        <P>
          Haz clic en las flechas de navegación para recorrer el carrusel interactivo y repasar las 3 lecciones teóricas fundamentales explicadas por el profesor en el pizarrón digital.
        </P>

        <div className="relative glass-panel border border-slate-800 rounded-2xl p-6 bg-slate-950/45 my-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
          {/* Top Info */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Lección {currentSlide + 1} de {slides.length}
            </span>
            <span className="text-2xl">{slides[currentSlide].icon}</span>
          </div>

          {/* Slide Content */}
          <div className="flex-1 animate-fade-in pr-2">
            <h3 className={`text-lg font-bold mb-2 border-b-2 border-slate-800 pb-1.5 inline-block ${slides[currentSlide].color.split(' ')[2]}`}>
              {slides[currentSlide].title}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-900">
            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <span 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                    idx === currentSlide ? 'bg-brand-400 w-6' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 text-slate-300"
              >
                <ArrowLeft size={14} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 text-slate-300"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </PageSection>

      {/* --- PLAYGROUND INTERACTIVE WORKSPACE --- */}
      <PageSection title="Interactive Cycle Playground: Lógica Sintáctica">
        <P>
          La sintaxis determina cómo interactúa el procesador con las variables lógicas. Selecciona una de las pestañas a continuación para comparar la estructura en pseudocódigo UDONE y las reglas de decisión de los tres ciclos principales.
        </P>

        <div className="glass-panel border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/40 my-8">
          {/* Tabs header */}
          <div className="bg-slate-900 border-b border-slate-800 flex flex-wrap">
            {(['mientras', 'repetir', 'para'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActivePlaygroundTab(tab)}
                className={`px-5 py-3.5 font-bold font-mono text-xs uppercase tracking-wider transition-all border-r border-slate-800 flex items-center gap-2 ${
                  activePlaygroundTab === tab 
                    ? 'bg-slate-950 text-brand-300 border-t-2 border-brand-400' 
                    : 'text-slate-500 hover:text-slate-300 bg-slate-900/50'
                }`}
              >
                <Code size={14} /> {tab}
              </button>
            ))}
          </div>

          {/* Playground body */}
          <div className="p-6 flex flex-col md:flex-row gap-6">
            {/* Left side: Description */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-brand-400" /> {playgroundData[activePlaygroundTab].title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {playgroundData[activePlaygroundTab].description}
                </p>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-xs">
                  <ListFilter size={14} className="text-brand-400" />
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Regla de comportamiento:</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 text-xs font-mono">
                  {playgroundData[activePlaygroundTab].behavior}
                </div>
                <div className="p-3 bg-brand-500/10 rounded-xl border border-brand-500/25 text-brand-300 text-xs flex items-center gap-2">
                  <HelpCircle size={14} />
                  <span><strong>Foco Lógico:</strong> {playgroundData[activePlaygroundTab].highlight}</span>
                </div>
              </div>
            </div>

            {/* Right side: Code block */}
            <div className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-2xl flex flex-col">
              <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 text-slate-500 text-[10px]">
                SINTAXIS_UDONE
              </div>
              <div className="p-4 text-slate-300 leading-relaxed overflow-x-auto whitespace-pre bg-slate-950/60 flex-grow">
                {playgroundData[activePlaygroundTab].syntax}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <Callout variant="tip">
        <Strong>Conclusión Práctica:</Strong> La elección del ciclo idóneo es un criterio técnico que agiliza el rendimiento de la CPU. En las siguientes clases teóricas aplicaremos en código cada una de estas alternativas para dominar su uso.
      </Callout>
    </div>
  );
};
