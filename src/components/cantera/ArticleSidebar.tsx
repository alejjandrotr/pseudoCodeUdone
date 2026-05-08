import { Article } from '../../core/types/article';
import { 
  ChevronRight, 
  BookOpen, 
  FlaskConical, 
  PlayCircle, 
  CheckCircle2, 
  ClipboardCheck,
  Terminal
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

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  articles,
  activeArticle,
  onSelect,
}) => {
  const grouped = articles.reduce<Record<string, Article[]>>((acc, article) => {
    const cat = article.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {});

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-6">
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
                        onClick={() => onSelect(article)}
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
      </div>
    </aside>
  );
};
