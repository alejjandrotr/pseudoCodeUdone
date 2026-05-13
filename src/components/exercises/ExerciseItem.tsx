import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronRight, TerminalSquare, Code2, Sparkles, UserCircle2 } from "lucide-react";
import { Exercise } from "../../core/types/exercise.types";
import { evaluarPseudocodigo } from "../../core/services/aiEvaluationService";
import { LanguageTab } from "./ExerciseComponents";
import { CodeBlock, Console } from "../common/DisplayComponents";
import { Button } from "../common/Button";
import { professorsData } from "../../core/data/professorsData";
import { useSelectedProfessor } from "../../core/hooks/useSelectedProfessor";

interface ExerciseItemProps extends Exercise {
  openSettings: () => void;
  solutionsLocked?: boolean;
  blockedProfessorIds?: string[];
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({
  numero,
  enunciado,
  pseudocodigo,
  c,
  typescript,
  openSettings,
  solutionsLocked = false,
  blockedProfessorIds = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"sandbox" | "pseudocodigo" | "c" | "typescript">("sandbox");

  const availableProfessors = professorsData.filter(p => !blockedProfessorIds.includes(p.id));

  // Sandbox State
  const [userCode, setUserCode] = useState("");
  const [selectedProfId, setSelectedProfId] = useSelectedProfessor();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [usage, setUsage] = useState<{ promptTokens: number; completionTokens: number; totalTokens: number; cachedTokens?: number } | undefined>(undefined);
  const [wasCached, setWasCached] = useState(false);

  const selectedProfessor = professorsData.find(p => p.id === selectedProfId) || professorsData[0];

  const handleEvaluate = async () => {
    const apiKey = localStorage.getItem("gemini_api_key");
    const modelName = localStorage.getItem("gemini_model") || "gemini-3.1-flash-lite-preview";
    if (!apiKey) {
      openSettings();
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
      setWasCached(response.cached);
    } catch (error: any) {
      if (error.message === "API_KEY_INVALID" || error.message === "API_KEY_MISSING") {
        setConsoleOutput("ERROR CRÍTICO: La API Key guardada no es válida o expiró. Abre la configuración.");
        openSettings();
      } else {
        setConsoleOutput("ERROR CRÍTICO: Falló la conexión con el motor de IA. Intenta de nuevo más tarde.");
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="glass-panel overflow-hidden transition-all duration-300 hover:border-slate-700 animate-slide-up group mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 p-5 md:p-6 bg-slate-800/20 hover:bg-slate-800/40 transition-colors text-left"
      >
        <div className="flex-shrink-0 mt-1 p-2 bg-brand-500/10 rounded-lg text-brand-400 group-hover:bg-brand-500/20 transition-all">
          <CheckCircle2 size={24} />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-slate-100 mb-2">
            Ejercicio {numero}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed pr-6 whitespace-normal break-words">
            {enunciado}
          </p>
        </div>
        <div className="flex-shrink-0 text-slate-500 group-hover:text-brand-400 transition-colors mt-1">
          {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-0 border-t border-slate-800/50 bg-slate-900/30">
          <div className="flex items-center justify-between border-b border-slate-800/50 bg-slate-900/80 px-4">
            <div className="flex">
              <LanguageTab
                label="Intentarlo Yo Mismo"
                icon={TerminalSquare}
                active={activeTab === "sandbox"}
                onClick={() => setActiveTab("sandbox")}
              />
              <LanguageTab
                label="Ver Solución Oficial"
                icon={Code2}
                active={activeTab !== "sandbox"}
                onClick={() => setActiveTab("pseudocodigo")}
              />
            </div>
          </div>

          <div className="p-6 pt-4">
            {activeTab === "sandbox" && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
                  <div className="flex justify-between items-center bg-slate-800/50 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs text-slate-400 font-mono">
                      tu_solucion.uda
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
                          {availableProfessors.map((prof) => (
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
                    className="w-full h-48 bg-transparent text-slate-300 font-mono text-sm p-4 outline-none resize-none focus:ring-1 focus:ring-brand-500/50"
                    spellCheck={false}
                  />
                </div>

                {blockedProfessorIds.includes(selectedProfId) && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs flex items-center gap-2">
                    <Sparkles size={16} />
                    <span>{selectedProfessor.name} no está disponible para este ejercicio avanzado. Por favor, selecciona un mentor de mayor nivel (50% ayuda o menos).</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={handleEvaluate}
                    isLoading={isEvaluating}
                    disabled={blockedProfessorIds.includes(selectedProfId)}
                    icon={Sparkles}
                    className="min-w-[180px]"
                  >
                    {isEvaluating ? "Evaluando..." : `Evaluar con ${selectedProfessor.name}`}
                  </Button>
                </div>

                {consoleOutput && <Console output={consoleOutput} />}
                
                {usage && (
                  <div className="flex flex-wrap justify-end gap-3 text-[10px] font-mono text-slate-500 mt-2 bg-slate-900/30 p-2 rounded-lg border border-slate-800/50 animate-fade-in">
                    {wasCached && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        ⚡ Caché
                      </span>
                    )}
                    <span>Prompt: <span className="text-slate-300">{usage.promptTokens}</span> tk</span>
                    {usage.cachedTokens !== undefined && usage.cachedTokens > 0 && (
                      <span>Cacheados: <span className="text-emerald-400">{usage.cachedTokens}</span> tk</span>
                    )}
                    <span>Respuesta: <span className="text-slate-300">{usage.completionTokens}</span> tk</span>
                    <span className="border-l border-slate-700 pl-3 font-bold text-brand-400/80">Total: {usage.totalTokens} tokens</span>
                  </div>
                )}
              </div>
            )}

            {activeTab !== "sandbox" && (
              <div className="animate-fade-in">
                {solutionsLocked ? (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-8 text-center space-y-4">
                    <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-amber-400">
                      <Code2 size={32} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-amber-200">Solución bloqueada</h4>
                      <p className="text-amber-200/60 max-w-md mx-auto">
                        Las soluciones oficiales para este reto estarán disponibles a partir del próximo lunes. ¡Intenta resolverlo por tu cuenta primero!
                      </p>
                    </div>
                    <Button 
                      variant="secondary" 
                      onClick={() => setActiveTab("sandbox")}
                      className="mt-4"
                    >
                      Volver al Editor
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex border-b border-slate-800/50 mb-4 pb-2">
                      <LanguageTab
                        label="Pseudocódigo"
                        active={activeTab === "pseudocodigo"}
                        onClick={() => setActiveTab("pseudocodigo")}
                      />
                      <LanguageTab
                        label="Lenguaje C"
                        active={activeTab === "c"}
                        onClick={() => setActiveTab("c")}
                      />
                      <LanguageTab
                        label="TypeScript"
                        active={activeTab === "typescript"}
                        onClick={() => setActiveTab("typescript")}
                      />
                    </div>
                    {activeTab === "pseudocodigo" && <CodeBlock code={pseudocodigo} />}
                    {activeTab === "c" && <CodeBlock code={c} />}
                    {activeTab === "typescript" && <CodeBlock code={typescript} />}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
