import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Box, TerminalSquare, Zap, FastForward } from 'lucide-react';
import { FlowDiagram, FlowNode, FlowEdge } from '../components/cantera/interactive/FlowDiagram';
import { VariableState } from '../components/cantera/interactive/VariablesMemoryPanel';

// ─── Flow Definition (Ciclo Para) ─────────────────────────────────────────

const FLOW_NODES: FlowNode[] = [
  { id: 'start', type: 'start', label: 'Inicio', x: 200, y: 40 },
  { id: 'init_vars', type: 'process', label: 'mayores <- 0', x: 200, y: 110 },
  { id: 'loop_cond', type: 'condition', label: 'i <= 40', x: 200, y: 180 },
  { id: 'read_age', type: 'io', label: 'Leer edad', x: 200, y: 250 },
  { id: 'cond_age', type: 'condition', label: 'edad >= 18', x: 200, y: 320 },
  { id: 'inc_mayores', type: 'process', label: 'mayores <- mayores + 1', x: 260, y: 390 },
  { id: 'inc_i', type: 'process', label: 'i <- i + 1', x: 120, y: 460 },
  { id: 'print_res', type: 'io', label: 'Escribir mayores', x: 340, y: 250 },
  { id: 'end', type: 'end', label: 'Fin', x: 340, y: 320 },
];

const FLOW_EDGES: FlowEdge[] = [
  { from: 'start', to: 'init_vars' },
  { from: 'init_vars', to: 'loop_cond' },
  { from: 'loop_cond', to: 'read_age', label: 'V' },
  { from: 'loop_cond', to: 'print_res', label: 'F' },
  { from: 'read_age', to: 'cond_age' },
  { from: 'cond_age', to: 'inc_mayores', label: 'V' },
  { from: 'cond_age', to: 'inc_i', label: 'F' },
  { from: 'inc_mayores', to: 'inc_i' },
  { from: 'inc_i', to: 'loop_cond' },
  { from: 'print_res', to: 'end' },
];

// ─── Code and Steps ─────────────────────────────────────────────────────────

const PSEUDO_CODE = `Algoritmo MayoresDeEdad
  Variables:
    i, mayores, edad: Entero
Inicio
  mayores <- 0
  Para i <- 1 Hasta 40 Hacer
    Escribir "Ingrese edad:"
    Leer edad
    Si (edad >= 18) Entonces
      mayores <- mayores + 1
    Fin Si
  Fin Para
  Escribir "Total mayores: ", mayores
Fin`;

const CODE_LINES = PSEUDO_CODE.split('\n');

interface ExecutionStep {
  nodeId: string;
  line: number;
  action?: 'wait_input' | 'print' | 'eval_cond' | 'process' | 'end';
  variable?: string;
  output?: string;
  evalNext?: (vars: Record<string, any>) => string;
  onExecute?: (vars: Record<string, any>) => Partial<Record<string, any>>;
}

const EXECUTION_PLAN: Record<string, ExecutionStep> = {
  'start': { nodeId: 'start', line: 4, action: 'print', output: '> Iniciando algoritmo...' },
  'init_vars': { 
    nodeId: 'init_vars', 
    line: 5, 
    action: 'process', 
    output: '> Inicializando contador de mayores y variable de ciclo.',
    onExecute: () => ({ mayores: 0, i: 1 })
  },
  'loop_cond': { 
    nodeId: 'loop_cond', 
    line: 6,
    action: 'eval_cond',
    evalNext: (vars) => {
      const i = Number(vars.i || 1);
      return i <= 40 ? 'read_age' : 'print_res';
    }
  },
  'read_age': { nodeId: 'read_age', line: 8, action: 'wait_input', variable: 'edad', output: 'Ingrese edad de la persona:' },
  'cond_age': { 
    nodeId: 'cond_age', 
    line: 9,
    action: 'eval_cond',
    evalNext: (vars) => {
      const edad = Number(vars.edad || 0);
      return edad >= 18 ? 'inc_mayores' : 'inc_i';
    }
  },
  'inc_mayores': { 
    nodeId: 'inc_mayores', 
    line: 10, 
    action: 'process', 
    output: '> ¡Es mayor de edad! Contado.',
    onExecute: (vars) => ({ mayores: Number(vars.mayores || 0) + 1 })
  },
  'inc_i': { 
    nodeId: 'inc_i', 
    line: 12, 
    action: 'process', 
    onExecute: (vars) => ({ i: Number(vars.i || 1) + 1 })
  },
  'print_res': { 
    nodeId: 'print_res', 
    line: 13, 
    action: 'print'
  },
  'end': { nodeId: 'end', line: 14, action: 'end', output: '> Fin del algoritmo.' },
};

