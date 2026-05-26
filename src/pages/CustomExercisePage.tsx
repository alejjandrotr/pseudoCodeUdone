import React, { useState } from "react";
import { ArrowLeft, Settings, Sparkles, UserCircle2, TerminalSquare, UploadCloud } from "lucide-react";
import { SettingsModal } from "../components/exercises/ExerciseComponents";
import { Button } from "../components/common/Button";
import { Console } from "../components/common/DisplayComponents";
import { evaluarPseudocodigo } from "../core/services/aiEvaluationService";
import { professorsData } from "../core/data/professorsData";
import { useSelectedProfessor } from "../core/hooks/useSelectedProfessor";

interface CustomExercisePageProps {
  onBack: () => void;
}

export const CustomExercisePage: React.FC<CustomExercisePageProps> = ({ onBack }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [enunciado, setEnunciado] = useState("");
  const [userCode, setUserCode] = useState("");
  const [selectedProfId, setSelectedProfId] = useSelectedProfessor();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [usage, setUsage] = useState<{ promptTokens: number; completionTokens: number; totalTokens: number } | undefined>(undefined);

  const selectedProfessor = professorsData.find(p => p.id === selectedProfId) || professorsData[0];

  const handleEvaluate = async () => {
    const apiKey = localStorage.getItem("gemini_api_key");
    const modelName = localStorage.getItem("gemini_model") || "gemini-2.5-flash";
    
    if (!apiKey) {
      setIsSettingsOpen(true);
      return;
    }

    if (!enunciado.trim()) {
      setConsoleOutput("ERROR: Por favor, ingresa el enunciado de tu ejercicio.");
      setUsage(undefined);
      return;
    }

    if (!userCode.trim()) {
      setConsoleOutput("ERROR: No has escrito ningún código para evaluar.");
      setUsage(undefined);
      return;
    }

    setIsEvaluating(true);
    setUsage(undefined);
    setConsoleOutput(
      `> Contactando a ${selectedProfessor.name}...\n> Analizando sintaxis de Notación...`
    );

    try {
      const response = await evaluarPseudocodigo(
        userCode,
        enunciado,
        selectedProfessor,
        apiKey,
        modelName
      );
      setConsoleOutput(response.text);
      setUsage(response.usage);
    } catch (error: any) {
      if (error.message === "API_KEY_INVALID" || error.message === "API_KEY_MISSING") {
        setConsoleOutput("ERROR CRÍTICO: La API Key guardada no es válida o expiró. Abre la configuración.");
        setIsSettingsOpen(true);
      } else {
        setConsoleOutput("ERROR CRÍTICO: Falló la conexión con el motor de IA. Intenta de nuevo más tarde.");
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Volver al menú principal
          </button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            icon={Settings} 
            onClick={() => setIsSettingsOpen(true)}
          >
            Configurar IA
          </Button>
        </div>

        <header className="mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 p-3 bg-brand-500/10 rounded-2xl text-brand-400 mb-6">
            <UploadCloud size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight leading-tight">
            Evalúa tu <span className="text-brand-400">Propio Ejercicio</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Pega aquí el enunciado de cualquier problema y tu pseudocódigo para que nuestros profesores IA lo corrijan bajo la norma UDONE.
          </p>
        </header>

        <div className="glass-panel overflow-hidden animate-slide-up group mb-4">
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-bold text-brand-300 mb-2">
                1. Enunciado del Ejercicio
              </label>
              <textarea
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                placeholder="Ejemplo: Diseñe un algoritmo que reciba dos números y devuelva la suma de ambos..."
                className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none transition-all"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-brand-300 mb-2 flex items-center gap-2">
                <TerminalSquare size={16} />
                2. Tu Solución en Pseudocódigo
              </label>
              <div className="bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
                <div className="flex justify-between items-center bg-slate-800/50 px-4 py-2 border-b border-slate-700">
                  <span className="text-xs text-slate-400 font-mono">
                    mi_solucion.uda
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {selectedProfessor.avatarUrl ? (
                        <img 
                          src={selectedProfessor.avatarUrl} 
                          alt={selectedProfessor.name} 
                          className="w-6 h-6 rounded-full object-cover border border-slate-600 shadow-sm"
                        />
                      ) : (
                        <UserCircle2 size={18} className="text-slate-400" />
                      )}
                      <select
                        value={selectedProfId}
                        onChange={(e) => setSelectedProfId(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-brand-500 transition-colors max-w-[180px] truncate hover:bg-slate-800"
                      >
                        {professorsData.map((prof) => (
                          <option key={prof.id} value={prof.id}>
                            {prof.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <span className="hidden md:inline px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-brand-400 border border-slate-700">
                      {selectedProfessor.difficultyLevel}
                    </span>
                  </div>
                </div>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Algoritmo Mi_Solucion\n  Variables:\n\nInicio\n  // Escribe tu pseudocódigo respetando las normas (<-, '', etc)\n\nFin"
                  className="w-full h-64 bg-transparent text-slate-300 font-mono text-sm p-4 outline-none resize-none focus:ring-1 focus:ring-brand-500/50"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <Button
                onClick={handleEvaluate}
                isLoading={isEvaluating}
                icon={Sparkles}
                className="min-w-[180px]"
              >
                {isEvaluating ? "Evaluando..." : `Evaluar con ${selectedProfessor.name}`}
              </Button>
            </div>

            {consoleOutput && <Console output={consoleOutput} />}

            {usage && (
              <div className="flex justify-end gap-4 text-[10px] font-mono text-slate-500 mt-2 bg-slate-900/30 p-2 rounded-lg border border-slate-800/50 animate-fade-in">
                <span>Prompt: <span className="text-slate-300">{usage.promptTokens}</span> tk</span>
                <span>Respuesta: <span className="text-slate-300">{usage.completionTokens}</span> tk</span>
                <span className="border-l border-slate-700 pl-4 font-bold text-brand-400/80">Total: {usage.totalTokens} tokens</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
