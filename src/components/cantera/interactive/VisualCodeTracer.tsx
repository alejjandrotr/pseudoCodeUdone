import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export interface CodeStep {
  line: number;
  output: string;
}

interface VisualCodeTracerProps {
  code: string;
  steps: CodeStep[];
}

export const VisualCodeTracer: React.FC<VisualCodeTracerProps> = ({ code, steps }) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxLine]);

  // Compute console output up to activeLine
  const currentOutput = steps
    .filter((step) => activeLine !== null && step.line <= activeLine)
    .map((step) => step.output);

  return (
    <div className="flex flex-col md:flex-row gap-0 md:gap-px my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-700/50 shadow-2xl">
      {/* Console Panel (Left) */}
      <div className="flex-1 bg-[#0c0c0c] flex flex-col min-h-[250px] md:max-w-[50%]">
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="ml-2 text-xs font-mono text-slate-500">Terminal</span>
          </div>
          <button 
             onClick={() => { setActiveLine(null); setIsPlaying(false); }}
             className="text-slate-500 hover:text-slate-300 transition-colors"
             title="Reiniciar"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="p-4 font-mono text-sm text-green-400 flex-1 overflow-y-auto">
          {currentOutput.map((out, idx) => (
             <div key={idx} className="animate-fade-in">&gt; {out}</div>
          ))}
          <div className="animate-pulse inline-block w-2 h-4 bg-green-400 mt-1"></div>
        </div>
      </div>

      {/* Code Panel (Right) */}
      <div className="flex-1 flex flex-col min-h-[250px] bg-slate-900">
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
           <span className="text-xs font-mono text-slate-400">pseudocodigo.udone</span>
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
  );
};
