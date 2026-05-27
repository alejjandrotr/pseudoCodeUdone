import React, { useState, useEffect } from 'react';
import { 
  Users, Award, Play, AlertCircle, FileText, CheckCircle2, 
  XCircle, Printer, RefreshCw, Sparkles, HelpCircle, Trophy, BookOpen
} from 'lucide-react';
import { Button } from '../../common/Button';
import { CodeBlock } from '../../common/DisplayComponents';
import { professorsData } from '../../../core/data/professorsData';
import { evaluarRazonamientoMundial, RazonamientoResult } from '../../../core/services/razonamientoService';
import { analyticsService } from '../../../core/services/analyticsService';

export const ArticleActividadGrupo: React.FC = () => {
  const API_KEY_STORAGE = 'gemini_api_key';
  const STORAGE_RESULT_KEY = 'udone_actividad_grupo_resultado';
  const STORAGE_ANSWERS_KEY = 'udone_actividad_grupo_answers';

  // --- Estados ---
  const [ci1, setCi1] = useState('');
  const [ci2, setCi2] = useState('');
  const [ci3, setCi3] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [selectedProfId, setSelectedProfId] = useState('prof_mentor');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyInputOpen, setIsApiKeyInputOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<RazonamientoResult | null>(null);

  // --- Efecto inicial ---
  useEffect(() => {
    // Cargar clave API
    const key = localStorage.getItem(API_KEY_STORAGE) || '';
    setApiKey(key);

    // Cargar respuestas previas guardadas
    try {
      const storedAnswers = localStorage.getItem(STORAGE_ANSWERS_KEY);
      if (storedAnswers) {
        const parsed = JSON.parse(storedAnswers);
        setCi1(parsed.ci1 || '');
        setCi2(parsed.ci2 || '');
        setCi3(parsed.ci3 || '');
        setRespuesta(parsed.respuesta || '');
        setSelectedProfId(parsed.selectedProfId || 'prof_mentor');
      }

      const storedResult = localStorage.getItem(STORAGE_RESULT_KEY);
      if (storedResult) {
        setEvaluationResult(JSON.parse(storedResult));
      }
    } catch (e) {
      console.error("Error al cargar datos de local storage", e);
    }
  }, []);

  // --- Guardar respuestas al cambiar ---
  useEffect(() => {
    if (ci1 || ci2 || ci3 || respuesta) {
      const data = { ci1, ci2, ci3, respuesta, selectedProfId };
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(data));
    }
  }, [ci1, ci2, ci3, respuesta, selectedProfId]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem(API_KEY_STORAGE, apiKey.trim());
      setIsApiKeyInputOpen(false);
    }
  };

  const handleEvaluate = async () => {
    // Validar entradas
    if (!ci1.trim() || !ci2.trim() || !ci3.trim()) {
      alert("⚠️ Debes ingresar la cédula de los 3 integrantes del grupo para la entrega.");
      return;
    }

    if (!respuesta.trim() || respuesta.length < 30) {
      alert("⚠️ Por favor, ingresa una explicación o razonamiento lógico más detallado (mínimo 30 caracteres).");
      return;
    }

    const key = localStorage.getItem(API_KEY_STORAGE);
    if (!key) {
      setIsApiKeyInputOpen(true);
      return;
    }

    setIsLoading(true);
    const activeProfessor = professorsData.find(p => p.id === selectedProfId) || professorsData[0];

    try {
      const result = await evaluarRazonamientoMundial({
        professor: activeProfessor,
        cedulas: [ci1.trim(), ci2.trim(), ci3.trim()],
        respuesta: respuesta.trim()
      }, key);

      setEvaluationResult(result);
      localStorage.setItem(STORAGE_RESULT_KEY, JSON.stringify(result));

      // Enviar analíticas y telemetría a Sheets
      await analyticsService.trackActividadGrupoResult(
        [ci1.trim(), ci2.trim(), ci3.trim()],
        result.notaTotal,
        result.aprobado
      );

    } catch (error) {
      console.error("Error en la evaluación de razonamiento:", error);
      alert("Ocurrió un error al procesar la evaluación con la IA. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseas reiniciar la entrega y borrar los resultados de la corrección?")) {
      setEvaluationResult(null);
      localStorage.removeItem(STORAGE_RESULT_KEY);
    }
  };

  const activeProfessor = professorsData.find(p => p.id === selectedProfId) || professorsData[0];

  return (
    <div className="space-y-8">
      {/* Estilos para impresión */}
      <style>{`
        @media print {
          .no-print, button, form, input, textarea, .prof-selector {
            display: none !important;
          }
          #print-area {
            background: white !important;
            color: black !important;
            padding: 20px !important;
          }
          .print-title {
            color: #1e3a8a !important;
            font-size: 26px !important;
            font-weight: bold !important;
            border-bottom: 2px solid #2563eb !important;
            padding-bottom: 8px !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            padding: 16px !important;
            background: #f8fafc !important;
            margin-top: 15px !important;
          }
        }
      `}</style>

      {/* Cabecera Didáctica y Contexto */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-6 md:p-8 animate-fade-in no-print">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono rounded-full font-bold">
              <Users size={14} /> TRABAJO PRÁCTICO EN EQUIPO (MÁX. 3 INTEGRANTES)
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
              Reto Lógico: Simulador Clasificatoria Mundialista
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              En esta actividad, aplicarás tus habilidades de lógica y estructuración de algoritmos. Como tarea final del tema, debes idear y describir el razonamiento lógico para determinar el primer y segundo lugar del torneo, incluyendo la resolución de empates por diferencia de goles.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500 pt-2">
              <span className="flex items-center gap-1"><Trophy size={13} className="text-brand-400" /> Ejercicio de Razonamiento</span>
              <span className="flex items-center gap-1"><FileText size={13} /> Puntuación: 0 a 10 Puntos</span>
              <span className="flex items-center gap-1"><Award size={13} /> Aprobación: &ge; 5.0</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button 
              onClick={() => setIsApiKeyInputOpen(true)}
              className="text-xs text-slate-400 hover:text-brand-400 underline transition-colors"
            >
              {apiKey ? "🔑 Cambiar API Key de Gemini" : "⚠️ Configurar API Key"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal API Key */}
      {isApiKeyInputOpen && (
        <div className="glass-panel p-6 bg-slate-950/90 border border-slate-700 rounded-xl animate-scale-in no-print">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
            <AlertCircle size={20} className="text-brand-400" /> Configurar tu API Key de Gemini
          </h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Este módulo interactivo utiliza Gemini para analizar argumentos lógicos de forma inteligente y simular las correcciones personalizadas de tus docentes. La API Key se almacena de manera segura en tu navegador.
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
            <Button type="submit" variant="primary">Guardar Key</Button>
            <Button type="button" variant="ghost" onClick={() => setIsApiKeyInputOpen(false)}>Cancelar</Button>
          </form>
        </div>
      )}

      {/* Contenido Técnico y Planteamiento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        {/* Lado izquierdo: El código hecho en clases */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-5 bg-slate-900/30 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-md font-bold text-brand-300 flex items-center gap-2 border-b border-slate-800 pb-2">
              <BookOpen size={16} /> Lo que construimos en Clase
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              En clases codificamos el esqueleto principal del algoritmo <strong className="text-slate-300">Futbol</strong>. Solicitamos los nombres de los 4 equipos, simulamos los partidos uno a uno cargando los goles, y acumulamos los puntos y diferencia de goles para cada uno de ellos.
            </p>
            <div className="rounded-lg overflow-hidden border border-slate-800">
              <CodeBlock code={`Algoritmo Futbol
Declaracion
  Constantes
    PTS_GANADOR: 3
    PTS_EMPATE: 1
  Variables:
    nombreA, nombreB, nombreC, nombreD: Texto
    ptsA, ptsB, ptsC, ptsD, goles1, goles2: Entero
    diffA, diffB, diffC, diffD: Entero

INICIO
  Escribir "Indique el nombre del equipo 1"
  leer nombreA
  Escribir "Indique el nombre del equipo 2"
  leer nombreB
  Escribir "Indique el nombre del equipo 3"
  leer nombreC
  Escribir "Indique el nombre del equipo 4"
  leer nombreD

  ptsA <- 0; ptsB <- 0; ptsC <- 0; ptsD <- 0      
  diffA <- 0; diffB <- 0; diffC <- 0; diffD <- 0     

  // [Ejemplo de Simulación de Partido: A VS B]
  Escribir nombreA, ' VS ', nombreB
  Escribir 'Indique los goles de ', nombreA
  leer goles1
  Escribir 'Indique los goles de ', nombreB
  leer goles2

  Si (goles1 = goles2) entonces
    ptsA <- ptsA + PTS_EMPATE
    ptsB <- ptsB + PTS_EMPATE
  Sino 
    Si (goles1 > goles2) entonces
      ptsA <- ptsA + PTS_GANADOR
    Sino 
      ptsB <- ptsB + PTS_GANADOR
    Fin Si
  Fin Si 
  diffA <- diffA + (goles1 - goles2)
  diffB <- diffB + (goles2 - goles1)

  // ... Se repite de la misma forma para A-C, A-D, B-C, B-D, C-D ...
FIN`} />
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario de Entrega */}
        <div className="lg:col-span-5 space-y-6">
          {/* Integrantes del Grupo */}
          <div className="glass-panel p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-md font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Users size={16} className="text-brand-400" /> Integrantes del Grupo
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Cédula Estudiante 1 (Líder)</label>
                <input 
                  type="text" 
                  value={ci1} 
                  onChange={(e) => setCi1(e.target.value)}
                  placeholder="V-28111222"
                  disabled={evaluationResult !== null || isLoading}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-500 outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Cédula Estudiante 2</label>
                <input 
                  type="text" 
                  value={ci2} 
                  onChange={(e) => setCi2(e.target.value)}
                  placeholder="V-29333444"
                  disabled={evaluationResult !== null || isLoading}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-500 outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Cédula Estudiante 3</label>
                <input 
                  type="text" 
                  value={ci3} 
                  onChange={(e) => setCi3(e.target.value)}
                  placeholder="V-30555666"
                  disabled={evaluationResult !== null || isLoading}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-500 outline-none transition-colors disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Selector de Profesor */}
          <div className="glass-panel p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 prof-selector">
            <h3 className="text-md font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
              <HelpCircle size={16} className="text-brand-400" /> Profesor Evaluador
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {professorsData.map((prof) => {
                const isSelected = prof.id === selectedProfId;
                return (
                  <button
                    key={prof.id}
                    onClick={() => !evaluationResult && setSelectedProfId(prof.id)}
                    disabled={evaluationResult !== null || isLoading}
                    className={`flex-shrink-0 p-2 rounded-lg border text-xs flex flex-col items-center gap-1 transition-all ${
                      isSelected 
                        ? 'border-brand-500 bg-brand-500/10 text-brand-400 font-bold' 
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    } disabled:opacity-50`}
                  >
                    <img src={prof.avatarUrl} alt={prof.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                    <span>{prof.name.split(" ")[1]}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              {activeProfessor.shortStory}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario Principal de Razonamiento */}
      {evaluationResult === null && (
        <div className="glass-panel p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 no-print">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-slate-200 flex items-center gap-2">
              <Sparkles size={16} className="text-brand-400 animate-pulse" /> Propuesta del Grupo
            </h3>
            <span className="text-xs font-mono text-slate-500">Expresa tu lógica en lenguaje natural o estructurado</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Consigna de la tarea:</strong> Describe la secuencia lógica o condicionales que se deben ejecutar para comparar las variables <code className="text-brand-300">ptsA</code>, <code className="text-brand-300">ptsB</code>, <code className="text-brand-300">ptsC</code> y <code className="text-brand-300">ptsD</code>, y en caso de empate, usar <code className="text-brand-300">diffA</code>, <code className="text-brand-300">diffB</code>, etc. para extraer de forma inequívoca el **Primer Lugar** y **Segundo Lugar**.
          </p>

          <textarea
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            disabled={isLoading}
            rows={10}
            placeholder="Escribe aquí de forma clara y detallada el razonamiento del grupo. Ejemplo: 'Para hallar el primer lugar, creamos variables auxiliares maxPts y maxDiff. Comparamos los puntos de los equipos de forma secuencial... en caso de empates...'"
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 text-sm focus:border-brand-500 outline-none transition-colors resize-y font-sans leading-relaxed disabled:opacity-50"
          />

          <div className="flex justify-end gap-3">
            <Button
              onClick={handleEvaluate}
              disabled={isLoading}
              variant="primary"
              size="lg"
              className="px-8 font-bold shadow-lg shadow-brand-500/10"
              icon={isLoading ? RefreshCw : Play}
            >
              {isLoading ? "Evaluando Razonamiento..." : "Entregar y Calificar con IA"}
            </Button>
          </div>
        </div>
      )}

      {/* Resultados de la Evaluación (Premium) */}
      {evaluationResult !== null && (
        <div id="print-area" className="glass-panel p-6 md:p-8 bg-slate-900/60 border border-brand-500/30 rounded-2xl shadow-xl space-y-6 animate-scale-in">
          {/* Header de entrega en PDF / Impresión */}
          <div className="flex justify-between items-start border-b border-slate-800 pb-5 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/25 px-2.5 py-0.5 rounded">
                ENTREGA EVALUADA POR IA
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 print-title">
                Reporte Oficial de Calificación Grupal
              </h3>
              <div className="text-xs text-slate-400 font-mono space-y-1">
                <div><strong className="text-slate-200">Parcial / Actividad:</strong> Simulador de Clasificatoria Mundialista</div>
                <div><strong className="text-slate-200">Integrantes C.I.:</strong> {ci1}, {ci2}, {ci3}</div>
                <div><strong className="text-slate-200">Profesor Corrector:</strong> {activeProfessor.name}</div>
              </div>
            </div>

            <div className="text-center bg-slate-950/80 border border-slate-800 rounded-xl p-4 min-w-[120px]">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Nota Grupal</span>
              <div className={`text-4xl font-extrabold ${evaluationResult.aprobado ? 'text-emerald-400' : 'text-rose-400'}`}>
                {evaluationResult.notaTotal.toFixed(1)}
              </div>
              <span className="text-[9px] text-slate-500 font-mono">escala 0.0 - 10.0</span>
            </div>
          </div>

          {/* Comentario del Profesor */}
          <div className="p-5 bg-slate-950/50 border border-slate-800 rounded-xl flex gap-4 items-start">
            <img src={activeProfessor.avatarUrl} alt={activeProfessor.name} className="w-12 h-12 rounded-full object-cover border border-slate-800 flex-shrink-0 no-print" />
            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                Crítica Docente de {activeProfessor.name}
                <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono border ${evaluationResult.aprobado ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {evaluationResult.aprobado ? 'APROBADO' : 'REPROBADO'}
                </span>
              </h4>
              <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed whitespace-pre-line">
                "{evaluationResult.comentarioGeneral}"
              </p>
            </div>
          </div>

          {/* Desglose de Análisis de Lógica */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Puntos fuertes */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={14} /> Aciertos Identificados
              </h5>
              <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                {evaluationResult.puntosFuertes.map((str, idx) => <li key={idx}>{str}</li>)}
                {evaluationResult.puntosFuertes.length === 0 && <li>Ninguno identificado.</li>}
              </ul>
            </div>

            {/* Puntos débiles */}
            <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-2">
              <h5 className="text-xs font-bold text-rose-400 flex items-center gap-1">
                <XCircle size={14} /> Fallas Lógicas / Vacíos
              </h5>
              <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                {evaluationResult.puntosDebiles.map((str, idx) => <li key={idx}>{str}</li>)}
                {evaluationResult.puntosDebiles.length === 0 && <li>Ninguna identificada.</li>}
              </ul>
            </div>

            {/* Recomendaciones */}
            <div className="p-4 bg-brand-500/5 border border-brand-500/10 rounded-xl space-y-2">
              <h5 className="text-xs font-bold text-brand-400 flex items-center gap-1">
                <Sparkles size={14} /> Consejos de Optimización
              </h5>
              <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                {evaluationResult.recomendaciones.map((str, idx) => <li key={idx}>{str}</li>)}
                {evaluationResult.recomendaciones.length === 0 && <li>Revisar los apuntes generales.</li>}
              </ul>
            </div>
          </div>

          {/* Solución razonada que entregó el estudiante */}
          <div className="p-4 bg-slate-950/20 border border-slate-800 rounded-xl space-y-2">
            <h5 className="text-xs font-bold text-slate-400">Texto de Entrega Original:</h5>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-900 font-mono whitespace-pre-wrap">
              {respuesta}
            </p>
          </div>

          {/* Botones de Acción de Reporte */}
          <div className="flex justify-between items-center no-print border-t border-slate-800 pt-5">
            <Button
              onClick={handleReset}
              variant="ghost"
              className="text-slate-400 hover:text-rose-400"
              icon={RefreshCw}
            >
              Reiniciar Actividad / Re-entregar
            </Button>

            <Button
              onClick={() => window.print()}
              variant="secondary"
              icon={Printer}
            >
              Imprimir Reporte de Calificación (PDF)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
