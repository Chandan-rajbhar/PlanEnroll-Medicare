import React from 'react';
import { useApp } from '../context/AppContext';
import { MedicarePlan } from '../types';
import { 
  Star, 
  Bookmark, 
  Check, 
  Info, 
  ShieldCheck, 
  Heart, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PlanCardProps {
  plan: MedicarePlan;
  onOpenDetails?: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onOpenDetails }) => {
  const { 
    comparePlanIds, 
    toggleComparePlan, 
    savedPlanIds, 
    toggleSavePlan, 
    openPlanDetails,
    navigateTo,
    calculatePlanAnnualCost,
    submitQuoteRequest,
    userProfile
  } = useApp();

  const isCompared = comparePlanIds.includes(plan.id);
  const isSaved = savedPlanIds.includes(plan.id);
  const estAnnualCost = calculatePlanAnnualCost(plan);

  const handleDetailsClick = () => {
    if (onOpenDetails) {
      onOpenDetails();
    } else {
      openPlanDetails(plan);
    }
  };

  const handleGetQuoteClick = () => {
    submitQuoteRequest({
      planId: plan.id,
      planName: plan.name,
      carrier: plan.carrier,
      monthlyPremium: plan.monthlyPremium,
      zipCode: plan.zipCodes[0] || '75080',
      userName: userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Prospective Beneficiary',
      userEmail: userProfile ? userProfile.email : 'user@example.com',
      userPhone: userProfile ? userProfile.phone : '(971) 752-9054',
      preferredContactTime: 'Morning (9am - 12pm)',
      notes: `Interested in enrollment and verifying drug coverage for ${plan.name}`
    });
    navigateTo('saved-plans');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between">
      {/* Top Header Row: Carrier Info, Compare Button & Bookmark */}
      <div className="p-3.5 pb-2.5 flex items-start justify-between gap-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <img
            src={plan.carrierLogo}
            alt={plan.carrier}
            className="w-9 h-9 rounded-xl object-cover border border-slate-200/80 shadow-2xs shrink-0 bg-white"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-900 leading-tight truncate">{plan.carrier}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 leading-none">
                {plan.planType}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block truncate mt-0.5">
              Contract {plan.contractId}
            </span>
          </div>
        </div>

        {/* Top Right Action Cluster: Compare & Bookmark */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => toggleComparePlan(plan.id)}
            className={`h-7 px-2 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isCompared
                ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-600'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
          >
            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] transition-colors ${
              isCompared ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
            }`}>
              {isCompared && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </span>
            <span className="text-[11px]">Compare</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSavePlan(plan.id)}
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isSaved
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-slate-50 hover:bg-blue-50/60 border-slate-200/80 text-slate-400 hover:text-blue-600'
            }`}
            title={isSaved ? 'Bookmarked' : 'Save plan'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3.5 pt-2.5 space-y-2.5">
        {/* Plan Title & Subtype */}
        <div>
          <h4 
            onClick={handleDetailsClick}
            className="font-bold text-sm sm:text-[15px] text-slate-900 leading-snug hover:text-blue-700 cursor-pointer transition-colors"
          >
            {plan.name}
          </h4>
          {plan.subType && (
            <span className="text-[11px] text-blue-700 font-medium block mt-0.5">
              {plan.subType}
            </span>
          )}
        </div>

        {/* Star Rating Row */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.floor(plan.starRating)
                    ? 'fill-amber-400'
                    : star - plan.starRating <= 0.5
                    ? 'fill-amber-400/50'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-slate-900 text-[11px]">{plan.starRating.toFixed(1)}</span>
          <span className="text-slate-300 text-[10px]">•</span>
          <span 
            onClick={handleDetailsClick}
            className="text-slate-500 hover:text-blue-600 text-[10px] font-medium cursor-pointer"
          >
            Medicare Star Rating
          </span>
        </div>

        {/* Unified Financial Metrics Section (Blue-and-White Theme) */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 space-y-2.5">
          {/* Top row: Monthly Premium & Deductibles */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Monthly plan premium
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ${plan.monthlyPremium.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-medium">/mo</span>
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <div className="text-[11px] text-slate-600 font-medium">
                Deductible: <span className="font-bold text-slate-900">${plan.medicalDeductible}</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                Max OOP: <span className="font-bold text-slate-900">${plan.maxOutOfPocket.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Integrated Est. Annual Cost Banner */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Total Est. Annual Cost:
              </span>
              <span className="text-xs font-black text-blue-700">
                ${estAnnualCost.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => navigateTo('personalized-quote')}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors cursor-pointer"
            >
              Edit preferences
            </button>
          </div>
        </div>

        {/* Benefits Highlights Chips (Consistent Blue & White Palette) */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {plan.benefits.dental.covered && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50/80 text-blue-800 text-[10px] font-semibold border border-blue-200/60">
              <Sparkles className="w-2.5 h-2.5 text-blue-600" />
              <span>Dental</span>
            </span>
          )}
          {plan.benefits.vision.covered && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50/80 text-blue-800 text-[10px] font-semibold border border-blue-200/60">
              <Eye className="w-2.5 h-2.5 text-blue-600" />
              <span>Vision</span>
            </span>
          )}
          {plan.benefits.hearing.covered && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50/80 text-blue-800 text-[10px] font-semibold border border-blue-200/60">
              <Heart className="w-2.5 h-2.5 text-blue-600" />
              <span>Hearing</span>
            </span>
          )}
          {plan.prescriptionDrugCoverage && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50/80 text-blue-800 text-[10px] font-semibold border border-blue-200/60">
              <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
              <span>Part D Drug Included</span>
            </span>
          )}
        </div>

        {/* Compact, Properly Aligned Action Buttons Footer */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={handleDetailsClick}
            className="h-8.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Plan Details</span>
          </button>

          <button
            onClick={handleGetQuoteClick}
            className="h-8.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>Add to Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
