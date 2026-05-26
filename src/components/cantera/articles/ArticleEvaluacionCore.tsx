import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, ChevronRight, ChevronLeft, UserCircle2, Sparkles, 
  CheckCircle2, FileText, Mail, RefreshCw, AlertCircle, 
  Calendar, Play, Send, Printer, Award, HelpCircle, XCircle,
  Boxes, Database
} from 'lucide-react';

import { PrivateExercise, ParcialConfig, UserParcialAttempt, ParcialAttemptResult } from '../../../core/types/evaluacion.types';
import { Professor } from '../../../core/types/professor.types';
import { privateExercisesDB, parcialesConfig } from '../../../core/data/evaluacionData';
import { professorsData } from '../../../core/data/professorsData';
import { evaluarParcialConsolidado } from '../../../core/services/evaluacionService';
import { analyticsService } from '../../../core/services/analyticsService';
import { Button } from '../../common/Button';
import { Console } from '../../common/DisplayComponents';
import ReactMarkdown from 'react-markdown';

// Función para barajar/generar ejercicios en base a las reglas de la base de datos
function generarEjerciciosExamen(config: ParcialConfig): PrivateExercise[] {
  if (config.tipo === 'fijo' && config.ejerciciosFijos) {
    return privateExercisesDB.filter(ex => config.ejerciciosFijos!.includes(ex.id));
  }

  if (config.tipo === 'aleatorio' && config.reglasAleatorias) {
    const seleccionados: PrivateExercise[] = [];
    
    config.reglasAleatorias.forEach(regla => {
      // Filtrar los ejercicios de esta categoría
      let candidatos = privateExercisesDB.filter(ex => ex.categoria === regla.categoria);
      if (config.soloExamenesPasados) {
        candidatos = candidatos.filter(ex => ex.id.startsWith('pe_gum') || ex.id.startsWith('pe_bat'));
      }
      if (candidatos.length === 0) return;

      // Clonar y barajar candidatos
      const barajados = [...candidatos].sort(() => Math.random() - 0.5);
      
      // Tomar la cantidad requerida
      const tomados = barajados.slice(0, regla.cantidad);
      seleccionados.push(...tomados);
    });

    // Ordenar los ejercicios por su número/id para consistencia en el examen
    return seleccionados.sort((a, b) => a.numero - b.numero);
  }

  return privateExercisesDB.slice(0, 4); // Fallback básico
}

