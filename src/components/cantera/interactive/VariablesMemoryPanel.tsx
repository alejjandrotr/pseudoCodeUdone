import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Box, TerminalSquare } from 'lucide-react';

export interface VariableState {
  name: string;
  value: string | number | null;
  type?: 'string' | 'number' | 'boolean';
}

export interface MemoryStep {
  line: number;
  variables: Record<string, string | number | null>;
  output?: string;
}

interface VariablesMemoryPanelProps {
  code: string;
  steps: MemoryStep[];
  initialVariables: VariableState[];
}

export const VariablesMemoryPanel: React.FC<VariablesMemoryPanelProps> = ({ code, steps, initialVariables }) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customInitials, setCustomInitials] = useState<Record<string, string | number | null>>({});

  const codeLines = code.trim().split('\n');
  const maxLine = codeLines.length;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
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
  }, [isPlaying, maxLine]);

  // Compute current variables state
  const currentVariables = [...initialVariables].map(v => ({...v}));
  
  // Apply custom initials
  currentVariables.forEach(v => {
    if (customInitials[v.name] !== undefined) {
      v.value = customInitials[v.name];
    }
  });

  // Apply steps up to activeLine
  const pastSteps = steps.filter((step) => activeLine !== null && step.line <= activeLine);
  pastSteps.forEach(step => {
    Object.entries(step.variables).forEach(([name, val]) => {
      const v = currentVariables.find(cv => cv.name === name);
      if (v) v.value = val;
    });
  });

  // Compute console history
  const consoleHistory = pastSteps
    .filter(s => s.output !== undefined)
    .map(s => s.output!);

  const handleCustomChange = (name: string, value: string) => {
    const parsedValue = isNaN(Number(value)) || value === '' ? value : Number(value);
    setCustomInitials(prev => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <div className="flex flex-col gap-0 md:gap-px my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-700/50 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-0 md:gap-px">
        {/* Memory Panel (Left) */}
        <div className="flex-1 bg-slate-900 flex flex-col min-h-[250px] md:max-w-[40%]">
          <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2 text-brand-300">
              <Box size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Memoria (RAM)</span>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {currentVariables.map((v, idx) => {
               const justMutated = pastSteps.length > 0 && pastSteps[pastSteps.length - 1].variables[v.name] !== undefined;
               
               return (
                 <div key={idx} className={`relative p-3 rounded-lg border transition-all duration-500 ${justMutated ? 'border-brand-400 bg-brand-500/10 scale-[1.02]' : 'border-slate-700 bg-slate-800/50'}`}>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{v.name}</div>
                   {activeLine === null ? (
                     <input 
                       type="text" 
                       className="bg-slate-900 border border-slate-600 text-brand-100 px-2 py-1 rounded text-sm w-full font-mono outline-none focus:border-brand-500 transition-colors"
                       placeholder={v.value !== null ? String(v.value) : 'vacío'}
                       value={customInitials[v.name] !== undefined ? String(customInitials[v.name]) : (v.value !== null ? String(v.value) : '')}
                       onChange={(e) => handleCustomChange(v.name, e.target.value)}
                       title="Editar valor inicial"
                     />
                   ) : (
                     <div className="font-mono text-sm text-brand-100 px-2 py-1 bg-slate-900 rounded border border-slate-700 min-h-[30px] flex items-center">
                       {v.value !== null ? (typeof v.value === 'string' ? `"${v.value}"` : v.value) : <span className="text-slate-600 italic">vacío</span>}
                     </div>
                   )}
                 </div>
               )
            })}
          </div>
        </div>

        {/* Code Panel (Right) */}
        <div className="flex-1 flex flex-col min-h-[250px] bg-slate-900">
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
             <span className="text-xs font-mono text-slate-400">pseudocodigo.udone</span>
             <div className="flex gap-2">
               <button 
                 onClick={() => { setActiveLine(null); setIsPlaying(false); setCustomInitials({}); }}
                 className="text-slate-500 hover:text-slate-300 transition-colors px-2"
                 title="Reiniciar todo"
               >
                 <RotateCcw size={14} />
               </button>
               <button 
                 onClick={() => {
                   if (activeLine === maxLine) setActiveLine(null);
                   setIsPlaying(!isPlaying);
                 }}
                 className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-colors ${isPlaying ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-brand-500/10 text-brand-400 hover:bg-brand-500/20'}`}
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
                  onMouseEnter={() => { if(!isPlaying) setActiveLine(lineNumber) }}
                  className={`flex gap-4 px-2 py-0.5 cursor-pointer transition-colors rounded-sm ${isActive ? 'bg-brand-500/20 text-white border-l-2 border-brand-400' : 'hover:bg-slate-800/50 border-l-2 border-transparent text-slate-400'}`}
                >
                  <span className="text-slate-600 select-none w-4 text-right flex-shrink-0">{lineNumber}</span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Terminal Panel (Bottom) */}
      <div className="bg-[#0c0c0c] flex flex-col min-h-[120px] border-t border-slate-700/50">
        <div className="bg-slate-900 px-4 py-1.5 flex items-center gap-2 border-b border-slate-800">
          <TerminalSquare size={12} className="text-slate-400" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Terminal de Salida</span>
        </div>
        <div className="p-4 font-mono text-sm text-green-400 flex-1 overflow-y-auto">
          {consoleHistory.map((out, idx) => (
             <div key={idx} className="animate-fade-in">&gt; {out}</div>
          ))}
          {activeLine !== null && activeLine < maxLine && (
            <div className="animate-pulse inline-block w-2 h-4 bg-green-400 mt-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

