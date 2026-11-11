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
  PhoneCall,
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all overflow-hidden relative">
      {/* Top Header Row: Carrier Info & Compare Checkbox */}
      <div className="p-4 pb-2 border-b border-slate-100 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <img
            src={plan.carrierLogo}
            alt={plan.carrier}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 tracking-tight">{plan.carrier}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                {plan.planType}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Contract {plan.contractId}
            </span>
          </div>
        </div>

        {/* Add to Compare Checkbox (Matching screenshot exact UI) */}
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 transition-colors">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => toggleComparePlan(plan.id)}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-[11px]">Add to compare</span>
        </label>
      </div>

      {/* Main Body */}
      <div className="p-4 pt-3 space-y-3">
        {/* Plan Title & Save Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 
              onClick={handleDetailsClick}
              className="font-bold text-base text-slate-900 leading-snug hover:text-blue-700 cursor-pointer transition-colors"
            >
              {plan.name}
            </h4>
            {plan.subType && (
              <span className="text-[11px] text-blue-700 font-medium">
                {plan.subType}
              </span>
            )}
          </div>
          <button
            onClick={() => toggleSavePlan(plan.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isSaved
                ? 'bg-amber-50 text-amber-500'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
            }`}
            title={isSaved ? 'Saved to bookmarks' : 'Save plan'}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Star Rating Row */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.floor(plan.starRating)
                    ? 'fill-amber-400'
                    : star - plan.starRating <= 0.5
                    ? 'fill-amber-400/50'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-slate-800 text-xs">{plan.starRating.toFixed(1)}</span>
          <span className="text-slate-400 text-[11px] hover:underline cursor-pointer">
            Medicare Star Rating
          </span>
        </div>

        {/* Monthly Premium Display (Prominent green / deep blue text) */}
        <div className="text-center py-1 bg-slate-50/70 rounded-xl border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium block">Monthly plan premium</span>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">
            ${plan.monthlyPremium.toFixed(2)}
          </div>
        </div>

        {/* Action Buttons: Plan details & Add to cart / Get quote (Exact matching Screenshot 4) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleDetailsClick}
            className="py-2 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Plan details</span>
          </button>

          <button
            onClick={handleGetQuoteClick}
            className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 text-xs font-black transition-all text-center flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Add to cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Deductible & Max Out Of Pocket Row */}
        <div className="grid grid-cols-2 gap-2 text-xs py-1 border-t border-b border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 block">Medical Deductible</span>
            <span className="font-bold text-slate-800">
              ${plan.medicalDeductible}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Maximum Annual Out Of Pocket</span>
            <span className="font-bold text-slate-800">
              ${plan.maxOutOfPocket.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Total Est Annual Cost Box (Sky blue box directly from Screenshot 4!) */}
        <div className="bg-[#E1F2FB] rounded-xl p-3 text-center border border-sky-200">
          <span className="text-[11px] text-sky-900 font-semibold uppercase tracking-wider block">
            Total est. annual cost
          </span>
          <span className="text-xl font-black text-emerald-700 block my-0.5">
            ${estAnnualCost.toLocaleString()}
          </span>
          <button
            onClick={() => navigateTo('personalized-quote')}
            className="text-[11px] text-sky-800 hover:text-sky-950 font-bold underline transition-colors cursor-pointer"
          >
            Edit preferences
          </button>
        </div>

        {/* Benefits Highlights Chips */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {plan.benefits.dental.covered && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Dental</span>
            </span>
          )}
          {plan.benefits.vision.covered && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100">
              <Eye className="w-2.5 h-2.5" />
              <span>Vision</span>
            </span>
          )}
          {plan.benefits.hearing.covered && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-100">
              <Heart className="w-2.5 h-2.5" />
              <span>Hearing</span>
            </span>
          )}
          {plan.prescriptionDrugCoverage && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-100">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>Part D Drug Included</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

