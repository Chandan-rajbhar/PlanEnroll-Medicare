import React from 'react';
import { useApp } from '../context/AppContext';
import { PlanCard } from '../components/PlanCard';
import {
  Bookmark,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SavedPlansScreen: React.FC = () => {
  const {
    savedPlanIds,
    plans,
    navigateTo,
    clearComparison,
    toggleComparePlan
  } = useApp();

  const savedPlans = plans.filter(p => savedPlanIds.includes(p.id));

  const handleCompareAllSaved = () => {
    clearComparison();
    savedPlans.slice(0, 4).forEach(p => toggleComparePlan(p.id));
    navigateTo('plan-comparison');
  };

  return (
    <div className="pb-28 px-3.5 pt-3 space-y-3.5">
      {/* Top Header Row with Compact Bookmarked Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
            Saved Plans
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug truncate">
            Your bookmarked Medicare plans
          </p>
        </div>
      </div>

      {/* Saved Plans List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-blue-700" />
            <span>Bookmarked Plans ({savedPlans.length})</span>
          </h3>

          {savedPlans.length > 1 && (
            <button
              onClick={handleCompareAllSaved}
              className="text-[10px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-blue-50/80 px-2 py-0.5 rounded-lg border border-blue-200/60 transition-colors active:scale-95 cursor-pointer"
            >
              <span>Compare All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {savedPlans.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 text-center space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">No Saved Plans Yet</h3>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                Tap the bookmark icon on any plan card to save it for quick review and comparison.
              </p>
            </div>
            <button
              onClick={() => navigateTo('plan-search')}
              className="py-1.5 px-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Browse Plans</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {savedPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
