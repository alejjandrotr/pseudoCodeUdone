import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode, NumberedItem, DataTypesTable } from '../ArticlePageComponents';
import { Play, Pause, RotateCcw, Users, Zap, FastForward } from 'lucide-react';

export const ArticleCiclosIntroduccion: React.FC = () => {
  // --- STATE FOR CLASSROOM SIMULATION ---
  const [estudiantes, setEstudiantes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [seats, setSeats] = useState<boolean[]>(Array(12).fill(false));
  const [simSpeed, setSimSpeed] = useState(1000); // ms per step
  const [simStep, setSimStep] = useState<number>(0); // Current instruction pointer in our loop state machine
  
  // Ref to hold the interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Classroom Code Lines
  const SIM_CODE_LINES = [
    'Algoritmo ContarEstudiantes',
    'Variables:',
    '  estudiantes: Entero',
    'Inicio',
    '  estudiantes <- 0',
    '  Mientras (hay_estudiante_en_puerta) Hacer',
    '    estudiantes <- estudiantes + 1',
    '  Fin Mientras',
    'Fin'
  ];

  // Simulation execution loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, simSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, simStep, estudiantes, simSpeed]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setEstudiantes(0);
    setActiveLine(null);
    setSeats(Array(12).fill(false));
    setSimStep(0);
  };

  const advanceSimulation = () => {
    switch (simStep) {
      case 0:
        // Initialize estudiantes <- 0
        setActiveLine(5); // line 5: estudiantes <- 0
        setEstudiantes(0);
        setSeats(Array(12).fill(false));
        setSimStep(1);
        break;
      case 1:
        // Check loop condition: hay_estudiante_en_puerta
        setActiveLine(6); // line 6: Mientras (hay_estudiante_en_puerta) Hacer
        
        // If classroom is full (12 students), exit loop
        if (estudiantes >= 12) {
          setSimStep(4); // Go to Fin Mientras
        } else {
          setSimStep(2); // Go to increment
        }
        break;
      case 2:
        // increment count: estudiantes <- estudiantes + 1 & add student to seat
        setActiveLine(7); // line 7: estudiantes <- estudiantes + 1
        
        const nextEstudiantes = estudiantes + 1;
        setEstudiantes(nextEstudiantes);
        
        // Fill a seat
        setSeats(prev => {
          const next = [...prev];
          next[estudiantes] = true;
          return next;
        });
        
        setSimStep(3); // Go to check loop boundary
        break;
      case 3:
        // Loop back check (evaluates Mientras again)
        setActiveLine(8); // line 8: Fin Mientras
        setSimStep(1); // loop back to check condition
        break;
      case 4:
        // Out of loop: Fin
        setActiveLine(9); // line 9: Fin
        setIsPlaying(false);
        setSimStep(5); // Finished state
        break;
      default:
        resetSimulation();
        break;
    }
  };

  const startSimulation = () => {
    if (simStep === 5) {
      // Re-run
      resetSimulation();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const triggerNextStep = () => {
    setIsPlaying(false);
    advanceSimulation();
  };

  return (
    <div>
      <P>
        En la programación, no siempre queremos escribir las mismas instrucciones una y otra vez de forma manual. Si tuvieras que mostrar en pantalla los números del 1 al 1000, escribir mil líneas de <InlineCode>Escribir</InlineCode> sería ineficiente y propenso a errores. Para resolver esto, los lenguajes de programación utilizan los <Strong>Ciclos Repetitivos</Strong> (también conocidos como bucles o lazos).
      </P>

      <PageSection title="¿Qué es un Ciclo Repetitivo?">
        <P>
          Un <Strong>ciclo</Strong> (o bucle) es una estructura de control que permite ejecutar de forma repetida un segmento de código específico, siempre y cuando se cumpla una condición determinada en un momento dado.
        </P>
        <P>
          Cada repetición individual de las instrucciones dentro del ciclo recibe el nombre de <Strong>iteración</Strong>.
        </P>

        {/* Mermaid Diagram Container */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 my-6 flex flex-col items-center">
          <span className="text-xs uppercase font-bold text-slate-500 mb-4 tracking-wider">Esquema Lógico General de un Ciclo</span>
          <div className="flex flex-col items-center space-y-4">
            <div className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
              Inicio del Algoritmo
            </div>
            <div className="w-0.5 h-6 bg-slate-700"></div>
            <div className="px-5 py-3 bg-violet-500/15 border border-violet-500/30 rounded-xl text-violet-400 text-sm font-semibold relative text-center">
              ¿Condición de Entrada Satisfecha?
              <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 flex items-center">
                <span className="text-rose-400 text-xs font-bold mr-1">FALSO</span>
                <span className="text-rose-400 font-bold">➔</span>
                <div className="ml-2 px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-400 text-xs">
                  Salir del Ciclo
                </div>
              </div>
            </div>
            <div className="w-0.5 h-6 bg-slate-700"></div>
            <div className="flex gap-4">
              <div className="px-4 py-2.5 bg-cyan-500/15 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm">
                Ejecutar Bloque Interno
              </div>
              <div className="w-2.5"></div>
              <div className="px-4 py-2.5 bg-amber-500/15 border border-amber-500/30 rounded-lg text-amber-400 text-sm">
                Modificar variable control
              </div>
            </div>
            <div className="w-0.5 h-6 bg-slate-700"></div>
            <div className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
              Fin del Algoritmo
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection title="La Analogía del Salón de Clases">
        <P>
          Para entender la lógica de un ciclo de forma sencilla, pensemos en una situación cotidiana: <Strong>«Contar secuencialmente cuántos estudiantes hay dentro de un salón de clases»</Strong>.
        </P>
        <P>
          Imagina que eres el profesor y estás parado en la puerta del salón vacío. Tu objetivo es contar a cada estudiante que entra. ¿Cómo lo harías siguiendo la lógica de un ciclo?
        </P>
        
        <ol className="space-y-4 my-6 pl-1">
          <NumberedItem n={1} label="Estado Inicial (Antes de empezar)">
            Tu contador mental de estudiantes empieza exactamente en <InlineCode>0</InlineCode>.
          </NumberedItem>
          <NumberedItem n={2} label="La Condición de Entrada">
            Observas la puerta. Si ves que viene un estudiante (condición verdadera), realizas la acción.
          </NumberedItem>
          <NumberedItem n={3} label="El Proceso (Iteración)">
            El estudiante entra al salón y tú incrementas tu cuenta mental en 1 (cuenta = anterior + 1).
          </NumberedItem>
          <NumberedItem n={4} label="La Condición de Salida">
            Miras la puerta y ya no viene ningún estudiante (condición falsa). En ese momento <Strong>detienes el conteo</Strong> e imprimes el resultado.
          </NumberedItem>
        </ol>

        <Callout variant="warning">
          <Strong>La Regla de Oro:</Strong> Si no planificaras una vía de salida (por ejemplo, si siguieras contando infinitamente incluso si el salón ya está lleno), quedarías atrapado en un bucle sin fin. Al diseñar cualquier ciclo, siempre se debe planificar cómo se va a salir de él.
        </Callout>
      </PageSection>

      <PageSection title="Lógica de Control: Entrada y Salida">
        <P>
          Todo ciclo posee dos componentes lógicos ineludibles:
        </P>
        <ul className="list-disc pl-6 text-slate-300 mb-6 space-y-2">
          <li><Strong>Mecanismo de Entrada:</Strong> Una condición lógica que determina si el ciclo tiene permiso de iniciar o continuar su ejecución.</li>
          <li><Strong>Vía de Salida:</Strong> Una garantía lógica de que la condición eventualmente se volverá falsa para evitar bloqueos del sistema o <Strong>bucles infinitos</Strong>.</li>
        </ul>
      </PageSection>

      <PageSection title="Los Tres Ciclos del Plan de Estudios (UDONE)">
        <P>
          En la Universidad de Oriente (UDONE), estudiaremos tres estructuras cíclicas principales para resolver cualquier problema de repetición:
        </P>

        <DataTypesTable 
          rows={[
            {
              tipo: 'Mientras (While)',
              descripcion: 'Cuando no sabemos cuántas veces se repetirá el ciclo. Evalúa al inicio.',
              ejemplo: 'Mientras (i < limite) Hacer'
            },
            {
              tipo: 'Repetir (Do-While / Repeat)',
              descripcion: 'Garantiza que el código se ejecute al menos una vez. Evalúa al final.',
              ejemplo: 'Repetir ... Hasta (condicion)'
            },
            {
              tipo: 'Para (For)',
              descripcion: 'Cuando conocemos de antemano el número exacto de repeticiones.',
              ejemplo: 'Para i <- 1 Hasta 10 Hacer'
            }
          ]}
        />
      </PageSection>

      <PageSection title="¿Cómo interactuar con nuestros laboratorios y depuradores?">
        <P>
          A lo largo de esta unidad teórica y práctica de <strong>Ciclos Repetitivos</strong>, tendrás acceso a laboratorios interactivos avanzados de simulación de CPU y memoria. Para facilitar tu aprendizaje, hemos dividido la interfaz en dos componentes fundamentales:
        </P>
        <ul className="list-disc pl-6 text-slate-300 mb-6 space-y-2">
          <li>
            <Strong>Pantalla de Terminal (Salida Estándar):</Strong> Es la caja de color negro en el simulador. Muestra <strong>exclusivamente</strong> los mensajes de salida de tu programa (<InlineCode>Escribir</InlineCode>) y te permite escribir tus datos de entrada (<InlineCode>Leer</InlineCode>) en tiempo real presionando <strong>Enter</strong>. ¡Es exactamente igual a una terminal de Linux o Windows!
          </li>
          <li>
            <Strong>Consola de Depuración (Debugger):</Strong> Es un panel técnico que muestra los secretos internos de la CPU, como el cálculo matemático detallado de los acumuladores o el análisis lógico paso a paso de las condiciones evaluadas.
          </li>
        </ul>
        <Callout variant="tip">
          <Strong>Ubicación del botón de Depuración:</Strong> Para activar o desactivar la consola de depuración en cualquier simulador, localiza el botón de neón con el texto <Strong>«Ver Depuración»</Strong> / <Strong>«Ocultar Depuración»</Strong> (acompañado de un icono de ojo 👁️) situado en la esquina superior derecha de la sección de <strong>Memoria (RAM)</strong> de cada trazador interactivo. ¡Te recomendamos encenderlo si quieres inspeccionar las matemáticas internas del ciclo paso a paso!
        </Callout>
      </PageSection>

      {/* --- LOOP CLASSROOM SIMULATOR INTERACTIVE SECTION --- */}
      <PageSection title="Componente Interactivo: Loop Classroom Simulator">
        <P>
          Experimenta en tiempo real con la analogía del salón de clases. Haz clic en <strong>Iniciar Simulación</strong> para ver cómo ingresan los estudiantes uno por uno a sus pupitres, mientras observas el contador mental rebotar e incrementarse en memoria y el trazador resaltar la instrucción exacta de pseudocódigo.
        </P>

        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Visual Classroom Grids */}
            <div className="flex-1 bg-slate-900/60 rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between min-h-[350px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Users size={14} className="text-brand-400" /> Salón de Clases (2D View)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                    <span className="text-xs text-slate-400">Puerta Abierta</span>
                  </div>
                </div>

                {/* Grid of Seats */}
                <div className="grid grid-cols-4 gap-3 my-4">
                  {seats.map((isOccupied, idx) => (
                    <div 
                      key={idx}
                      className={`h-14 rounded-xl border flex flex-col items-center justify-center font-mono text-[10px] transition-all duration-500 ${
                        isOccupied 
                          ? 'bg-brand-500/10 border-brand-500 text-brand-300 shadow-[0_0_12px_rgba(0,255,136,0.15)] scale-105' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-600'
                      }`}
                    >
                      <span className="text-xs">{isOccupied ? '🎒' : '🪑'}</span>
                      <span>Seat {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Display and Sim Controls */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Contador estudiantes</span>
                  <span className={`text-4xl font-mono font-bold transition-all duration-300 ${estudiantes > 0 ? 'text-brand-400 scale-105 animate-bounce' : 'text-slate-600'}`}>
                    {estudiantes}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={resetSimulation}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                    title="Reiniciar"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button 
                    onClick={triggerNextStep}
                    disabled={isPlaying || simStep === 5}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Paso a Paso
                  </button>
                  <button 
                    onClick={startSimulation}
                    className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs rounded-lg transition-colors border ${
                      isPlaying 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30' 
                        : 'bg-brand-500/20 text-brand-400 border-brand-500/40 hover:bg-brand-500/30'
                    }`}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Pausar' : 'Auto-Play'}
                  </button>
                </div>
              </div>
            </div>

            {/* Code Highlighter */}
            <div className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
              <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">classroom_counter.udone</span>
                <span className="text-[10px] text-slate-500">SPEED: 1s</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-1.5 flex-1 overflow-y-auto">
                {SIM_CODE_LINES.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActive = activeLine === lineNum;
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-3 px-2 py-0.5 rounded-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400 shadow-[0_0_8px_rgba(0,255,136,0.1)]' 
                          : 'text-slate-400 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="text-slate-600 select-none w-4 text-right flex-shrink-0">{lineNum}</span>
                      <span className="whitespace-pre">{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </PageSection>
    </div>
  );
};
