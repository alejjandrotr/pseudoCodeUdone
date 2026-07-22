import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, Save, Check, Play, TerminalSquare, ArrowLeft, HelpCircle, X, Download, FileText } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SecureCodeEditor } from '../components/evaluator/SecureCodeEditor';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface VirtualExamPageProps {
  onBack: () => void;
  onFinish: () => void;
}

import { Exercise, EXAM_EXERCISES } from '../core/data/examExercises';

export const VirtualExamPage: React.FC<VirtualExamPageProps> = ({ onBack, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora = 3600s
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [languages, setLanguages] = useState<('cpp'|'typescript')[]>([]);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [studentCi, setStudentCi] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [submitProgress, setSubmitProgress] = useState<number | null>(null);
  const [finalScoreInfo, setFinalScoreInfo] = useState<{ score: number, isHighScore: boolean } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const endTimeRef = useRef<number | null>(null);
  const isSubmittingRef = useRef<boolean>(false);

  useEffect(() => {
    // Autenticación e inicialización / restauración de sesión
    const initSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Debes iniciar sesión para presentar el parcial.");
        navigate('/login-estudiantes');
        return;
      }
      const ci = user.email?.split('@')[0] || "Desconocido";
      setStudentCi(ci);

      const storageKey = `active_exam_session_${ci}`;
      const savedSessionRaw = localStorage.getItem(storageKey);

      if (savedSessionRaw) {
        try {
          const savedSession = JSON.parse(savedSessionRaw);
          const now = Date.now();
          const remaining = Math.max(0, Math.floor((savedSession.endTime - now) / 1000));

          setExercises(savedSession.exercises);
          setCodes(savedSession.codes);
          setLanguages(savedSession.languages);
          setCopyPasteCount(savedSession.copyPasteCount || 0);
          setSessionId(savedSession.sessionId || crypto.randomUUID());
          endTimeRef.current = savedSession.endTime;
          setTimeLeft(remaining);

          if (remaining <= 0) {
            // El tiempo expiró mientras el estudiante estuvo fuera
            setTimeout(() => {
              handleSubmit(savedSession.exercises, savedSession.codes, savedSession.languages, savedSession.copyPasteCount || 0, ci);
            }, 500);
          }
          return;
        } catch (e) {
          console.error("Error al cargar la sesión guardada del examen:", e);
        }
      }

      // Si no hay sesión activa previa, crear un intento nuevo
      const easies = EXAM_EXERCISES.filter(e => e.level === 'easy');
      const intermediates = EXAM_EXERCISES.filter(e => e.level === 'intermediate');
      const hards = EXAM_EXERCISES.filter(e => e.level === 'hard');
      
      const randomHard = hards[Math.floor(Math.random() * hards.length)];
      const hasEasy = Math.random() < 0.5;
      
      let selected: Exercise[] = [];
      if (hasEasy && easies.length > 0) {
        const randomEasy = easies[Math.floor(Math.random() * easies.length)];
        const shuffledInter = [...intermediates].sort(() => 0.5 - Math.random());
        selected = [randomEasy, shuffledInter[0], shuffledInter[1], randomHard];
      } else {
        const shuffledInter = [...intermediates].sort(() => 0.5 - Math.random());
        selected = [shuffledInter[0], shuffledInter[1], shuffledInter[2] || shuffledInter[0], randomHard];
      }
      
      const initialLangs = selected.map(e => e.allowedLanguages[0]);
      const initialCodes = selected.map((e, i) => initialLangs[i] === 'cpp' ? e.boilerplate : (e.boilerplate_ts || e.boilerplate));
      const newSessionId = crypto.randomUUID();
      const endTime = Date.now() + 3600 * 1000; // 1 hora exacta

      setExercises(selected);
      setLanguages(initialLangs);
      setCodes(initialCodes);
      setSessionId(newSessionId);
      endTimeRef.current = endTime;
      setTimeLeft(3600);

      // Guardar en localStorage
      const newSessionData = {
        sessionId: newSessionId,
        studentCi: ci,
        startTime: Date.now(),
        endTime: endTime,
        exercises: selected,
        codes: initialCodes,
        languages: initialLangs,
        copyPasteCount: 0
      };
      localStorage.setItem(storageKey, JSON.stringify(newSessionData));
    };

    initSession();
  }, [navigate]);

  // Guardado en tiempo real en localStorage cuando el estudiante cambia código o lenguaje
  useEffect(() => {
    if (!studentCi || exercises.length === 0 || !sessionId) return;
    const storageKey = `active_exam_session_${studentCi}`;
    const savedSessionRaw = localStorage.getItem(storageKey);
    if (savedSessionRaw) {
      try {
        const savedSession = JSON.parse(savedSessionRaw);
        savedSession.codes = codes;
        savedSession.languages = languages;
        savedSession.copyPasteCount = copyPasteCount;
        localStorage.setItem(storageKey, JSON.stringify(savedSession));
      } catch (e) {
        console.error("Error actualizando localStorage del examen:", e);
      }
    }
  }, [codes, languages, copyPasteCount, studentCi, exercises, sessionId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showTSGuideModal, setShowTSGuideModal] = useState(false);
  const [consoleResults, setConsoleResults] = useState<Record<number, any>>({});
  const [activeTab, setActiveTab] = useState<'statement' | 'console'>('statement');

  // Temporizador preciso basado en endTimeRef
  useEffect(() => {
    if (!endTimeRef.current || exercises.length === 0) return;

    const timer = setInterval(() => {
      if (!endTimeRef.current) return;
      const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        if (!isSubmittingRef.current) {
          handleSubmit();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [exercises]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (newCode: string) => {
    const newCodes = [...codes];
    newCodes[currentExIndex] = newCode;
    setCodes(newCodes);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'cpp' | 'typescript';
    const newLangs = [...languages];
    newLangs[currentExIndex] = lang;
    setLanguages(newLangs);
    
    // Cambiar código al boilerplate del nuevo lenguaje si el usuario lo cambia
    const newCodes = [...codes];
    newCodes[currentExIndex] = lang === 'cpp' ? exercises[currentExIndex].boilerplate : (exercises[currentExIndex].boilerplate_ts || exercises[currentExIndex].boilerplate);
    setCodes(newCodes);
  };

  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setActiveTab('console');
    setConsoleResults(prev => ({ ...prev, [currentExIndex]: { loading: true } }));
    
    const worker = new Worker(new URL('../core/workers/codeWorker.ts', import.meta.url), { type: 'module' });
    const code = codes[currentExIndex];
    const ex = exercises[currentExIndex];

    try {
      const result = await new Promise<any>((resolve) => {
        worker.onmessage = (e) => resolve(e.data);
        worker.postMessage({ action: 'run_tests', language: languages[currentExIndex], code, tests: ex.publicTests });
      });
      setConsoleResults(prev => ({ ...prev, [currentExIndex]: { loading: false, data: result } }));
    } catch (e) {
      setConsoleResults(prev => ({ ...prev, [currentExIndex]: { loading: false, error: "Error interno del evaluador." } }));
    } finally {
      worker.terminate();
      setIsRunning(false);
    }
  };

  // Función para generar el reporte Markdown de respaldo de emergencia
  const generateEmergencyMarkdown = (targetExercises = exercises, targetCodes = codes, targetLangs = languages, targetCopyPastes = copyPasteCount, targetCi = studentCi) => {
    const ci = targetCi || "Desconocido";
    const dateStr = new Date().toLocaleString('es-VE');
    let md = `# RESPALDO DE EMERGENCIA - PARCIAL VIRTUAL\n`;
    md += `- **Cédula del Estudiante:** ${ci}\n`;
    md += `- **Fecha y Hora de Generación:** ${dateStr}\n`;
    md += `- **Intentos de Copiar/Pegar:** ${targetCopyPastes}\n\n`;
    md += `> ⚠️ **INSTRUCCIONES DE ENVÍO MANUAL:**\n`;
    md += `> Si presentó inconvenientes de conexión o fallos en el envío automático del parcial,\n`;
    md += `> envíe este archivo como documento adjunto al correo oficial de la asignatura:\n`;
    md += `> 📧 **alejjandroclases@gmail.com**\n`;
    md += `> **Asunto del correo:** Envío Manual Parcial - Cédula ${ci}\n\n`;
    md += `---\n\n`;

    targetExercises.forEach((ex, i) => {
      const lang = targetLangs[i] || 'cpp';
      const code = targetCodes[i] || '';
      md += `## Ejercicio ${i + 1}: ${ex.title} (Nivel: ${ex.level})\n`;
      md += `**Enunciado:**\n${ex.premise}\n\n`;
      md += `**Lenguaje Elegido:** ${lang}\n\n`;
      md += `**Solución del Estudiante:**\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
      md += `---\n\n`;
    });

    return md;
  };

  const handleDownloadEmergencyBackup = () => {
    const mdContent = generateEmergencyMarkdown();
    const ci = studentCi || "Estudiante";
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Parcial_Emergencia_${ci}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (
    overrideExercises = exercises, 
    overrideCodes = codes, 
    overrideLangs = languages, 
    overrideCopyPastes = copyPasteCount,
    overrideCi = studentCi
  ) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Crear el Worker dinámicamente
    const worker = new Worker(new URL('../core/workers/codeWorker.ts', import.meta.url), { type: 'module' });
    
    setSubmitProgress(10);
    
    let totalScore = 0;
    const maxScorePerExercise = 20 / overrideExercises.length;
    const ci = overrideCi || "27123456";
    let markdownReport = `# Reporte de Examen Virtual\n- Cédula: ${ci}\n- Intentos de Copy/Paste: ${overrideCopyPastes}\n\n`;

    for (let i = 0; i < overrideExercises.length; i++) {
      const ex = overrideExercises[i];
      const code = overrideCodes[i];
      
      markdownReport += `## Ejercicio ${i+1}: ${ex.title}\n`;
      markdownReport += `**Enunciado:** ${ex.premise}\n`;
      
      // Promesa para esperar al worker
      const allTests = [...ex.publicTests, ...ex.privateTests];
      const result = await new Promise<any>((resolve) => {
        worker.onmessage = (e) => resolve(e.data);
        worker.postMessage({ action: 'run_tests', language: overrideLangs[i], code, tests: allTests });
      });

      if (result.success) {
        const score = (result.passed / result.total) * maxScorePerExercise;
        totalScore += score;
        markdownReport += `**Nota del Ejercicio:** ${score.toFixed(2)}/${maxScorePerExercise.toFixed(2)} (Tests: ${result.passed}/${result.total})\n\n`;
      } else {
        markdownReport += `**Nota del Ejercicio:** 0.00/${maxScorePerExercise.toFixed(2)} (Error de compilación)\n\n`;
      }
      
      markdownReport += `### Código Enviado:\n\`\`\`cpp\n${code}\n\`\`\`\n\n`;
      
      // Actualizar progreso por cada ejercicio completado
      const progress = Math.floor(((i + 1) / overrideExercises.length) * 75) + 10;
      setSubmitProgress(progress);
    }
    
    worker.terminate();
    setSubmitProgress(90);

    // Reemplazar la Nota Previa en el reporte
    markdownReport = markdownReport.replace(`- Cédula: ${ci}`, `- Cédula: ${ci}\n- Nota Obtenida: ${totalScore.toFixed(2)}/20`);
    
    // Guardar solo si es el mejor intento
    try {
      const fileName = `${ci}_parcial.md`;
      
      // Obtener intentos previos
      const { data: previousSessions } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('student_ci', ci);
        
      const bestSession = previousSessions && previousSessions.length > 0 
        ? previousSessions.reduce((prev, current) => (prev.final_score > current.final_score) ? prev : current) 
        : null;
        
      const isHighScore = !bestSession || totalScore > bestSession.final_score;
      
      if (isHighScore) {
        // 1. Guardar en Storage (sobrescribiendo el anterior)
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('parciales_codigo')
          .upload(fileName, markdownReport, {
            contentType: 'text/markdown',
            upsert: true
          });
          
        if (uploadError) {
          console.error("Error subiendo a Storage:", uploadError);
        }
        
        const fileUrl = uploadData?.path || fileName;

        // 2. Guardar en Base de Datos (Actualizar si existe, insertar si no)
        if (bestSession) {
          await supabase.from('exam_sessions')
            .update({
              final_score: totalScore,
              copy_paste_count: overrideCopyPastes,
              file_url: fileUrl,
              status: 'submitted'
            })
            .eq('id', bestSession.id);
        } else {
          await supabase.from('exam_sessions')
            .insert([{
              id: crypto.randomUUID(),
              student_ci: ci,
              status: 'submitted',
              copy_paste_count: overrideCopyPastes,
              final_score: totalScore,
              file_url: fileUrl
            }]);
        }
      }
      
      // Al ser entregado con éxito, eliminar la sesión activa de localStorage
      localStorage.removeItem(`active_exam_session_${ci}`);

      setSubmitProgress(100);
      setTimeout(() => {
        setSubmitProgress(null);
        setFinalScoreInfo({ score: totalScore, isHighScore });
        setShowResultsModal(true);
      }, 500);
      
    } catch (e: any) {
      console.error("Supabase integration error:", e);
      setSubmitProgress(null);
      // Eliminar de localStorage de todas formas si se generó la nota
      localStorage.removeItem(`active_exam_session_${ci}`);
      setFinalScoreInfo({ score: totalScore, isHighScore: true });
      setShowResultsModal(true);
    }
  };

  const exercise = exercises[currentExIndex];

  if (exercises.length === 0) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Cargando examen...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>
      
      {/* Navbar de Examen */}
      <div className="relative z-10 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={24} />
          Evaluación en Curso
        </h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Lenguaje:</span>
            <select 
              className="bg-slate-800 text-white border border-slate-700 rounded px-2 py-1 outline-none text-sm"
              value={languages[currentExIndex] || 'cpp'}
              onChange={handleLanguageChange}
            >
              {exercise?.allowedLanguages.includes('cpp') && <option value="cpp">C++</option>}
              {exercise?.allowedLanguages.includes('typescript') && <option value="typescript">TypeScript</option>}
            </select>
            <button 
              onClick={() => setShowTSGuideModal(true)} 
              className="ml-2 text-slate-400 hover:text-brand-400 transition-colors" 
              title="Guía rápida de TypeScript"
            >
              <HelpCircle size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-rose-400 font-bold bg-rose-950/30 px-4 py-1.5 rounded-full border border-rose-900/50">
            <Clock size={18} />
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              onClick={handleDownloadEmergencyBackup} 
              icon={Download}
              title="Descarga una copia local (.md) con tus soluciones por si tienes problemas de conexión al entregar"
            >
              Respaldo MD
            </Button>
            <Button variant="secondary" onClick={handleRunCode} disabled={isRunning || isSubmitting} icon={Play}>
              {isRunning ? 'Corriendo...' : 'Correr Código'}
            </Button>
            <Button variant="primary" onClick={() => handleSubmit()} disabled={isSubmitting} icon={Save}>
              Entregar Examen
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Panel Lateral: Enunciado y Consola */}
        <div className="w-full md:w-1/3 bg-slate-900/50 border-r border-slate-800 flex flex-col overflow-hidden">
          {/* Navegación de Ejercicios */}
          <div className="p-4 border-b border-slate-800 flex gap-2 overflow-x-auto">
            {exercises.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentExIndex(idx)}
                className={`px-4 py-2 rounded font-bold text-sm transition-colors whitespace-nowrap ${currentExIndex === idx ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                Ej {idx + 1}
              </button>
            ))}
          </div>

          {/* Tabs: Enunciado | Consola */}
          <div className="flex border-b border-slate-800 bg-slate-900">
            <button 
              onClick={() => setActiveTab('statement')}
              className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'statement' ? 'border-brand-500 text-brand-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
            >
              Enunciado
            </button>
            <button 
              onClick={() => setActiveTab('console')}
              className={`flex-1 py-2 text-sm font-semibold flex justify-center items-center gap-2 border-b-2 transition-colors ${activeTab === 'console' ? 'border-brand-500 text-brand-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
            >
              <TerminalSquare size={16} /> Consola
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'statement' ? (
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-white mb-4">{exercise.title}</h2>
                <div className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  {exercise.premise}
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">Casos de Prueba Públicos</h3>
                <div className="space-y-3">
                  {exercise.publicTests.map((pt, i) => (
                    <div key={i} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                      <div className="text-xs text-slate-400 font-mono mb-1">Entrada:</div>
                      <pre className="text-sm text-brand-200 bg-black/30 p-2 rounded">{pt.input.trim() || "(vacío)"}</pre>
                      <div className="text-xs text-slate-400 font-mono mt-2 mb-1">Salida Esperada:</div>
                      <pre className="text-sm text-emerald-300 bg-black/30 p-2 rounded">{pt.expected_output.trim() || "(vacío)"}</pre>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-rose-950/20 border border-rose-900/30 rounded text-rose-300 text-sm flex items-start gap-2">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <p>Solo puedes editar el interior de la función. Hay pruebas adicionales ocultas que se evaluarán al entregar.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full font-mono text-sm">
                {!consoleResults[currentExIndex] ? (
                  <div className="text-slate-500 text-center mt-10">Haz clic en "Correr Código" para evaluar los tests públicos.</div>
                ) : consoleResults[currentExIndex].loading ? (
                  <div className="text-brand-400 animate-pulse flex items-center justify-center gap-2 mt-10">
                    <TerminalSquare size={18} /> Ejecutando...
                  </div>
                ) : consoleResults[currentExIndex].error ? (
                  <div className="text-rose-400">{consoleResults[currentExIndex].error}</div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                      Resultados: {consoleResults[currentExIndex].data.passed} / {consoleResults[currentExIndex].data.total} pasados
                    </h3>
                    {consoleResults[currentExIndex].data.results.map((res: any, i: number) => (
                      <div key={i} className={`p-4 rounded-xl border ${res.passed ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-rose-950/20 border-rose-900/50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {res.passed ? <Check className="text-emerald-400" size={16}/> : <AlertTriangle className="text-rose-400" size={16}/>}
                          <span className={`font-bold ${res.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                            Prueba Pública {i + 1} {res.passed ? 'Pasó' : 'Falló'}
                          </span>
                        </div>
                        {!res.passed && (
                          <div className="space-y-2 mt-3 text-xs">
                            {res.error ? (
                              <div className="text-rose-300 bg-black/40 p-2 rounded"><strong>Error:</strong> {res.error}</div>
                            ) : (
                              <>
                                <div>
                                  <span className="text-slate-400">Tu salida:</span>
                                  <pre className="text-rose-300 bg-black/40 p-2 rounded mt-1 overflow-x-auto">{res.output || "(vacío)"}</pre>
                                </div>
                                <div>
                                  <span className="text-slate-400">Salida esperada:</span>
                                  <pre className="text-emerald-300 bg-black/40 p-2 rounded mt-1 overflow-x-auto">{exercise.publicTests[i].expected_output.trim() || "(vacío)"}</pre>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Panel Principal: Editor */}
        <div className="w-full md:w-2/3 h-[50vh] md:h-auto">
          <SecureCodeEditor 
            key={`editor-${sessionId}-${currentExIndex}-${exercise.id}-${languages[currentExIndex]}`}
            editorId={`session-${sessionId}-ex-${exercise.id}-${languages[currentExIndex]}`}
            code={codes[currentExIndex]}
            language={languages[currentExIndex]}
            onChange={handleCodeChange}
            onCopyPasteDetected={() => setCopyPasteCount(c => c + 1)}
            readOnlyLines={exercise.readOnlyLines}
          />
        </div>
      </div>
      {/* Modal Guía TypeScript */}
      {showTSGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-800/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">TS</span> Guía Rápida: C++ a TypeScript
              </h2>
              <button onClick={() => setShowTSGuideModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-slate-300">
              <p>
                Si estás acostumbrado a <strong>C++</strong> o Pseudocódigo, aquí tienes una tabla de traducción rápida a <strong>TypeScript (JavaScript)</strong> para que puedas resolver los ejercicios fácilmente.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Variables */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="font-bold text-brand-400 mb-2">Variables y Tipos</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400"><strong>C++:</strong> <code>int numero = 5;</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>let numero: number = 5;</code></p>
                    <p className="text-slate-400"><strong>C++:</strong> <code>string texto = "Hola";</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>let texto: string = "Hola";</code></p>
                    <p className="text-slate-400"><strong>C++:</strong> <code>bool flag = true;</code></p>
                    <p><strong>TS:</strong> <code>let flag: boolean = true;</code></p>
                  </div>
                </div>

                {/* Arreglos */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="font-bold text-brand-400 mb-2">Arreglos (Vectores)</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400"><strong>C++:</strong> <code>int arr[5];</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>let arr: number[] = [];</code></p>
                    <p className="text-slate-400"><strong>C++:</strong> <code>arr.push_back(10);</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>arr.push(10);</code></p>
                    <p className="text-slate-400"><strong>C++:</strong> <code>arr.size()</code></p>
                    <p><strong>TS:</strong> <code>arr.length</code></p>
                  </div>
                </div>

                {/* Matrices */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="font-bold text-brand-400 mb-2">Matrices</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400"><strong>C++:</strong> <code>int mat[3][3];</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>let mat: number[][] = [];</code></p>
                    <p className="text-slate-400">Añadir una fila en TS:</p>
                    <p><code>mat.push([1, 2, 3]);</code></p>
                  </div>
                </div>

                {/* Cadenas */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="font-bold text-brand-400 mb-2">Manipulación de Cadenas</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400"><strong>C++:</strong> <code>texto.length()</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>texto.length</code> (sin paréntesis)</p>
                    <p className="text-slate-400"><strong>C++:</strong> <code>texto.substr(0, 3)</code></p>
                    <p className="mb-2"><strong>TS:</strong> <code>texto.substring(0, 3)</code></p>
                    <p className="text-slate-400">Convertir a mayúsculas:</p>
                    <p><strong>TS:</strong> <code>texto.toUpperCase()</code></p>
                  </div>
                </div>
              </div>

              {/* Bucles Básicos y Estructuras de Control */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 mt-4">
                <h3 className="font-bold text-brand-400 mb-2">Estructuras de Control y Bucles</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-slate-400 mb-1"><strong>Condicional (Si / Sino)</strong></p>
                    <pre className="bg-black/40 p-2 rounded text-emerald-300">
{`if (condicion) {
    // código
} else if (otra_condicion) {
    // código
} else {
    // código
}`}
                    </pre>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1"><strong>Condicional Múltiple (Caso / Switch)</strong></p>
                    <pre className="bg-black/40 p-2 rounded text-emerald-300">
{`switch (variable) {
    case valor1:
        // código
        break;
    default:
        // código
}`}
                    </pre>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1"><strong>Bucle Mientras (While)</strong></p>
                    <pre className="bg-black/40 p-2 rounded text-emerald-300">
{`while (condicion) {
    // código
}`}
                    </pre>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1"><strong>Bucle Para (For)</strong></p>
                    <pre className="bg-black/40 p-2 rounded text-emerald-300">
{`for (let i = 0; i < n; i++) {
    // código
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Retornar vs Imprimir */}
              <div className="bg-rose-950/20 p-4 rounded-lg border border-rose-900/50 mt-4">
                <h3 className="font-bold text-rose-400 flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} />
                  Dato Importante
                </h3>
                <p className="text-sm">
                  En los ejercicios de TypeScript no necesitas usar <code>console.log()</code> ni <code>cin / cout</code>. Solo concéntrate en <strong>retornar</strong> (<code>return</code>) el valor correcto desde la función que se te pide completar.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
              <Button variant="primary" onClick={() => setShowTSGuideModal(false)}>
                Entendido
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Progreso de Envío */}
      {submitProgress !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-8 max-w-sm w-full text-center flex flex-col items-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500 mb-4"></div>
            <h3 className="text-lg font-bold text-white mb-2">Evaluando Examen</h3>
            <p className="text-sm text-slate-400 mb-6">
              Ejecutando pruebas y casos de prueba ocultos contra tus funciones...
            </p>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-brand-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${submitProgress}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-500 font-bold mt-2">{submitProgress}% completado</span>
          </div>
        </div>
      )}

      {/* Modal de Resultados */}
      {showResultsModal && finalScoreInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-md w-full p-8 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 ${finalScoreInfo.isHighScore ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-blue-500/20 border-blue-500 text-blue-400'}`}>
              <Check size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              Evaluación Finalizada
            </h2>
            
            <p className="text-slate-400 mb-6">
              Has completado el parcial virtual de código. Esta es tu nota obtenida en el intento actual:
            </p>

            <div className="text-6xl font-black text-brand-400 mb-2">
              {finalScoreInfo.score.toFixed(0)}<span className="text-3xl text-slate-500">/20</span>
            </div>

            {finalScoreInfo.isHighScore ? (
              <div className="bg-emerald-950/40 text-emerald-400 px-4 py-2 rounded-lg border border-emerald-900/50 mb-6 font-medium animate-pulse">
                ¡Nuevo récord! Tu intento ha sido guardado.
              </div>
            ) : (
              <div className="bg-slate-800 text-slate-400 px-4 py-2 rounded-lg border border-slate-700 mb-6 font-medium">
                Tu nota más alta sigue siendo superior. Intento descartado.
              </div>
            )}

            <div className="w-full space-y-3 mb-2">
              <Button 
                variant="secondary" 
                className="w-full py-2.5 text-sm"
                icon={FileText}
                onClick={handleDownloadEmergencyBackup}
              >
                Descargar Copia de Respuestas (.md)
              </Button>

              <Button 
                variant="primary" 
                className="w-full py-3"
                onClick={() => {
                  setShowResultsModal(false);
                  onFinish();
                }}
              >
                Volver al Inicio
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
