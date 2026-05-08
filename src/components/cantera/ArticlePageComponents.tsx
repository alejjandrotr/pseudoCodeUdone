import React, { ReactNode } from 'react';
import { CodeBlock } from '../common/DisplayComponents';

export { CodeBlock };

// ── Typography ──────────────────────────────────────────────
export const P: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`text-slate-300 leading-relaxed mb-5 text-lg ${className}`}>{children}</p>
);

export const InlineCode: React.FC<{ children: ReactNode }> = ({ children }) => (
  <code className="font-mono text-base bg-slate-900 text-brand-200 px-1.5 py-0.5 rounded border border-slate-800">
    {children}
  </code>
);

export const Strong: React.FC<{ children: ReactNode }> = ({ children }) => (
  <strong className="font-semibold text-slate-100">{children}</strong>
);

// ── Layout ──────────────────────────────────────────────────
export const PageSection: React.FC<{ title: string; children: ReactNode; className?: string }> = ({
  title,
  children,
  className = '',
}) => (
  <section className={`mb-10 ${className}`}>
    <h2 className="text-2xl font-bold text-brand-200 mb-4 pb-2 border-b border-slate-800/60">
      {title}
    </h2>
    {children}
  </section>
);

export const PageSubSection: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-brand-300 mb-3">{title}</h3>
    {children}
  </div>
);

// ── Lists ───────────────────────────────────────────────────
export const UL: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ul className="space-y-2 mb-4">{children}</ul>
);

export const OL: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ol className="space-y-2 mb-4 pl-1">{children}</ol>
);

export const DefItem: React.FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <li className="flex gap-3 items-start">
    <span className="text-brand-400 mt-1.5 flex-shrink-0 text-lg">›</span>
    <span className="text-slate-300 leading-relaxed text-lg">
      <strong className="text-slate-100 font-semibold">{label}:</strong>{' '}
      {children}
    </span>
  </li>
);

export const ListItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <li className="flex gap-3 items-start">
    <span className="text-brand-400 mt-2 flex-shrink-0 text-sm">●</span>
    <span className="text-slate-300 leading-relaxed text-lg">{children}</span>
  </li>
);

export const NumberedItem: React.FC<{ n: number; label: string; children: ReactNode }> = ({
  n,
  label,
  children,
}) => (
  <li className="flex gap-3 items-start">
    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-sm font-bold flex items-center justify-center mt-0.5">
      {n}
    </span>
    <div className="text-slate-300 leading-relaxed text-lg">
      <strong className="text-slate-100 font-semibold">{label}</strong>
      {children && <span className="text-slate-400"> — {children}</span>}
    </div>
  </li>
);

// ── Callouts ─────────────────────────────────────────────────
export const Callout: React.FC<{
  children: ReactNode;
  variant?: 'info' | 'tip' | 'warning' | 'exam';
}> = ({ children, variant = 'info' }) => {
  const styles: Record<string, string> = {
    info: 'border-brand-500/40 bg-brand-500/5 text-slate-300',
    tip: 'border-emerald-500/40 bg-emerald-500/5 text-slate-300',
    warning: 'border-amber-500/40 bg-amber-500/5 text-slate-300',
    exam: 'border-violet-500/40 bg-violet-500/5 text-slate-300',
  };
  const icons: Record<string, string> = {
    info: '💡',
    tip: '✅',
    warning: '⚠️',
    exam: '📝',
  };
  return (
    <div
      className={`border-l-4 pl-4 py-3 pr-4 my-5 rounded-r-xl text-base leading-relaxed ${styles[variant]}`}
    >
      <span className="mr-2">{icons[variant]}</span>
      {children}
    </div>
  );
};

// ── Format Display ────────────────────────────────────────────
export const FormatRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center gap-3 my-2 flex-wrap">
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <code className="font-mono text-sm bg-slate-900 text-brand-100 px-3 py-1 rounded-lg border border-slate-800">
      {value}
    </code>
  </div>
);

// ── YouTube Embed ─────────────────────────────────────────────
export const YouTubeEmbed: React.FC<{ videoId: string; title: string }> = ({ videoId, title }) => (
  <div className="my-6 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
    <div className="bg-slate-900/90 px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2 border-b border-slate-800">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
      <span>📽️</span>
      <span className="font-medium">{title}</span>
    </div>
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  </div>
);

// ── Data Table ────────────────────────────────────────────────
interface TableRow {
  tipo: string;
  descripcion: ReactNode;
  ejemplo: ReactNode;
  accent?: string;
}

export const DataTypesTable: React.FC<{ rows: TableRow[] }> = ({ rows }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-700/50 my-6">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-800/60 text-slate-400 text-xs uppercase tracking-wider">
          <th className="text-left px-5 py-4">Tipo de Dato</th>
          <th className="text-left px-5 py-4">Descripción</th>
          <th className="text-left px-5 py-4">Ejemplo</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-t border-slate-800/50 hover:bg-slate-800/20 transition-colors"
          >
            <td className="px-5 py-4">
              <span
                className={`font-bold font-mono text-base ${row.accent ?? 'text-brand-300'}`}
              >
                {row.tipo}
              </span>
            </td>
            <td className="px-5 py-4 text-slate-300 text-base">{row.descripcion}</td>
            <td className="px-5 py-4 font-mono text-sm text-brand-100">{row.ejemplo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Operator Badges ────────────────────────────────────────────
export const OperatorBadge: React.FC<{ op: string; label?: string }> = ({ op, label }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm text-brand-200">
    <span className="text-brand-400 font-bold">{op}</span>
    {label && <span className="text-slate-500 text-xs">({label})</span>}
  </span>
);
