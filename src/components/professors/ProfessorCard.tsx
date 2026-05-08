import React from 'react';
import { UserCircle2, ShieldAlert, GraduationCap, Scale, MessageSquareWarning, UserX } from 'lucide-react';
import { Professor } from '../../core/types/professor.types';

// Un pequeño helper para asignar iconos según el ID del profesor o su dificultad
const getProfessorIcon = (id: string) => {
  switch (id) {
    case 'prof_mentor': return <GraduationCap size={48} className="text-emerald-400" />;
    case 'prof_guia': return <Scale size={48} className="text-blue-400" />;
    case 'prof_conceptual': return <MessageSquareWarning size={48} className="text-indigo-400" />;
    case 'prof_estricto': return <ShieldAlert size={48} className="text-orange-400" />;
    case 'prof_implacable': return <UserX size={48} className="text-red-400" />;
    default: return <UserCircle2 size={48} className="text-brand-400" />;
  }
};

export const ProfessorCard: React.FC<{ professor: Professor }> = ({ professor }) => {
  return (
    <div className="glass-panel overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-300 animate-slide-up group">
      {/* Banner / Full Image */}
      {professor.fullImageUrl && (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={professor.fullImageUrl} 
            alt={`${professor.name} full profile`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <div className="flex-shrink-0 p-1 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
              {professor.avatarUrl ? (
                <img 
                  src={professor.avatarUrl} 
                  alt={professor.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                />
              ) : (
                <div className="p-4">{getProfessorIcon(professor.id)}</div>
              )}
            </div>
            <div className="mb-2">
              <h3 className="text-3xl font-bold text-slate-100 drop-shadow-md">{professor.name}</h3>
              <span className="inline-flex px-3 py-1 bg-brand-500/20 border border-brand-500/30 rounded-full text-[10px] font-mono text-brand-400 uppercase tracking-widest backdrop-blur-sm">
                Nivel: {professor.difficultyLevel}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 pt-4">
        {!professor.fullImageUrl && (
          <div className="flex flex-col md:flex-row gap-6 items-start mb-4">
            <div className="flex-shrink-0 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 group-hover:scale-105 group-hover:bg-slate-800 transition-all duration-300">
              {professor.avatarUrl ? (
                <img 
                  src={professor.avatarUrl} 
                  alt={professor.name} 
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                getProfessorIcon(professor.id)
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                <h3 className="text-2xl font-bold text-slate-100">{professor.name}</h3>
                <span className="inline-flex px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs font-mono text-slate-300 whitespace-nowrap">
                  Nivel: <span className="text-brand-400 ml-1">{professor.difficultyLevel}</span>
                </span>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-3xl">
          {professor.shortStory}
        </p>

        <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800/50 relative overflow-hidden group-hover:border-brand-500/30 transition-colors">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-500/50"></div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Comportamiento en Sandbox</p>
          </div>
          <p className="text-base text-slate-300 italic font-serif leading-snug">"{professor.promptBehavior}"</p>
        </div>
      </div>
    </div>
  );
};
