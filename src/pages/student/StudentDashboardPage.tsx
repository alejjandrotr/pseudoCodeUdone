import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, FileText, CheckCircle, Clock } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
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
        .single();

      if (studentError) throw studentError;
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
      </main>
    </div>
  );
};
