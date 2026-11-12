import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeftRight, 
  Trash2, 
  Plus, 
  X, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const PlanComparisonScreen: React.FC = () => {
  const { 
    comparePlanIds, 
    toggleComparePlan, 
    clearComparison, 
    plans, 
    navigateTo, 
    openPlanDetails,
    submitQuoteRequest,
    userProfile
  } = useApp();

  const comparedPlans = plans.filter(p => comparePlanIds.includes(p.id));

  const handleEnroll = (plan: any) => {
    submitQuoteRequest({
      planId: plan.id,
      planName: plan.name,
      carrier: plan.carrier,
      monthlyPremium: plan.monthlyPremium,
      zipCode: plan.zipCodes[0] || '75080',
      userName: userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Beneficiary',
      userEmail: userProfile ? userProfile.email : 'user@example.com',
      userPhone: userProfile ? userProfile.phone : '(971) 752-9054',
      preferredContactTime: 'Morning',
      notes: `Comparison enrollment inquiry for ${plan.name}`
    });
    navigateTo('saved-plans');
  };

  const minPremium = comparedPlans.length > 0 
    ? Math.min(...comparedPlans.map(p => p.monthlyPremium)) 
    : 0;

  return (
    <div className="pb-28 space-y-3.5">
      {/* Top Header Row */}
      <div className="px-4 pt-3 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
              Side-by-Side Comparison
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 leading-tight mt-1">
            Compare Medicare Plans
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {comparedPlans.length} of 4 plans selected for comparison
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {comparedPlans.length < 4 && comparedPlans.length > 0 && (
            <button
              onClick={() => navigateTo('plan-search')}
              className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-xl border border-blue-200/90 transition-colors active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add ({4 - comparedPlans.length} left)</span>
            </button>
          )}

          {comparedPlans.length > 0 && (
            <button
              onClick={clearComparison}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl border border-rose-200 transition-colors shrink-0 active:scale-95 cursor-pointer"
              title="Clear all compared plans"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {comparedPlans.length === 0 ? (
        <div className="mx-4 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3.5 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
            <ArrowLeftRight className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Plans Selected for Comparison</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Check the <strong className="text-slate-800">"Add to compare"</strong> box on any Medicare plan card to view their premiums, copays, and benefits side-by-side.
          </p>
          <button
            onClick={() => navigateTo('plan-search')}
            className="py-2.5 px-4 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-md inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Browse Plans to Compare</span>
          </button>
        </div>
      ) : (
        <div className="px-3.5 space-y-3">
          {/* Stacked Mobile Cards Breakdown */}
          {comparedPlans.map((plan) => {
            const isLowestPremium = plan.monthlyPremium === minPremium && comparedPlans.length > 1;

            return (
              <div 
                key={plan.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3 relative hover:border-blue-200 transition-all"
              >
                {/* Card Top: Carrier Logo + Info + Remove X Button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <img
                      src={plan.carrierLogo}
                      alt={plan.carrier}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0 mt-0.5"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {plan.planType}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">{plan.carrier}</span>
                        <span className="text-[10px] text-slate-400">Contract {plan.contractId}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mt-1 leading-snug">
                        {plan.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{plan.starRating.toFixed(1)} Stars Medicare Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 gap-1.5">
                    {/* Remove from comparison button */}
                    <button
                      onClick={() => toggleComparePlan(plan.id)}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                      title="Remove from comparison"
                      aria-label="Remove plan"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-600 block leading-tight">
                        ${plan.monthlyPremium.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/month</span>
                      {isLowestPremium && (
                        <span className="inline-block mt-0.5 text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                          Lowest Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Cost & Copays Highlights Grid */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Med. Deductible</span>
                    <span className="font-bold text-slate-800 text-xs">${plan.medicalDeductible}</span>
                  </div>
                  <div className="border-x border-slate-200/80">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Max Out-of-Pocket</span>
                    <span className="font-bold text-slate-800 text-xs">${plan.maxOutOfPocket.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">PCP Visit</span>
                    <span className="font-bold text-emerald-700 text-xs">{plan.copays.primaryCareDoctor}</span>
                  </div>
                </div>

                {/* Benefits Pills */}
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {plan.benefits.dental && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-100 flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>Dental: {plan.benefits.dental.cost}</span>
                    </span>
                  )}
                  {plan.benefits.vision && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Vision: {plan.benefits.vision.cost}</span>
                    </span>
                  )}
                  {plan.benefits.hearing && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-100 flex items-center gap-1">
                      <Check className="w-3 h-3 text-purple-600" />
                      <span>Hearing: {plan.benefits.hearing.cost}</span>
                    </span>
                  )}
                  {plan.prescriptionDrugCoverage && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-100 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-600" />
                      <span>Rx Drug Coverage Included</span>
                    </span>
                  )}
                </div>

                {/* Actions: View Details & Get Quote */}
                <div className="flex gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => openPlanDetails(plan)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center transition-all active:scale-95 cursor-pointer"
                  >
                    View All Details
                  </button>
                  <button
                    onClick={() => handleEnroll(plan)}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold text-center shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Get Official Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add Another Plan Slot */}
          {comparedPlans.length < 4 && (
            <div 
              onClick={() => navigateTo('plan-search')}
              className="border-2 border-dashed border-blue-200 hover:border-blue-300 bg-blue-50/30 hover:bg-blue-50/60 rounded-3xl p-4 text-center cursor-pointer transition-all active:scale-[0.99] flex flex-col items-center justify-center gap-1.5"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-900">Add Another Plan to Compare</span>
              <span className="text-[10px] text-blue-600">
                You can compare up to {4 - comparedPlans.length} more plan{4 - comparedPlans.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
