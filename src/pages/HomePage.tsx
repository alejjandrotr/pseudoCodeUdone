import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Settings, 
  Repeat, 
  Boxes, 
  Database,
  ChevronRight,
  FileText,
  Users,
  UploadCloud
} from 'lucide-react';
import { Section, Header, Footer } from '../components/layout/Layout';
import { CodeBlock } from '../components/common/DisplayComponents';
import { Button } from '../components/common/Button';
import { ArticleSidebar } from '../components/cantera/ArticleSidebar';
import { ArticleView } from '../components/cantera/ArticleView';
import { fundamentosArticles } from '../core/data/fundamentosData';
import { Article } from '../core/types/article';

interface HomePageProps {
  onNavigate: (view: 'acciones_basicas' | 'ejercicios_secuenciacion' | 'professors' | 'custom_exercise' | 'flow_demo') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <Header 
        onNavigate={onNavigate} 
        showButtons={!activeArticle} 
      />

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-28 md:pb-24 relative z-10 flex-grow flex flex-col md:flex-row gap-6 w-full">
        {/* Sidebar */}
        <ArticleSidebar
          articles={fundamentosArticles}
          activeArticle={activeArticle}
          onSelect={setActiveArticle}
        />

        {/* Main content area */}
        <main className="flex-1 min-w-0">
          {activeArticle ? (
            <ArticleView
              article={activeArticle}
              onBack={() => setActiveArticle(null)}
            />
          ) : (
            <>
              <Section title="1. Formato General de un Algoritmo" icon={BookOpen}>
                <p className="mb-4">Todo algoritmo debe seguir una estructura base para asegurar claridad y orden en su ejecución.</p>
                <CodeBlock code={`Algoritmo Nombre_Del_Problema\n   Declaración \n  Constantes:\n    Nombre_Constante = Valor\n  Tipos:\n    Nombre_Tipo = Tipo de dato\n  Variables:\n    Nombre_Variable: Tipo de dato (o Nombre_Tipo)\n\nInicio\n  // Aquí van las acciones que conforman el algoritmo\nFin`} />
              </Section>

              <Section title="2. Acciones Básicas" icon={Terminal}>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <h3 className="text-lg font-bold text-brand-300 mb-2">Asignación</h3>
                    <p className="text-sm text-slate-400 mb-3">Asigna una expresión a una variable.</p>
                    <CodeBlock code={`Variable <- Expresión`} />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <h3 className="text-lg font-bold text-brand-300 mb-2">Lectura</h3>
                    <p className="text-sm text-slate-400 mb-3">Obtiene entrada del usuario.</p>
                    <CodeBlock code={`Leer Nombre_Variable`} />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <h3 className="text-lg font-bold text-brand-300 mb-2">Escritura</h3>
                    <p className="text-sm text-slate-400 mb-3">Muestra salida con texto y variables.</p>
                    <CodeBlock code={`Escribir 'Texto', Var`} />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="ghost" 
                    icon={ChevronRight} 
                    onClick={() => onNavigate('acciones_basicas')}
                  >
                    Ver más a fondo
                  </Button>
                </div>
              </Section>

              <Section title="3. Estructuras de Control" icon={Settings}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-200 mb-3">Selección Simple y Doble</h3>
                    <CodeBlock code={`Si Expresión Condicional Entonces\n  // Acciones si verdadero\nSino\n  // Acciones alternativas (Opcional)\nFin Si`} />
                    <div className="mt-4">
                      <Button variant="secondary" onClick={() => onNavigate('flow_demo')} icon={Terminal}>
                        Laboratorio Interactivo de Flujo (Demo)
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-200 mb-3">Selección Múltiple</h3>
                    <CodeBlock code={`Caso Nombre_Variable\n  Valor1: Acciones 1\n  Valor2: Acciones 2\n  Sino: // Acciones por defecto (Opcional)\nFin Caso`} />
                  </div>
                </div>
              </Section>

              <Section title="4. Estructuras Repetitivas" icon={Repeat}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-brand-300 mb-2">Repetir / Hasta</p>
                    <p className="text-sm text-slate-400 mb-2">Ejecuta al menos una vez hasta cumplir condición.</p>
                    <CodeBlock code={`Repetir\n  // Acciones\nHasta Expresión Condicional`} />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-300 mb-2">Mientras</p>
                    <p className="text-sm text-slate-400 mb-2">Evalúa al inicio.</p>
                    <CodeBlock code={`Mientras Condición Hacer\n  // Acciones\nFin Mientras`} />
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-semibold text-brand-300 mb-2">Para</p>
                    <p className="text-sm text-slate-400 mb-2">Iteración con contador conocido. El incremento por defecto es 1 si se omite.</p>
                    <CodeBlock code={`Para Variable <- Vi Hasta Vf [Inc | Dec valor]\n  // Acciones\nFin Para`} />
                  </div>
                </div>
              </Section>

              <Section title="5. Módulos Parametrizados" icon={Boxes}>
                <div className="space-y-6">
                  <p className="text-slate-300 leading-relaxed">
                    Los módulos permiten dividir el problema en partes más pequeñas. Utilizan parámetros que pueden ser:
                    <br/>
                    <span className="inline-block mt-2 px-3 py-1 bg-slate-800 rounded text-sm font-mono"><strong className="text-brand-300">↓</strong> Entrada</span>
                    <span className="inline-block mt-2 ml-2 px-3 py-1 bg-slate-800 rounded text-sm font-mono"><strong className="text-brand-300">↑</strong> Salida</span>
                    <span className="inline-block mt-2 ml-2 px-3 py-1 bg-slate-800 rounded text-sm font-mono"><strong className="text-brand-300">↓↑</strong> E/S</span>
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-brand-200 mb-2">Procedimientos</h3>
                      <CodeBlock code={`Procedimiento Nombre [(Parametros)]\n  // Declaraciones\nInicio\n  // Acciones\nFin Procedimiento\n\n// Invocación:\nLlamar Nombre [(Valores)]`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-200 mb-2">Funciones</h3>
                      <CodeBlock code={`Función Nombre (...): Tipo\n  // Declaraciones\nInicio\n  // Acciones que retornan valor\nFin Función\n\n// Invocación (en expresión):\nX <- Nombre(...)`} />
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="6. Estructuras de Datos" icon={Database}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-200 mb-3">Arreglos</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-800/20 rounded-lg border border-slate-700/30">
                        <p className="font-mono text-sm text-slate-300">Arreglo [Tamaño] de Tipo</p>
                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">Unidimensional (Vector) Ej: V[i]</p>
                      </div>
                      <div className="p-4 bg-slate-800/20 rounded-lg border border-slate-700/30">
                        <p className="font-mono text-sm text-slate-300">Arreglo [Filas, Columnas] de Tipo</p>
                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">Bidimensional (Matriz) Ej: M[f,c]</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-brand-200 mb-3">Registros</h3>
                      <CodeBlock code={`Registro de\n  Campo1: Tipo\n  Campo2: Tipo\nFin Registro\n\n// Acceso:\nVariable.Campo1`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-brand-200 mb-3">Archivos</h3>
                      <p className="text-sm text-slate-400 mb-2">Se declaran como: <code className="text-brand-200 font-mono">Archivo de Tipo Registro</code></p>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                        {['Conectar', 'Abrir', 'Crear', 'Leer', 'Grabar', 'Cerrar', 'Eliminar', 'Renombrar'].map(op => (
                          <span key={op} className="px-2 py-1 bg-slate-800 border border-slate-700/50 rounded text-brand-100 uppercase">{op}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};
