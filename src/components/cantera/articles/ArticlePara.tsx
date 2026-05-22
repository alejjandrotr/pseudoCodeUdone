import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode } from '../ArticlePageComponents';
import { Play, Pause, RotateCcw, Box, TerminalSquare, ChevronRight, Eye, EyeOff, CheckCircle, Sliders } from 'lucide-react';

export const ArticlePara: React.FC = () => {
  // --- ITERATOR CONFIG STATE ---
  const [valorInicial, setValorInicial] = useState<number>(1);
  const [valorFinal, setValorFinal] = useState<number>(10);
  const [paso, setPaso] = useState<number>(1);
  
  // Trace States
  const [i, setI] = useState<number | null>(null);
  const [resultado, setResultado] = useState<number | null>(null);
  const [tablaNum, setTablaNum] = useState<number>(7);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [simStep, setSimStep] = useState<number>(0); // 0 = ready, 1 = header, 2 = wait tabla input, 3 = start para loop, 4 = multiply, 5 = write row, 6 = increment/check loop, 7 = finished
  
  // Dual-Terminal Logs
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Motor de iteración Para listo. Configura los parámetros y pulsa Siguiente Paso.']);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null); // 'i' | 'tabla' | 'resultado' | null
  const [showDebug, setShowDebug] = useState<boolean>(false);

  // Input states
  const [consoleInputValue, setConsoleInputValue] = useState('');
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [wasPlayingBeforeInput, setWasPlayingBeforeInput] = useState(false);
  const consoleInputRef = useRef<HTMLInputElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Robust stateRef to protect against stale closures in timeouts/intervals
  const stateRef = useRef({
    valorInicial,
    valorFinal,
    paso,
    i,
    resultado,
    tablaNum,
    simStep,
    isPlaying,
    isWaitingInput,
    wasPlayingBeforeInput
  });

  useEffect(() => {
    stateRef.current = {
      valorInicial,
      valorFinal,
      paso,
      i,
      resultado,
      tablaNum,
      simStep,
      isPlaying,
      isWaitingInput,
      wasPlayingBeforeInput
    };
  }, [valorInicial, valorFinal, paso, i, resultado, tablaNum, simStep, isPlaying, isWaitingInput, wasPlayingBeforeInput]);

  const CODE_LINES = [
    'Algoritmo Tabla_De_Multiplicar',
    'Variables:',
    '    tabla, i, resultado: Entero',
    'Inicio',
    '    Escribir "--- GENERADOR DE TABLAS ---"',
    '    Escribir "Ingrese el número de la tabla: "',
    '    Leer tabla',
    '    Escribir "Generando tabla de: ", tabla',
    '    Para i <- 1 Hasta 10 Con Paso 1 Hacer',
    '        resultado <- tabla * i',
    '        Escribir tabla, " x ", i, " = ", resultado',
    '    Fin Para',
    '    Escribir "Proceso finalizado con éxito."',
    'Fin'
  ];

  // Auto-play timer logic
  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, 1200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isWaitingInput, simStep]);

  // Focus console input
  useEffect(() => {
    if (isWaitingInput && consoleInputRef.current) {
      consoleInputRef.current.focus();
    }
  }, [isWaitingInput]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setIsWaitingInput(false);
    setConsoleInputValue('');
    setI(null);
    setResultado(null);
    setActiveLine(null);
    setSimStep(0);
    setRamHighlight(null);
    setTerminalLogs([]);
    setDebugLogs(['> Motor de iteración Para listo. Configura los parámetros y pulsa Siguiente Paso.']);
  };

  const advanceSimulation = () => {
    const state = stateRef.current;
    if (state.isWaitingInput) return; // Prevent advancing manually when waiting for terminal console input

    switch (state.simStep) {
      case 0:
        // Print header (Line 5)
        setActiveLine(5);
        setTerminalLogs(['--- GENERADOR DE TABLAS ---']);
        setDebugLogs(prev => [...prev, '> [Línea 5] Escribir encabezado de la lección']);
        setSimStep(1);
        break;
      case 1:
        // Ask table input (Lines 6 & 7)
        setActiveLine(6);
        setTerminalLogs(prev => [...prev, 'Ingrese el número de la tabla: ']);
        setDebugLogs(prev => [...prev, '> [Línea 6] Escribir prompt para leer multiplicando']);
        setWasPlayingBeforeInput(state.isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setRamHighlight('tabla');
        break;
      case 2:
        // Confirm multiplier (Line 8)
        setActiveLine(8);
        setRamHighlight(null);
        setTerminalLogs(prev => [...prev, `Generando tabla de: ${state.tablaNum}`]);
        setDebugLogs(prev => [...prev, `> [Línea 8] Escribir confirmación de la tabla del ${state.tablaNum}`]);
        setSimStep(3);
        break;
      case 3:
        // Start Para loop (Line 9)
        setActiveLine(9);
        const startingVal = state.valorInicial;
        setI(startingVal);
        setRamHighlight('i');
        setDebugLogs(prev => [
          ...prev, 
          `> [Línea 9] Inicializar bucle Para: i <- ${startingVal}. Límite: ${state.valorFinal}, Paso: ${state.paso}`
        ]);
        setSimStep(4);
        break;
      case 4:
        // Multiply result (Line 10)
        setActiveLine(10);
        const currentI = state.i ?? state.valorInicial;
        const res = state.tablaNum * currentI;
        setResultado(res);
        setRamHighlight('resultado');
        setDebugLogs(prev => [...prev, `> [Línea 10] Multiplicación: resultado <- ${state.tablaNum} * ${currentI} ➔ ${res}`]);
        setSimStep(5);
        break;
      case 5:
        // Write row (Line 11)
        setActiveLine(11);
        setRamHighlight(null);
        const rowI = state.i ?? state.valorInicial;
        setTerminalLogs(prev => [...prev, `${state.tablaNum} x ${rowI} = ${state.resultado}`]);
        setDebugLogs(prev => [...prev, `> [Línea 11] Escribir fila de multiplicación: ${state.tablaNum} x ${rowI} = ${state.resultado}`]);
        setSimStep(6);
        break;
      case 6:
        // Increment and check loop conditions (Line 12)
        setActiveLine(12);
        const nextI = (state.i ?? state.valorInicial) + state.paso;
        const isForward = state.paso >= 0;
        const reachedLimit = isForward ? nextI > state.valorFinal : nextI < state.valorFinal;
        
        if (reachedLimit) {
          setDebugLogs(prev => [
            ...prev,
            `> [Línea 12] Fin Para: Siguiente i (${nextI}) supera límite (${state.valorFinal}) con paso ${state.paso}. Saliendo.`
          ]);
          setSimStep(7); // Terminate loop
        } else {
          setI(nextI);
          setRamHighlight('i');
          setDebugLogs(prev => [
            ...prev,
            `> [Línea 12] Fin Para: i se incrementa automáticamente a ${nextI}. Regresando a evaluar.`
          ]);
          setSimStep(4); // Loop back to math calculation
        }
        break;
      case 7:
        // End Escribir (Line 13)
        setActiveLine(13);
        setRamHighlight(null);
        setTerminalLogs(prev => [...prev, 'Proceso finalizado con éxito.']);
        setDebugLogs(prev => [...prev, '> [Línea 13] Escribir cierre del programa']);
        setSimStep(8);
        break;
      case 8:
        // Fin (Line 14)
        setActiveLine(14);
        setDebugLogs(prev => [...prev, '> [Línea 14] Fin del algoritmo. Tabla guardada.']);
        setIsPlaying(false);
        setSimStep(9); // Completed
        break;
      default:
        resetSimulation();
        break;
    }
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const state = stateRef.current;
    if (!state.isWaitingInput) return;

    const val = parseInt(consoleInputValue.trim());
    if (isNaN(val)) return;

    setTablaNum(val);
    setTerminalLogs(prev => [...prev, `  > ${val}`]);
    setDebugLogs(prev => [...prev, `> [Línea 7] Leer tabla ➔ Guardado en RAM: ${val}`]);
    setIsWaitingInput(false);
    setConsoleInputValue('');
    setSimStep(2); // Confirm table
    
    if (state.wasPlayingBeforeInput) {
      setIsPlaying(true);
    } else {
      setTimeout(() => advanceSimulation(), 100);
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
        El ciclo <Strong>Para</Strong> (bucle *For*) es la estructura cíclica óptima cuando <Strong>conocemos de antemano el número exacto de repeticiones</Strong> que se deben realizar, antes de que el ciclo comience.
      </P>

      <PageSection title="Las Tres Tareas en Una Sola Línea">
        <P>
          A diferencia de los ciclos *Mientras* o *Repetir*, que requieren escribir múltiples líneas de código separadas para declarar, inicializar, evaluar e incrementar las variables del índice contable, el ciclo **Para** condensa elegantemente todas estas acciones en una sola línea de control:
        </P>
        <ul className="list-disc pl-6 text-slate-300 mb-6 space-y-2">
          <li><Strong>Inicialización:</Strong> Declara e inicializa la variable contadora (ej. <InlineCode>i &lt;- 1</InlineCode>).</li>
          <li><Strong>Condición Límite:</Strong> Define el valor final que disparará la parada (ej. <InlineCode>Hasta 10</InlineCode>).</li>
          <li><Strong>Paso o Ritmo:</Strong> Incrementa o decrementa la variable de control automáticamente en cada vuelta en una cantidad constante (ej. <InlineCode>Con Paso 1</InlineCode>).</li>
        </ul>
      </PageSection>

      <PageSection title="Esquema Estructural de un Ciclo Para">
        <P>
          Dado que el ciclo Para empaqueta toda la lógica, la CPU ejecuta internamente la inicialización la primera vez, y en cada vuelta incrementa el índice antes de compararlo con el límite:
        </P>

        {/* CSS Structural Diagram of For Loop */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 my-6 flex flex-col items-center overflow-x-auto">
          <span className="text-xs uppercase font-bold text-slate-500 mb-6 tracking-wider">Flujo de Control Integrado en "Para"</span>
          <div className="flex flex-col items-center space-y-4 min-w-[520px]">
            
            {/* 1. Initialization */}
            <div className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-semibold">
              Inicialización Única: <span className="font-mono text-emerald-300 font-bold">i &lt;- 1</span>
            </div>
            
            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 2. Boundary Condition */}
            <div className="px-5 py-3 bg-violet-500/15 border border-violet-500/30 rounded-xl text-violet-400 text-sm font-semibold relative text-center">
              ¿Índice supera el límite? <span className="font-mono text-violet-300 font-bold">i &gt; 10</span>
              
              {/* Exits */}
              <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 flex items-center">
                <span className="text-rose-400 text-xs font-bold mr-1">SÍ (Fuera de Rango)</span>
                <span className="text-rose-400 font-bold">➔</span>
                <div className="ml-2 px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-bold">
                  Salir del Ciclo
                </div>
              </div>

              {/* Enters */}
              <div className="absolute top-1/2 right-full -translate-y-1/2 mr-4 flex items-center">
                <div className="mr-2 px-3 py-1.5 bg-cyan-500/15 border border-cyan-500/30 rounded-lg text-cyan-400 text-xs font-bold">
                  Entrar al Ciclo
                </div>
                <span className="text-cyan-400 font-bold">⬅</span>
                <span className="text-cyan-400 text-xs font-bold ml-1">NO</span>
              </div>
            </div>

            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 3. Loop body */}
            <div className="px-4 py-2.5 bg-cyan-500/15 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm text-center">
              Ejecutar Bloque Interno
              <span className="block text-[9.5px] text-slate-400 mt-0.5 font-normal">(Las variables cambian sin alterar cantidad_numeros)</span>
            </div>

            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 4. Automated Step Increment */}
            <div className="px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-lg text-amber-400 text-sm font-semibold">
              Paso Automático: <span className="font-mono text-amber-300 font-bold">i &lt;- i + 1</span>
            </div>

            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 5. Return Loop */}
            <div className="px-3.5 py-1 bg-slate-800 rounded-full text-slate-400 text-xs font-mono border border-slate-700 select-none animate-pulse">
              Volver a evaluar condición
            </div>

          </div>
        </div>
      </PageSection>

      {/* --- TRACE SIMULATOR --- */}
      <PageSection title="Componente Interactivo: Interactive Loop Iterator Engine">
        <P>
          Experimenta con el iterador automático `Para` configurando los valores de inicio, fin y paso utilizando el Panel de Parámetros. Observa cómo el índice contable <InlineCode>i</InlineCode> avanza paso a paso de forma robótica en la memoria RAM y genera la tabla de multiplicar en el terminal.
        </P>

        {/* Parameters config card */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 my-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex items-center gap-3 text-brand-400 font-bold text-sm uppercase">
            <Sliders size={18} /> Configurar Rango Para:
          </div>
          <div className="flex-1 flex flex-wrap gap-4 justify-between w-full">
            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
              <span className="text-[10px] text-slate-500 uppercase font-sans">Valor Inicial (i)</span>
              <input 
                type="number" 
                value={valorInicial} 
                onChange={e => setValorInicial(parseInt(e.target.value) || 1)}
                disabled={isPlaying || simStep > 0}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
              <span className="text-[10px] text-slate-500 uppercase font-sans">Valor Límite (Hasta)</span>
              <input 
                type="number" 
                value={valorFinal} 
                onChange={e => setValorFinal(parseInt(e.target.value) || 10)}
                disabled={isPlaying || simStep > 0}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
              <span className="text-[10px] text-slate-500 uppercase font-sans">Paso (Incremento)</span>
              <select 
                value={paso} 
                onChange={e => setPaso(parseInt(e.target.value))}
                disabled={isPlaying || simStep > 0}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-500"
              >
                <option value={1}>Paso 1 (Adelante)</option>
                <option value={2}>Paso 2 (Salto)</option>
                <option value={-1}>Paso -1 (Reversa)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: CPU & Memory RAM */}
            <div className="flex-1 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans">
                    <Box size={14} className="text-brand-400" /> Registro de RAM
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

                {/* Compact RAM Variables Grid */}
                <div className="grid grid-cols-3 gap-2.5 my-3">
                  <div className={`px-3 py-2.5 rounded-xl border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'tabla' 
                      ? 'border-orange-500 bg-orange-500/10 scale-105 shadow-[0_0_8px_rgba(249,115,22,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">tabla (Entero)</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'tabla' ? 'text-orange-400' : 'text-slate-100'}`}>
                      {tablaNum}
                    </span>
                  </div>
                  <div className={`px-3 py-2.5 rounded-xl border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'i' 
                      ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-[0_0_8px_rgba(6,182,212,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">i (índice)</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'i' ? 'text-cyan-400' : 'text-slate-100'}`}>
                      {i === null ? '?' : i}
                    </span>
                  </div>
                  <div className={`px-3 py-2.5 rounded-xl border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'resultado' 
                      ? 'border-emerald-500 bg-emerald-500/10 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">resultado</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'resultado' ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {resultado === null ? '?' : resultado}
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
                    <div key={idx} className={log.includes('exito') ? 'text-emerald-400 font-bold' : 'text-slate-100'}>
                      {log}
                    </div>
                  ))}

                  {/* Terminal Input Prompt */}
                  {isWaitingInput && (
                    <form onSubmit={handleConsoleSubmit} className="flex gap-1.5 items-center border-t border-slate-900/40 pt-1.5 mt-1.5">
                      <span className="text-cyan-400 font-bold">&gt; </span>
                      <input 
                        ref={consoleInputRef}
                        type="number" 
                        value={consoleInputValue}
                        onChange={e => setConsoleInputValue(e.target.value)}
                        className="bg-transparent border-none outline-none text-slate-100 font-mono w-full text-xs focus:ring-0 p-0"
                        placeholder="Escribe el multiplicando y pulsa Enter..."
                        autoFocus
                      />
                    </form>
                  )}
                </div>
              </div>

              {/* Collapsible Debugger Log Panel */}
              {showDebug && (
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-400 flex flex-col justify-end min-h-[110px] max-h-[130px] overflow-y-auto mt-3 animate-fade-in">
                  <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest flex items-center gap-1.5 select-none font-sans">
                    🔧 CONSOLA DE DEPURACIÓN (DEBUGGER)
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col justify-end">
                    {debugLogs.slice(-4).map((log, idx) => {
                      if (!log) return null;
                      const isMath = log.includes('Multiplicación');
                      const isInc = log.includes('se incrementa');
                      const isFin = log.includes('Fin Para');
                      let logClass = 'text-slate-500';
                      if (isMath) logClass = 'text-emerald-400/80';
                      else if (isInc) logClass = 'text-cyan-400/80';
                      else if (isFin) logClass = 'text-indigo-400/80';

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
              {simStep === 8 && (
                <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-semibold animate-bounce font-sans">
                  <CheckCircle size={16} /> ¡Bucle Para Finalizado con Éxito e Índice Liberado!
                </div>
              )}

              {/* Controls Footer */}
              <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center font-sans">
                <button 
                  onClick={resetSimulation}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  title="Reiniciar"
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

            {/* Right Column: Code Highlight */}
            <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between font-sans">
                <span className="text-xs font-mono text-slate-400">tabla_para.udone</span>
                <span className="text-[10px] text-slate-500">SPEED: 1.2s</span>
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
    </div>
  );
};
