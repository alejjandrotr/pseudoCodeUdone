import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode, NumberedItem } from '../ArticlePageComponents';
import { Play, Pause, RotateCcw, Box, TerminalSquare, ShieldAlert, ChevronRight, Eye, EyeOff, CheckCircle } from 'lucide-react';

export const ArticleRepetir: React.FC = () => {
  // --- CALIFICACIONES VALIDATOR LAB STATE ---
  const [nota, setNota] = useState<number | null>(null);
  const [valida, setValida] = useState<boolean | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [simStep, setSimStep] = useState<number>(0); // 0 = ready, 1 = enter repeat, 2 = wait input, 3 = check if error, 4 = log error, 5 = evaluate boundary condition, 6 = success end, 7 = finished
  
  // Dual-Terminal Log States
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Depurador listo. Presiona Siguiente Paso o Auto-Play para comenzar la traza.']);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null); // 'nota' | 'valida' | null
  
  // Debug Console Collapse State
  const [showDebug, setShowDebug] = useState<boolean>(false);

  // Interactive Console Input States
  const [consoleInputValue, setConsoleInputValue] = useState('');
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [wasPlayingBeforeInput, setWasPlayingBeforeInput] = useState(false);
  const consoleInputRef = useRef<HTMLInputElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Robust stateRef to protect against stale closures in timeouts/intervals
  const stateRef = useRef({
    nota,
    valida,
    simStep,
    isPlaying,
    isWaitingInput,
    wasPlayingBeforeInput
  });

  useEffect(() => {
    stateRef.current = {
      nota,
      valida,
      simStep,
      isPlaying,
      isWaitingInput,
      wasPlayingBeforeInput
    };
  }, [nota, valida, simStep, isPlaying, isWaitingInput, wasPlayingBeforeInput]);

  const CODE_LINES = [
    'Algoritmo Validador_De_Notas',
    'Variables:',
    '    nota: Real',
    'Inicio',
    '    Escribir "--- REGISTRO DE CALIFICACIONES (UDONE) ---"',
    '    Repetir',
    '        Escribir "Ingrese la nota definitiva (0 a 20): "',
    '        Leer nota',
    '        Si (nota < 0 O nota > 20) Entonces',
    '            Escribir "¡ERROR! La nota debe ser entre 0 y 20."',
    '        Fin Si',
    '    Hasta (nota >= 0 Y nota <= 20)',
    '    Escribir "Nota registrada exitosamente: " + nota',
    'Fin'
  ];

  // Auto-play timer logic
  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, 1300);
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
    setConsoleInputValue('');
    setNota(null);
    setValida(null);
    setActiveLine(null);
    setSimStep(0);
    setRamHighlight(null);
    setTerminalLogs([]);
    setDebugLogs(['> Depurador listo. Presiona Siguiente Paso o Auto-Play para comenzar la traza.']);
  };

  const advanceSimulation = () => {
    const state = stateRef.current;
    if (state.isWaitingInput) return; // Prevent advancing manually when waiting for terminal console input

    switch (state.simStep) {
      case 0:
        // Print introductory header (Line 5)
        setActiveLine(5);
        setTerminalLogs(['--- REGISTRO DE CALIFICACIONES (UDONE) ---']);
        setDebugLogs(prev => [...prev, '> [Línea 5] Escribir encabezado del sistema']);
        setSimStep(1);
        break;
      case 1:
        // Enter Repetir loop (Line 6)
        setActiveLine(6);
        setDebugLogs(prev => [...prev, '> [Línea 6] Iniciando bloque Repetir (Ejecución incondicional sin evaluar)']);
        setSimStep(2);
        break;
      case 2:
        // Write prompt & Leer nota (Lines 7 & 8)
        setActiveLine(7);
        setTerminalLogs(prev => [...prev, 'Ingrese la nota definitiva (0 a 20): ']);
        setDebugLogs(prev => [...prev, '> [Línea 7] Escribir prompt para solicitar calificación']);
        setWasPlayingBeforeInput(state.isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setRamHighlight('nota');
        break;
      case 3:
        // Check boundary warning (Line 9)
        setActiveLine(9);
        setRamHighlight(null);
        const inputNota = state.nota ?? 0;
        const isError = inputNota < 0 || inputNota > 20;
        setDebugLogs(prev => [
          ...prev,
          `> [Línea 9] Estructura Si: ¿nota (${inputNota}) < 0 O nota (${inputNota}) > 20? ➔ ${isError ? 'VERDADERO (Error de Rango)' : 'FALSO (Rango Válido)'}`
        ]);
        
        if (isError) {
          setSimStep(4); // Run Si block (Log error)
        } else {
          setSimStep(5); // Skip Si block, go straight to Hasta condition
        }
        break;
      case 4:
        // Log Error warning (Line 10)
        setActiveLine(10);
        setTerminalLogs(prev => [...prev, '¡ERROR! La nota debe ser entre 0 y 20.']);
        setDebugLogs(prev => [...prev, '> [Línea 10] Escribir advertencia: nota fuera de límites']);
        setSimStep(5);
        break;
      case 5:
        // Evaluate Hasta condition (Line 12)
        setActiveLine(12);
        const currentNota = state.nota ?? 0;
        const conditionMet = currentNota >= 0 && currentNota <= 20;
        setValida(conditionMet);
        setRamHighlight('valida');
        setDebugLogs(prev => [
          ...prev,
          `> [Línea 12] Evaluación de Parada: ¿nota (${currentNota}) >= 0 Y nota (${currentNota}) <= 20? ➔ ${conditionMet ? 'VERDADERO (Rompe ciclo y sale)' : 'FALSO (Repite el ciclo)'}`
        ]);

        if (conditionMet) {
          setSimStep(6); // Success, exit loop
        } else {
          setSimStep(2); // Repeat back to Leer nota
        }
        break;
      case 6:
        // Escribir success result (Line 13)
        setActiveLine(13);
        setRamHighlight(null);
        setTerminalLogs(prev => [...prev, `Nota registrada exitosamente: ${state.nota}`]);
        setDebugLogs(prev => [...prev, `> [Línea 13] Escribir éxito: nota final de ${state.nota} validada.`]);
        setSimStep(7);
        break;
      case 7:
        // Fin (Line 14)
        setActiveLine(14);
        setDebugLogs(prev => [...prev, '> [Línea 14] Fin de la ejecución. Calificación bloqueada en memoria.']);
        setIsPlaying(false);
        setSimStep(8); // Completed
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

    const val = parseFloat(consoleInputValue.trim());
    if (isNaN(val)) return;

    setNota(val);
    setTerminalLogs(prev => [...prev, `  > ${val}`]);
    setDebugLogs(prev => [...prev, `> [Línea 8] Leer nota ➔ Guardado en RAM: ${val}`]);
    setIsWaitingInput(false);
    setConsoleInputValue('');
    setSimStep(3); // Go to evaluation
    
    if (state.wasPlayingBeforeInput) {
      setIsPlaying(true);
    } else {
      setTimeout(() => advanceSimulation(), 100);
    }
  };

  const startSimulation = () => {
    const state = stateRef.current;
    if (state.simStep === 8) {
      resetSimulation();
      setIsPlaying(true);
    } else {
      setIsPlaying(!state.isPlaying);
    }
  };

  const triggerNextStep = () => {
    advanceSimulation();
  };

  return (
    <div>
      <P>
        El ciclo <Strong>Repetir</Strong> (*Do-While* / *Repeat*) es la estructura cíclica ideal para escenarios donde requerimos obligatoriamente que un bloque de instrucciones se ejecute <Strong>al menos una vez</Strong>, sin importar el valor de la condición al comenzar.
      </P>

      <PageSection title="Concepto y Diferencia Estructural">
        <P>
          La diferencia académica primordial frente al ciclo Mientras reside en la compuerta de evaluación:
        </P>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
            <h3 className="font-bold text-cyan-400 mb-1">Mientras (Pre-condición)</h3>
            <P className="text-sm text-slate-400 mb-0">
              Evalúa la condición al <strong>inicio</strong>. Si la condición lógica es falsa desde el primer instante, el bloque interno no se ejecuta nunca (0 iteraciones).
            </P>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
            <h3 className="font-bold text-violet-400 mb-1">Repetir (Post-condición)</h3>
            <P className="text-sm text-slate-400 mb-0">
              Evalúa la condición al <strong>final</strong> de la iteración. Esto garantiza formalmente que las instrucciones internas se procesen <strong>al menos una vez</strong> (1 o más iteraciones).
            </P>
          </div>
        </div>
      </PageSection>

      <PageSection title="Esquema Lógico del Ciclo Repetir">
        <P>
          Para visualizar de forma académica cómo fluyen los datos y las instrucciones a través de un bucle de evaluación posterior, observa el siguiente diagrama estructural:
        </P>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 my-6 flex flex-col items-center overflow-x-auto">
          <span className="text-xs uppercase font-bold text-slate-500 mb-6 tracking-wider">Flujograma del Ciclo Repetir (Post-Condición)</span>
          <div className="flex flex-col items-center space-y-4 min-w-[500px]">
            
            {/* 1. Inicio */}
            <div className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
              Inicio del Ciclo
            </div>
            
            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 2. Cuerpo del bucle */}
            <div className="px-5 py-3 bg-cyan-500/15 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-semibold text-center border-dashed">
              1. Ejecutar Bloque de Código Interno
              <span className="block text-[10px] text-slate-400 mt-0.5 font-normal">(Se ejecuta siempre, al menos la primera vez)</span>
            </div>

            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 3. Modificación variable de control */}
            <div className="px-4 py-2.5 bg-amber-500/15 border border-amber-500/30 rounded-lg text-amber-400 text-sm text-center">
              2. Modificar Variable de Control
              <span className="block text-[10px] text-slate-400 mt-0.5 font-normal">(Incremento, decremento o lectura de datos)</span>
            </div>

            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 4. Condición de parada */}
            <div className="px-5 py-3 bg-violet-500/15 border border-violet-500/30 rounded-xl text-violet-400 text-sm font-semibold relative text-center">
              3. ¿Condición de Parada Alcanzada?
              <span className="block text-[10.5px] text-violet-300 font-mono mt-0.5 font-normal">Hasta (condición)</span>
              
              {/* Salida Verdadero */}
              <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 flex items-center">
                <span className="text-emerald-400 text-xs font-bold mr-1">SÍ (Verdadero)</span>
                <span className="text-emerald-400 font-bold">➔</span>
                <div className="ml-2 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-bold whitespace-nowrap">
                  Cierre de Ciclo / Salir
                </div>
              </div>

              {/* Bucle Falso */}
              <div className="absolute top-1/2 right-full -translate-y-1/2 mr-4 flex items-center">
                <div className="mr-2 px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-bold whitespace-nowrap">
                  Volver a Iterar
                </div>
                <span className="text-rose-400 font-bold">⬅</span>
                <span className="text-rose-400 text-xs font-bold ml-1">NO (Falso)</span>
              </div>
            </div>

            <div className="w-0.5 h-6 bg-slate-700"></div>

            {/* 5. Cierre */}
            <div className="px-4 py-2 bg-rose-500/15 border border-rose-500/30 rounded-full text-rose-400 text-sm font-semibold">
              Fin Repetir (Siguiente Instrucción)
            </div>

          </div>
        </div>

        <P>
          Como puedes observar en el diagrama, las instrucciones de tu algoritmo se ejecutan primero (Paso 1) y es únicamente al llegar a la compuerta final (Paso 3) cuando la CPU evalúa si debe dar la vuelta o no. 
        </P>
      </PageSection>

      <PageSection title="Lógica de Parada Inversa en UDONE">
        <Callout variant="important">
          <strong>¡Crucial recordar la Lógica Inversa!</strong> 
          <br />
          A diferencia de los ciclos tradicionales en lenguajes como C o Java que siguen repitiendo mientras la condición es verdadera:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>El ciclo <Strong>Repetir</Strong> de UDONE continúa iterando <strong>mientras la condición sea Falsa</strong>.</li>
            <li>En el momento exacto en que la condición lógica se vuelve <strong>Verdadera</strong>, actúa como condición de parada, rompiendo el bucle y continuando con el código siguiente.</li>
          </ul>
        </Callout>
      </PageSection>

      <PageSection title="Caso de Uso Ideal: Validación de Datos">
        <P>
          El escenario estrella de esta estructura es la <strong>validación de datos proporcionados por el usuario</strong>. No puedes verificar si un dato es correcto antes de pedirlo; primero debes solicitar la lectura del dato (acción incondicional), y si es incorrecto, debes repetir la solicitud sucesivamente hasta que cumpla las reglas de negocio.
        </P>
      </PageSection>

      {/* --- FORM VALIDATOR INTERACTIVE WORKSPACE --- */}
      <PageSection title="Componente Interactivo: Calificaciones Validator Lab">
        <P>
          Visualicemos un validador clásico en el pseudocódigo UDONE: solicitar una nota de examen que debe estar estrictamente en la escala de <strong>0 a 20</strong> puntos.
        </P>
        <P>
          Presiona <strong>Auto-Play</strong> o <strong>Siguiente Paso</strong> para ver cómo opera el flujo. Intenta ingresar valores inválidos (por ejemplo, <InlineCode>-5</InlineCode> o <InlineCode>25</InlineCode>) y observa cómo el ciclo se ve obligado a repetirse de forma infinita hasta que decidas suministrar una calificación válida (como <InlineCode>18</InlineCode>).
        </P>

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
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className={`px-3 py-2.5 rounded-xl border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'nota' 
                      ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-[0_0_8px_rgba(6,182,212,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">nota (Real)</span>
                    <span className={`text-base font-bold transition-colors ${ramHighlight === 'nota' ? 'text-cyan-400' : 'text-slate-100'}`}>
                      {nota === null ? '?' : nota}
                    </span>
                  </div>
                  <div className={`px-3 py-2.5 rounded-xl border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'valida' 
                      ? 'border-emerald-500 bg-emerald-500/10 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">valida (Logico)</span>
                    <span className={`text-base font-bold transition-colors ${
                      valida === null ? 'text-slate-500' : valida ? 'text-emerald-400' : 'text-rose-400 font-bold'
                    }`}>
                      {valida === null ? '?' : valida ? 'Verdadero' : 'Falso'}
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
                  {terminalLogs.map((log, idx) => {
                    const isErrorMsg = log.includes('ERROR');
                    const isSuccess = log.includes('exitosamente');
                    let logClass = 'text-slate-100';
                    if (isErrorMsg) logClass = 'text-rose-400 font-bold animate-pulse';
                    else if (isSuccess) logClass = 'text-emerald-400 font-bold';
                    else if (log.startsWith('  >')) logClass = 'text-cyan-400 font-bold';

                    return (
                      <div key={idx} className={logClass}>
                        {log}
                      </div>
                    );
                  })}

                  {/* Terminal Input Prompt */}
                  {isWaitingInput && (
                    <form onSubmit={handleConsoleSubmit} className="flex gap-1.5 items-center border-t border-slate-900/40 pt-1.5 mt-1.5">
                      <span className="text-cyan-400 font-bold">&gt; </span>
                      <input 
                        ref={consoleInputRef}
                        type="number" 
                        step="any"
                        value={consoleInputValue}
                        onChange={e => setConsoleInputValue(e.target.value)}
                        className="bg-transparent border-none outline-none text-slate-100 font-mono w-full text-xs focus:ring-0 p-0"
                        placeholder="Escribe la nota y presiona Enter..."
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
                      const isEval = log.includes('Evaluación');
                      const isSi = log.includes('Estructura Si');
                      const isError = log.includes('Error');
                      let logClass = 'text-slate-500';
                      if (isEval) logClass = 'text-indigo-400/80';
                      else if (isSi) logClass = 'text-cyan-400/80';
                      else if (isError) logClass = 'text-rose-400/80';

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
                  <CheckCircle size={16} /> ¡Calificación Válida Registrada con Éxito en Memoria!
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
                    onClick={triggerNextStep}
                    disabled={isPlaying || simStep === 8 || isWaitingInput}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Siguiente Paso <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={startSimulation}
                    disabled={(simStep === 8 && isPlaying) || isWaitingInput}
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
                <span className="text-xs font-mono text-slate-400">validador_notas.udone</span>
                <span className="text-[10px] text-slate-500">SPEED: 1.3s</span>
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
