import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, FileText, CheckCircle, Clock, ShieldAlert, Code, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  min_members: number;
  max_members: number;
}

interface Delivery {
  id: number;
  project_id: number;
  status: string;
}

export const StudentDashboardPage: React.FC = () => {
  const [student, setStudent] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [examMaxScore, setExamMaxScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [notRegistered, setNotRegistered] = useState(false);
  const [userCedula, setUserCedula] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login-estudiantes');
        return;
      }

      const cedula = user.email?.split('@')[0];

      // Fetch student info
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('cedula', cedula)
        .maybeSingle();

      if (studentError) throw studentError;

      if (!studentData) {
        setNotRegistered(true);
        setUserCedula(cedula || 'Desconocido');
        setLoading(false);
        return;
      }

      setStudent(studentData);

      if (studentData.require_password_change) {
        navigate('/cambiar-password');
        return;
      }

      // Fetch all projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Fetch student's deliveries
      // First get groups the student is in
      const { data: groupMembers, error: gmError } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('student_cedula', cedula);

      if (gmError) throw gmError;

      if (groupMembers && groupMembers.length > 0) {
        const groupIds = groupMembers.map(gm => gm.group_id);
        const { data: deliveriesData, error: delError } = await supabase
          .from('deliveries')
          .select('*')
          .in('group_id', groupIds);
        
        if (delError) throw delError;
        setDeliveries(deliveriesData || []);
      }

      // Fetch exam max score
      const { data: examData } = await supabase
        .from('exam_sessions')
        .select('final_score')
        .eq('student_ci', cedula);

      if (examData && examData.length > 0) {
        const scores = examData.map(s => s.final_score).filter(s => s !== null);
        if (scores.length > 0) {
          setExamMaxScore(Math.max(...scores));
        }
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login-estudiantes');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (notRegistered) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900 border border-red-500/20 p-8 rounded-2xl shadow-2xl text-center"
        >
          <div className="p-3 bg-red-500/10 rounded-full mb-4 border border-red-500/20 w-fit mx-auto">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Cédula no Registrada</h2>
          <p className="text-slate-400 mb-6 text-sm">
            La cédula <span className="font-semibold text-slate-200">{userCedula}</span> no se encuentra en el listado de estudiantes autorizados.
          </p>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg mb-6 text-left text-xs text-slate-400 space-y-2">
            <p className="font-bold text-slate-300">¿Qué significa esto?</p>
            <p>El profesor debe agregarte a la base de datos antes de que puedas acceder al portal de entregas y evaluaciones.</p>
            <p className="font-bold text-slate-300">¿Qué debes hacer?</p>
            <p>1. Verifica si ingresaste tu cédula correctamente.</p>
            <p>2. Si es correcta, comunícate con tu profesor para que te registre.</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión / Volver
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <UserIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="font-semibold text-white">{student?.nombres} {student?.apellidos}</h1>
              <p className="text-xs text-slate-400">C.I: {student?.cedula} • Sección {student?.seccion}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Mis Proyectos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const isDelivered = deliveries.some(d => d.project_id === project.id);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-900 border ${isDelivered ? 'border-green-500/30' : 'border-slate-800'} rounded-xl p-6 relative overflow-hidden`}
              >
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isDelivered ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                  {isDelivered ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {isDelivered ? 'Entregado' : 'Pendiente'}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="pr-24">
                    <h3 
                      className="text-lg font-bold text-white mb-1 cursor-pointer hover:text-blue-400 transition-colors"
                      onClick={() => navigate(`/proyecto/${project.id}`)}
                    >
                      {project.nombre}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{project.descripcion || "Sin descripción"}</p>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-6">
                  <div className="text-sm text-slate-500">
                    Grupos de {project.min_members} a {project.max_members} personas
                  </div>
                  {!isDelivered ? (
                    <button
                      onClick={() => navigate(`/entregar/${project.id}`)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                    >
                      Realizar Entrega
                    </button>
                  ) : (
                    <button
                      className="bg-slate-800 text-slate-400 px-5 py-2 rounded-lg font-medium cursor-not-allowed"
                      disabled
                    >
                      Ver Entrega
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {projects.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No hay proyectos configurados en este momento.
            </div>
          )}
        </div>

        {/* Sección: Parcial Virtual de Código */}
        <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-emerald-400" />
          Evaluaciones Virtuales
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <Code className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Parcial Virtual de Código</h3>
                <p className="text-sm text-slate-400 max-w-md">
                  Resuelve 4 ejercicios de programación en TypeScript. Tienes 1 hora y puedes intentarlo múltiples veces. Solo se conservará tu mejor nota.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Tu Mejor Nota</p>
                <p className="text-3xl font-black text-white">
                  {examMaxScore !== null ? (
                    <><span className="text-emerald-400">{examMaxScore.toFixed(0)}</span><span className="text-lg text-slate-500">/20</span></>
                  ) : (
                    <><span className="text-slate-600">--</span><span className="text-lg text-slate-600">/20</span></>
                  )}
                </p>
              </div>
              <button
                onClick={() => navigate('/parcial-virtual')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2"
              >
                Presentar Parcial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
};
