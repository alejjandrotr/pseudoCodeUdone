import React, { useState, useEffect } from 'react';
import { ShieldAlert, PlayCircle, History, Info } from 'lucide-react';
import { Button } from '../components/common/Button';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface ExamDashboardPageProps {
  onBack: () => void;
  onStartExam: () => void;
}

export const ExamDashboardPage: React.FC<ExamDashboardPageProps> = ({ onBack, onStartExam }) => {
  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [hasActiveExam, setHasActiveExam] = useState<boolean>(false);
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaxScoreAndActiveExam = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login-estudiantes');
        return;
      }
      const ci = user.email?.split('@')[0];
      if (!ci) return;

      // Verificar si hay examen activo en localStorage
      const storageKey = `active_exam_session_${ci}`;
      const savedSessionRaw = localStorage.getItem(storageKey);
      if (savedSessionRaw) {
        try {
          const savedSession = JSON.parse(savedSessionRaw);
          const remaining = Math.max(0, Math.floor((savedSession.endTime - Date.now()) / 1000));
          if (remaining > 0) {
            setHasActiveExam(true);
            setRemainingMinutes(Math.ceil(remaining / 60));
          } else {
            setHasActiveExam(false);
          }
        } catch (e) {
          console.error("Error leyendo sesión activa de examen:", e);
        }
      }

      const { data, error } = await supabase
        .from('exam_sessions')
        .select('final_score')
        .eq('student_ci', ci);

      if (!error && data && data.length > 0) {
        const scores = data.map(s => s.final_score).filter(s => s !== null);
        if (scores.length > 0) {
          setMaxScore(Math.max(...scores));
        }
      }
    };

    fetchMaxScoreAndActiveExam();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center relative">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl glass-panel p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="text-brand-400" size={32} />
            Parcial Virtual de Código
          </h1>
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            Volver
          </button>
        </div>

        {hasActiveExam && (
          <div className="bg-amber-950/40 border border-amber-500/50 rounded-xl p-4 mb-6 text-amber-200 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-amber-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-white">¡Tienes un examen activo en curso!</p>
                <p className="text-xs text-amber-300">Te quedan aproximadamente {remainingMinutes} minutos para completarlo.</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0 text-sm py-2"
              onClick={onStartExam}
            >
              Continuar Examen
            </Button>
          </div>
        )}

        <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 mb-8">
          <h2 className="text-xl font-semibold text-brand-200 mb-4 flex items-center gap-2">
            <Info size={20} />
            Reglas e Integridad
          </h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>El uso de IA o copias anulará el ejercicio. La evaluación final está sujeta a revisión manual del código.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-400 font-bold">•</span>
              <span>Tienes <strong>Intentos Ilimitados</strong>. El sistema siempre conservará la nota más alta que obtengas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Tendrás <strong>1 hora</strong> para resolver 4 ejercicios de programación aleatorios.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-400 font-bold">•</span>
              <span>Si se corta tu conexión o recargas la página, tu avance se conservará automáticamente mientras el tiempo no haya terminado.</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <History className="text-slate-400 mb-2" size={32} />
            <h3 className="text-lg text-slate-300 mb-1">Tu Nota Máxima</h3>
            <p className="text-4xl font-bold text-white">
              {maxScore !== null ? `${maxScore}/20` : '--/20'}
            </p>
            {maxScore === null && (
              <p className="text-sm text-slate-500 mt-2">No has presentado aún</p>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            <p className="text-slate-400 mb-4 text-center md:text-left">
              {hasActiveExam 
                ? "Haz clic en el botón para ingresar y retomar tu intento en curso." 
                : "Al iniciar, el temporizador de 1 hora comenzará a correr y se te asignarán los ejercicios automáticamente."}
            </p>
            <Button 
              variant="primary" 
              className={`w-full py-4 text-lg font-bold text-white ${hasActiveExam ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
              icon={PlayCircle}
              onClick={onStartExam}
            >
              {hasActiveExam ? 'Continuar Examen en Curso' : 'Iniciar Intento'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
