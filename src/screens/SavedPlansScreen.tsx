import React from 'react';
import { useApp } from '../context/AppContext';
import { PlanCard } from '../components/PlanCard';
import { 
  Bookmark, 
  Trash2, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
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
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Saved Plans & Quotes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Your bookmarked plans and pending quote applications
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
          {savedPlans.length} Bookmarked
        </span>
      </div>

      {/* Submitted Quotes Section */}
      {quoteRequests.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-700" />
            <span>Active Quote Inquiries ({quoteRequests.length})</span>
          </h3>

          <div className="space-y-2">
            {quoteRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-3.5 border border-blue-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug">{req.planName}</h4>
                    <span className="text-[10px] text-blue-700 font-semibold">{req.carrier} • ${req.monthlyPremium.toFixed(2)}/mo</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{req.status}</span>
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-100">
                  <span>Contact Window: <strong>{req.preferredContactTime}</strong></span>
                  <span>ZIP: <strong>{req.zipCode}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Plans List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Bookmarked Plans
          </h3>

          {savedPlans.length > 1 && (
            <button
              onClick={handleCompareAllSaved}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>Compare All Saved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {savedPlans.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Saved Plans Yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Tap the bookmark icon on any plan card to save it for quick review and comparison.
            </p>
            <button
              onClick={() => navigateTo('plan-search')}
              className="py-2.5 px-4 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>Browse Plans</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

