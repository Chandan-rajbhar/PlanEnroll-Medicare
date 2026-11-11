import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_ARTICLES, LearningArticle } from '../data/learningCenterData';
import { 
  BookOpen, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const LearningCenterScreen: React.FC = () => {
  const { navigateTo, toggleAgentChat } = useApp();
  const [selectedArticleId, setSelectedArticleId] = useState<string>(LEARNING_ARTICLES[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Basics', 'Comparison', 'Enrollment', 'Costs'];

  const filteredArticles = LEARNING_ARTICLES.filter(
    a => activeCategory === 'All' || a.category === activeCategory
  );

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Medicare Education & Resources
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          Medicare Learning Center
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Clear, jargon-free explanations to help you navigate your Medicare choices with confidence.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List / Accordion */}
      <div className="space-y-3">
        {filteredArticles.map((article) => {
          const isOpen = selectedArticleId === article.id;
          return (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              <div
                onClick={() => setSelectedArticleId(isOpen ? '' : article.id)}
                className="p-4 cursor-pointer flex items-start justify-between gap-3 hover:bg-slate-50/70"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="p-1 rounded-full text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-blue-700" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-100 space-y-3 text-xs text-slate-700 leading-relaxed bg-slate-50/50">
                  {article.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}

                  {/* Key Takeaways */}
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 space-y-1.5 mt-2">
                    <h4 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                      <span>Key Takeaways:</span>
                    </h4>
                    {article.keyTakeaways.map((takeaway, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-1.5 text-[11px] text-blue-950">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => navigateTo('plan-search')}
                      className="flex-1 py-2 rounded-xl bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <span>Explore Plans</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleAgentChat(true)}
                      className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                    >
                      Ask Agent
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

