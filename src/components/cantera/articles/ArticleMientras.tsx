import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode, NumberedItem } from '../ArticlePageComponents';
import { Play, Pause, RotateCcw, Box, TerminalSquare, ShieldAlert, ChevronRight, Eye, EyeOff } from 'lucide-react';

export const ArticleMientras: React.FC = () => {
  // --- SUCCESSIVE SUMS LAB STATE ---
  const [multiplicando, setMultiplicando] = useState<number>(5);
  const [multiplicador, setMultiplicador] = useState<number>(3);
  const [resultado, setResultado] = useState<number>(0);
  const [controlador, setControlador] = useState<number>(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [simStep, setSimStep] = useState<number>(0); // 0 = ready, 1 = wait multiplicando, 2 = wait multiplicador, 3 = init resultado, 4 = init controlador, 5 = check condition, 6 = accumulate, 7 = increment, 8 = print final, 9 = finished
  
  // Dual-Terminal Log States
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Depurador listo. Presiona Siguiente Paso o Auto-Play para comenzar la traza.']);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null); // 'resultado' | 'controlador' | 'multiplicando' | 'multiplicador' | null
  
  // Debug Console Collapse State
  const [showDebug, setShowDebug] = useState<boolean>(false);

  // Interactive Console Input States
  const [consoleInputValue, setConsoleInputValue] = useState('');
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState<'multiplicando' | 'multiplicador' | null>(null);
  const [wasPlayingBeforeInput, setWasPlayingBeforeInput] = useState(false);
  const consoleInputRef = useRef<HTMLInputElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const CODE_LINES = [
    'Algoritmo Multiplicacion_Por_Sumas',
    'Variables:',
    '    multiplicando, multiplicador: Entero',
    '    resultado, controlador: Entero',
    'Inicio',
    '    Escribir "Ingrese multiplicando (P): "',
    '    Leer multiplicando',
    '    Escribir "Ingrese multiplicador (S): "',
    '    Leer multiplicador',
    '    resultado <- 0',
    '    controlador <- 0',
    '    Mientras (controlador < multiplicador) Hacer',
    '        resultado <- resultado + multiplicando',
    '        controlador <- controlador + 1',
    '    Fin Mientras',
    '    Escribir "El resultado de la multiplicación es: " + resultado',
    'Fin'
  ];

  // Auto-play timer logic
  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, 1200);
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
  }, [isPlaying, isWaitingInput, simStep, multiplicando, multiplicador, resultado, controlador]);

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
    setResultado(0);
    setControlador(0);
    setActiveLine(null);
    setSimStep(0);
    setRamHighlight(null);
    setTerminalLogs([]);
    setDebugLogs(['> Depurador listo. Presiona Siguiente Paso o Auto-Play para comenzar la traza.']);
  };

  const advanceSimulation = () => {
    if (isWaitingInput) return; // Prevent advancing manually when waiting for terminal console input

    switch (simStep) {
      case 0:
        // Prompt for multiplicando (Lines 6 & 7)
        setActiveLine(6);
        setTerminalLogs(['Ingrese multiplicando (P): ']);
        setDebugLogs(prev => [...prev, '> [Línea 6] Escribir prompt para multiplicando (P)']);
        setWasPlayingBeforeInput(isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setInputPrompt('multiplicando');
        setRamHighlight('multiplicando');
        break;
      case 1:
        // Prompt for multiplicador (Lines 8 & 9)
        setActiveLine(8);
        setTerminalLogs(prev => [...prev, 'Ingrese multiplicador (S): ']);
        setDebugLogs(prev => [...prev, '> [Línea 8] Escribir prompt para multiplicador (S)']);
        setWasPlayingBeforeInput(isPlaying);
        setIsPlaying(false);
        setIsWaitingInput(true);
        setInputPrompt('multiplicador');
        setRamHighlight('multiplicador');
        break;
      case 2:
        // Initialize resultado to 0 (Line 10)
        setActiveLine(10);
        setResultado(0);
        setRamHighlight('resultado');
        setDebugLogs(prev => [...prev, '> [Línea 10] Memoria: resultado <- 0 (Acumulador listo)']);
        setSimStep(3);
        break;
      case 3:
        // Initialize controlador to 0 (Line 11)
        setActiveLine(11);
        setControlador(0);
        setRamHighlight('controlador');
        setDebugLogs(prev => [...prev, '> [Línea 11] Memoria: controlador <- 0 (Contador listo)']);
        setSimStep(4);
        break;
      case 4:
        // Check Mientras condition (Line 12)
        setActiveLine(12);
        setRamHighlight(null);
        const conditionMet = controlador < multiplicador;
        setDebugLogs(prev => [
          ...prev, 
          `> [Línea 12] Evaluación: ¿controlador (${controlador}) < multiplicador (${multiplicador})? ➔ ${conditionMet ? 'VERDADERO (Entra al ciclo)' : 'FALSO (Sale del ciclo)'}`
        ]);
        
        if (conditionMet) {
          setSimStep(5); // Enter loop
        } else {
          setSimStep(7); // Exit loop (Fin Mientras)
        }
        break;
      case 5:
        // Accumulate (Line 13)
        setActiveLine(13);
        const nextResult = resultado + multiplicando;
        setResultado(nextResult);
        setRamHighlight('resultado');
        setDebugLogs(prev => [...prev, `> [Línea 13] Acumulador: resultado <- ${resultado} + ${multiplicando} ➔ ${nextResult}`]);
        setSimStep(6);
        break;
      case 6:
        // Increment (Line 14)
        setActiveLine(14);
        const nextControlador = controlador + 1;
        setControlador(nextControlador);
        setRamHighlight('controlador');
        setDebugLogs(prev => [...prev, `> [Línea 14] Contador: controlador <- ${controlador} + 1 ➔ ${nextControlador}`]);
        setSimStep(4); // Loop back to check condition
        break;
      case 7:
        // Fin Mientras (Line 15)
        setActiveLine(15);
        setRamHighlight(null);
        setDebugLogs(prev => [...prev, `> [Línea 15] Rompiendo ciclo Mientras.`]);
        setSimStep(8);
        break;
      case 8:
        // Escribir resultado (Line 16)
        setActiveLine(16);
        setTerminalLogs(prev => [...prev, `El resultado de la multiplicación es: ${resultado}`]);
        setDebugLogs(prev => [...prev, `> [Línea 16] Escribir en Consola final: El resultado es ${resultado}`]);
        setSimStep(9);
        break;
      case 9:
        // Fin (Line 17)
        setActiveLine(17);
        setDebugLogs(prev => [...prev, `> [Línea 17] Fin de la ejecución del algoritmo.`]);
        setIsPlaying(false);
        setSimStep(10); // Finished
        break;
      default:
        resetSimulation();
        break;
    }
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWaitingInput || !inputPrompt) return;

    const val = parseInt(consoleInputValue.trim());
    if (isNaN(val)) return;

    if (inputPrompt === 'multiplicando') {
      const positiveVal = Math.max(0, val);
      setMultiplicando(positiveVal);
      setTerminalLogs(prev => [...prev, `  > ${positiveVal}`]);
      setDebugLogs(prev => [...prev, `> [Línea 7] Leer multiplicando ➔ Guardado en RAM: ${positiveVal}`]);
      setIsWaitingInput(false);
      setInputPrompt(null);
      setConsoleInputValue('');
      setSimStep(1); // Advance to check next input
      if (wasPlayingBeforeInput) {
        setIsPlaying(true);
      } else {
        setTimeout(() => advanceSimulation(), 100);
      }
    } else if (inputPrompt === 'multiplicador') {
      const positiveVal = Math.max(0, val);
      setMultiplicador(positiveVal);
      setTerminalLogs(prev => [...prev, `  > ${positiveVal}`]);
      setDebugLogs(prev => [...prev, `> [Línea 9] Leer multiplicador ➔ Guardado en RAM: ${positiveVal}`]);
      setIsWaitingInput(false);
      setInputPrompt(null);
      setConsoleInputValue('');
      setSimStep(2); // Move to initialize resultado
      if (wasPlayingBeforeInput) {
        setIsPlaying(true);
      } else {
        setTimeout(() => advanceSimulation(), 100);
      }
    }
  };

  const startSimulation = () => {
    if (simStep === 10) {
      resetSimulation();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const triggerNextStep = () => {
    advanceSimulation();
  };

  return (
    <div>
      <P>
        El ciclo <Strong>Mientras</Strong> es el bucle fundamental en el diseño algorítmico. Su funcionamiento se basa en la evaluación continua de una condición lógica antes de permitir la ejecución de su bloque de instrucciones.
      </P>

      <PageSection title="Concepto Fundacional">
        <P>
          Para entender el ciclo Mientras, imagina que es una estructura condicional <Strong>Si (If)</Strong> potenciada. Ambos evalúan una condición:
        </P>
        <ul className="list-disc pl-6 text-slate-300 mb-6 space-y-2">
          <li>En un <Strong>Si</Strong>, si la condición es verdadera, el bloque interno se ejecuta <Strong>una sola vez</Strong> y el programa continúa.</li>
          <li>En un <Strong>Mientras</Strong>, si la condición es verdadera, el bloque interno se ejecuta, pero al llegar al final del bloque, <Strong>el flujo vuelve arriba</Strong> para evaluar la condición otra vez de manera sucesiva.</li>
        </ul>
      </PageSection>

      <PageSection title="Prevención de Ciclos Infinitos">
        <Callout variant="warning">
          <strong>¡Advertencia crítica!</strong> Un ciclo Mientras continuará ejecutándose eternamente si la condición evaluada nunca cambia a <strong>Falsa</strong>. Es un requisito crítico de diseño asegurar que, en algún punto del flujo interno del ciclo, el conjunto de instrucciones modifique las variables de la condición para que esta alcance el valor de falsedad. <strong>Al diseñar cualquier ciclo, siempre se debe planificar explícitamente cómo se va a salir de él.</strong>
        </Callout>
      </PageSection>

      <PageSection title="Sintaxis y Estructura en UDONE">
        <P>
          Para escribir correctamente un ciclo Mientras en nuestro pseudocódigo, seguimos the following structure:
        </P>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm text-brand-200 mb-4 whitespace-pre">
          {`Mientras (Condición_Lógica) Hacer\n    // Instrucciones que se repiten\n    // Modificación de variables de control\nFin Mientras`}
        </div>
        <Callout variant="info">
          <Strong>Regla de Sintaxis UDONE:</Strong> El uso de los paréntesis <InlineCode>( )</InlineCode> para contener la condición es estrictamente obligatorio. No olvides colocar la palabra reservada <InlineCode>Hacer</InlineCode> al inicio y cerrar siempre la estructura con <InlineCode>Fin Mientras</InlineCode>.
        </Callout>
      </PageSection>

      <PageSection title="Mecanismos de Control para la Condición">
        <P>
          Existen dos enfoques principales para controlar la ejecución y el cierre de este ciclo en la lógica de programación:
        </P>
        <div className="space-y-4 my-6">
          <div className="p-4 rounded-xl border bg-slate-900/50 border-slate-800">
            <h3 className="font-bold text-brand-300 mb-2">1. Control por interacción del usuario</h3>
            <P className="text-sm text-slate-400 mb-0">
              Se evalúa una respuesta directa proporcionada por el usuario en cada iteración para decidir si el ciclo continúa. Es ideal cuando no sabemos de antemano cuántos datos ingresará la persona.
              <br/>
              <em>Ejemplo cotidiano:</em> Preguntar activamente al final del ciclo: <InlineCode>¿Desea continuar introduciendo datos? [S/N]</InlineCode>. El ciclo se detendrá inmediatamente si el usuario responde "N".
            </P>
          </div>
          <div className="p-4 rounded-xl border bg-slate-900/50 border-slate-800">
            <h3 className="font-bold text-brand-300 mb-2">2. Control por lógica interna del sistema</h3>
            <P className="text-sm text-slate-400 mb-0">
              Se evalúa mediante operaciones y variables automáticas gestionadas internamente por el algoritmo.
              <br/>
              <em>Ejemplo cotidiano:</em> Si necesitamos procesar un grupo cerrado de 100 personas para determinar cuántas son mayores de 18 años, el ciclo está claramente acotado para repetirse exactamente 100 veces a medida que el sistema lee e incrementa de forma automática sus registros numéricos.
            </P>
          </div>
        </div>
      </PageSection>

      <PageSection title="Conceptos Clave: Contadores, Acumuladores y Banderas">
        <P>
          Para construir algoritmos robustos con ciclos, es indispensable dominar tres tipos de variables especiales con funciones específicas:
        </P>
        <ol className="space-y-4 my-6 pl-1">
          <NumberedItem n={1} label="Contadores">
            Son variables simples que incrementan o decrementan su valor en una cantidad fija y constante con cada iteración. Lo más común es el incremento unitario (de 1 en 1).
            <br/><strong>Sintaxis estándar:</strong> <InlineCode>contador &lt;- contador + 1</InlineCode>
          </NumberedItem>
          <NumberedItem n={2} label="Acumuladores">
            Son variables destinadas a almacenar sumas acumulativas de valores variables. Su propósito es sumar montos cambiantes a lo largo del tiempo.
            <br/><strong>Sintaxis estándar:</strong> <InlineCode>total &lt;- total + precio_producto</InlineCode>
          </NumberedItem>
          <NumberedItem n={3} label="Banderas (Flags)">
            Son variables de control lógico que actúan como interruptores (generalmente booleanas <InlineCode>Verdadero</InlineCode> / <InlineCode>Falso</InlineCode>) para registrar si un evento específico o un cambio de estado ya ocurrió en el flujo del código.
          </NumberedItem>
        </ol>
      </PageSection>

      {/* --- SUCCESSIVE SUMS LAB INTERACTIVE WORKSPACE --- */}
      <PageSection title="Componente Interactivo: Interactive Successive Sums Lab">
        <P>
          Para consolidar estos conocimientos teóricos, visualicemos el algoritmo clásico de <strong>Multiplicación mediante Sumas Sucesivas</strong> (5 x 3 equivale a sumar el número 5 un total de 3 veces).
        </P>
        <P>
          Haz clic en <strong>Auto-Play</strong> o <strong>Siguiente Paso</strong> para iniciar la simulación, y escribe los valores de entrada directamente dentro de la consola terminal cuando el depurador lo solicite.
        </P>

        {/* Warning if multiplier too large */}
        {multiplicador > 50 && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-xs flex items-start gap-3 mb-6 animate-pulse">
            <ShieldAlert className="flex-shrink-0 mt-0.5" size={16} />
            <div>
              <strong>Límite computacional alto detectado:</strong> Introducir un multiplicador grande explica de manera directa cómo el tiempo de ejecución lógica (O(N)) crece de forma lineal y saturará tu CPU si no diseñas condiciones eficientes. ¡Te recomendamos probar con números pequeños para una mejor visualización de la traza!
            </div>
          </div>
        )}

        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Controls & Memory Table */}
            <div className="flex-1 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <Box size={14} className="text-brand-400" /> Memoria (RAM) de Variables
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

                {/* Compact RAM Variables Bar */}
                <div className="grid grid-cols-4 gap-2 my-3">
                  <div className={`px-2 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'multiplicando' 
                      ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-[0_0_8px_rgba(6,182,212,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">multiplicando</span>
                    <span className={`text-sm font-bold transition-colors ${ramHighlight === 'multiplicando' ? 'text-cyan-400' : 'text-slate-100'}`}>
                      {simStep === 0 ? '?' : multiplicando}
                    </span>
                  </div>
                  <div className={`px-2 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'multiplicador' 
                      ? 'border-indigo-500 bg-indigo-500/10 scale-105 shadow-[0_0_8px_rgba(99,102,241,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">multiplicador</span>
                    <span className={`text-sm font-bold transition-colors ${ramHighlight === 'multiplicador' ? 'text-indigo-400' : 'text-slate-100'}`}>
                      {simStep <= 1 ? '?' : multiplicador}
                    </span>
                  </div>
                  <div className={`px-2 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'resultado' 
                      ? 'border-emerald-500 bg-emerald-500/10 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">resultado (acum)</span>
                    <span className={`text-sm font-bold transition-colors ${ramHighlight === 'resultado' ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {resultado}
                    </span>
                  </div>
                  <div className={`px-2 py-2 rounded-lg border font-mono text-center transition-all duration-300 ${
                    ramHighlight === 'controlador' 
                      ? 'border-amber-500 bg-amber-500/10 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.2)]' 
                      : 'border-slate-800 bg-slate-900/40'
                  }`}>
                    <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">controlador (cont)</span>
                    <span className={`text-sm font-bold transition-colors ${ramHighlight === 'controlador' ? 'text-amber-400' : 'text-slate-100'}`}>
                      {controlador}
                    </span>
                  </div>
                </div>
              </div>

              {/* Standard Output Virtual Terminal */}
              <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end min-h-[150px] max-h-[170px] overflow-y-auto mt-3 shadow-inner">
                <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 tracking-wider flex items-center gap-1.5 select-none">
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
                  <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest flex items-center gap-1.5 select-none">
                    🔧 CONSOLA DE DEPURACIÓN (DEBUGGER)
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col justify-end">
                    {debugLogs.slice(-4).map((log, idx) => {
                      if (!log) return null;
                      const isEval = log.includes('Evaluación');
                      const isAcum = log.includes('Acumulador');
                      const isCont = log.includes('Contador');
                      let logClass = 'text-slate-500';
                      if (isEval) logClass = 'text-cyan-400/80';
                      else if (isAcum) logClass = 'text-emerald-400/80';
                      else if (isCont) logClass = 'text-amber-400/80';

                      return (
                        <div key={idx} className={logClass}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center">
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
                    disabled={isPlaying || simStep === 10 || isWaitingInput}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Siguiente Paso <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={startSimulation}
                    disabled={(simStep === 10 && isPlaying) || isWaitingInput}
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
              <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">multiplicacion_sumas.udone</span>
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