interface LoopFlowDemoPageProps {
  onBack?: () => void;
}

export const LoopFlowDemoPage: React.FC<LoopFlowDemoPageProps> = ({ onBack }) => {
  // ─── State ────────────────────────────────────────────────────────────────
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeEdge, setActiveEdge] = useState<{from: string, to: string} | null>(null);
  const [visitedEdges, setVisitedEdges] = useState<{from: string, to: string}[]>([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [memory, setMemory] = useState<VariableState[]>([
    { name: 'i', value: null, type: 'number' },
    { name: 'mayores', value: null, type: 'number' },
    { name: 'edad', value: null, type: 'number' }
  ]);
  const [consoleHistory, setConsoleHistory] = useState<{type: 'out' | 'in', text: string}[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Execution Logic ──────────────────────────────────────────────────────
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && !isWaitingInput) {
      timer = setTimeout(() => {
        const nextNode = getNextNode(activeNodeId);
        
        if (nextNode) {
          executeNode(nextNode);
        } else {
          setIsPlaying(false);
          setIsAutoPlay(false);
        }
      }, isAutoPlay ? 100 : 1200);
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, activeNodeId, isWaitingInput, memory, isAutoPlay]);

  const getNextNode = (currentId: string | null): string | null => {
    if (!currentId) return 'start';
    
    const step = EXECUTION_PLAN[currentId];
    if (step.action === 'end') return null;
    
    if (step.action === 'eval_cond' && step.evalNext) {
      const varsDict = memory.reduce((acc, v) => ({ ...acc, [v.name]: v.value }), {});
      const target = step.evalNext(varsDict);
      const edge = { from: currentId, to: target };
      setActiveEdge(edge);
      setVisitedEdges(prev => {
        // Prevent infinite array growth by keeping last 50 edges
        const next = [...prev, edge];
        return next.length > 50 ? next.slice(next.length - 50) : next;
      });
      return target;
    }
    
    const nextEdge = FLOW_EDGES.find(e => e.from === currentId);
    if (nextEdge) {
      const edge = { from: currentId, to: nextEdge.to };
      setActiveEdge(edge);
      setVisitedEdges(prev => {
        const next = [...prev, edge];
        return next.length > 50 ? next.slice(next.length - 50) : next;
      });
      return nextEdge.to;
    }
    
    return null;
  };

  const executeNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
    const step = EXECUTION_PLAN[nodeId];
    
    if (!step) return;

    // Execute logic step
    if (step.onExecute) {
      const varsDict = memory.reduce((acc, v) => ({ ...acc, [v.name]: v.value }), {});
      const updates = step.onExecute(varsDict);
      setMemory(prev => prev.map(v => 
        updates[v.name] !== undefined ? { ...v, value: updates[v.name] } : v
      ));
    }

    if (step.action === 'print') {
      if (step.output) {
        setConsoleHistory(prev => [...prev.slice(-30), { type: 'out', text: step.output! }]);
      } else if (nodeId === 'print_res') {
        const mayoresCount = memory.find(v => v.name === 'mayores')?.value || 0;
        setConsoleHistory(prev => [...prev.slice(-30), { type: 'out', text: '> Total mayores de edad: ' + mayoresCount }]);
      }
    }
    else if (step.action === 'process' && step.output && !isAutoPlay) {
      setConsoleHistory(prev => [...prev.slice(-30), { type: 'out', text: step.output! }]);
    }
    else if (step.action === 'wait_input') {
      if (isAutoPlay) {
        // Auto-generate input to prevent getting stuck
        const randomAge = Math.floor(Math.random() * 50) + 10; // ages 10-59
        setMemory(prev => prev.map(v => 
          v.name === step.variable ? { ...v, value: randomAge } : v
        ));
        setConsoleHistory(prev => [...prev.slice(-30), { type: 'in', text: `> [Auto] Edad ingresada: ${randomAge}` }]);
        // Do not pause or set isWaitingInput, let the effect continue
      } else {
        if (step.output) {
          setConsoleHistory(prev => [...prev.slice(-30), { type: 'out', text: step.output! }]);
        }
        setIsPlaying(false);
        setIsWaitingInput(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
    else if (step.action === 'end' && step.output) {
      setConsoleHistory(prev => [...prev.slice(-30), { type: 'out', text: step.output! }]);
      setIsPlaying(false);
      setIsAutoPlay(false);
      setTimeout(() => setActiveEdge(null), 500); // Clear edge highlight
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const numValue = Number(inputValue);
    const step = EXECUTION_PLAN[activeNodeId!];
    
    if (step && step.variable) {
      setMemory(prev => prev.map(v => 
        v.name === step.variable ? { ...v, value: isNaN(numValue) ? inputValue : numValue } : v
      ));
    }

    setConsoleHistory(prev => [...prev.slice(-30), { type: 'in', text: `> ${inputValue}` }]);
    setInputValue('');
    setIsWaitingInput(false);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setActiveNodeId(null);
    setActiveEdge(null);
    setVisitedEdges([]);
    setIsPlaying(false);
    setIsAutoPlay(false);
    setIsWaitingInput(false);
    setInputValue('');
    setMemory([
      { name: 'i', value: null, type: 'number' },
      { name: 'mayores', value: null, type: 'number' },
      { name: 'edad', value: null, type: 'number' }
    ]);
    setConsoleHistory([]);
  };

  const startExecution = () => {
    if (!activeNodeId || EXECUTION_PLAN[activeNodeId]?.action === 'end') {
      handleReset();
      setIsPlaying(true);
      executeNode('start');
    } else {
      setIsPlaying(!isPlaying);
      if (isAutoPlay) setIsAutoPlay(false);
    }
  };

  const startAutoPlay = () => {
    if (!activeNodeId || EXECUTION_PLAN[activeNodeId]?.action === 'end') {
      handleReset();
      setIsAutoPlay(true);
      setIsPlaying(true);
      executeNode('start');
    } else {
      setIsAutoPlay(true);
      setIsPlaying(true);
      if (isWaitingInput) {
        setIsWaitingInput(false);
        // We simulate the pending input manually since we were stuck waiting
        const step = EXECUTION_PLAN[activeNodeId];
        if (step && step.variable) {
           const randomAge = Math.floor(Math.random() * 50) + 10;
           setMemory(prev => prev.map(v => 
             v.name === step.variable ? { ...v, value: randomAge } : v
           ));
           setConsoleHistory(prev => [...prev.slice(-30), { type: 'in', text: `> [Auto] Edad ingresada: ${randomAge}` }]);
        }
      }
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  const iValue = memory.find(v => v.name === 'i')?.value as number | null;
  const mayoresValue = memory.find(v => v.name === 'mayores')?.value as number | null;
  const isFinished = activeNodeId && EXECUTION_PLAN[activeNodeId]?.action === 'end';

  return (
    <div className={onBack ? "min-h-screen bg-slate-950 text-slate-200" : "w-full text-slate-200 mt-8"}>
      <div className={onBack ? "max-w-6xl mx-auto px-6 py-12" : "w-full"}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {onBack && (
            <button onClick={onBack} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
               <Zap className="text-amber-400" /> Laboratorio de Flujo: Ciclos
            </h1>
            <p className="text-slate-400 text-sm">Visualizador interactivo de estructuras repetitivas (Para).</p>
          </div>
        </div>

        {/* Dashboard de Ciclo (Destacado) */}
        <div className={`bg-slate-900 border-2 ${isFinished ? 'border-brand-500 shadow-[0_0_20px_rgba(0,255,136,0.3)]' : 'border-brand-500/30'} rounded-xl p-6 mb-6 flex justify-around items-center transition-all duration-500`}>
           <div className="text-center">
              <p className="text-slate-400 text-xs sm:text-sm uppercase font-bold tracking-widest mb-2">Iteración Actual</p>
              <p className="text-4xl sm:text-5xl font-mono text-white flex items-baseline gap-2 justify-center">
                 <span className={iValue !== null ? 'text-brand-400 animate-pulse' : 'text-slate-600'}>
                   {iValue !== null ? Math.min(iValue, 40) : 0}
                 </span>
                 <span className="text-xl sm:text-2xl text-slate-500">/ 40</span>
              </p>
           </div>
           <div className="w-px h-16 bg-slate-800 hidden sm:block"></div>
           <div className="text-center">
              <p className="text-slate-400 text-xs sm:text-sm uppercase font-bold tracking-widest mb-2">Mayores de Edad</p>
              <p className={`text-4xl sm:text-5xl font-mono transition-transform duration-300 ${isFinished ? 'text-brand-400 scale-110' : 'text-amber-400'}`}>
                 {mayoresValue !== null ? mayoresValue : 0}
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Code View */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-0 flex flex-col overflow-hidden min-h-[400px] order-1">
            <div className="bg-slate-800/80 px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <span className="text-sm font-mono text-slate-400">pseudocodigo.udone</span>
            </div>
            <div className="p-4 font-mono text-[13px] text-slate-300 overflow-y-auto flex-1">
              {CODE_LINES.map((line, idx) => {
                const lineNumber = idx + 1;
                const isActive = activeNodeId && EXECUTION_PLAN[activeNodeId]?.line === lineNumber;
                return (
                  <div 
                    key={idx} 
                    className={`flex gap-4 px-2 py-1 transition-colors rounded-sm ${isActive ? 'bg-brand-500/20 text-white border-l-2 border-brand-400' : 'border-l-2 border-transparent text-slate-400'}`}
                  >
                    <span className="text-slate-600 select-none w-4 text-right flex-shrink-0">{lineNumber}</span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual Flow */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden order-2 lg:col-span-1">
            
            {/* Diagram Component */}
            <div className="w-full h-full relative z-10 flex justify-center mt-[-10px]">
               <FlowDiagram 
                 nodes={FLOW_NODES} 
                 edges={FLOW_EDGES} 
                 activeNodeId={activeNodeId} 
                 activeEdge={activeEdge} 
                 visitedEdges={visitedEdges}
               />
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
               <div className="flex gap-2 justify-end">
                 <button 
                   onClick={handleReset}
                   className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700 hover:border-slate-500 shadow-xl"
                   title="Reiniciar"
                 >
                   <RotateCcw size={18} />
                 </button>
                 <button 
                   onClick={startExecution}
                   disabled={isWaitingInput || isAutoPlay}
                   className={`flex items-center gap-2 px-3 py-2 font-bold rounded-lg transition-colors border shadow-xl ${
                     isPlaying && !isAutoPlay
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 hover:bg-amber-500/30' 
                      : 'bg-brand-500/20 text-brand-400 border-brand-500/50 hover:bg-brand-500/30'
                   } disabled:opacity-50 disabled:cursor-not-allowed`}
                 >
                   <Play size={16} className={isPlaying && !isAutoPlay ? 'hidden' : 'block'} />
                   {isPlaying && !isAutoPlay ? 'Pausar' : 'Paso a Paso'}
                 </button>
               </div>
               <button 
                 onClick={startAutoPlay}
                 disabled={isAutoPlay}
                 className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold rounded-lg transition-colors border shadow-xl bg-indigo-500/20 text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <FastForward size={16} /> Auto-Completar Rápido
               </button>
            </div>
          </div>

          {/* Right Column: Console & Memory */}
          <div className="flex flex-col gap-6 order-3">
            
            {/* Memory Panel */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-48 overflow-hidden">
               <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-2 border-b border-slate-700 text-brand-300">
                 <Box size={16} />
                 <span className="text-sm font-bold uppercase tracking-wider">Memoria (RAM)</span>
               </div>
               <div className="p-4 flex-1 flex gap-4 overflow-x-auto">
                 {memory.map((v, i) => (
                   <div key={i} className={`p-4 rounded-xl border w-32 flex-shrink-0 flex flex-col justify-center items-center transition-all ${
                     v.value !== null ? 'border-brand-500/50 bg-brand-500/10' : 'border-slate-700 bg-slate-800/50'
                   }`}>
                     <span className="text-xs text-slate-400 font-mono mb-2">{v.name}</span>
                     <span className="text-xl font-bold text-white font-mono">
                       {v.value !== null ? v.value : '-'}
                     </span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Interactive Console */}
            <div className="bg-[#0c0c0c] rounded-xl border border-slate-800 flex flex-col flex-1 min-h-[300px]">
               <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                 <TerminalSquare size={16} className="text-slate-400" />
                 <span className="text-sm font-mono text-slate-500">Terminal de Flujo</span>
               </div>
               <div className="p-4 font-mono text-sm flex-1 overflow-y-auto flex flex-col">
                 {consoleHistory.map((item, idx) => (
                    <div key={idx} className={`mb-1 animate-fade-in ${item.type === 'out' ? 'text-green-400' : 'text-amber-400'}`}>
                      {item.type === 'out' ? '' : '  '}{item.text}
                    </div>
                 ))}
                 
                 {isWaitingInput && (
                   <form onSubmit={handleInputSubmit} className="flex gap-2 items-center mt-2 animate-fade-in">
                     <span className="text-amber-400">&gt; </span>
                     <input 
                       ref={inputRef}
                       type="number" 
                       value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       className="bg-transparent border-none outline-none text-amber-400 font-mono w-full"
                       placeholder={`Introduce edad...`}
                     />
                   </form>
                 )}
                 {!isWaitingInput && (activeNodeId !== null && EXECUTION_PLAN[activeNodeId]?.action !== 'end') && (
                   <div className="animate-pulse inline-block w-2 h-4 bg-green-400 mt-2"></div>
                 )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
