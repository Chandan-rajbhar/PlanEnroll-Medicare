import React from 'react';
import { useApp } from '../context/AppContext';
import { PlanDetailModal } from '../components/PlanDetailModal';
import { MEDICARE_PLANS } from '../data/medicarePlansData';
import { ArrowLeft, Layers } from 'lucide-react';

export const PlanDetailsScreen: React.FC = () => {
  const { selectedPlanForDetails, navigateTo, plans } = useApp();

  const plan = selectedPlanForDetails || plans[0] || MEDICARE_PLANS[0];

  return (
    <div className="pb-10">
      {/* Fallback back button bar */}
      <div className="px-4 py-2 bg-slate-100 flex items-center justify-between border-b border-slate-200 text-xs">
        <button
          onClick={() => navigateTo('plan-search')}
          className="flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Plans</span>
        </button>

        <span className="text-slate-500 font-medium">Viewing Plan Details</span>
      </div>

      <PlanDetailModal
        plan={plan}
        onClose={() => navigateTo('plan-search')}
      />
    </div>
  );
};

