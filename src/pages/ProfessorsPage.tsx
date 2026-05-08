import React from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import { professorsData } from '../core/data/professorsData';
import { ProfessorCard } from '../components/professors/ProfessorCard';

interface ProfessorsPageProps {
  onBack: () => void;
}

export const ProfessorsPage: React.FC<ProfessorsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al esquema principal
        </button>

        <header className="mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 p-3 bg-brand-500/10 rounded-2xl text-brand-400 mb-6">
            <Users size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
            Conoce a tus <span className="text-brand-400">Profesores</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Cada profesor tiene una forma única de evaluar tu código en el Sandbox. Algunos te guiarán paso a paso, mientras que otros serán implacables con tus errores. Elige sabiamente.
          </p>
        </header>

        <div className="space-y-6">
          {professorsData.map((professor, index) => (
            <div key={professor.id} style={{ animationDelay: `${index * 100}ms` }}>
              <ProfessorCard professor={professor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
