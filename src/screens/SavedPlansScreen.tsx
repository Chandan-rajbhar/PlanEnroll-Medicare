import React from 'react';
import { useApp } from '../context/AppContext';
import { PlanCard } from '../components/PlanCard';
import { 
  Bookmark, 
  Layers, 
  Clock, 
  ArrowRight,
  FileText
} from 'lucide-react';

export const SavedPlansScreen: React.FC = () => {
  const { 
    savedPlanIds, 
    plans, 
    quoteRequests, 
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
            Saved Plans & Quotes
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug truncate">
            Your bookmarked plans and pending quote applications
          </p>
        </div>

        {/* Reduced & Compact Bookmarked Badge */}
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 shrink-0 whitespace-nowrap flex items-center gap-1 select-none">
          <Bookmark className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
          <span>{savedPlans.length} Bookmarked</span>
        </span>
      </div>

      {/* Submitted Quotes Section */}
      {quoteRequests.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 px-0.5">
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span>Active Quote Inquiries ({quoteRequests.length})</span>
          </h3>

          <div className="space-y-2">
            {quoteRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-2 hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 leading-snug truncate">
                      {req.planName}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[10px] text-blue-700 font-bold">{req.carrier}</span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] font-bold text-emerald-600">${req.monthlyPremium.toFixed(2)}/mo</span>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{req.status}</span>
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1.5 border-t border-slate-100">
                  <span className="truncate">Window: <strong className="text-slate-700 font-semibold">{req.preferredContactTime}</strong></span>
                  <span className="shrink-0 ml-2">ZIP: <strong className="text-slate-700 font-semibold">{req.zipCode}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
