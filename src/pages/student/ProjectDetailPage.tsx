import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, UploadCloud } from 'lucide-react';

interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  content_url: string;
  min_members: number;
  max_members: number;
}

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Check auth
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate('/login-estudiantes'); return; }

        // Get project from DB
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (error) throw error;
        setProject(data);

        // Fetch the markdown content from the static file
        if (data.content_url) {
          const res = await fetch(data.content_url);
          if (res.ok) {
            const text = await res.text();
            setMarkdown(text);
          } else {
            setMarkdown('> No se pudo cargar el enunciado del proyecto.');
          }
        } else {
          // Fallback: show description from DB
          setMarkdown(data.descripcion || 'Sin descripción disponible.');
        }
      } catch (err) {
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Top Bar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </button>
          <button
            onClick={() => navigate(`/entregar/${projectId}`)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            Realizar Entrega
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Project Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <FileText className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{project?.nombre}</h1>
              <p className="text-sm text-slate-500 mt-1">
                Equipos de {project?.min_members} a {project?.max_members} integrantes
              </p>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-slate max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h1:text-3xl prose-h1:border-b prose-h1:border-slate-800 prose-h1:pb-4 prose-h1:mb-6
            prose-h2:text-xl prose-h2:text-blue-300 prose-h2:mt-10
            prose-h3:text-lg prose-h3:text-slate-200
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-strong:text-white
            prose-li:text-slate-300 prose-li:marker:text-blue-400
            prose-hr:border-slate-800
            prose-code:text-blue-300 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-blockquote:border-blue-500/50 prose-blockquote:bg-slate-900/50 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-400
            bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate(`/entregar/${projectId}`)}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/10"
            >
              <UploadCloud className="w-6 h-6" />
              Entregar este Proyecto
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
