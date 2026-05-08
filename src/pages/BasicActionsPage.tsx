import React from 'react';
import { ArrowLeft, Terminal, Monitor, Keyboard, ArrowRightLeft } from 'lucide-react';
import { CodeBlock } from '../components/common/DisplayComponents';

interface BasicActionsPageProps {
  onBack: () => void;
}

export const BasicActionsPage: React.FC<BasicActionsPageProps> = ({ onBack }) => {
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
            <Terminal size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
            Profundizando en <span className="text-brand-400">Acciones Básicas</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Las acciones básicas son las operaciones fundamentales que permiten a un algoritmo interactuar con los datos y el usuario: asignar valores, mostrar resultados y leer entradas.
          </p>
        </header>

        <div className="space-y-12">
          {/* Asignación */}
          <section className="glass-panel p-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <ArrowRightLeft size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-200">1. Asignación</h2>
            </div>
            <div className="text-slate-300 space-y-4 leading-relaxed">
              <p>
                La asignación es un proceso destructivo: cuando se le asigna un nuevo valor a una variable, el valor anterior se destruye por completo y se reemplaza por el nuevo.
              </p>
              <p>
                En nuestro pseudocódigo, es <strong className="text-brand-300">muy importante</strong> utilizar el símbolo de flecha hacia la izquierda (<code className="text-brand-200 bg-slate-800 px-1 rounded">&lt;-</code>). <strong>No utilizamos el signo igual</strong> (<code>=</code>) para asignar.
              </p>
              
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 mt-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Ejemplos de Asignación</h3>
                <CodeBlock code={`// Asignando un valor numérico directo\ncontador <- 0\n\n// Asignando el resultado de una expresión aritmética\nsuma <- valor1 + valor2\n\n// Asignando un carácter (siempre entre apóstrofes)\nletra <- 'A'\n\n// Incrementando una variable (el valor anterior de contador se destruye)\ncontador <- contador + 1`} />
              </div>
            </div>
          </section>

          {/* Escritura */}
          <section className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Monitor size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-200">2. Escritura</h2>
            </div>
            <div className="text-slate-300 space-y-4 leading-relaxed">
              <p>
                La instrucción <code className="text-brand-200 bg-slate-800 px-1 rounded">Escribir</code> permite mostrar información en pantalla.
              </p>
              <p>
                Una regla vital es que los mensajes de texto siempre deben ir encerrados entre <strong>comillas dobles</strong> (<code className="text-brand-200 bg-slate-800 px-1 rounded">" "</code>), no apóstrofes (estos son solo para caracteres individuales).
              </p>

              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 mt-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Formas de Escribir</h3>
                <CodeBlock code={`// 1. Un mensaje normal sin variables\nEscribir "Bienvenidos al sistema"\n\n// 2. Escribiendo solo el valor almacenado en una variable\nEscribir resultado\n\n// 3. Combinando texto y variables (separados por coma)\nEscribir "El resultado de la suma es: ", resultado\nEscribir "El usuario ", nombre, " tiene ", edad, " años"`} />
              </div>
            </div>
          </section>

          {/* Lectura */}
          <section className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Keyboard size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-200">3. Lectura</h2>
            </div>
            <div className="text-slate-300 space-y-4 leading-relaxed">
              <p>
                La instrucción <code className="text-brand-200 bg-slate-800 px-1 rounded">Leer</code> sirve para recibir información ingresada por el usuario.
              </p>
              <p>
                Su uso es simple: palabra <code className="text-brand-200 bg-slate-800 px-1 rounded">Leer</code> seguida del nombre de la variable.
              </p>

              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 mt-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Interacción Completa</h3>
                <CodeBlock code={`Inicio\n  // 1. Solicitamos el dato (Escritura)\n  Escribir "Por favor, ingrese su año de nacimiento:"\n  \n  // 2. Obtenemos el dato y lo guardamos (Lectura)\n  Leer ano_nacimiento\n  \n  // 3. Calculamos la edad actual (Asignación)\n  edad <- 2026 - ano_nacimiento\n  \n  // 4. Mostramos el resultado (Escritura combinada)\n  Escribir "Usted tiene aproximadamente ", edad, " años."\nFin`} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
