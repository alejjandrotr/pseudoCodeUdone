import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Box, TerminalSquare } from 'lucide-react';
import { VariableState } from './VariablesMemoryPanel';

export interface InteractiveStep {
  line: number;
  type: 'print' | 'read' | 'assign';
  output?: string | ((vars: Record<string, any>) => string); // For print
  variable?: string; // For read or assign
  value?: string | number | null | ((vars: Record<string, any>) => string | number | null); // For assign
}

interface InteractiveConsoleProps {
  code: string;
  steps: InteractiveStep[];
  initialVariables: VariableState[];
}

export const InteractiveConsole: React.FC<InteractiveConsoleProps> = ({ code, steps, initialVariables }) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Console state
  const [consoleHistory, setConsoleHistory] = useState<{type: 'out' | 'in', text: string}[]>([]);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentReadVar, setCurrentReadVar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Memory state
  const [memory, setMemory] = useState<VariableState[]>([...initialVariables].map(v => ({...v})));

  const codeLines = code.trim().split('\n');
  const maxLine = codeLines.length;

  // Process the current active line
  useEffect(() => {
    if (activeLine === null) return;
    
    // Find all steps for this line
    const currentSteps = steps.filter(s => s.line === activeLine);
    
    let needsInput = false;

    currentSteps.forEach(step => {
      const varsDict = memory.reduce((acc, v) => ({ ...acc, [v.name]: v.value }), {});

      if (step.type === 'print' && step.output !== undefined) {
        const text = typeof step.output === 'function' ? step.output(varsDict) : step.output;
        setConsoleHistory(prev => [...prev, {type: 'out', text}]);
      } else if (step.type === 'assign' && step.variable) {
        const val = typeof step.value === 'function' ? step.value(varsDict) : step.value;
        if (val !== undefined) {
          setMemory(prev => prev.map(v => v.name === step.variable ? { ...v, value: val } : v));
        }
      } else if (step.type === 'read' && step.variable) {
        needsInput = true;
        setCurrentReadVar(step.variable);
      }
    });

    if (needsInput) {
      setIsPlaying(false);
      setIsWaitingInput(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }

  }, [activeLine, steps]);

  // Handle Play logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isWaitingInput) {
      timer = setInterval(() => {
        setActiveLine((prev) => {
          if (prev === null) return 1;
          if (prev >= maxLine) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isWaitingInput, maxLine]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWaitingInput || !currentReadVar) return;

    const val = inputValue.trim();
    // Basic type parsing
    const parsedVal = isNaN(Number(val)) || val === '' ? val : Number(val);

    // Save to history
    setConsoleHistory(prev => [...prev, {type: 'in', text: val}]);
    
    // Save to memory
    setMemory(prev => prev.map(v => v.name === currentReadVar ? { ...v, value: parsedVal } : v));

    setInputValue('');
    setIsWaitingInput(false);
    setCurrentReadVar(null);
    setIsPlaying(true); // Resume playing automatically
  };

  const handleReset = () => {
    setActiveLine(null);
    setIsPlaying(false);
    setIsWaitingInput(false);
    setConsoleHistory([]);
    setMemory([...initialVariables].map(v => ({...v})));
    setInputValue('');
    setCurrentReadVar(null);
  };

  return (
    <div className="flex flex-col gap-0 md:gap-px my-6 rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-700/50">
      
      {/* Top row: Code and Memory */}
      <div className="flex flex-col md:flex-row gap-0 md:gap-px">
        {/* Code Panel (Left) */}
        <div className="flex-[2] flex flex-col min-h-[200px] bg-slate-900 border-b md:border-b-0 md:border-r border-slate-700/50">
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
             <span className="text-xs font-mono text-slate-400">pseudocodigo.udone</span>
             <div className="flex gap-2">
               <button 
                 onClick={handleReset}
                 className="text-slate-500 hover:text-slate-300 transition-colors px-2"
                 title="Reiniciar todo"
               >
                 <RotateCcw size={14} />
               </button>
               <button 
                 onClick={() => {
                   if (activeLine === maxLine) handleReset();
                   setIsPlaying(!isPlaying);
                 }}
                 disabled={isWaitingInput}
                 className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-colors ${isPlaying ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-brand-500/10 text-brand-400 hover:bg-brand-500/20'} disabled:opacity-50 disabled:cursor-not-allowed`}
               >
                 <Play size={12} className={isPlaying ? 'hidden' : 'block'} />
                 {isPlaying ? 'Pausar' : 'Ejecutar'}
               </button>
             </div>
          </div>
          <div className="p-4 font-mono text-[13px] text-slate-300 overflow-x-auto">
            {codeLines.map((line, idx) => {
              const lineNumber = idx + 1;
              const isActive = activeLine === lineNumber;
              return (
                <div 
                  key={idx} 
                  className={`flex gap-4 px-2 py-0.5 transition-colors rounded-sm ${isActive ? 'bg-brand-500/20 text-white border-l-2 border-brand-400' : 'border-l-2 border-transparent text-slate-400'}`}
                >
                  <span className="text-slate-600 select-none w-4 text-right flex-shrink-0">{lineNumber}</span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Memory Panel (Right) */}
        <div className="flex-1 bg-slate-900 flex flex-col min-h-[200px]">
          <div className="bg-slate-800/80 px-4 py-2 flex items-center gap-2 border-b border-slate-700 text-brand-300">
            <Box size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Memoria (RAM)</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {memory.map((v, idx) => {
               // Check if it was mutated in the current line
               const isMutated = steps.some(s => s.line === activeLine && (s.type === 'assign' || s.type === 'read') && s.variable === v.name);

               return (
                 <div key={idx} className={`p-3 rounded-lg border transition-all duration-300 ${isMutated ? 'border-amber-400 bg-amber-500/10' : 'border-slate-700 bg-slate-800/50'}`}>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{v.name}</div>
                   <div className="font-mono text-sm text-brand-100 px-2 py-1 bg-slate-900 rounded border border-slate-700 min-h-[30px] flex items-center">
                     {v.value !== null ? (typeof v.value === 'string' ? `"${v.value}"` : v.value) : <span className="text-slate-600 italic">vacío</span>}
                   </div>
                 </div>
               )
            })}
          </div>
        </div>
      </div>

      {/* Bottom row: Interactive Console */}
      <div className="flex-1 bg-[#0c0c0c] flex flex-col min-h-[200px]">
        <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
          <TerminalSquare size={14} className="text-slate-400" />
          <span className="text-xs font-mono text-slate-500">Terminal Interactiva</span>
        </div>
        <div className="p-4 font-mono text-sm flex-1 overflow-y-auto">
          {consoleHistory.map((item, idx) => (
             <div key={idx} className={`animate-fade-in ${item.type === 'out' ? 'text-green-400' : 'text-amber-400'}`}>
               {item.type === 'out' ? '> ' : '  '}{item.text}
             </div>
          ))}
          {isWaitingInput && (
            <form onSubmit={handleInputSubmit} className="flex gap-2 items-center mt-2 animate-fade-in">
              <span className="text-amber-400">&gt; </span>
              <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="bg-transparent border-none outline-none text-amber-400 font-mono w-full"
                placeholder={`Introduce un valor para '${currentReadVar}'...`}
              />
            </form>
          )}
          {!isWaitingInput && activeLine !== null && activeLine < maxLine && (
            <div className="animate-pulse inline-block w-2 h-4 bg-green-400 mt-1"></div>
          )}
        </div>
      </div>
      
    </div>
  );
};
