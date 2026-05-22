import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, YouTubeEmbed, Strong } from '../ArticlePageComponents';
import { ArrowLeft, ArrowRight, ShieldAlert, RotateCcw, Play, Pause, ChevronRight, HelpCircle, TerminalSquare, Eye, EyeOff, Box, CheckCircle } from 'lucide-react';

export const ArticleVideoRepetir: React.FC = () => {
  // --- CAROUSEL STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Evaluación Posterior (Post-Condición)',
      description: 'A diferencia de Mientras, la condición de parada del ciclo Repetir se evalúa al final del bloque. Esto asegura de forma incondicional que el bloque de instrucciones interno siempre se ejecutará al menos una vez.',
      icon: '🔄',
      color: 'border-violet-500 bg-violet-500/5 text-violet-400'
    },
    {
      title: 'Lógica Booleana Inversa',
      description: 'El ciclo Mientras repite si la condición es Verdadera. El ciclo Repetir repite si la condición es Falsa, y se rompe en el instante exacto en que la condición lógica final se vuelve Verdadera (actúa como fusible de parada).',
      icon: '⚖️',
      color: 'border-cyan-500 bg-cyan-500/5 text-cyan-400'
    },
    {
      title: 'Criterio Académico de Selección',
      description: 'Utiliza Repetir cuando sea obligatorio ejecutar las acciones antes de preguntar (ej: imprimir un menú de opciones). Utiliza Mientras cuando debas evitar ejecutar el ciclo si los valores iniciales no cumplen (ej: procesar una lista vacía).',
      icon: '🛡️',
      color: 'border-emerald-500 bg-emerald-500/5 text-emerald-400'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  // --- TRACE SIMULATOR STATE ---
  const [cantidadNumeros, setCantidadNumeros] = useState<number>(3);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [suma, setSuma] = useState<number>(0);
  const [iteration, setIteration] = useState<number>(0); // Current iteration count inside loop
  const [simStep, setSimStep] = useState<number>(0); // 0 = ready, 1 = wait quantity, 2 = enter repeat loop, 3 = wait number, 4 = accumulate, 5 = decrement, 6 = evaluate Hasta condition, 7 = print final sum, 8 = finished
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null); // 'suma' | 'cantidad' | 'numero' | null
  
  // Dual-Terminal Log States
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Depurador listo. Presiona Siguiente Paso o Auto-Play para comenzar la traza.']);
  
  // Debug Console Collapse State
  const [showDebug, setShowDebug] = useState<boolean>(false);

  // Interactive Console Input State
  const [consoleInputValue, setConsoleInputValue] = useState('');
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState<'cantidad' | 'numero' | null>(null);
  const [wasPlayingBeforeInput, setWasPlayingBeforeInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Robust State Ref to bypass React asynchronous closure limitations in timeouts/intervals
  const stateRef = useRef({
    cantidadNumeros,
    currentNumber,
    suma,
    iteration,
    simStep,
    isPlaying,
    isWaitingInput,
    wasPlayingBeforeInput,
    inputPrompt
  });

  useEffect(() => {
    stateRef.current = {
      cantidadNumeros,
      currentNumber,
      suma,
      iteration,
      simStep,
      isPlaying,
      isWaitingInput,
      wasPlayingBeforeInput,
      inputPrompt
    };
  }, [cantidadNumeros, currentNumber, suma, iteration, simStep, isPlaying, isWaitingInput, wasPlayingBeforeInput, inputPrompt]);

  const CODE_LINES = [
    'Algoritmo sumador_de_numeros_repetir',
    'Variables:',
    '    cantidad_numeros, numero, suma: Entero',
    'Inicio',
    '    suma <- 0',
    '    Escribir "Ingrese la cantidad de números a sumar: "',
    '    Leer cantidad_numeros',
    '    Repetir',
    '        Escribir "Ingrese un número: "',
    '        Leer numero',
    '        suma <- suma + numero',
    '        cantidad_numeros <- cantidad_numeros - 1',
    '    Hasta (cantidad_numeros = 0)',
    '    Escribir "La suma total es: " + suma',
    'Fin'
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, 1250);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isWaitingInput, simStep]);

  // Focus terminal input dynamically
  useEffect(() => {
    if (isWaitingInput && consoleInputRef.current) {
      consoleInputRef.current.focus();
    }
  }, [isWaitingInput]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setIsWaitingInput(false);
    setInputPrompt(null);
    setConsoleInputValue('');
    setSuma(0);
    setCurrentNumber(null);
    setIteration(0);
    setSimStep(0);
    setActiveLine(null);
    setRamHighlight(null);
    setTerminalLogs([]);
    setDebugLogs(['> Depurador listo. Presiona Siguiente Paso o Auto-Play para comenzar la traza.']);
  };

  const advanceSimulation = () => {
    const state = stateRef.current;
    if (state.isWaitingInput) return; // Prevent advancing manually when waiting for terminal console input

    switch (state.simStep) {
      case 0:
        // Set Suma to 0 (Line 5)
        setActiveLine(5);
        setSuma(0);
        setRamHighlight('suma');
        setDebugLogs(prev => [...prev, '> [Línea 5] Memoria: inicializando suma <- 0']);
        setSimStep(1);
        break;
      case 1:
        // Write prompt & Leer quantity of numbers (Lines 6 & 7)
        setActiveLine(6);
        setTerminalLogs(['Ingrese la cantidad de números a sumar: ']);
        setDebugLogs(prev => [...prev, '> [Línea 6] Escribir prompt para cantidad_numeros']);
        setWasPlayingBeforeInput(state.isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setInputPrompt('cantidad');
        setRamHighlight('cantidad');
        break;
      case 2:
        // Enter Repetir loop (Line 8)
        setActiveLine(8);
        setRamHighlight(null);
        setDebugLogs(prev => [...prev, '> [Línea 8] Repetir: ingresando al bloque de forma incondicional']);
        setSimStep(3);
        break;
      case 3:
        // Write prompt & Leer number (Lines 9 & 10)
        setActiveLine(9);
        setTerminalLogs(prev => [...prev, 'Ingrese un número: ']);
        setDebugLogs(prev => [...prev, `> [Línea 9] Escribir prompt para leer sumando #${state.iteration + 1}`]);
        setWasPlayingBeforeInput(state.isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setInputPrompt('numero');
        setRamHighlight('numero');
        break;
      case 4:
        // Accumulate (Line 11)
        setActiveLine(11);
        const prevSuma = state.suma;
        const newSuma = state.suma + (state.currentNumber ?? 0);
        setSuma(newSuma);
        setRamHighlight('suma');
        setDebugLogs(prev => [...prev, `> [Línea 11] Acumulador: suma <- ${prevSuma} + ${state.currentNumber} ➔ ${newSuma}`]);
        setSimStep(5);
        break;
      case 5:
        // Decrement (Line 12)
        setActiveLine(12);
        const nextIteration = state.iteration + 1;
        setIteration(nextIteration);
        setRamHighlight('cantidad');
        setDebugLogs(prev => [...prev, `> [Línea 12] Decremento: cantidad_numeros <- ${state.cantidadNumeros - state.iteration} - 1 ➔ ${state.cantidadNumeros - nextIteration}`]);
        setSimStep(6);
        break;
      case 6:
        // Evaluate Hasta condition (Line 13)
        setActiveLine(13);
        setRamHighlight(null);
        const remaining = state.cantidadNumeros - state.iteration;
        const condition = remaining === 0;
        setDebugLogs(prev => [
          ...prev, 
          `> [Línea 13] Hasta Parada: ¿cantidad_numeros (${remaining}) = 0? ➔ ${condition ? 'VERDADERO (Detiene y sale)' : 'FALSO (Repite el ciclo)'}`
        ]);
        if (condition) {
          setSimStep(7); // Terminate, exit loop
        } else {
          setSimStep(3); // Loop back in Repetir to ask next number
        }
        break;
      case 7:
        // Escribir total (Line 14)
        setActiveLine(14);
        setRamHighlight(null);
        setTerminalLogs(prev => [...prev, `La suma total es: ${state.suma}`]);
        setDebugLogs(prev => [...prev, `> [Línea 14] Escribir en Terminal: suma total acumulada es ${state.suma}`]);
        setSimStep(8);
        break;
      case 8:
        // Fin (Line 15)
        setActiveLine(15);
        setDebugLogs(prev => [...prev, '> [Línea 15] Fin de la ejecución con salida de post-condición exitosa.']);
        setIsPlaying(false);
        setSimStep(9);
        break;
      default:
        resetSimulation();
        break;
    }
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const state = stateRef.current;
    if (!state.isWaitingInput || !state.inputPrompt) return;

    const val = parseInt(consoleInputValue.trim());
    if (isNaN(val)) return;

    if (state.inputPrompt === 'cantidad') {
      const qty = Math.max(1, Math.min(5, val)); // restrict to 1-5 for smooth traces
      setCantidadNumeros(qty);
      setTerminalLogs(prev => [...prev, `  > ${qty}`]);
      setDebugLogs(prev => [...prev, `> [Línea 7] Leer cantidad_numeros ➔ Guardado en RAM: ${qty}`]);
      setIsWaitingInput(false);
      setInputPrompt(null);
      setConsoleInputValue('');
      setSimStep(2); // Jump to enter repeat loop
      if (state.wasPlayingBeforeInput) {
        setIsPlaying(true);
      } else {
        setTimeout(() => advanceSimulation(), 100);
      }
    } else if (state.inputPrompt === 'numero') {
      setCurrentNumber(val);
      setTerminalLogs(prev => [...prev, `  > ${val}`]);
      setDebugLogs(prev => [...prev, `> [Línea 10] Leer numero ➔ Guardado en RAM: ${val}`]);
      setIsWaitingInput(false);
      setInputPrompt(null);
      setConsoleInputValue('');
      setSimStep(4); // Jump to accumulation
      if (state.wasPlayingBeforeInput) {
        setIsPlaying(true);
      } else {
        setTimeout(() => advanceSimulation(), 100);
      }
    }
  };

  const startSimulation = () => {
    const state = stateRef.current;
    if (state.simStep === 9) {
      resetSimulation();
      setIsPlaying(true);
    } else {
      setIsPlaying(!state.isPlaying);
    }
  };

  return (
    <div>
      <P>
        Bienvenido a este recurso complementario de apoyo visual. En esta lección analizaremos en profundidad el funcionamiento del bucle <strong>Repetir</strong> y comprenderemos cómo aplicar la lógica de parada inversa.
      </P>

      <YouTubeEmbed 
        videoId="J6q6NchWwF8" 
        title="Clase 3/4 sobre Estructuras Repetitivas (Ciclos #015)" 
      />

      <PageSection title="Análisis Técnico de la Clase">
        <P>
          La lección audiovisual se centra en el estudio del ciclo <strong>Repetir</strong> y contrasta su comportamiento frente a Mientras.
        </P>
        <P>
          El bloque se ejecuta incondicionalmente en su primera iteración. La condición se evalúa estrictamente al final, actuando como una <strong>condición de parada</strong> cuando es verdadera.
        </P>
      </PageSection>

      {/* --- CONCEPT CARD CAROUSEL --- */}
      <PageSection title="Conceptos Clave Analizados en la Clase">
        <P>
          Haz clic en las flechas de navegación para recorrer el carrusel y repasar las reglas de oro de los ciclos Do-While explicadas por el profesor en la pizarra interactiva.
        </P>

        <div className="relative glass-panel border border-slate-800 rounded-2xl p-6 bg-slate-950/45 my-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Lección {currentSlide + 1} de {slides.length}
            </span>
            <span className="text-2xl">{slides[currentSlide].icon}</span>
          </div>

          <div className="flex-1 animate-fade-in pr-2">
            <h3 className={`text-lg font-bold mb-2 border-b-2 border-slate-800 pb-1.5 inline-block ${slides[currentSlide].color.split(' ')[2]}`}>
              {slides[currentSlide].title}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {slides[currentSlide].description}
            </p>
          </div>

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

      {/* --- TRACE SIMULATOR --- */}
      <PageSection title="Trazador Paso a Paso: Sumador de Números (Versión Repetir)">
        <P>
          Para evidenciar la diferencia estructural directa, simulemos el sumador acumulativo pero utilizando la estructura de control posterior `Repetir ... Hasta`.
        </P>
        <P>
          Haz clic en <strong>Auto-Play</strong> o <strong>Siguiente Paso</strong> para iniciar la simulación, y escribe los valores directamente en la terminal cuando se te solicite.
        </P>

        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: RAM & Settings */}
            <div className="flex-1 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans">
                    <HelpCircle size={14} className="text-brand-400" /> Memoria (RAM) de Variables
                  </span>
                  <div className="flex items-center gap-3">
                    {isWaitingInput && (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse uppercase tracking-wider">
                        Esperando entrada...
                      </span>
                    )}
                    <button 
                      onClick={() => setShowDebug(!showDebug)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                        showDebug 
                          ? 'bg-brand-500/15 border-brand-500/30 text-brand-300' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {showDebug ? <EyeOff size={11} /> : <Eye size={11} />}
                      {showDebug ? 'Ocultar Depuración' : 'Ver Depuración'}
                    </button>
                  </div>
                </div>

                {/* Compact RAM Layout */}
                <div className="grid grid-cols-3 gap-2.5 my-3">
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'cantidad' 
                      ? 'border-orange-500 bg-orange-500/10 scale-105 shadow-[0_0_8px_rgba(249,115,22,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">cantidad_numeros</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'cantidad' ? 'text-orange-400' : 'text-slate-100'}`}>
                      {simStep === 0 ? '?' : Math.max(0, cantidadNumeros - iteration)}
                    </span>
                  </div>
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'numero' 
                      ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-[0_0_8px_rgba(6,182,212,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">numero</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'numero' ? 'text-cyan-400' : 'text-slate-100'}`}>
                      {currentNumber === null ? '?' : currentNumber}
                    </span>
                  </div>
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'suma' 
                      ? 'border-emerald-500 bg-emerald-500/10 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">suma (acumulador)</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'suma' ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {suma}
                    </span>
                  </div>
                </div>
              </div>

              {/* Standard Output Virtual Terminal */}
              <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end min-h-[150px] max-h-[170px] overflow-y-auto mt-3 shadow-inner">
                <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 tracking-wider flex items-center gap-1.5 select-none font-sans">
                  <TerminalSquare size={12} className="text-slate-500" /> Pantalla de Terminal
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith('  >') ? 'text-emerald-400 font-bold' : 'text-slate-100'}>
                      {log}
                    </div>
                  ))}

                  {/* Terminal Input prompt */}
                  {isWaitingInput && (
                    <form onSubmit={handleConsoleSubmit} className="flex gap-1.5 items-center border-t border-slate-900/40 pt-1.5 mt-1.5">
                      <span className="text-emerald-400 font-bold">&gt; </span>
                      <input 
                        ref={consoleInputRef}
                        type="number" 
                        value={consoleInputValue}
                        onChange={e => setConsoleInputValue(e.target.value)}
                        className="bg-transparent border-none outline-none text-slate-100 font-mono w-full text-xs focus:ring-0 p-0"
                        placeholder="Escribe el valor y presiona Enter..."
                        autoFocus
                      />
                    </form>
                  )}
                </div>
              </div>

              {/* Debugging Console Log (Collapse / Toggled) */}
              {showDebug && (
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-400 flex flex-col justify-end min-h-[110px] max-h-[130px] overflow-y-auto mt-3 animate-fade-in">
                  <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest flex items-center gap-1.5 select-none font-sans">
                    🔧 CONSOLA DE DEPURACIÓN (DEBUGGER)
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col justify-end">
                    {debugLogs.slice(-4).map((log, idx) => {
                      if (!log) return null;
                      const isEval = log.includes('Hasta Parada');
                      const isAcum = log.includes('Acumulador');
                      const isDec = log.includes('Decremento');
                      let logClass = 'text-slate-500';
                      if (isEval) logClass = 'text-indigo-400/80';
                      else if (isAcum) logClass = 'text-emerald-400/80';
                      else if (isDec) logClass = 'text-amber-400/80';

                      return (
                        <div key={idx} className={logClass}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Verification Success Celebration Indicator */}
              {simStep === 9 && (
                <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-semibold animate-bounce font-sans">
                  <CheckCircle size={16} /> ¡Calificación Válida Registrada con Éxito en Memoria!
                </div>
              )}

              {/* Controls footer */}
              <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center font-sans">
                <button 
                  onClick={resetSimulation}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  title="Reiniciar Simulación"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={advanceSimulation}
                    disabled={isPlaying || simStep === 9 || isWaitingInput}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Siguiente Paso <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={startSimulation}
                    disabled={(simStep === 9 && isPlaying) || isWaitingInput}
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

            {/* Right Column: Code viewer */}
            <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between font-sans">
                <span className="text-xs font-mono text-slate-400">sumador_repetir.udone</span>
                <span className="text-[10px] text-slate-500">SPEED: 1.25s</span>
              </div>
              <div className="p-4 font-mono text-[11px] sm:text-xs space-y-1.5 flex-grow overflow-y-auto bg-slate-950/20">
                {CODE_LINES.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActive = activeLine === lineNum;
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-3 px-2 py-0.5 rounded-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400 shadow-[0_0_8px_rgba(0,255,136,0.1)]' 
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

      <Callout variant="tip">
        <Strong>Conclusión:</Strong> Estudiar y trazar el ciclo Repetir demuestra cómo la compuerta final permite a los desarrolladores garantizar validaciones limpias e inicializaciones óptimas en el diseño de software.
      </Callout>
    </div>
  );
};
