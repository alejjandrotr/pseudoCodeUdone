import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, CodeBlock, Strong, InlineCode } from '../ArticlePageComponents';
import { ArrowRight, Calculator, Box, TerminalSquare, Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

const SIM1_CODE = [
  'Algoritmo Registro_Puntuaciones_Con_Ciclo',
  'Variables:',
  '    puntos: Arreglo de Real[10]',
  '    i: Entero',
  'Inicio',
  '    Para i = 1 Hasta 10 Inc 1',
  '        Escribir "Indique los puntos del jugador ", i, ": "',
  '        Leer puntos[i]',
  '    Fin Para',
  '    ',
  '    Escribir "Las puntuaciones ingresadas son:"',
  '    Para i = 1 Hasta 10 Inc 1',
  '        Escribir "Jugador ", i, ": ", puntos[i]',
  '    Fin Para',
  'Fin'
];

const SIM1_STEPS = [
  { line: 3, action: 'init_puntos' },
  { line: 4, action: 'init_i' },
  ...Array.from({length: 10}).flatMap((_, idx) => [
    { line: 6, action: 'set_i_read', val: idx + 1 },
    { line: 7, action: 'escribir_read', val: idx + 1 },
    { line: 8, action: 'leer_read', val: idx + 1 },
    { line: 9, action: 'fin_para_read' }
  ]),
  { line: 11, action: 'escribir_mid' },
  ...Array.from({length: 10}).flatMap((_, idx) => [
    { line: 12, action: 'set_i_write', val: idx + 1 },
    { line: 13, action: 'escribir_write', val: idx + 1 },
    { line: 14, action: 'fin_para_write' }
  ]),
  { line: 15, action: 'end' }
];

const SimulatorCiclo = () => {
  const [puntos, setPuntos] = useState<(number | null)[]>(Array(10).fill(null));
  const [iVar, setIVar] = useState<number | null>(null);
  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [ramHighlightIndex, setRamHighlightIndex] = useState<number | null>(null);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => advanceSimulation(), 800);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, simStep, isWaitingInput]);

  const advanceSimulation = () => {
    if (isWaitingInput) return;
    if (simStep >= SIM1_STEPS.length) {
      setIsPlaying(false);
      return;
    }

    const current = SIM1_STEPS[simStep];
    setActiveLine(current.line);
    
    if (current.action === 'init_puntos') {
      // do nothing
    } else if (current.action === 'init_i') {
      setIVar(0);
    } else if (current.action === 'set_i_read' || current.action === 'set_i_write') {
      setIVar(current.val || null);
    } else if (current.action === 'escribir_read') {
      setTerminalLogs(prev => [...prev, `Indique los puntos del jugador ${current.val}: `]);
    } else if (current.action === 'leer_read') {
      setRamHighlightIndex((current.val || 1) - 1);
      setIsWaitingInput(true);
      // Wait for user...
      return; 
    } else if (current.action === 'fin_para_read' || current.action === 'fin_para_write') {
      setRamHighlightIndex(null);
    } else if (current.action === 'escribir_mid') {
      setTerminalLogs(prev => [...prev, 'Las puntuaciones ingresadas son:']);
    } else if (current.action === 'escribir_write') {
      const idx = (current.val || 1) - 1;
      setRamHighlightIndex(idx);
      setTerminalLogs(prev => [...prev, `Jugador ${current.val}: ${puntos[idx]}`]);
    } else if (current.action === 'end') {
      setIsPlaying(false);
    }

    setSimStep(simStep + 1);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setPuntos(Array(10).fill(null));
    setIVar(null);
    setSimStep(0);
    setActiveLine(null);
    setTerminalLogs([]);
    setRamHighlightIndex(null);
    setIsWaitingInput(false);
    setInputValue("");
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const val = parseFloat(inputValue);
    if(isNaN(val)) return;

    const current = SIM1_STEPS[simStep];
    const idx = (current.val || 1) - 1; 
    
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
    <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans mb-4">
              <Box size={14} className="text-brand-400" /> Memoria RAM Dinámica
            </span>
            
            {/* Variable 'i' */}
            <div className="mb-4">
              <span className="text-[10px] text-slate-500 font-mono mb-1 block">i (Índice):</span>
              <div className="w-16 h-10 bg-slate-900 border border-slate-700 rounded flex items-center justify-center font-mono text-sm text-brand-300 shadow-inner">
                {iVar !== null ? iVar : '-'}
              </div>
            </div>

            {/* Array Puntos */}
            <span className="text-[10px] text-slate-500 font-mono mb-1 block">puntos (Arreglo):</span>
            <div className="flex gap-1.5 my-2 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {puntos.map((valor, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-1.5 transition-all duration-300 min-w-[3rem] snap-start"
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

          <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end h-[140px] overflow-y-auto mt-4 shadow-inner">
            <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
              <TerminalSquare size={12} /> Consola
            </div>
            <div className="space-y-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className={log.includes('>') ? 'text-brand-400' : 'text-slate-100'}>{log}</div>
              ))}
              {isWaitingInput && (
                <form onSubmit={handleInputSubmit} className="flex items-center gap-2 mt-1">
                  <span className="text-brand-400">&gt;</span>
                  <input 
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="bg-transparent border-none outline-none text-brand-400 w-full"
                    placeholder="Escribe el valor y presiona Enter..."
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
                disabled={isPlaying || simStep >= SIM1_STEPS.length || isWaitingInput}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
              >
                Paso <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => {
                  if(simStep >= SIM1_STEPS.length) resetSimulation();
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

        <div className="w-full lg:w-[450px] xl:w-[500px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl shrink-0">
          <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">ciclo_para_arreglos.udone</span>
          </div>
          <div className="p-4 font-mono text-[10px] sm:text-xs space-y-1 overflow-y-auto flex-grow bg-slate-950/20 max-h-[450px]">
            {SIM1_CODE.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = activeLine === lineNum;
              return (
                <div 
                  key={idx} 
                  className={`flex gap-2 px-1 py-0.5 rounded transition-colors ${
                    isActive ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400' : 'text-slate-500 border-l-2 border-transparent'
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
  );
}

const SIM2_CODE = [
  'Algoritmo Modificar_Puntuacion_Especifica',
  'Variables:',
  '    puntos: Arreglo de Real[3]',
  '    jugadorSeleccionado: Entero',
  '    puntosASumar: Real',
  'Inicio',
  '    puntos[1] <- 15.5',
  '    puntos[2] <- 22.0',
  '    puntos[3] <- 18.0',
  '    ',
  '    Escribir "=== MENÚ DE ACTUALIZACIÓN ==="',
  '    Escribir "1. Juan\\n2. Pedro\\n3. María"',
  '    Escribir "Seleccione el jugador:"',
  '    Leer jugadorSeleccionado',
  '    ',
  '    Si (jugadorSeleccionado >= 1) Y (jugadorSeleccionado <= 3) Entonces',
  '        Escribir "Indique los puntos a añadir: "',
  '        Leer puntosASumar',
  '        puntos[jugadorSeleccionado] <- puntos[jugadorSeleccionado] + puntosASumar',
  '        Escribir "La nueva puntuación es: ", puntos[jugadorSeleccionado]',
  '    Si No',
  '        Escribir "Error: Opción inválida."',
  '    Fin Si',
  'Fin'
]
    const SimulatorDiccionario = () => {
  const [puntos, setPuntos] = useState<(number | null)[]>([null, null, null]);
  const [jugador, setJugador] = useState<number | null>(null);
  const [aSumar, setASumar] = useState<number | null>(null);
  
  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [ramHighlightIndex, setRamHighlightIndex] = useState<number | null>(null);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputTarget, setInputTarget] = useState<'jugador'|'puntos'|null>(null);
  const [inputValue, setInputValue] = useState("");
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => advanceSimulation(), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, simStep, isWaitingInput, jugador, aSumar, puntos]);

  const advanceSimulation = () => {
    if (isWaitingInput) return;
    
    switch (simStep) {
      case 0: setActiveLine(3); setSimStep(1); break;
      case 1: setActiveLine(4); setSimStep(2); break;
      case 2: setActiveLine(5); setSimStep(3); break;
      case 3: setActiveLine(7); setPuntos([15.5, null, null]); setRamHighlightIndex(0); setSimStep(4); break;
      case 4: setActiveLine(8); setPuntos([15.5, 22.0, null]); setRamHighlightIndex(1); setSimStep(5); break;
      case 5: setActiveLine(9); setPuntos([15.5, 22.0, 18.0]); setRamHighlightIndex(2); setSimStep(6); break;
      case 6: 
        setActiveLine(11); setRamHighlightIndex(null);
        setTerminalLogs(prev => [...prev, "=== MENÚ DE ACTUALIZACIÓN ==="]); 
        setSimStep(7); 
        break;
      case 7: 
        setActiveLine(12); 
        setTerminalLogs(prev => [...prev, "1. Juan", "2. Pedro", "3. María"]); 
        setSimStep(8); 
        break;
      case 8: 
        setActiveLine(13); 
        setTerminalLogs(prev => [...prev, "Seleccione el jugador:"]); 
        setSimStep(9); 
        break;
      case 9: 
        setActiveLine(14); 
        setIsWaitingInput(true); 
        setInputTarget('jugador'); 
        break;
      case 10:
        setActiveLine(16);
        if (jugador && jugador >= 1 && jugador <= 3) {
          setSimStep(11);
        } else {
          setSimStep(15);
        }
        break;
      case 11: 
        setActiveLine(17); 
        setTerminalLogs(prev => [...prev, "Indique los puntos a añadir: "]); 
        setSimStep(12); 
        break;
      case 12: 
        setActiveLine(18); 
        setIsWaitingInput(true); 
        setInputTarget('puntos'); 
        break;
      case 13: 
        setActiveLine(19);
        const idx = (jugador || 1) - 1;
        setRamHighlightIndex(idx);
        setPuntos(prev => {
          const next = [...prev];
          next[idx] = (next[idx] || 0) + (aSumar || 0);
          return next;
        });
        setSimStep(14);
        break;
      case 14:
        setActiveLine(20);
        setTerminalLogs(prev => [...prev, "La nueva puntuación es: " + puntos[(jugador || 1) - 1]]);
        setRamHighlightIndex(null);
        setSimStep(17);
        break;
      case 15:
        setActiveLine(22);
        setSimStep(16);
        break;
      case 16:
        setActiveLine(23);
        setTerminalLogs(prev => [...prev, "Error: Opción inválida."]);
        setSimStep(17);
        break;
      case 17:
        setActiveLine(24);
        setIsPlaying(false);
        setSimStep(18);
        break;
      case 18:
        setIsPlaying(false);
        break;
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setPuntos([null, null, null]);
    setJugador(null);
    setASumar(null);
    setSimStep(0);
    setActiveLine(null);
    setTerminalLogs([]);
    setRamHighlightIndex(null);
    setIsWaitingInput(false);
    setInputTarget(null);
    setInputValue("");
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const val = parseFloat(inputValue);
    if(isNaN(val)) return;

    setTerminalLogs(prev => {
      const newLogs = [...prev];
      newLogs[newLogs.length - 1] += ` > ${val}`;
      return newLogs;
    });

    if (inputTarget === 'jugador') {
      setJugador(val);
    } else {
      setASumar(val);
    }
    
    setInputValue("");
    setIsWaitingInput(false);
    setInputTarget(null);
    setSimStep(simStep + 1);
  };

  return (
    <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans mb-4">
              <Box size={14} className="text-brand-400" /> Memoria RAM Dinámica
            </span>
            
            <div className="flex gap-6 mb-4">
              <div>
                <span className="text-[10px] text-slate-500 font-mono mb-1 block">jugadorSeleccionado:</span>
                <div className="w-24 h-10 bg-slate-900 border border-slate-700 rounded flex items-center justify-center font-mono text-sm text-cyan-300 shadow-inner">
                  {jugador !== null ? jugador : '-'}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono mb-1 block">puntosASumar:</span>
                <div className="w-24 h-10 bg-slate-900 border border-slate-700 rounded flex items-center justify-center font-mono text-sm text-purple-300 shadow-inner">
                  {aSumar !== null ? aSumar : '-'}
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-500 font-mono mb-1 block">puntos (Arreglo de 3):</span>
            <div className="flex gap-2 my-2 overflow-x-auto pb-4 custom-scrollbar">
              {puntos.map((valor, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-1.5 transition-all duration-300 min-w-[4rem]"
                >
                  <div className={`w-full h-10 border rounded flex items-center justify-center font-mono text-sm shadow-sm ${
                    ramHighlightIndex === idx 
                      ? 'bg-brand-500/20 border-brand-400 text-brand-300 shadow-[0_0_12px_rgba(0,255,136,0.4)] scale-110 z-10 font-bold' 
                      : valor !== null
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}>
                    {valor !== null ? valor : '-'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">
                    [{idx + 1}] {idx===0?'Juan':idx===1?'Pedro':'María'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end h-[180px] overflow-y-auto mt-4 shadow-inner">
            <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
              <TerminalSquare size={12} /> Consola
            </div>
            <div className="space-y-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className={log.includes('>') ? 'text-brand-400' : 'text-slate-100'}>{log}</div>
              ))}
              {isWaitingInput && (
                <form onSubmit={handleInputSubmit} className="flex items-center gap-2 mt-1">
                  <span className="text-brand-400">&gt;</span>
                  <input 
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="bg-transparent border-none outline-none text-brand-400 w-full"
                    placeholder="Ingresa valor y Enter..."
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
                disabled={isPlaying || simStep >= 18 || isWaitingInput}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
              >
                Paso <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => {
                  if(simStep >= 18) resetSimulation();
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

        <div className="w-full lg:w-[450px] xl:w-[500px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl shrink-0">
          <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">acceso_directo.udone</span>
          </div>
          <div className="p-4 font-mono text-[10px] sm:text-xs space-y-1 overflow-y-auto flex-grow bg-slate-950/20 max-h-[450px]">
            {SIM2_CODE.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = activeLine === lineNum;
              return (
                <div 
                  key={idx} 
                  className={`flex gap-2 px-1 py-0.5 rounded transition-colors ${
                    isActive ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400' : 'text-slate-500 border-l-2 border-transparent'
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
  );
};

export const ArticleArreglosIteracion: React.FC = () => {
  return (
    <div>
      <PageSection title="Iteración sobre Arreglos (Uso de Índices Dinámicos)">
        <P>
          Como se observó en el algoritmo secuencial, escribir individualmente cada instrucción de lectura y escritura continúa siendo ineficiente. La verdadera potencia de los arreglos se manifiesta cuando empleamos variables o expresiones matemáticas dentro de los corchetes para determinar el índice de acceso.
        </P>
        <P>
          En el desarrollo de software, es una convención universal utilizar la variable <InlineCode>i</InlineCode> para representar este índice. Es crucial comprender que, antes de acceder a una posición dentro de un arreglo, el sistema debe resolver por completo la operación matemática o la variable contenida entre los corchetes para obtener el valor entero final de la casilla destino.
        </P>

        {/* Ilustración de Formas de Acceso */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 my-8 overflow-hidden shadow-lg">
          <span className="text-xs uppercase font-bold text-slate-500 mb-6 tracking-wider flex items-center gap-2">
            <Calculator size={14} className="text-brand-400" /> Resolución de Índices en Tiempo de Ejecución (Supongamos i = 2)
          </span>
          
          <div className="flex flex-col gap-6">
            {/* Array Base */}
            <div className="flex gap-2 justify-center mb-4 overflow-x-auto pb-4 custom-scrollbar">
              {Array(6).fill(0).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[3rem]">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-700 rounded-lg shadow-inner flex items-center justify-center font-mono text-sm text-slate-300">
                    {idx * 10}
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-bold mt-2">[{idx + 1}]</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Constante */}
              <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl flex flex-col items-center text-center relative overflow-hidden group hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-1">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] uppercase text-slate-500 font-bold mb-3">Acceso Constante</span>
                <code className="text-lg font-mono text-cyan-400 font-bold bg-cyan-500/10 px-4 py-1.5 rounded-lg border border-cyan-500/20">x[3]</code>
                <div className="my-3 text-slate-400"><ArrowRight size={18} /></div>
                <span className="text-sm text-slate-300 leading-relaxed">Va directo a la casilla <strong className="text-cyan-400">3</strong></span>
              </div>
              
              {/* Variable */}
              <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl flex flex-col items-center text-center relative overflow-hidden group hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-1">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] uppercase text-slate-500 font-bold mb-3">Acceso por Variable</span>
                <code className="text-lg font-mono text-emerald-400 font-bold bg-emerald-500/10 px-4 py-1.5 rounded-lg border border-emerald-500/20">x[i]</code>
                <div className="my-3 text-slate-400"><ArrowRight size={18} /></div>
                <span className="text-sm text-slate-300 leading-relaxed">Resuelve i = 2 ➔ Va a la casilla <strong className="text-emerald-400">2</strong></span>
              </div>

              {/* Expresión Matemática */}
              <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl flex flex-col items-center text-center relative overflow-hidden group hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-1">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] uppercase text-slate-500 font-bold mb-3">Expresión Aritmética</span>
                <code className="text-lg font-mono text-purple-400 font-bold bg-purple-500/10 px-4 py-1.5 rounded-lg border border-purple-500/20">x[i * 2]</code>
                <div className="my-3 text-slate-400"><ArrowRight size={18} /></div>
                <span className="text-sm text-slate-300 leading-relaxed">Resuelve 2 * 2 = 4 ➔ Casilla <strong className="text-purple-400">4</strong></span>
              </div>
            </div>
          </div>
        </div>

      </PageSection>

      <PageSection title="Laboratorio: El Ciclo Para con Arreglos">
        <P>
          El método estándar para realizar el recorrido completo de un arreglo consiste en la implementación de un ciclo <InlineCode>Para</InlineCode>. Conforme a las directrices de nuestra materia, <Strong>nuestros arreglos están indexados a partir de la posición 1</Strong> (no desde 0). Esto nos permite sustituir las declaraciones estáticas por una variable de control <InlineCode>i</InlineCode> que se incrementa en cada iteración, logrando un código compacto, legible y altamente flexible.
        </P>

        <SimulatorCiclo />
      </PageSection>

      <PageSection title="Flexibilidad y Casos de Uso Avanzados">
        <P>
          La indexación dinámica proporciona una enorme versatilidad. No solo podemos recorrer un arreglo de principio a fin, sino también implementar filtros y condicionales lógicos dentro de las iteraciones. Por ejemplo, en un escenario donde se llene un arreglo con puntuaciones aleatorias, podríamos programar fácilmente un ciclo para evaluar y mostrar exclusivamente aquellos valores almacenados en posiciones pares (índices 2, 4, 6, 8, etc.).
        </P>

        <h3 className="text-xl font-bold text-slate-200 mt-8 mb-4">Laboratorio: Acceso Directo Estilo Estructura de Diccionario</h3>
        <P>
          Otro caso de uso fundamental es el acceso selectivo basado en la entrada explícita del usuario, simulando el comportamiento operativo de un diccionario de datos. En este escenario, en lugar de solicitar secuencialmente la información de todos los elementos, el algoritmo despliega un menú interactivo. El usuario ingresa una opción numérica que representa a un participante específico, guardando dicho número en una variable entera para utilizarla directamente como el índice del arreglo, optimizando los procesos de actualización y consulta de datos.
        </P>

        <SimulatorDiccionario />
      </PageSection>
    </div>
  );
};
