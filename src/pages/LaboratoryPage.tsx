import React, { Suspense } from 'react';
import { ArrowLeft, Code2 } from 'lucide-react';

// Lazy load del componente pesado del editor
const CodeEvaluator = React.lazy(() => import('../components/evaluator/CodeEvaluator'));

interface LaboratoryPageProps {
  onBack: () => void;
}

export const LaboratoryPage: React.FC<LaboratoryPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-6 border-b border-gray-800 pb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Code2 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Laboratorio de Código</h1>
              <p className="text-gray-400 mt-1">Entorno de evaluación en tiempo real (Fase 2: TS/JS y C++)</p>
            </div>
          </div>
        </div>

        {/* Content with Suspense */}
        <div className="mt-8">
          <Suspense 
            fallback={
              <div className="flex flex-col items-center justify-center h-[70vh] border border-gray-800 rounded-lg bg-gray-800/50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400 font-medium">Cargando el entorno de evaluación...</p>
              </div>
            }
          >
            <CodeEvaluator />
          </Suspense>
        </div>

      </div>
    </div>
  );
};
