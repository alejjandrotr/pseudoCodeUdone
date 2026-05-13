import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Box, TerminalSquare } from 'lucide-react';
import { FlowDiagram, FlowNode, FlowEdge } from './FlowDiagram';
import { VariableState } from './VariablesMemoryPanel';

export interface ExecutionStep {
  nodeId: string;
  line: number;
  action?: 'wait_input' | 'print' | 'eval_cond' | 'end';
  variable?: string;
  output?: string;
  evalNext?: (vars: Record<string, any>) => string;
}

export interface InteractiveFlowExerciseProps {
  title?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  code: string[];
  plan: Record<string, ExecutionStep>;
  initialMemory: VariableState[];
}

export const InteractiveFlowExercise: React.FC<InteractiveFlowExerciseProps> = ({
  title,
  nodes,
  edges,
  code,
  plan,
  initialMemory
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [activeEdge, setActiveEdge] = useState<{from: string, to: string} | null>(null);
  const [visitedEdges, setVisitedEdges] = useState<{from: string, to: string}[]>([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [memory, setMemory] = useState<VariableState[]>(initialMemory);
  const [consoleHistory, setConsoleHistory] = useState<{type: 'out' | 'in', text: string}[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

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
      }, 1500);
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, activeNodeId, isWaitingInput, memory]);

  const getNextNode = (currentId: string | null): string | null => {
    if (!currentId) return 'start';
    
    const step = plan[currentId];
    if (step.action === 'end') return null;
    
    if (step.action === 'eval_cond' && step.evalNext) {
      const varsDict = memory.reduce((acc, v) => ({ ...acc, [v.name]: v.value }), {});
      const target = step.evalNext(varsDict);
      const edge = { from: currentId, to: target };
      setActiveEdge(edge);
      setVisitedEdges(prev => [...prev, edge]);
      return target;
    }
    
    const nextEdge = edges.find(e => e.from === currentId);
    if (nextEdge) {
      const edge = { from: currentId, to: nextEdge.to };
      setActiveEdge(edge);
      setVisitedEdges(prev => [...prev, edge]);
      return nextEdge.to;
    }
    
    return null;
  };

  const executeNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
    const step = plan[nodeId];
    
    if (!step) return;

    if (step.action === 'print' && step.output) {
      setConsoleHistory(prev => [...prev, { type: 'out', text: step.output! }]);
    }
    else if (step.action === 'wait_input') {
      if (step.output) {
        setConsoleHistory(prev => [...prev, { type: 'out', text: step.output! }]);
      }
      setIsPlaying(false);
      setIsWaitingInput(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    else if (step.action === 'end' && step.output) {
      setConsoleHistory(prev => [...prev, { type: 'out', text: step.output! }]);
      setIsPlaying(false);
      setTimeout(() => setActiveEdge(null), 500);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const numValue = Number(inputValue);
    const step = plan[activeNodeId!];
    
    if (step && step.variable) {
      setMemory(prev => prev.map(v => 
        v.name === step.variable ? { ...v, value: isNaN(numValue) ? inputValue : numValue } : v
      ));
    }

    setConsoleHistory(prev => [...prev, { type: 'in', text: `> ${inputValue}` }]);
    setInputValue('');
    setIsWaitingInput(false);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setActiveNodeId(null);
    setHighlightedNodeId(null);
    setActiveEdge(null);
    setVisitedEdges([]);
    setIsPlaying(false);
    setIsWaitingInput(false);
    setInputValue('');
    setMemory(initialMemory.map(v => ({...v, value: null})));
    setConsoleHistory([]);
  };

  const startExecution = () => {
    if (!activeNodeId || plan[activeNodeId]?.action === 'end') {
      handleReset();
      setIsPlaying(true);
      executeNode('start');
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setHighlightedNodeId(nodeId);
    setTimeout(() => setHighlightedNodeId(null), 2000);
  };

  return (
    <div className="w-full text-slate-200 mt-8 mb-8 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl bg-slate-900">
      {title && (
        <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
          <h3 className="font-bold text-brand-300">{title}</h3>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">
        
        {/* Left Side: Code + Diagram */}
        <div className="flex flex-col border-r border-slate-700/50">
          {/* Top Half: Code */}
          <div className="flex-1 bg-slate-900 min-h-[250px] flex flex-col border-b border-slate-700/50">
            <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700">
              <span className="text-xs font-mono text-slate-400">pseudocodigo.udone</span>
            </div>
            <div className="p-4 font-mono text-[13px] text-slate-300 overflow-y-auto flex-1 custom-scrollbar">
              {code.map((line, idx) => {
                const lineNumber = idx + 1;
                const isActive = activeNodeId && plan[activeNodeId]?.line === lineNumber;
                const isHighlighted = highlightedNodeId && plan[highlightedNodeId]?.line === lineNumber;
                
                let rowClasses = 'border-l-2 border-transparent text-slate-400';
                if (isActive) {
                  rowClasses = 'bg-brand-500/20 text-white border-l-2 border-brand-400';
                } else if (isHighlighted) {
                  rowClasses = 'bg-violet-500/20 text-white border-l-2 border-violet-400';
                }

                return (
                  <div key={idx} className={`flex gap-4 px-2 py-0.5 transition-colors rounded-sm ${rowClasses}`}>
                    <span className="text-slate-600 select-none w-4 text-right flex-shrink-0">{lineNumber}</span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Half: Flow Diagram */}
          <div className="relative min-h-[350px] p-4 flex justify-center custom-scrollbar overflow-auto bg-slate-900/50">
            <FlowDiagram 
              nodes={nodes} 
              edges={edges} 
              activeNodeId={activeNodeId || highlightedNodeId} 
              activeEdge={activeEdge}
              visitedEdges={visitedEdges}
              onNodeClick={handleNodeClick}
            />
            
            {/* Controls Overlay */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
               <button 
                 onClick={handleReset}
                 className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700 hover:border-slate-500"
                 title="Reiniciar"
               >
                 <RotateCcw size={16} />
               </button>
               <button 
                 onClick={startExecution}
                 disabled={isWaitingInput}
                 className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded-lg transition-colors border ${
                   isPlaying 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 hover:bg-amber-500/30' 
                    : 'bg-brand-500/20 text-brand-400 border-brand-500/50 hover:bg-brand-500/30'
                 } disabled:opacity-50 disabled:cursor-not-allowed`}
               >
                 <Play size={14} className={isPlaying ? 'hidden' : 'block'} />
                 {isPlaying ? 'Pausar' : 'Ejecutar'}
               </button>
            </div>
          </div>
        </div>

        {/* Right Side: Memory + Console */}
        <div className="flex flex-col bg-slate-900">
          {/* Memory Panel */}
          <div className="h-48 border-b border-slate-700/50 flex flex-col">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center gap-2 border-b border-slate-700 text-brand-300">
              <Box size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Memoria (RAM)</span>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
              {memory.map((v, i) => (
                <div key={i} className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                  v.value !== null ? 'border-brand-500/50 bg-brand-500/10' : 'border-slate-700 bg-slate-800/50'
                }`}>
                  <span className="text-xs text-slate-400 font-mono">{v.name}</span>
                  <span className="text-base font-bold text-white font-mono">
                    {v.value !== null ? v.value : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Console */}
          <div className="flex-1 flex flex-col min-h-[250px]">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
              <TerminalSquare size={14} className="text-slate-400" />
              <span className="text-xs font-mono text-slate-500">Terminal</span>
            </div>
            <div className="p-4 font-mono text-xs flex-1 overflow-y-auto custom-scrollbar">
              {consoleHistory.map((item, idx) => (
                <div key={idx} className={`mb-1 ${item.type === 'out' ? 'text-green-400' : 'text-amber-400'}`}>
                  {item.type === 'out' ? '' : '  '}{item.text}
                </div>
              ))}
              
              {isWaitingInput && (
                <form onSubmit={handleInputSubmit} className="flex gap-2 items-center mt-2">
                  <span className="text-amber-400">&gt;</span>
                  <input 
                    ref={inputRef}
                    type="number" 
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className="bg-transparent border-none outline-none text-amber-400 font-mono w-full text-xs"
                    placeholder="Introduce un número..."
                  />
                </form>
              )}
              {!isWaitingInput && (activeNodeId !== null && plan[activeNodeId]?.action !== 'end') && (
                <div className="animate-pulse inline-block w-1.5 h-3 bg-green-400 mt-2"></div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
