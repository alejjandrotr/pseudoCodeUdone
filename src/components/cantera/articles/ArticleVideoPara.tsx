import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, YouTubeEmbed, Strong } from '../ArticlePageComponents';
import { RotateCcw, Play, Pause, ChevronRight, HelpCircle, TerminalSquare, Eye, EyeOff, Box, CheckCircle } from 'lucide-react';

export const ArticleVideoPara: React.FC = () => {
  // --- TRACE SIMULATOR STATE ---
  const [cantidadNumeros, setCantidadNumeros] = useState<number>(3);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [suma, setSuma] = useState<number>(0);
  const [i, setI] = useState<number | null>(null);
  
  const [simStep, setSimStep] = useState<number>(0); // 0 = ready, 1 = wait quantity, 2 = init loop index i <- 1, 3 = check i <= quantity, 4 = wait number, 5 = accumulate, 6 = increment index, 7 = print final sum, 8 = finished
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null); // 'suma' | 'cantidad' | 'numero' | 'i' | null
  
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
    i,
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
      i,
      simStep,
      isPlaying,
      isWaitingInput,
      wasPlayingBeforeInput,
      inputPrompt
    };
  }, [cantidadNumeros, currentNumber, suma, i, simStep, isPlaying, isWaitingInput, wasPlayingBeforeInput, inputPrompt]);

  const CODE_LINES = [
    'Algoritmo sumador_de_numeros_para',
    'Variables:',
    '    cantidad_numeros, numero, suma, i: Entero',
    'Inicio',
    '    suma <- 0',
    '    Escribir "Ingrese la cantidad de números a sumar: "',
    '    Leer cantidad_numeros',
    '    Para i <- 1 Hasta cantidad_numeros Hacer',
    '        Escribir "Ingrese un número: "',
    '        Leer numero',
    '        suma <- suma + numero',
    '    Fin Para',
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
    setI(null);
    setCurrentNumber(null);
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
        // Init Para Loop (Line 8)
        setActiveLine(8);
        setI(1);
        setRamHighlight('i');
        setDebugLogs(prev => [...prev, '> [Línea 8] Para i <- 1: Inicializando índice de control a 1']);
        setSimStep(3);
        break;
      case 3:
        // Check loop boundary i <= cantidad_numeros (Line 8)
        setActiveLine(8);
        setRamHighlight(null);
        const currentIdx = state.i ?? 1;
        const reachedEnd = currentIdx > state.cantidadNumeros;
        setDebugLogs(prev => [
          ...prev, 
          `> [Línea 8] Límite: ¿índice i (${currentIdx}) > cantidad_numeros (${state.cantidadNumeros})? ➔ ${reachedEnd ? 'VERDADERO (Rompe y sale)' : 'FALSO (Entra a iterar)'}`
        ]);
        if (reachedEnd) {
          setSimStep(7); // Terminate, exit loop
        } else {
          setSimStep(4); // Ask number inside loop
        }
        break;
      case 4:
        // Write prompt & Leer number (Lines 9 & 10)
        setActiveLine(9);
        setTerminalLogs(prev => [...prev, 'Ingrese un número: ']);
        setDebugLogs(prev => [...prev, `> [Línea 9] Escribir prompt para leer sumando #${state.i}`]);
        setWasPlayingBeforeInput(state.isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setInputPrompt('numero');
        setRamHighlight('numero');
        break;
      case 5:
        // Accumulate (Line 11)
        setActiveLine(11);
        const prevSuma = state.suma;
        const newSuma = state.suma + (state.currentNumber ?? 0);
        setSuma(newSuma);
        setRamHighlight('suma');
        setDebugLogs(prev => [...prev, `> [Línea 11] Acumulador: suma <- ${prevSuma} + ${state.currentNumber} ➔ ${newSuma}`]);
        setSimStep(6);
        break;
      case 6:
        // Increment Index automatically (Line 12)
        setActiveLine(12);
        const nextIdx = (state.i ?? 1) + 1;
        setI(nextIdx);
        setRamHighlight('i');
        setDebugLogs(prev => [...prev, `> [Línea 12] Fin Para: i se incrementa automáticamente a ${nextIdx}. Volviendo a evaluar.`]);
        setSimStep(3); // Jump to boundary check
        break;
      case 7:
        // Escribir total (Line 13)
        setActiveLine(13);
        setRamHighlight(null);
        setTerminalLogs(prev => [...prev, `La suma total es: ${state.suma}`]);
        setDebugLogs(prev => [...prev, `> [Línea 13] Escribir en Terminal: la suma acumulada total es ${state.suma}`]);
        setSimStep(8);
        break;
      case 8:
        // Fin (Line 14)
        setActiveLine(14);
        setDebugLogs(prev => [...prev, '> [Línea 14] Fin del algoritmo sumador_de_numeros_para.']);
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
      setSimStep(2); // Jump to index initialization
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
      setSimStep(5); // Jump to accumulation
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
        Bienvenido al recurso de apoyo visual final. En esta lección profundizaremos en el ciclo contable determinado <strong>Para</strong> y consolidaremos las reglas prácticas sobre cuándo usar cada estructura cíclica.
      </P>

      <YouTubeEmbed 
        videoId="J6q6NchWwF8" 
        title="Clase 4/4 sobre Estructuras Repetitivas (Ciclos #016)" 
      />

      <PageSection title="Análisis Técnico de la Clase">
        <P>
          La lección audiovisual destaca la eficiencia del bucle <strong>Para</strong>. Al gestionar de forma transparente la inicialización y el incremento de la variable del índice, se eliminan el 90% de los errores comunes asociados a bucles infinitos por olvido de incrementos manuales.
        </P>
      </PageSection>

      {/* --- SIDE-BY-SIDE COMPARE GRAPH --- */}
      <PageSection title="Matriz Comparativa de Estructuras Cíclicas">
        <P>
          A continuación repasa la guía de oro para seleccionar el ciclo óptimo en tus algoritmos universitarios:
        </P>

        <div className="overflow-x-auto my-6 border border-slate-800 rounded-xl bg-slate-950/40">
          <table className="min-w-full divide-y divide-slate-800 font-sans text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-300 font-bold uppercase tracking-wider text-left">
              <tr>
                <th className="px-4 py-3">Estructura</th>
                <th className="px-4 py-3">¿Cuándo Usar?</th>
                <th className="px-4 py-3">Comportamiento Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-900/30 transition-colors">
                <td className="px-4 py-3.5 font-bold text-cyan-400">Para (For)</td>
                <td className="px-4 py-3.5">Se conoce con total exactitud la cantidad de iteraciones.</td>
                <td className="px-4 py-3.5 text-slate-400">Gestión integrada en una sola línea. Incremento automatizado.</td>
              </tr>
              <tr className="hover:bg-slate-900/30 transition-colors">
                <td className="px-4 py-3.5 font-bold text-violet-400">Mientras (While)</td>
                <td className="px-4 py-3.5">No se sabe la cantidad de vueltas y es posible que no deba correr nunca.</td>
                <td className="px-4 py-3.5 text-slate-400">Evaluación condicional previa. Puede iterar 0 veces.</td>
              </tr>
              <tr className="hover:bg-slate-900/30 transition-colors">
                <td className="px-4 py-3.5 font-bold text-amber-400">Repetir (Do-While)</td>
                <td className="px-4 py-3.5">No se sabe la cantidad pero debe ejecutarse al menos una vez obligatoriamente.</td>
                <td className="px-4 py-3.5 text-slate-400">Evaluación condicional posterior. Condición de parada inversa.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* --- TRACE SIMULATOR --- */}
      <PageSection title="Trazador Paso a Paso: Sumador de Números (Versión Para)">
        <P>
          Comparemos el sumador de números interactivo implementado con el ciclo determinado `Para`. Observa que no necesitamos manipular variables acumuladoras ni contadores externos para mantener el bucle bajo control.
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
                <div className="grid grid-cols-4 gap-2.5 my-3">
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'cantidad' 
                      ? 'border-orange-500 bg-orange-500/10 scale-105 shadow-[0_0_8px_rgba(249,115,22,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">cantidad_numeros</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'cantidad' ? 'text-orange-400' : 'text-slate-100'}`}>
                      {cantidadNumeros}
                    </span>
                  </div>
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'i' 
                      ? 'border-indigo-500 bg-indigo-500/10 scale-105 shadow-[0_0_8px_rgba(99,102,241,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">i (índice)</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'i' ? 'text-indigo-400' : 'text-slate-100'}`}>
                      {i === null ? '?' : i}
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
                      const isLmt = log.includes('Límite');
                      const isAcum = log.includes('Acumulador');
                      const isInc = log.includes('Fin Para');
                      let logClass = 'text-slate-500';
                      if (isLmt) logClass = 'text-indigo-400/80';
                      else if (isAcum) logClass = 'text-emerald-400/80';
                      else if (isInc) logClass = 'text-cyan-400/80';

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
                  <CheckCircle size={16} /> ¡Suma de Lote Completada con Éxito usando Bucle Para!
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
                <span className="text-xs font-mono text-slate-400">sumador_para.udone</span>
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
        <Strong>Conclusión del Módulo:</Strong> Comprender la elegancia y seguridad del ciclo Para te permitirá escribir algoritmos más limpios, predecibles y de alto rendimiento en tus cursos de Programación I y II.
      </Callout>
    </div>
  );
};
