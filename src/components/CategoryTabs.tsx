import React from 'react';
import { useApp } from '../context/AppContext';
import { PlanCategory } from '../types';

interface TabItem {
  id: PlanCategory;
  label: string;
  badge?: string;
}

export const CategoryTabs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { selectedCategory, setSelectedCategory, plans } = useApp();

  const getPlanCount = (cat: PlanCategory) => {
    if (cat === 'all') return plans.length;
    return plans.filter(p => p.category === cat).length;
  };

  const tabs: TabItem[] = [
    { id: 'all', label: 'All Plans', badge: `${getPlanCount('all')}` },
    { id: 'medicare-advantage', label: 'Medicare Advantage', badge: `${getPlanCount('medicare-advantage')}` },
    { id: 'medicare-supplement', label: 'Medicare Supplement', badge: `${getPlanCount('medicare-supplement')}` },
    { id: 'prescription-drug', label: 'Prescription Drug Plans', badge: `${getPlanCount('prescription-drug')}` },
    { id: 'special-needs', label: 'Special Needs Plans', badge: `${getPlanCount('special-needs')}` },
  ];

  return (
    <div className={`overflow-x-auto no-scrollbar py-2.5 px-4 ${className}`}>
      <div className="flex items-center gap-2 min-w-max">
        {tabs.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                isSelected
                  ? 'bg-[#0F2544] text-white shadow-md ring-2 ring-blue-900/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