export const ArticleEvaluacionCore: React.FC = () => {
  // ─── Local Storage Keys ───────────────────────────────────────────────────
  const STORAGE_ATTEMPT_KEY = 'udone_current_parcial_attempt';
  const STORAGE_HISTORY_KEY = 'udone_parcial_history';
  const API_KEY_STORAGE = 'gemini_api_key';

  // ─── State Management ─────────────────────────────────────────────────────
  const [gameState, setGameState] = useState<'intro' | 'exam' | 'review' | 'grading' | 'results'>('intro');
  const [selectedParcialId, setSelectedParcialId] = useState<string>(parcialesConfig[0].id);
  const [selectedProfId, setSelectedProfId] = useState<string>('prof_estricto');
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyInputOpen, setIsApiKeyInputOpen] = useState(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);

  // Examen Activo
  const [selectedExercises, setSelectedExercises] = useState<PrivateExercise[]>([]);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<{ [exerciseId: string]: string }>({});
  const [tiempos, setTiempos] = useState<{ [exerciseId: string]: number }>({});
  const [intentoNumero, setIntentoNumero] = useState<number>(1);
  const [startTime, setStartTime] = useState<string>('');

  // Resultados
  const [evaluationResult, setEvaluationResult] = useState<ParcialAttemptResult | null>(null);
  const [history, setHistory] = useState<UserParcialAttempt[]>([]);

  // ─── Refs for timer ───────────────────────────────────────────────────────
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Initialize Data ──────────────────────────────────────────────────────
  useEffect(() => {
    // Cargar historial de intentos previos
    try {
      const storedHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory) as UserParcialAttempt[];
        setHistory(parsedHistory);
        setIntentoNumero(parsedHistory.length + 1);
      }
    } catch (e) {
      console.error("Error cargando historial de parciales", e);
    }

    // Cargar API Key
    const key = localStorage.getItem(API_KEY_STORAGE) || '';
    setApiKey(key);

    // Revisar si hay un examen en progreso no entregado
    try {
      const activeAttempt = localStorage.getItem(STORAGE_ATTEMPT_KEY);
      if (activeAttempt) {
        const attempt = JSON.parse(activeAttempt) as UserParcialAttempt;
        // Restaurar estado
        setSelectedParcialId(attempt.parcialId || parcialesConfig[0].id);
        setSelectedExercises(privateExercisesDB.filter(ex => Object.keys(attempt.respuestas).includes(ex.id)));
        setRespuestas(attempt.respuestas);
        setTiempos(attempt.tiemposPorEjercicio);
        setSelectedProfId(attempt.profesorId);
        setIntentoNumero(attempt.intentoNumero);
        setStartTime(attempt.fecha);
        setGameState('exam');
      }
    } catch (e) {
      console.error("Error restaurando intento activo", e);
    }
  }, []);

  // ─── Timer Effect ─────────────────────────────────────────────────────────
  useEffect(() => {
    if ((gameState === 'exam' || gameState === 'review') && selectedExercises.length > 0) {
      const activeId = selectedExercises[activeExerciseIndex].id;

      // Iniciar intervalo de 1s
      timerRef.current = setInterval(() => {
        setTiempos(prev => {
          const updated = {
            ...prev,
            [activeId]: (prev[activeId] || 0) + 1
          };

          // Guardar en LocalStorage cada cambio (persistencia robusta de tiempos y respuestas)
          const currentAttempt: UserParcialAttempt = {
            parcialId: selectedParcialId,
            intentoNumero,
            tiempoTotalSegundos: Object.values(updated).reduce((a, b) => a + b, 0),
            tiemposPorEjercicio: updated,
            profesorId: selectedProfId,
            respuestas,
            fecha: startTime
          };
          localStorage.setItem(STORAGE_ATTEMPT_KEY, JSON.stringify(currentAttempt));

          return updated;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState, activeExerciseIndex, selectedExercises, respuestas, selectedProfId, intentoNumero, startTime, selectedParcialId]);

  // ─── Helper: Format Time (seconds to MM:SS) ───────────────────────────────
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ─── Handlers ─────────────────────────────────────────────────────────────
  
  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem(API_KEY_STORAGE, apiKey.trim());
      setIsApiKeyInputOpen(false);
    }
  };

  const handleStartExam = () => {
    const key = localStorage.getItem(API_KEY_STORAGE);
    if (!key) {
      setIsApiKeyInputOpen(true);
      return;
    }

    const parcial = parcialesConfig.find(p => p.id === selectedParcialId) || parcialesConfig[0];
    const ejercicios = generarEjerciciosExamen(parcial);
    
    // Inicializar respuestas y tiempos para cada ejercicio seleccionado
    const initRespuestas: { [id: string]: string } = {};
    const initTiempos: { [id: string]: number } = {};
    ejercicios.forEach(ex => {
      initRespuestas[ex.id] = `Algoritmo Ejercicio_${ex.numero}\nDECLARACIÓN\nVARIABLES\n  // Declarar variables aquí\nINICIO\n  // Escribir el cuerpo del pseudocódigo\nFIN`;
      initTiempos[ex.id] = 0;
    });

    const startIso = new Date().toISOString();
    
    setSelectedExercises(ejercicios);
    setRespuestas(initRespuestas);
    setTiempos(initTiempos);
    setActiveExerciseIndex(0);
    setStartTime(startIso);
    setGameState('exam');

    // Registrar en LocalStorage
    const newAttempt: UserParcialAttempt = {
      parcialId: parcial.id,
      intentoNumero,
      tiempoTotalSegundos: 0,
      tiemposPorEjercicio: initTiempos,
      profesorId: selectedProfId,
      respuestas: initRespuestas,
      fecha: startIso
    };
    localStorage.setItem(STORAGE_ATTEMPT_KEY, JSON.stringify(newAttempt));

    // Registrar inicio en analíticas
    analyticsService.trackPageView(`Exam_Started_${parcial.id}_Intento_${intentoNumero}`);
  };

  const handleAnswerChange = (val: string) => {
    const activeId = selectedExercises[activeExerciseIndex].id;
    const updated = {
      ...respuestas,
      [activeId]: val
    };
    setRespuestas(updated);

    // Actualizar localStorage
    const activeAttempt = localStorage.getItem(STORAGE_ATTEMPT_KEY);
    if (activeAttempt) {
      const parsed = JSON.parse(activeAttempt) as UserParcialAttempt;
      parsed.respuestas = updated;
      localStorage.setItem(STORAGE_ATTEMPT_KEY, JSON.stringify(parsed));
    }
  };

  const handleSubmitExam = async () => {
    const key = localStorage.getItem(API_KEY_STORAGE);
    if (!key) {
      alert("Falta la API Key de Gemini para calificar. Configúrala en la pantalla inicial.");
      setGameState('intro');
      return;
    }

    // Cambiar estado a Calificando (grading)
    setGameState('grading');

    const totalSeconds = Object.values(tiempos).reduce((a, b) => a + b, 0);
    const activeProfessor = professorsData.find(p => p.id === selectedProfId) || professorsData[0];

    try {
      const result = await evaluarParcialConsolidado({
        parcialId: selectedParcialId,
        professor: activeProfessor,
        ejercicios: selectedExercises,
        respuestas: respuestas
      }, key);

      setEvaluationResult(result);

      // Guardar intento completado en el historial
      const completedAttempt: UserParcialAttempt = {
        parcialId: selectedParcialId,
        intentoNumero,
        tiempoTotalSegundos: totalSeconds,
        tiemposPorEjercicio: tiempos,
        profesorId: selectedProfId,
        respuestas,
        fecha: startTime,
        resultado: result
      };

      const updatedHistory = [completedAttempt, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updatedHistory));
      
      // Limpiar intento actual activo
      localStorage.removeItem(STORAGE_ATTEMPT_KEY);
      setIntentoNumero(updatedHistory.length + 1);

      // Enviar analíticas y telemetría avanzada de errores
      const listaErroresSet = new Set<string>();
      Object.values(result.desgloseEjercicios).forEach(ex => {
        ex.erroresComunes.forEach(err => listaErroresSet.add(err));
      });

      // Registrar resultado final en telemetría de Google Sheets
      await analyticsService.trackParcialResult(
        selectedParcialId,
        intentoNumero,
        result.notaTotal,
        totalSeconds,
        Array.from(listaErroresSet)
      );

      setGameState('results');

    } catch (error) {
      console.error("Error calificando parcial", error);
      alert("Hubo un error al calificar el parcial. Intenta nuevamente.");
      setGameState('exam');
    }
  };
  const handleCancelExam = () => {
    const isCancel = window.confirm("¿Deseas CANCELAR y DESCARTAR el parcial?\n\n- [Aceptar]: Borra todo el progreso de forma permanente y sale del examen.\n- [Cancelar]: Pausa el examen temporalmente conservando el progreso actual para continuarlo después.");
    if (isCancel) {
      localStorage.removeItem(STORAGE_ATTEMPT_KEY);
      setGameState('intro');
      setSelectedExercises([]);
      setRespuestas({});
      setTiempos({});
    } else {
      setGameState('intro');
    }
  };

  const handleReset = () => {
    setEvaluationResult(null);
    setSelectedExercises([]);
    setRespuestas({});
    setTiempos({});
    setGameState('intro');
  };

  const handlePrint = () => {
    window.print();
  };

  const activeProfessor = professorsData.find(p => p.id === selectedProfId) || professorsData[0];
  const totalTiempoExamen = Object.values(tiempos).reduce((a, b) => a + b, 0);
  const currentParcial = parcialesConfig.find(p => p.id === selectedParcialId) || parcialesConfig[0];

  return (
    <div className="space-y-6">
      {/* ─── CSS de Impresión Premium ─── */}
      <style>{`
        @media print {
          @page {
            margin: 1.2cm;
            size: auto;
          }
          /* Resetear TODO comportamiento de scroll u overflow en TODOS los elementos ancestros para permitir paginación */
          html, body, #root, .min-h-screen, .overflow-x-hidden, .overflow-hidden, main {
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            position: static !important;
            background: #ffffff !important;
            color: #111111 !important;
            display: block !important;
          }
          
          /* Ocultar elementos de UI interactivos */
          .no-print, button {
            display: none !important;
          }

          /* El area de impresion debe ser estatica para permitir el flujo a múltiples páginas */
          #print-area {
            position: static !important;
            width: 100% !important;
            color: #111111 !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
          
          .page-break {
            page-break-before: always !important;
            break-before: page !important;
          }
          
          .print-card {
            border: 1px solid #e2e8f0 !important;
            border-radius: 8px !important;
            padding: 16px !important;
            margin-bottom: 20px !important;
            background-color: #f8fafc !important;
            break-inside: avoid !important;
          }
          
          .print-title {
            font-size: 24px !important;
            font-weight: bold !important;
            border-bottom: 2px solid #2563eb !important;
            padding-bottom: 8px !important;
            margin-bottom: 16px !important;
            color: #1e3a8a !important;
          }
          .print-code {
            font-family: monospace !important;
            font-size: 12px !important;
            background-color: #f1f5f9 !important;
            border: 1px solid #cbd5e1 !important;
            padding: 12px !important;
            white-space: pre-wrap !important;
            border-radius: 4px !important;
            color: #0f172a !important;
            margin-top: 8px !important;
          }
          .print-badge {
            display: inline-block !important;
            padding: 4px 8px !important;
            font-size: 12px !important;
            font-weight: bold !important;
            border-radius: 4px !important;
            border: 1px solid #ccc !important;
          }
          .print-badge-aprobado {
            background-color: #dcfce7 !important;
            color: #15803d !important;
            border-color: #bbf7d0 !important;
          }
          .print-badge-reprobado {
            background-color: #fee2e2 !important;
            color: #b91c1c !important;
            border-color: #fecaca !important;
          }
        }
      `}</style>

      {/* ─── PANTALLA 1: INTRODUCCIÓN Y CONFIGURACIÓN ───────────────────────── */}
      {gameState === 'intro' && (
        <div className="space-y-8 animate-fade-in">
          {/* Selector de Examen Parcial */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
              <FileText size={20} className="text-brand-400" /> Selecciona el Examen Parcial a Presentar
            </h3>
            
            {/* Sección: Simuladores Dinámicos */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Boxes size={14} /> Simuladores Dinámicos (Aleatorios)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parcialesConfig.filter(p => p.tipo === 'aleatorio').map((parcial) => {
                  const isSelected = parcial.id === selectedParcialId;
                  const activeBorder = isSelected 
                    ? 'border-brand-500 bg-brand-500/5 shadow-lg shadow-brand-500/5' 
                    : 'bg-slate-900/30 border-slate-800 hover:border-slate-700';
                  
                  return (
                    <button
                      key={parcial.id}
                      onClick={() => setSelectedParcialId(parcial.id)}
                      className={`glass-panel p-5 text-left space-y-3 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${activeBorder} rounded-xl`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] px-2 py-0.5 bg-slate-950 rounded font-mono text-brand-400 border border-slate-800">
                            Aleatorio
                          </span>
                          {isSelected && (
                            <span className="text-xs text-brand-400 font-mono font-bold flex items-center gap-1">
                              <CheckCircle2 size={12} className="fill-slate-950 text-brand-400" /> Seleccionado
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-100 text-lg leading-tight">{parcial.titulo}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {parcial.descripcion}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sección: Modelos Fijos */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Database size={14} /> Modelos de Años Pasados (Fijos)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {parcialesConfig.filter(p => p.tipo === 'fijo').map((parcial) => {
                  const isSelected = parcial.id === selectedParcialId;
                  const activeBorder = isSelected 
                    ? 'border-brand-500 bg-brand-500/5 shadow-md shadow-brand-500/5' 
                    : 'bg-slate-900/30 border-slate-800 hover:border-slate-700';
                  
                  return (
                    <button
                      key={parcial.id}
                      onClick={() => setSelectedParcialId(parcial.id)}
                      className={`glass-panel p-4 text-left space-y-2 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${activeBorder} rounded-lg`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-200 text-sm leading-tight flex-grow pr-2">{parcial.titulo}</h4>
                        {isSelected && (
                          <CheckCircle2 size={14} className="text-brand-400 flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                        {parcial.descripcion}
                      </p>
                      <div className="text-[9px] font-mono text-slate-500 pt-1">
                        ID: {parcial.id}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ficha Académica de Examen */}
          <div className="glass-panel p-6 md:p-8 bg-slate-900/60 border border-slate-700/80 relative overflow-hidden rounded-2xl shadow-xl">
            {/* Elemento Decorativo Brillante */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono rounded-full font-bold">
                  <Award size={14} /> ID: {currentParcial.id.toUpperCase()}
                </div>
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                  {currentParcial.titulo}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  {currentParcial.descripcion}
                </p>
                {currentParcial.frase && (
                  <div className="border-l-4 border-brand-500 bg-slate-950/40 p-3 rounded-r-lg my-2 max-w-xl">
                    <p className="text-slate-300 italic text-sm font-sans leading-relaxed">
                      {currentParcial.frase}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-2">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> Fecha: Hoy</span>
                  <span className="flex items-center gap-1.5"><FileText size={14} /> Escala: 0 a 10 Puntos</span>
                  <span className="flex items-center gap-1.5"><Award size={14} /> Aprobación: &ge; 5.0</span>
                </div>
              </div>

              {/* Botón de Comenzar y Estado de Clave */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Intentos Registrados</span>
                  <div className="text-2xl font-bold text-slate-200">#{intentoNumero - 1}</div>
                </div>
                
                <Button 
                  onClick={handleStartExam} 
                  icon={Play} 
                  variant="primary" 
                  size="lg"
                  className="w-full text-base font-bold shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Iniciar Parcial #{intentoNumero}
                </Button>

                <button 
                  onClick={() => setIsApiKeyInputOpen(true)}
                  className="text-xs text-slate-400 hover:text-brand-400 underline transition-colors"
                >
                  {apiKey ? "🔑 Cambiar API Key de Gemini" : "⚠️ Configurar API Key de Gemini"}
                </button>
              </div>
            </div>
          </div>

          {/* Formulario Modal API Key Integrado */}
          {isApiKeyInputOpen && (
            <div className="glass-panel p-6 bg-slate-950/90 border border-slate-700 rounded-xl animate-scale-in">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
                <AlertCircle size={20} className="text-brand-400" /> Configurar tu API Key de Gemini
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Este simulador utiliza tu propia clave del motor de IA para realizar las correcciones y redactar las críticas de los profesores de forma totalmente gratuita y confidencial. Se almacena localmente en tu navegador.
              </p>
              <form onSubmit={handleSaveApiKey} className="flex gap-2">
                <input 
                  type="password" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Introduce tu Gemini API Key..."
                  className="flex-grow bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2 outline-none focus:border-brand-500 transition-colors"
                  required
                />
                <Button type="submit" variant="secondary">Guardar Key</Button>
                <Button type="button" variant="ghost" onClick={() => setIsApiKeyInputOpen(false)}>Cancelar</Button>
              </form>
            </div>
          )}

          {/* Selector de Profesor de IA */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
              <UserCircle2 size={20} className="text-brand-400" /> Selecciona tu Profesor Evaluador
            </h3>
            <p className="text-sm text-slate-400">
              El profesor que elijas corregirá tus 4 ejercicios al finalizar y redactará su crítica académica según su personalidad, carácter y nivel de rigurosidad.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {professorsData.map((prof) => {
                const isActive = prof.id === selectedProfId;
                
                // Color mapping for halo glows
                let glowColor = 'hover:border-slate-700';
                let activeBorder = 'border-slate-700';
                if (isActive) {
                  if (prof.id === 'prof_mentor') {
                    glowColor = 'shadow-lg shadow-emerald-500/5 border-emerald-500/80';
                    activeBorder = 'border-emerald-500/80 bg-emerald-500/5';
                  } else if (prof.id === 'prof_guia') {
                    glowColor = 'shadow-lg shadow-sky-500/5 border-sky-500/80';
                    activeBorder = 'border-sky-500/80 bg-sky-500/5';
                  } else if (prof.id === 'prof_conceptual') {
                    glowColor = 'shadow-lg shadow-amber-500/5 border-amber-500/80';
                    activeBorder = 'border-amber-500/80 bg-amber-500/5';
                  } else if (prof.id === 'prof_estricto') {
                    glowColor = 'shadow-lg shadow-orange-500/5 border-orange-500/80';
                    activeBorder = 'border-orange-500/80 bg-orange-500/5';
                  } else if (prof.id === 'prof_implacable') {
                    glowColor = 'shadow-lg shadow-rose-500/5 border-rose-500/80';
                    activeBorder = 'border-rose-500/80 bg-rose-500/5';
                  }
                }

                return (
                  <button
                    key={prof.id}
                    onClick={() => setSelectedProfId(prof.id)}
                    className={`glass-panel p-4 text-center space-y-3 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between min-h-[220px] ${isActive ? activeBorder : 'bg-slate-900/30 border-slate-800'} ${glowColor}`}
                  >
                    <div className="relative">
                      <img 
                        src={prof.avatarUrl} 
                        alt={prof.name} 
                        className={`w-16 h-16 rounded-full object-cover border-2 shadow-inner transition-transform duration-300 ${isActive ? 'scale-105 border-brand-400' : 'border-slate-700'}`}
                      />
                      {isActive && (
                        <div className="absolute -bottom-1 -right-1 bg-brand-500 text-slate-950 rounded-full p-1 border border-slate-950">
                          <CheckCircle2 size={12} className="fill-slate-950" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm">{prof.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-950 rounded font-mono text-brand-400 border border-slate-800 block">
                        {prof.difficultyLevel}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-3 text-center leading-relaxed">
                      {prof.shortStory}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Historial de Intentos Previos */}
          {history.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <FileText size={20} className="text-brand-400" /> Historial de Evaluaciones
              </h3>
              
              <div className="glass-panel overflow-hidden bg-slate-900/20 border border-slate-800/80 rounded-xl">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Intento</th>
                      <th className="px-6 py-3.5">Profesor</th>
                      <th className="px-6 py-3.5">Tiempo Total</th>
                      <th className="px-6 py-3.5">Nota Final</th>
                      <th className="px-6 py-3.5">Resultado</th>
                      <th className="px-6 py-3.5">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {history.map((attempt) => {
                      const prof = professorsData.find(p => p.id === attempt.profesorId);
                      const isAprobado = attempt.resultado ? attempt.resultado.notaTotal >= 5.0 : false;
                      return (
                        <tr key={attempt.intentoNumero} className="hover:bg-slate-800/20 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold">#{attempt.intentoNumero}</td>
                          <td className="px-6 py-4 flex items-center gap-2">
                            {prof?.avatarUrl && (
                              <img src={prof.avatarUrl} alt={prof.name} className="w-5 h-5 rounded-full object-cover border border-slate-700" />
                            )}
                            <span className="font-medium text-slate-200">{prof?.name || attempt.profesorId}</span>
                          </td>
                          <td className="px-6 py-4 font-mono text-slate-400">{formatTime(attempt.tiempoTotalSegundos)}</td>
                          <td className="px-6 py-4 font-mono font-bold">
                            <span className={isAprobado ? 'text-emerald-400' : 'text-rose-400'}>
                              {attempt.resultado ? attempt.resultado.notaTotal.toFixed(1) : 'N/D'}/10.0
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${isAprobado ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                              {isAprobado ? 'APROBADO' : 'REPROBADO'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400">
                            {new Date(attempt.fecha).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── PANTALLA 2: EXAMEN ACTIVO (MODO EXAMEN) ─────────────────────────── */}
      {gameState === 'exam' && selectedExercises.length > 0 && (
        <div className="space-y-6 animate-fade-in no-print">
          {/* Header de Examen, Barra de Navegación y Cronómetros */}
          <div className="glass-panel p-4 md:p-6 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-500/15 text-brand-400 rounded-xl border border-brand-500/20">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 leading-tight">
                  Evaluación Core: Parcial 1
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Intento #{intentoNumero} &middot; Calificando con: <strong className="text-brand-400">{activeProfessor.name}</strong>
                </span>
              </div>
            </div>

            {/* Cronómetro Global e Individual */}
            <div className="flex items-center gap-4">
              {/* Ejercicio Activo Timer */}
              <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-xl text-slate-200">
                <Timer size={16} className="text-brand-400" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Este Ejercicio</span>
                  <span className="font-mono text-sm font-bold text-slate-200">
                    {formatTime(tiempos[selectedExercises[activeExerciseIndex].id] || 0)}
                  </span>
                </div>
              </div>

              {/* Global Timer */}
              <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-xl text-slate-200">
                <Timer size={16} className="text-emerald-400" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Tiempo Total</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    {formatTime(totalTiempoExamen)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelExam}
                className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
              >
                Pausar / Salir
              </Button>
            </div>
          </div>

          {/* Barra de Tabs de los 4 Ejercicios */}
          <div className="flex flex-wrap border-b border-slate-800/80 px-2 gap-1.5">
            {selectedExercises.map((ex, index) => {
              const isActive = index === activeExerciseIndex;
              const hasCode = respuestas[ex.id]?.trim() && !respuestas[ex.id]?.includes('// Escribe tu pseudocódigo');
              const isSaved = true; // Todo cambio se autoguarda

              let tabColor = 'text-slate-400 border-transparent hover:text-slate-200';
              if (isActive) {
                tabColor = 'border-brand-500 text-brand-400 bg-brand-500/5 font-bold';
              } else if (hasCode) {
                tabColor = 'border-slate-700 text-slate-200 bg-slate-800/10';
              }

              return (
                <button
                  key={ex.id}
                  onClick={() => setActiveExerciseIndex(index)}
                  className={`flex items-center gap-2 px-5 py-3 border-b-2 font-mono text-sm transition-all duration-200 ${tabColor}`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-brand-400' : hasCode ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <span>Ejercicio {index + 1}</span>
                  <span className="text-[10px] text-slate-500 bg-slate-950/40 px-1.5 py-0.5 rounded border border-slate-800/40">
                    {ex.puntosMaximos} pts
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cuerpo Activo de Ejercicio */}
          <div className="flex flex-col gap-6">
            {/* 1. Enunciado (Arriba, ancho completo) */}
            <div className="glass-panel p-5 bg-slate-900/30 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-400">
                  Ejercicio {activeExerciseIndex + 1} de {selectedExercises.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Categoría: <strong className="text-slate-300">{selectedExercises[activeExerciseIndex].categoria}</strong>
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-100">Enunciado del Reto</h4>
              <p className="text-slate-200 text-base font-medium leading-relaxed whitespace-pre-line break-words">
                {selectedExercises[activeExerciseIndex].enunciado}
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>Puntos Máximos: <strong className="text-emerald-400">{selectedExercises[activeExerciseIndex].puntosMaximos} Puntos</strong></span>
              </div>
            </div>

            {/* 2. Editor de Código y Footer de Integridad (Ancho completo) */}
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner flex flex-col h-[400px]">
                <div className="flex justify-between items-center bg-slate-900/60 px-4 py-2.5 border-b border-slate-700">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <FileText size={14} className="text-brand-400" /> examen_ejercicio_{activeExerciseIndex + 1}.uda
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-mono font-bold animate-pulse">
                    Autoguardado
                  </span>
                </div>
                <textarea
                  value={respuestas[selectedExercises[activeExerciseIndex].id] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full flex-grow bg-transparent text-slate-300 font-mono text-sm p-4 outline-none resize-none focus:ring-0 focus:border-transparent leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Banner de Integridad como un Footer Compacto */}
              <div className="glass-panel p-4 bg-slate-950/40 border border-amber-500/10 text-slate-300 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-inner">
                {/* Glow decorativo de alerta muy sutil */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-1 max-w-3xl text-left">
                  <h5 className="text-[11px] font-bold text-amber-400 font-mono flex items-center gap-1.5">
                    <AlertCircle size={12} /> COMPROMISO DE INTEGRIDAD ACADÉMICA
                  </h5>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Evita el uso de IAs o recursos externos. Usa esta prueba como tu termómetro personal de aprendizaje. Si te trabas o tienes dudas profundas de notación, puedes consultar al docente humano de verdad.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 flex-shrink-0 self-start md:self-auto">
                  <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
                    <Mail size={12} className="text-brand-400" /> alejjandroclases@gmail.com
                  </span>
                  <a 
                    href="mailto:alejjandroclases@gmail.com?subject=Duda de Pseudocódigo - Parcial 1"
                    className="text-[10px] text-brand-400 hover:text-brand-300 font-bold underline transition-colors"
                  >
                    Enviar Duda
                  </a>
                </div>
              </div>

              {/* Botones de Navegación del Wizard y Botón de Entrega */}
              <div className="flex justify-between items-center gap-4 pt-2">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    icon={ChevronLeft}
                    onClick={() => setActiveExerciseIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeExerciseIndex === 0}
                  >
                    Anterior
                  </Button>
                  
                  {activeExerciseIndex < selectedExercises.length - 1 ? (
                    <Button
                      variant="ghost"
                      icon={ChevronRight}
                      onClick={() => setActiveExerciseIndex(prev => Math.min(selectedExercises.length - 1, prev + 1))}
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Botón de Finalizar Examen */}
                <Button
                  onClick={() => {
                    setGameState('review');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  icon={Send}
                  variant="primary"
                  className="px-6 py-2.5 font-bold shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 bg-emerald-600 hover:bg-emerald-500 border-emerald-500/20 text-slate-100"
                >
                  Revisar y Entregar Parcial
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── PANTALLA 2.5: REVISIÓN DE RESPUESTAS ────────────────────────────── */}
      {gameState === 'review' && (
        <div className="space-y-6 animate-fade-in no-print text-left">
          {/* Header de Revisión */}
          <div className="glass-panel p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-500/15 text-brand-400 rounded-xl border border-brand-500/20">
                <FileText size={22} className="text-brand-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Revisión de Respuestas · {currentParcial.titulo}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Por favor, verifica tus códigos detalladamente antes de la entrega definitiva.
                </p>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-amber-300 text-xs flex items-start gap-2.5 leading-relaxed">
              <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>¡Nota de confirmación!</strong> Estás a punto de cerrar y entregar tu examen. Una vez enviado, el motor de IA de <strong>{activeProfessor.name}</strong> procesará de forma inmutable todas tus respuestas y se generará tu calificación final. Asegúrate de que tu sintaxis cumple con la norma UDONE.
              </span>
            </div>
          </div>

          {/* Lista de Ejercicios para Revisión */}
          <div className="space-y-6">
            {selectedExercises.map((ex, index) => {
              const codigoUsuario = respuestas[ex.id] || '';
              // Verificar si el estudiante modificó el código inicial
              const esValido = codigoUsuario.trim() && 
                !codigoUsuario.includes('// Declarar variables aquí') && 
                codigoUsuario.length > 50;
              
              return (
                <div key={ex.id} className="glass-panel overflow-hidden bg-slate-900/30 border border-slate-800 rounded-xl">
                  {/* Cabecera del Ejercicio en Revisión */}
                  <div className="flex justify-between items-center bg-slate-900/60 px-5 py-3.5 border-b border-slate-800 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-200">Ejercicio {index + 1}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-950/40 px-1.5 py-0.5 rounded border border-slate-800/40">
                        {ex.puntosMaximos} pts
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${esValido ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                        {esValido ? 'COMPLETADO' : 'INCOMPLETO / VACÍO'}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setActiveExerciseIndex(index);
                          setGameState('exam');
                        }}
                        className="text-xs text-brand-400 hover:text-brand-300 font-bold underline transition-colors"
                      >
                        Modificar Código
                      </Button>
                    </div>
                  </div>

                  {/* Cuerpo del Ejercicio en Revisión */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-slate-500">Enunciado</span>
                      <p className="text-slate-200 text-sm font-medium leading-relaxed whitespace-pre-line max-w-4xl">{ex.enunciado}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-slate-500">Tu Solución Entregada</span>
                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-350 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[220px] select-all">
                        {codigoUsuario || '// No se ingresó código para este ejercicio'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel de Confirmación Final */}
          <div className="glass-panel p-6 bg-slate-900/60 border border-slate-850 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/25 flex-shrink-0">
                <CheckCircle2 size={24} className="text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-slate-200 font-bold text-sm">¿Listo para enviar tus respuestas?</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  Al hacer clic en "Entregar Definitivamente", confirmas que estás de acuerdo con tus soluciones ingresadas. Tu tiempo total de resolución fue de <strong className="text-slate-300">{formatTime(totalTiempoExamen)}</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto flex-col sm:flex-row">
              <Button
                variant="ghost"
                icon={ChevronLeft}
                onClick={() => setGameState('exam')}
                className="w-full sm:w-auto px-5 font-bold"
              >
                Regresar al Examen
              </Button>
              
              <Button
                onClick={() => {
                  if (window.confirm("¿Estás completamente seguro de entregar y finalizar tu examen? Ya no podrás editar tus respuestas.")) {
                    handleSubmitExam();
                  }
                }}
                icon={Send}
                variant="primary"
                className="w-full sm:w-auto px-6 py-2.5 font-bold bg-emerald-600 hover:bg-emerald-500 border-emerald-500/20 text-slate-100 shadow-lg shadow-emerald-500/10 animate-pulse hover:animate-none"
              >
                Entregar Definitivamente
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PANTALLA 3: CARGANDO / EVALUANDO POR LOTES ──────────────────────── */}
      {gameState === 'grading' && (
        <div className="glass-panel p-10 md:p-16 text-center space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-2xl mx-auto shadow-2xl animate-fade-in no-print">
          <div className="relative w-20 h-20 mx-auto">
            {/* Animaciones premium de carga */}
            <div className="absolute inset-0 border-4 border-brand-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-brand-500 rounded-full animate-spin" />
            <div className="absolute inset-4 bg-slate-950 rounded-full flex items-center justify-center text-brand-400">
              <Sparkles size={24} className="animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-100">
              Evaluando tu Examen...
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              El <strong>{activeProfessor.name}</strong> está examinando tus 4 soluciones secuencialmente en lote. Analizando la sintaxis UDONE y validando la coherencia lógica de tus condicionales.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-left max-w-md mx-auto space-y-1 text-slate-400 shadow-inner">
            <div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400" /> <span>Recopilando códigos fuente...</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400" /> <span>Compilando tiempos de resolución...</span></div>
            <div className="flex items-center gap-2"><RefreshCw size={12} className="text-brand-400 animate-spin" /> <span>Invocando corrección por lotes de IA...</span></div>
          </div>
        </div>
      )}

      {/* ─── PANTALLA 4: RESULTADOS (CONSOLA Y REPORTE / PDF) ───────────────── */}
      {gameState === 'results' && evaluationResult && (
        <div className="space-y-8 animate-fade-in">
          {/* BOTONES DE PANEL SUPERIOR (No-print) */}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-xl shadow-md no-print">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-slate-200">Examen calificado con éxito en base a 10 puntos</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handlePrint}
                icon={Printer}
                variant="secondary"
              >
                Exportar Reporte a PDF
              </Button>
              <Button
                onClick={handleReset}
                icon={RefreshCw}
                variant="ghost"
              >
                Volver a la Pantalla de Inicio
              </Button>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* AREA DE IMPRESIÓN OFICIAL (PRINT-AREA)                           */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <div id="print-area" className="space-y-8">
            
            {/* ENCABEZADO ACADÉMICO OFICIAL */}
            <div className="glass-panel p-6 md:p-8 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl print:bg-white print:border-none print:shadow-none">
              
              <div className="space-y-4 max-w-2xl text-left">
                <div className="no-print inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono rounded-full font-bold">
                  <Award size={14} /> RESULTADOS COMPILADOS
                </div>
                
                <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight print:text-slate-900">
                  Reporte de Rendimiento Académico
                </h1>
                
                <p className="text-slate-300 text-sm leading-relaxed print:text-slate-700">
                  Boleta oficial del <strong>Parcial 1: Estructuras Secuenciales y de Selección</strong>. Contiene la recopilación de códigos entregados, los tiempos de resolución individuales y el diagnóstico pedagógico emitido por la Inteligencia Artificial de UDONE.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-800/60 print:border-slate-200">
                  <div className="text-left font-mono text-xs text-slate-400 print:text-slate-600">
                    <span>Intento Evaluado</span>
                    <div className="text-base font-bold text-slate-200 print:text-slate-850">#{intentoNumero - 1}</div>
                  </div>
                  <div className="text-left font-mono text-xs text-slate-400 print:text-slate-600">
                    <span>Profesor Evaluador</span>
                    <div className="text-base font-bold text-slate-200 print:text-slate-850">{activeProfessor.name}</div>
                  </div>
                  <div className="text-left font-mono text-xs text-slate-400 print:text-slate-600">
                    <span>Tiempo Acumulado</span>
                    <div className="text-base font-bold text-slate-200 print:text-slate-850">{formatTime(totalTiempoExamen)}</div>
                  </div>
                  <div className="text-left font-mono text-xs text-slate-400 print:text-slate-600">
                    <span>Fecha de Entrega</span>
                    <div className="text-base font-bold text-slate-200 print:text-slate-850">{new Date(startTime).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* ANILLO DE PUNTUACIÓN DE NOTA (Base 10) */}
              <div className="flex flex-col items-center justify-center min-w-[180px] p-5 bg-slate-950/60 border border-slate-800 rounded-2xl print:bg-slate-50 print:border-slate-200">
                {/* SVG Progress Circle */}
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800 print:text-slate-200"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={evaluationResult.aprobado ? 'text-emerald-400' : 'text-rose-500'}
                      strokeDasharray={`${evaluationResult.notaTotal * 10}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                    <span className="text-2xl font-black text-slate-100 print:text-slate-900">
                      {evaluationResult.notaTotal.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-500">sobre 10</span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className={`inline-flex px-3 py-1 rounded text-xs font-mono font-black border uppercase tracking-widest ${evaluationResult.aprobado ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-200' : 'bg-rose-500/10 text-rose-400 border-rose-500/20 print:bg-rose-100 print:text-rose-800 print:border-rose-200'}`}>
                    {evaluationResult.aprobado ? 'APROBADO' : 'REPROBADO'}
                  </span>
                </div>
              </div>
            </div>

            {/* CARTA DE EVALUACIÓN GENERAL DEL PROFESOR DE IA */}
            <div className="glass-panel p-6 md:p-8 bg-slate-900/40 border border-slate-800 rounded-2xl relative space-y-4 print:bg-white print:border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 print:border-slate-200">
                <img src={activeProfessor.avatarUrl} alt={activeProfessor.name} className="w-12 h-12 rounded-full object-cover border border-slate-700 shadow-md" />
                <div>
                  <h3 className="font-extrabold text-slate-100 text-lg print:text-slate-900">{activeProfessor.name}</h3>
                  <span className="text-xs font-mono text-slate-500">Diagnóstico General Consolidado de la Evaluación</span>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line italic font-serif print:text-slate-800">
                &ldquo;{evaluationResult.comentarioGeneral}&rdquo;
              </p>
            </div>

            {/* SECCIÓN DETALLADA: DESGLOSE POR EJERCICIO */}
            <div className="page-break space-y-6">
              <h2 className="text-2xl font-black text-slate-100 border-b-2 border-slate-800/80 pb-2 print:text-slate-900 print:border-slate-200">
                Parte 1: Análisis por Ejercicios
              </h2>

              {selectedExercises.map((ex, index) => {
                const desglose = evaluationResult.desgloseEjercicios[ex.id] || {
                  puntuacion: 0,
                  feedback: "Sin comentarios.",
                  erroresComunes: []
                };
                const tiempoIndividual = tiempos[ex.id] || 0;

                return (
                  <div key={ex.id} className="glass-panel p-6 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4 print:bg-slate-50 print:border-slate-200 print:p-5 print:mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800/40 pb-3 gap-3 print:border-slate-200">
                      <div>
                        <h4 className="text-lg font-bold text-slate-100 print:text-slate-900">
                          Ejercicio {index + 1} &middot; <span className="text-sm font-medium text-slate-400 font-mono">ID: {ex.id}</span>
                        </h4>
                        <span className="text-xs text-slate-400 font-mono">Categoría: {ex.categoria}</span>
                      </div>

                      {/* Tiempos y Calificación por Ejercicio */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="px-2.5 py-1 bg-slate-950/60 rounded border border-slate-800 text-slate-300 print:border-slate-300 print:bg-white print:text-slate-700">
                          Tiempo: {formatTime(tiempoIndividual)}
                        </span>
                        <span className={`px-2.5 py-1 rounded border font-bold ${desglose.puntuacion >= ex.puntosMaximos / 2 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 print:bg-emerald-100 print:text-emerald-800' : 'bg-rose-500/10 text-rose-400 border-rose-500/20 print:bg-rose-100 print:text-rose-800'}`}>
                          Calificación: {desglose.puntuacion.toFixed(1)} / {ex.puntosMaximos.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Enunciado del Ejercicio */}
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Enunciado Oficial</span>
                      <p className="text-slate-255 text-sm font-medium leading-relaxed print:text-slate-800 whitespace-pre-line">{ex.enunciado}</p>
                    </div>

                    {/* Código entregado por el estudiante */}
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Código Entregado por el Estudiante</span>
                      <div className="print-code font-mono text-xs bg-slate-950 p-4 rounded-lg overflow-x-auto print:overflow-visible whitespace-pre-wrap text-slate-300 border border-slate-850 leading-relaxed max-h-[300px] print:max-h-none">
                        {respuestas[ex.id] || '// No se entregó respuesta para este ejercicio.'}
                      </div>
                    </div>

                    {/* Análisis Detallado e Informe del Profesor por Ejercicio */}
                    <div className="space-y-2 text-left pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Diagnóstico del Profesor ({activeProfessor.name})</span>
                      <div className="text-slate-300 text-xs leading-relaxed print:text-slate-700 space-y-2">
                        <ReactMarkdown
                          components={{
                            p: ({ node, ...props }) => <p className="mb-2 leading-relaxed whitespace-pre-wrap font-serif italic" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-slate-100 font-sans not-italic block mt-3 print:text-slate-900" {...props} />,
                            em: ({ node, ...props }) => <em className="italic" {...props} />,
                            code: ({ node, className, children, ...props }) => {
                              const match = /language-(\w+)/.exec(className || '');
                              const isInline = !match;
                              return isInline ? (
                                <code className="bg-slate-950 px-1.5 py-0.5 rounded text-xs text-brand-400 font-mono print:text-emerald-700 print:bg-slate-100" {...props}>{children}</code>
                              ) : (
                                <pre className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto print:overflow-visible whitespace-pre-wrap my-3 not-italic print:bg-slate-50 print:border-slate-300 print:text-emerald-800">
                                  <code className={className} {...props}>{children}</code>
                                </pre>
                              );
                            }
                          }}
                        >
                          {desglose.feedback}
                        </ReactMarkdown>
                      </div>

                      {/* Errores Comunes Identificados (si hay) */}
                      {desglose.erroresComunes.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {desglose.erroresComunes.map(err => {
                            // Traducir los códigos a texto amigable
                            let label = err;
                            if (err === 'sintaxis_udone') label = 'Sintaxis UDONE Inválida';
                            else if (err === 'fin_si_faltante') label = 'Falta FIN SI';
                            else if (err === 'fin_caso_faltante') label = 'Falta FIN CASO';
                            else if (err === 'variable_no_declarada') label = 'Variable No Declarada';
                            else if (err === 'condicion_invalida') label = 'Condición Lógica Inválida';
                            else if (err === 'error_logico') label = 'Error de Lógica Algorítmica';

                            return (
                              <span 
                                key={err}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/25 rounded text-[10px] font-mono font-bold uppercase print:bg-red-50 print:text-red-700 print:border-red-200"
                              >
                                <XCircle size={10} /> {label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SECCIÓN ADICIONAL: SOLUCIONES OFICIALES (PAGE BREAK) */}
            <div className="page-break space-y-6 no-print">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-800/80 pb-3 gap-3">
                <h2 className="text-2xl font-black text-slate-100">
                  Parte 2: Soluciones Oficiales del Parcial
                </h2>
                <Button 
                  onClick={() => setShowSolutions(!showSolutions)}
                  variant="secondary"
                  size="sm"
                >
                  {showSolutions ? 'Ocultar Soluciones' : 'Mostrar Soluciones Oficiales'}
                </Button>
              </div>

              {showSolutions && (
                <>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    A continuación se presentan las implementaciones oficiales correctas de cada reto planteado, escritas en el pseudocódigo formal de UDONE y sus equivalentes en Lenguaje C. Puedes utilizarlas para comparar directamente y repasar tu lógica en cada ejercicio.
                  </p>

                  {selectedExercises.map((ex, index) => (
                    <div key={`sol_${ex.id}`} className="glass-panel p-6 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4">
                  <h4 className="text-base font-bold text-slate-100 border-b border-slate-850 pb-2 print:text-slate-900 print:border-slate-200">
                    Solución Oficial - Ejercicio {index + 1}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Pseudocódigo UDONE</span>
                      <div className="print-code font-mono text-[11px] bg-slate-950 p-3 rounded text-slate-300 border border-slate-850 whitespace-pre-wrap leading-relaxed">
                        {ex.solucionOficial.pseudocodigo}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Código Equivalente en C</span>
                      <div className="print-code font-mono text-[11px] bg-slate-950 p-3 rounded text-slate-300 border border-slate-850 whitespace-pre-wrap leading-relaxed">
                        {ex.solucionOficial.c}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                </>
              )}
            </div>

            {/* PIE DE PÁGINA REPORTE */}
            <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 print:text-slate-400 print:border-slate-300 print:mt-10">
              <p>UDONE Evaluator v2.0 - Universidad de Oriente (UDONE) - Telemetría Anónima de Ejercicios</p>
              <p className="mt-1 font-mono text-[10px]">Parcial generado y corregido de forma segura a través de los servidores oficiales de Google Gemini</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
