import React from 'react';
import { useApp } from '../context/AppContext';
import { MedicarePlan } from '../types';
import {
  Star,
  Bookmark,
  Check,
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

  const handleGetQuoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      notes: `Interested in enrollment for ${plan.name}`
    });
    navigateTo('saved-plans');
  };

  // Distinct, non-duplicate hero images for each plan
  const DISTINCT_HERO_IMAGES: Record<string, string> = {
    'molina-complete-care-hmo': 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&auto=format&fit=crop&q=80',
    'bcbs-medicare-advantage-value-hmo': 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop&q=80',
    'aetna-medicare-premier-hmo': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80',
    'humana-gold-plus-hmo': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    'mutual-of-omaha-medigap-plan-g': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    'aetna-medigap-plan-n': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    'silverscript-choice-pdp': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    'wellcare-value-script-pdp': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
    'uhc-dual-complete-dsnp': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
    'cigna-diabetes-heart-csnp': 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&auto=format&fit=crop&q=80'
  };

  const heroImage = plan.heroImage || DISTINCT_HERO_IMAGES[plan.id] || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80';

  const isPopular = plan.popular !== undefined ? plan.popular : plan.starRating >= 4.0;

  // Key perks chips for compact summary
  const perks = [
    plan.benefits.dental?.covered ? 'Dental $2k/yr' : null,
    plan.benefits.vision?.covered ? 'Vision $250' : null,
    plan.benefits.hearing?.covered ? 'Hearing Aids' : null,
    plan.prescriptionDrugCoverage ? 'Rx Included' : null,
  ].filter(Boolean) as string[];

  return (
    <div
      onClick={handleDetailsClick}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer group"
    >
      {/* 1. Hero Photo (Increased size for mobile: h-44 / 176px) */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900 select-none">
        <img
          src={heroImage}
          alt={plan.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Plan Type pill & Popular badge on top-left of image */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-slate-900/85 backdrop-blur-md text-white border border-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider">
            {plan.planType}
          </span>
          {isPopular && (
            <span className="bg-emerald-600/90 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
              Popular
            </span>
          )}
        </div>
      </div>

      {/* 2. Compact Card Body */}
      <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Header Row: Plan Name + Compare & Bookmark Action Buttons */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-[15px] text-blue-600 leading-snug group-hover:text-blue-700 transition-colors line-clamp-1">
                {plan.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900 ml-1 text-xs">{plan.starRating.toFixed(1)}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="truncate">Plan {plan.contractId}</span>
              </div>
            </div>

            {/* Action Buttons: Compare Checkbox & Save Bookmark */}
            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
              {/* Compare Checkbox Button */}
              <button
                type="button"
                onClick={() => toggleComparePlan(plan.id)}
                className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 border ${isCompared
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                aria-label={isCompared ? 'Remove from comparison' : 'Add to comparison'}
              >
                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${isCompared
                  ? 'bg-white border-white text-blue-600'
                  : 'border-slate-400 bg-white'
                  }`}>
                  {isCompared && <Check className="w-2.5 h-2.5 stroke-[3.5]" />}
                </span>
              </button>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={() => toggleSavePlan(plan.id)}
                className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 border ${isSaved
                  ? 'bg-blue-50 border-blue-300 text-blue-600 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                title={isSaved ? 'Remove from saved' : 'Save plan'}
                aria-label={isSaved ? 'Remove from saved' : 'Save plan'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-600 stroke-[2.2]'}`} />
              </button>
            </div>
          </div>

          {/* Pricing Row: Monthly Premium & Est Total Cost */}
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 grid grid-cols-2 divide-x divide-slate-200/80">
            <div className="pr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Monthly Premium
              </span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  ${plan.monthlyPremium.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">/mo</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5 truncate">
                {plan.medicalDeductible === 0 ? '$0 Med Deductible' : `$${plan.medicalDeductible} Deductible`}
              </span>
            </div>

            <div className="pl-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Est. Total Cost
              </span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="text-xl font-black text-blue-600 tracking-tight">
                  ${estAnnualCost.toLocaleString()}
                </span>
                <span className="text-[10px] text-blue-500 font-semibold">/yr</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-600 block mt-0.5 truncate">
                Max OOP: ${plan.maxOutOfPocket.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Perks Summary Tags Strip */}
          {perks.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {perks.map((perk, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50/80 text-blue-800 border border-blue-200/60 px-2 py-0.5 rounded-md text-[10px] font-semibold"
                >
                  {perk}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleDetailsClick}
            className="h-9 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-98"
          >
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={handleGetQuoteClick}
            className="h-9 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
          >
            <span>Add to Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
