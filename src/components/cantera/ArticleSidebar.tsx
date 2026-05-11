import React, { useState } from 'react';
import { Article } from '../../core/types/article';
import { 
  ChevronRight, 
  BookOpen, 
  FlaskConical, 
  PlayCircle, 
  CheckCircle2, 
  ClipboardCheck,
  Terminal,
  Menu,
  X
} from 'lucide-react';

interface ArticleSidebarProps {
  articles: Article[];
  activeArticle: Article | null;
  onSelect: (article: Article) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Fundamentos: <BookOpen size={14} />,
  'Operaciones Básicas': <Terminal size={14} />,
};

const typeIcons: Record<string, React.ReactNode> = {
  lesson: <BookOpen size={14} />,
  exercise: <FlaskConical size={14} />,
  video: <PlayCircle size={14} />,
};

const SidebarContent: React.FC<{
  articles: Article[];
  activeArticle: Article | null;
  onSelect: (article: Article) => void;
  onClose?: () => void;
}> = ({ articles, activeArticle, onSelect, onClose }) => {
  const grouped = articles.reduce<Record<string, Article[]>>((acc, article) => {
    const cat = article.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {});

  const handleSelect = (article: Article) => {
    onSelect(article);
    onClose?.();
  };

  return (
    <>
      <div className="glass-panel overflow-hidden">
        {Object.entries(grouped).map(([category, arts]) => (
          <div key={category}>
            {/* Category Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/40 border-b border-slate-700/50">
              <span className="text-brand-400">
                {categoryIcons[category] ?? <BookOpen size={14} />}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {category}
              </span>
            </div>

            {/* Article Items */}
            <ul className="py-2">
              {arts.map((article) => {
                const isActive = activeArticle?.id === article.id;
                const isExercise = article.type === 'exercise';
                
                return (
                  <li key={article.id}>
                    <button
                      onClick={() => handleSelect(article)}
                      className={`w-full text-left flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition-all duration-200 group ${
                        isActive
                          ? 'bg-brand-500/15 text-brand-300 border-l-2 border-brand-400'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border-l-2 border-transparent'
                      } ${isExercise && !isActive ? 'bg-emerald-500/5' : ''}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`flex-shrink-0 transition-colors ${
                          isActive 
                            ? 'text-brand-400' 
                            : isExercise 
                              ? 'text-emerald-500/60' 
                              : 'text-slate-600 group-hover:text-slate-400'
                        }`}>
                          {article.type ? typeIcons[article.type] : <ChevronRight size={14} />}
                        </span>
                        <span className="leading-snug font-medium break-words py-0.5">{article.title}</span>
                      </div>
                      
                      {isExercise && (
                        <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter ${
                          isActive 
                            ? 'bg-brand-500/20 text-brand-300' 
                            : 'bg-emerald-500/10 text-emerald-400/80'
                        }`}>
                          Práctica
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Decorative gradient */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-brand-500/5 to-transparent border border-brand-500/10 text-xs text-slate-500 text-center">
        📚 Cantera · Fundamentos
      </div>
    </>
  );
};

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  articles,
  activeArticle,
  onSelect,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ─── Mobile Trigger Button ─── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-brand-600 text-white shadow-xl shadow-brand-900/40 border border-brand-500/50 active:scale-95 transition-all"
        aria-label="Abrir menú de contenidos"
      >
        <Menu size={20} />
        <span className="text-sm font-semibold">
          {activeArticle ? activeArticle.title.slice(0, 18) + '…' : 'Contenidos'}
        </span>
      </button>

      {/* ─── Mobile Drawer Overlay ─── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative w-72 max-w-[85vw] h-full bg-slate-900 border-r border-slate-700/50 flex flex-col animate-slide-in-left overflow-y-auto">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700/50 bg-slate-900/80 sticky top-0 backdrop-blur-sm z-10">
              <span className="font-bold text-slate-100 text-sm uppercase tracking-widest">
                📚 Contenidos
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="p-3 flex-1">
              <SidebarContent
                articles={articles}
                activeArticle={activeArticle}
                onSelect={onSelect}
                onClose={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── Desktop Sidebar ─── */}
      <aside className="w-64 flex-shrink-0 hidden md:block">
        <div className="sticky top-6">
          <SidebarContent
            articles={articles}
            activeArticle={activeArticle}
            onSelect={onSelect}
          />
        </div>
      </aside>
    </>
  );
};
