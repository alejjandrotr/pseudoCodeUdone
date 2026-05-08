import React from 'react';
import { ArrowLeft, Tag } from 'lucide-react';
import { Article } from '../../core/types/article';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  const ArticleContent = article.component;

  return (
    <article className="animate-fade-in">
      {/* Back button + Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-300 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver
        </button>
        <span className="text-slate-700">/</span>
        <span className="text-slate-500 text-sm">{article.category}</span>
        <span className="text-slate-700">/</span>
        <span className="text-sm text-slate-300 font-medium">{article.title}</span>
      </div>

      {/* Article Header */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={14} className="text-brand-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            {article.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3">
          {article.title}
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">{article.summary}</p>
      </div>

      {/* Article Body */}
      <div className="glass-panel p-6 md:p-8">
        <ArticleContent />
      </div>
    </article>
  );
};
