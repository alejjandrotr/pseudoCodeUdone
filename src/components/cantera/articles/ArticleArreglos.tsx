import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, CodeBlock, Strong, InlineCode, Callout } from '../ArticlePageComponents';
import { Database, Play, Pause, RotateCcw, Box, TerminalSquare, ChevronRight } from 'lucide-react';

export const ArticleArreglos: React.FC = () => {
  // Simulación de Arreglo Secuencial
  const [puntos, setPuntos] = useState<(number | null)[]>(Array(10).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [simStep, setSimStep] = useState(0); // 0 = start, 1..10 = reading, 11..20 = writing, 21 = end
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [ramHighlightIndex, setRamHighlightIndex] = useState<number | null>(null);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const CODE_LINES = [
    'Algoritmo Registro_Puntuaciones_Secuencial',
    'Variables:',
    '    puntos: Arreglo de Real[10]',
    'Inicio',
    '    // Entrada de datos',
    '    Escribir "Indique los puntos del jugador 1: "',
    '    Leer puntos[1]',
    '    Escribir "Indique los puntos del jugador 2: "',
    '    Leer puntos[2]',
    '    Escribir "Indique los puntos del jugador 3: "',
    '    Leer puntos[3]',
    '    Escribir "Indique los puntos del jugador 4: "',
    '    Leer puntos[4]',
    '    Escribir "Indique los puntos del jugador 5: "',
    '    Leer puntos[5]',
    '    Escribir "Indique los puntos del jugador 6: "',
    '    Leer puntos[6]',
    '    Escribir "Indique los puntos del jugador 7: "',
    '    Leer puntos[7]',
    '    Escribir "Indique los puntos del jugador 8: "',
    '    Leer puntos[8]',
    '    Escribir "Indique los puntos del jugador 9: "',
    '    Leer puntos[9]',
    '    Escribir "Indique los puntos del jugador 10: "',
    '    Leer puntos[10]',
    '    ',
    '    // Salida de datos',
    '    Escribir "Las puntuaciones ingresadas son:"',
    '    Escribir "Jugador 1: ", puntos[1]',
    '    Escribir "Jugador 2: ", puntos[2]',
    '    Escribir "Jugador 3: ", puntos[3]',
    '    Escribir "Jugador 4: ", puntos[4]',
    '    Escribir "Jugador 5: ", puntos[5]',
    '    Escribir "Jugador 6: ", puntos[6]',
    '    Escribir "Jugador 7: ", puntos[7]',
    '    Escribir "Jugador 8: ", puntos[8]',
    '    Escribir "Jugador 9: ", puntos[9]',
    '    Escribir "Jugador 10: ", puntos[10]',
    'Fin'
  ];

  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, simStep, isWaitingInput]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setPuntos(Array(10).fill(null));
    setSimStep(0);
    setActiveLine(null);
    setTerminalLogs([]);
    setRamHighlightIndex(null);
    setIsWaitingInput(false);
    setInputValue("");
  };

  const advanceSimulation = () => {
    if (isWaitingInput) return;

    if (simStep === 0) {
      setActiveLine(3); // puntos: Arreglo de Real[10]
      setSimStep(1);
    } else if (simStep >= 1 && simStep <= 10) {
      // Leer
      const idx = simStep - 1;
      const currentLine = 7 + (idx * 2); // Leer points[idx + 1]
      setActiveLine(currentLine);
      
      setTerminalLogs(prev => [...prev, `Indique los puntos del jugador ${idx + 1}: `]);
      setRamHighlightIndex(idx);
      
      setIsWaitingInput(true);
    } else if (simStep === 11) {
      setActiveLine(28); // Escribir "Las puntuaciones ingresadas son:"
      setTerminalLogs(prev => [...prev, 'Las puntuaciones ingresadas son:']);
      setRamHighlightIndex(null);
      setSimStep(12);
    } else if (simStep >= 12 && simStep <= 21) {
      // Escribir
      const idx = simStep - 12;
      const currentLine = 29 + idx; 
      setActiveLine(currentLine);
      setRamHighlightIndex(idx);
      
      setTerminalLogs(prev => [...prev, `Jugador ${idx + 1}: ${puntos[idx]}`]);
      setSimStep(simStep + 1);
    } else {
      setActiveLine(39); // Fin
      setRamHighlightIndex(null);
      setIsPlaying(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const val = parseFloat(inputValue);
    if(isNaN(val)) return;

    const idx = simStep - 1; 
    
    setTerminalLogs(prev => {
      const newLogs = [...prev];
      newLogs[newLogs.length - 1] += val;
      return newLogs;
    });

    setPuntos(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    
    setInputValue("");
    setIsWaitingInput(false);
    setSimStep(simStep + 1);
  };

  return (
    <div>
      <PageSection title="Definición Formal de un Arreglo">
        <P>
          Desde una perspectiva formal, un arreglo se define como una <Strong>colección contigua de datos del mismo tipo que posee un tamaño fijo y predeterminado</Strong>. Esto significa que un solo arreglo no puede mezclar tipos de datos distintos (por ejemplo, enteros con cadenas de texto) y su capacidad no puede alterarse dinámicamente durante la ejecución del programa.
        </P>
        
        <P>
          Para declarar un arreglo en nuestro pseudocódigo estándar UDONE, debemos asignarlo a una variable especificando el tipo de dato de sus elementos y delimitando su tamaño máximo entre corchetes.
        </P>

        <CodeBlock code={`Variables:\n    x: Arreglo de Real[10]`} />
        
        {/* Diagrama Estático del Arreglo */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 my-6 overflow-hidden">
          <span className="text-xs uppercase font-bold text-slate-500 mb-4 tracking-wider flex items-center gap-2">
            <Database size={14} className="text-brand-400" /> Estructura en Memoria (Arreglo x de 10 casillas)
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-4 custom-scrollbar snap-x">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 min-w-[3rem] snap-start">
                <div className="w-full h-12 bg-slate-950 border border-slate-700/80 rounded flex items-center justify-center font-mono text-xs text-slate-400 shadow-sm">
                  {i === 2 ? <span className="text-brand-400 font-bold text-sm">5.0</span> : '0.0'}
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">[{i + 1}]</span>
              </div>
            ))}
          </div>
        </div>

        <P>
          Al asignar un tamaño de 10 a un arreglo de números reales, el sistema reserva internamente una secuencia de 10 casillas de memoria. En muchos lenguajes de programación estructurados, estas posiciones se inicializan automáticamente en cero (0).
        </P>

        <P>
          Para manipular el contenido del arreglo y asignar un valor a una casilla específica, utilizamos una instrucción de asignación directa referenciando la posición deseada dentro de los corchetes:
        </P>
        <CodeBlock code={`x[3] <- 5`} />
      </PageSection>

      <PageSection title="Restricciones Operacionales en Pseudocódigo">
        <Callout variant="warning">
          Es fundamental señalar que existen restricciones rigurosas sobre las operaciones permitidas con arreglos en el ámbito académico. En nuestro pseudocódigo <Strong>está estrictamente prohibido realizar lecturas o escrituras directas de arreglos completos</Strong>.
        </Callout>
        <P>
          Por lo tanto, instrucciones del tipo <InlineCode>Escribir x</InlineCode> o <InlineCode>Leer x</InlineCode> se consideran conceptualmente incorrectas. Toda operación de entrada o salida debe realizarse de manera individualizada, accediendo elemento por elemento.
        </P>
      </PageSection>

      <PageSection title="Laboratorio: Acceso y Operaciones Secuenciales">
        <P>
          A continuación, se presenta la implementación del algoritmo básico para solicitar y mostrar las puntuaciones de los competidores de manera explícita y lineal, sin hacer uso de estructuras de iteración, con el propósito de ilustrar el acceso directo a cada posición de memoria.
        </P>

        {/* Trazador Interactivo Secuencial */}
        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Memoria y Terminal */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans mb-4">
                  <Box size={14} className="text-brand-400" /> Estado Dinámico del Arreglo
                </span>
                
                {/* Cuadrícula del arreglo en 1 sola fila con scroll */}
                <div className="flex gap-1.5 my-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                  {puntos.map((valor, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col items-center gap-1.5 transition-all duration-300 min-w-[3rem] snap-start`}
                    >
                      <div className={`w-full h-10 border rounded flex items-center justify-center font-mono text-xs shadow-sm ${
                        ramHighlightIndex === idx 
                          ? 'bg-brand-500/20 border-brand-400 text-brand-300 shadow-[0_0_12px_rgba(0,255,136,0.4)] scale-110 z-10 font-bold' 
                          : valor !== null
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-medium'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}>
                        {valor !== null ? valor : '-'}
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono font-bold">[{idx + 1}]</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal */}
              <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end h-[160px] overflow-y-auto mt-4 shadow-inner">
                <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <TerminalSquare size={12} /> Salida
                </div>
                <div className="space-y-1">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={log.includes('>') ? 'text-brand-400' : 'text-slate-100'}>
                      {log}
                    </div>
                  ))}
                  {isWaitingInput && (
                    <form onSubmit={handleInputSubmit} className="flex items-center gap-2 mt-1">
                      <span className="text-brand-400">&gt
    </span>
                      <input 
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                        className="bg-transparent border-none outline-none text-brand-400 w-full"
                        placeholder="Ingresa el valor y presiona Enter..."
                      />
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center">
                <button 
                  onClick={resetSimulation}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={advanceSimulation}
                    disabled={isPlaying || simStep >= 22 || isWaitingInput}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Siguiente Paso <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      if(simStep >= 22) resetSimulation();
                      setIsPlaying(!isPlaying);
                    }}
                    disabled={isWaitingInput}
                    className={`flex items-center gap-1 px-4 py-1.5 font-bold text-xs rounded-lg transition-colors border disabled:opacity-50 ${
                      isPlaying 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                        : 'bg-brand-500/20 text-brand-400 border-brand-500/40'
                    }`}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Pausar' : 'Auto-Play'}
                  </button>
                </div>
              </div>
            </div>

            {/* Código */}
            <div className="w-full lg:w-[450px] xl:w-[500px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl shrink-0">
              <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">secuencial.udone</span>
              </div>
              <div className="p-4 font-mono text-[10px] sm:text-xs space-y-1 overflow-y-auto flex-grow bg-slate-950/20 max-h-[450px]">
                {CODE_LINES.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActive = activeLine === lineNum;
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-2 px-1 py-0.5 rounded transition-colors ${
                        isActive 
                          ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400' 
                          : 'text-slate-500 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="text-slate-700 select-none w-4 text-right flex-shrink-0">{lineNum}</span>
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
