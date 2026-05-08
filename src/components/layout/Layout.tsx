import React, { useState } from 'react';
import { LucideIcon, ChevronRight, ChevronDown, Users, UploadCloud } from 'lucide-react';
import { Button } from '../common/Button';

interface SectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass-panel mb-8 overflow-hidden transition-all duration-300 hover:border-slate-700 animate-slide-up group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-slate-800/20 hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400 group-hover:scale-110 group-hover:bg-brand-500/20 transition-all duration-300">
            <Icon size={24} />
          </div>
          <h2 className="text-2xl font-bold font-mono text-slate-100">{title}</h2>
        </div>
        <div className="text-slate-400 group-hover:text-brand-400 transition-colors">
          {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </div>
      </button>
      
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 text-slate-300 leading-relaxed border-t border-slate-800/50">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC<{ 
  onNavigate?: (view: any) => void;
  showButtons?: boolean;
}> = ({ onNavigate, showButtons }) => (
  <header className="relative py-16 px-6 max-w-5xl mx-auto text-center space-y-6 animate-fade-in z-10">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-sm text-slate-300 mb-4 hover:border-brand-500/50 transition-colors cursor-default">
      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
      Universidad de Oriente • Licenciatura en Informática
    </div>
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
      Notación para Algoritmos en <span className="text-brand-400">Pseudocódigo</span>
    </h1>
    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
      Guía de referencia estándar para la asignatura Algoritmos y Estructuras de Datos I. Núcleo Nueva Esparta.
    </p>

    {showButtons && onNavigate && (
      <div className="flex flex-wrap justify-center gap-4 pt-4 animate-slide-up">
        <Button 
          variant="secondary"
          size="sm" 
          icon={Users} 
          onClick={() => onNavigate('professors')}
          className="hover:-translate-y-0.5 transition-transform"
        >
          Profesores
        </Button>
        <Button 
          variant="primary"
          size="sm" 
          icon={UploadCloud} 
          onClick={() => onNavigate('custom_exercise')}
          className="hover:-translate-y-0.5 transition-transform bg-brand-600 hover:bg-brand-500 text-white border-none"
        >
          Sandbox (Prueba Libre)
        </Button>
      </div>
    )}
  </header>
);

export const Footer: React.FC = () => (
  <footer className="text-center py-8 text-slate-600 border-t border-slate-800/50 relative z-10 w-full mt-auto">
    <p>Universidad de Oriente • {new Date().getFullYear()}</p>
    <p className="text-sm mt-1">Generado automáticamente para propósitos educativos.</p>
  </footer>
);
