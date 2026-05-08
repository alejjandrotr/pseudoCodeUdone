import React from 'react';
import { TerminalSquare } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (
  <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto my-4 font-mono text-sm text-brand-100 shadow-inner">
    <code>{code}</code>
  </pre>
);

interface ConsoleProps {
  output: string;
}

export const Console: React.FC<ConsoleProps> = ({ output }) => (
  <div className="mt-6 bg-black border-l-4 border-brand-500 rounded-r-lg p-4 font-mono text-xs md:text-sm shadow-xl animate-slide-up">
    <div className="flex items-center gap-2 mb-3 text-slate-500 uppercase tracking-widest text-[10px]">
      <TerminalSquare size={14} /> Consola de Evaluación
    </div>
    <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
      {output}
    </pre>
  </div>
);
