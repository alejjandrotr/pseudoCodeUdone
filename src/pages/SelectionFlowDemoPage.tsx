import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, Box, TerminalSquare } from 'lucide-react';
import { FlowDiagram, FlowNode, FlowEdge } from '../components/cantera/interactive/FlowDiagram';
import { VariableState } from '../components/cantera/interactive/VariablesMemoryPanel';

// ─── Flow Definition (Par / Impar) ──────────────────────────────────────────

const FLOW_NODES: FlowNode[] = [
  { id: 'start', type: 'start', label: 'Inicio' },
  { id: 'io_read', type: 'io', label: 'Leer num' },
  { id: 'cond_par', type: 'condition', label: 'num MOD 2 = 0' },
  { id: 'print_par', type: 'io', label: 'Escribir "PAR"' },
  { id: 'print_impar', type: 'io', label: 'Escribir "IMPAR"' },
  { id: 'end', type: 'end', label: 'Fin' },
];

const FLOW_EDGES: FlowEdge[] = [
  { from: 'start', to: 'io_read' },
  { from: 'io_read', to: 'cond_par' },
  { from: 'cond_par', to: 'print_par', label: 'SÍ' },
  { from: 'cond_par', to: 'print_impar', label: 'NO' },
  { from: 'print_par', to: 'end' },
  { from: 'print_impar', to: 'end' },
];

// ─── Code and Steps ─────────────────────────────────────────────────────────

const PSEUDO_CODE = `Algoritmo ParImpar
  Variables:
    num: Entero
Inicio
  Escribir "Ingrese un numero:"
  Leer num
  Si (num MOD 2 = 0) Entonces
    Escribir "PAR"
  Sino
    Escribir "IMPAR"
  Fin Si
Fin`;

const CODE_LINES = PSEUDO_CODE.split('\n');

interface ExecutionStep {
  nodeId: string;
  line: number;
  action?: 'wait_input' | 'print' | 'eval_cond' | 'end';
  variable?: string;
  output?: string;
  // eval_cond function determines the next node to jump to based on memory
  evalNext?: (vars: Record<string, any>) => string;
}

const EXECUTION_PLAN: Record<string, ExecutionStep> = {
  'start': { nodeId: 'start', line: 4, action: 'print', output: '> Iniciando algoritmo...' },
  'io_read': { nodeId: 'io_read', line: 6, action: 'wait_input', variable: 'num' },
  'cond_par': { 
    nodeId: 'cond_par', 
    line: 7,
    action: 'eval_cond',
    evalNext: (vars) => {
      const isPar = Number(vars.num) % 2 === 0;
      return isPar ? 'print_par' : 'print_impar';
    }
  },
  'print_par': { nodeId: 'print_par', line: 8, action: 'print', output: 'El número es PAR' },
  'print_impar': { nodeId: 'print_impar', line: 10, action: 'print', output: 'El número es IMPAR' },
  'end': { nodeId: 'end', line: 12, action: 'end', output: '> Fin del algoritmo.' },
};

interface SelectionFlowDemoPageProps {
  onBack: () => void;
}

export const SelectionFlowDemoPage: React.FC<SelectionFlowDemoPageProps> = ({ onBack }) => {
  // ─── State ────────────────────────────────────────────────────────────────
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeEdgeFrom, setActiveEdgeFrom] = useState<string | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [memory, setMemory] = useState<VariableState[]>([{ name: 'num', value: null, type: 'number' }]);
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
        }
      }, 1500); // 1.5s delay between steps for visual tracking
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, activeNodeId, isWaitingInput, memory]);

  const getNextNode = (currentId: string | null): string | null => {
    if (!currentId) return 'start';
    
    const step = EXECUTION_PLAN[currentId];
    if (step.action === 'end') return null;
    
    if (step.action === 'eval_cond' && step.evalNext) {
      const varsDict = memory.reduce((acc, v) => ({ ...acc, [v.name]: v.value }), {});
      const target = step.evalNext(varsDict);
      setActiveEdgeFrom(currentId);
      return target;
    }
    
    // Default: find the next edge
    const nextEdge = FLOW_EDGES.find(e => e.from === currentId);
    if (nextEdge) {
      setActiveEdgeFrom(currentId);
      return nextEdge.to;
    }
    
    return null;
  };

  const executeNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
    const step = EXECUTION_PLAN[nodeId];
    
    if (!step) return;

    if (step.action === 'print' && step.output) {
      setConsoleHistory(prev => [...prev, { type: 'out', text: step.output! }]);
    }
    else if (step.action === 'wait_input') {
      setIsPlaying(false);
      setIsWaitingInput(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    else if (step.action === 'end' && step.output) {
      setConsoleHistory(prev => [...prev, { type: 'out', text: step.output! }]);
      setIsPlaying(false);
      setTimeout(() => setActiveEdgeFrom(null), 500); // Clear edge highlight
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWaitingInput) return;

    const val = inputValue.trim();
    if (val === '') return;
    
    const parsedVal = isNaN(Number(val)) ? val : Number(val);

    setConsoleHistory(prev => [...prev, { type: 'in', text: val }]);
    
    // Update memory for 'num'
    setMemory(prev => prev.map(v => v.name === 'num' ? { ...v, value: parsedVal } : v));

    setInputValue('');
    setIsWaitingInput(false);
    setIsPlaying(true); // Resume
  };

  const handleReset = () => {
    setActiveNodeId(null);
    setActiveEdgeFrom(null);
    setIsPlaying(false);
    setIsWaitingInput(false);
    setConsoleHistory([]);
    setMemory([{ name: 'num', value: null, type: 'number' }]);
    setInputValue('');
  };

  const startExecution = () => {
    if (!activeNodeId || EXECUTION_PLAN[activeNodeId]?.action === 'end') {
      handleReset();
      setIsPlaying(true);
      executeNode('start');
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Laboratorio de Flujo: Par o Impar</h1>
            <p className="text-slate-400 text-sm">Visualizador interactivo de estructuras de selección.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Visual Flow (Now Left) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden order-1">
            
            {/* Diagram Component */}
            <div className="w-full h-full relative z-10 flex justify-center mt-[-30px]">
               <FlowDiagram 
                 nodes={FLOW_NODES} 
                 edges={FLOW_EDGES} 
                 activeNodeId={activeNodeId} 
                 activeEdgeFrom={activeEdgeFrom} 
               />
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
               <button 
                 onClick={handleReset}
                 className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700 hover:border-slate-500"
                 title="Reiniciar"
               >
                 <RotateCcw size={18} />
               </button>
               <button 
                 onClick={startExecution}
                 disabled={isWaitingInput}
                 className={`flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition-colors border ${
                   isPlaying 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 hover:bg-amber-500/30' 
                    : 'bg-brand-500/20 text-brand-400 border-brand-500/50 hover:bg-brand-500/30'
                 } disabled:opacity-50 disabled:cursor-not-allowed`}
               >
                 <Play size={16} className={isPlaying ? 'hidden' : 'block'} />
                 {isPlaying ? 'Pausar' : 'Iniciar Flujo'}
               </button>
            </div>
          </div>

          {/* Code View (Now Middle) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-0 flex flex-col overflow-hidden min-h-[400px] order-2">
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

          {/* Right Column: Console & Memory */}
          <div className="flex flex-col gap-6">
            
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
               <div className="p-4 font-mono text-sm flex-1 overflow-y-auto">
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
                       placeholder={`Introduce un número...`}
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
