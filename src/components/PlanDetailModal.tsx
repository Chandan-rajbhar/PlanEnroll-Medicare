import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MedicarePlan } from '../types';
import { 
  X, 
  Check, 
  PhoneCall, 
  CheckCircle2, 
  Bookmark,
  Star,
  ShieldCheck,
  Building2,
  Stethoscope,
  Pill,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  plan: MedicarePlan;
  onClose: () => void;
}

export const PlanDetailModal: React.FC<Props> = ({ plan, onClose }) => {
  const { 
    savedPlanIds, 
    toggleSavePlan, 
    comparePlanIds, 
    toggleComparePlan, 
    submitQuoteRequest, 
    userProfile, 
    navigateTo,
    calculatePlanAnnualCost,
    toggleAgentChat 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'copays' | 'drugs' | 'network'>('overview');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const isSaved = savedPlanIds.includes(plan.id);
  const isCompared = comparePlanIds.includes(plan.id);
  const estAnnualCost = calculatePlanAnnualCost(plan);

  // Prevent background page scrolling when modal is open and enable mouse wheel horizontal scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const tabsEl = tabsContainerRef.current;
    const onTabsWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      if (tabsEl && tabsEl.scrollWidth > tabsEl.clientWidth) {
        e.preventDefault();
        tabsEl.scrollLeft += delta * 1.1;
      }
    };

    if (tabsEl) {
      tabsEl.addEventListener('wheel', onTabsWheel, { passive: false });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (tabsEl) {
        tabsEl.removeEventListener('wheel', onTabsWheel);
      }
    };
  }, []);

  const handleTabClick = (tabId: 'overview' | 'benefits' | 'copays' | 'drugs' | 'network', event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(tabId);
    event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const handleEnrollQuote = () => {
    submitQuoteRequest({
      planId: plan.id,
      planName: plan.name,
      carrier: plan.carrier,
      monthlyPremium: plan.monthlyPremium,
      zipCode: plan.zipCodes[0] || '75080',
      userName: userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Beneficiary',
      userEmail: userProfile ? userProfile.email : 'user@example.com',
      userPhone: userProfile ? userProfile.phone : '(971) 752-9054',
      preferredContactTime: 'Anytime',
      notes: `Application for ${plan.name} (${plan.contractId})`
    });
    onClose();
    navigateTo('saved-plans');
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Highlights' },
    { id: 'benefits', label: 'Benefits & Perks' },
    { id: 'copays', label: 'Doctor & Copays' },
    { id: 'drugs', label: 'Rx Formularies' },
    { id: 'network', label: 'Provider Network' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 overflow-hidden overscroll-none animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full h-[94%] sm:h-[90%] max-w-lg rounded-t-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="bg-[#0F2544] pt-2 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Sticky Header */}
        <div className="bg-[#0F2544] text-white px-4 pb-3 pt-1 shrink-0 flex items-start justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
            <img
              src={plan.carrierLogo}
              alt={plan.carrier}
              className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-sm shrink-0 bg-white"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-blue-200 truncate">{plan.carrier}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-800/80 text-cyan-300 font-bold shrink-0">
                  {plan.planType}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-white">{plan.starRating.toFixed(1)}</span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug truncate">
                {plan.name}
              </h3>
              <span className="text-[10px] text-blue-300/80 font-medium block truncate">
                Contract ID: {plan.contractId} • Plan Year {plan.effectiveYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => toggleSavePlan(plan.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isSaved ? 'text-amber-400 bg-white/15' : 'text-blue-200 bg-white/10 hover:bg-white/20'
              }`}
              title={isSaved ? 'Saved' : 'Save Plan'}
              aria-label="Save Plan"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-blue-200 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cost Summary Banner - Modern Compact Metrics */}
        <div className="bg-slate-50/90 border-b border-slate-200/80 px-3 py-2 grid grid-cols-3 gap-1.5 text-center shrink-0">
          <div className="bg-white rounded-xl py-1.5 px-1 border border-slate-200/60 shadow-2xs">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Monthly Premium</span>
            <span className="text-base font-black text-emerald-600 block leading-tight mt-0.5">
              ${plan.monthlyPremium.toFixed(2)}
            </span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-1 border border-slate-200/60 shadow-2xs">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Med. Deductible</span>
            <span className="text-base font-black text-slate-800 block leading-tight mt-0.5">
              ${plan.medicalDeductible}
            </span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-1 border border-slate-200/60 shadow-2xs">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Out-of-Pocket Max</span>
            <span className="text-base font-black text-slate-800 block leading-tight mt-0.5">
              ${plan.maxOutOfPocket.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 1. Smooth Horizontal Scrolling Category Tabs */}
        <div 
          ref={tabsContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto scroll-smooth overscroll-x-contain touch-pan-x no-scrollbar px-3 py-2 bg-white border-b border-slate-100 shrink-0 flex-nowrap"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(tab.id, e)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer select-none ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2. Scrollable Body with Clean Layout */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar overscroll-contain px-3.5 py-3 space-y-3.5">
          {/* TAB 0: Overview & Highlights */}
          {activeTab === 'overview' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {/* Annual Cost Breakdown Card */}
              <div className="p-3 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 rounded-2xl border border-blue-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Estimated Total Annual Expense</span>
                  </div>
                  <span className="text-base font-black text-blue-700">${estAnnualCost.toLocaleString()}/yr</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] pt-1 border-t border-blue-200/60">
                  <div className="p-1 bg-white/80 rounded-lg">
                    <span className="text-slate-500 block">Annual Premium</span>
                    <span className="font-bold text-slate-800">${(plan.monthlyPremium * 12).toFixed(0)}</span>
                  </div>
                  <div className="p-1 bg-white/80 rounded-lg">
                    <span className="text-slate-500 block">Rx Drug Deductible</span>
                    <span className="font-bold text-slate-800">${plan.drugDeductible}</span>
                  </div>
                  <div className="p-1 bg-white/80 rounded-lg">
                    <span className="text-slate-500 block">Safety OOP Max</span>
                    <span className="font-bold text-emerald-700">${plan.maxOutOfPocket.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Top Plan Highlights */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Plan Highlights</span>
                </h4>
                <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-2">
                  {(plan.summaryHighlights && plan.summaryHighlights.length > 0 ? plan.summaryHighlights : [
                    '$0 Medical Deductible for covered hospital and medical services',
                    'Comprehensive Dental Allowance up to $2,000/year',
                    'SilverSneakers Fitness Program included at no charge',
                    'Worldwide Emergency & Urgent Care Coverage',
                    '24/7 On-Demand Telehealth Virtual Doctor Visits',
                    'Over-the-Counter (OTC) quarterly health allowance'
                  ]).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & CMS Star Rating Details */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>CMS Star Rating & Quality Details</span>
                </h4>
                <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="font-bold text-xs text-slate-900">{plan.starRating.toFixed(1)} / 5.0 Overall</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      {plan.starRating >= 4.5 ? 'Excellent' : 'High Quality'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex justify-between items-center p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Customer Service:</span>
                      <span className="font-bold text-slate-900">5.0 ★</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Member Retention:</span>
                      <span className="font-bold text-slate-900">4.8 ★</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Drug Safety:</span>
                      <span className="font-bold text-slate-900">4.9 ★</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Care Coordination:</span>
                      <span className="font-bold text-slate-900">5.0 ★</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Administrative Identifiers */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/70 text-xs space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official CMS Identifiers</span>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                  <div>Contract ID: <span className="font-bold text-slate-900">{plan.contractId}</span></div>
                  <div>Plan ID: <span className="font-bold text-slate-900">{plan.cmsPlanId || '001'}</span></div>
                  <div>Network Type: <span className="font-bold text-slate-900">{plan.planType}</span></div>
                  <div>Effective Year: <span className="font-bold text-slate-900">{plan.effectiveYear}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: Benefits & Perks */}
          {activeTab === 'benefits' && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Included Supplemental Coverages
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  Included at $0 Extra Premium
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {Object.entries(plan.benefits).map(([key, benefit]) => (
                  <div
                    key={key}
                    className="p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:border-blue-200 transition-all flex items-start gap-2.5"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${benefit.covered ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60' : 'bg-slate-100 text-slate-400'}`}>
                      {benefit.covered ? <Check className="w-4 h-4 stroke-[2.5]" /> : <X className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 leading-snug">{benefit.name}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0">
                          {benefit.cost}
                        </span>
                      </div>
                      {benefit.description && (
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{benefit.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Copays */}
          {activeTab === 'copays' && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Medical & Hospital Cost Sharing
                </h4>
                <span className="text-[10px] text-slate-500 font-semibold">
                  In-Network Rates
                </span>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs text-xs divide-y divide-slate-100">
                {Object.entries(plan.copays).map(([service, copay]) => {
                  const formattedTitle = service
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={service} className="flex justify-between items-center py-2 first:pt-0 last:pb-0 gap-2">
                      <span className="text-slate-600 font-medium text-[11px] leading-tight">{formattedTitle}</span>
                      <span className="font-bold text-slate-900 bg-slate-50 border border-slate-200/60 px-2.5 py-0.5 rounded-lg shrink-0 text-xs">{copay}</span>
                    </div>
                  );
                })}
              </div>

              {/* Extra Cost Information Box */}
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Deductible & Out-of-Pocket Rules</span>
                </div>
                <p className="text-[11px] text-blue-800/90 leading-snug">
                  Medical Deductible is <span className="font-bold">${plan.medicalDeductible}</span>. Once your annual eligible medical copays reach the Out-of-Pocket Maximum of <span className="font-bold">${plan.maxOutOfPocket.toLocaleString()}</span>, the plan pays 100% of all covered in-network medical services for the remainder of the plan year.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Prescription Drugs */}
          {activeTab === 'drugs' && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Prescription Drug Tiers (Part D)
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  $2,000 Annual Cap
                </span>
              </div>

              {/* 2026 Inflation Reduction Act Pill Notice */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <Pill className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2026 Medicare Part D Cap & Insulin Protection</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-snug">
                  Under federal law, your total out-of-pocket costs for Part D prescription drugs will never exceed <span className="font-bold">$2,000/year</span>. All covered insulin is capped at a maximum of <span className="font-bold">$35/month</span>.
                </p>
              </div>

              {plan.rxTiers && plan.rxTiers.length > 0 ? (
                <div className="space-y-2">
                  {plan.rxTiers.map((tier) => (
                    <div key={tier.tier} className="p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          Tier {tier.tier}: {tier.tierName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Standard vs Preferred</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[9px] text-slate-500 block font-medium">Pref. Retail</span>
                          <span className="font-bold text-emerald-700 text-xs">{tier.preferredRetail30Day}</span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[9px] text-slate-500 block font-medium">Std. Retail</span>
                          <span className="font-bold text-slate-700 text-xs">{tier.standardRetail30Day}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block font-medium">90-Day Mail</span>
                          <span className="font-bold text-blue-700 text-xs">{tier.mailOrder90Day}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                  <p className="text-xs text-amber-800 font-semibold">
                    This Medigap supplemental policy does not cover outpatient prescription drugs.
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    Pair this plan with a standalone Part D Prescription Drug Plan (PDP) like SilverScript or Wellcare.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Network */}
          {activeTab === 'network' && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5">
                Provider & Hospital Network
              </h4>

              {plan.networkSize && (
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-blue-50/70 p-2.5 rounded-2xl border border-blue-100">
                    <span className="text-base sm:text-lg font-black text-blue-900 block leading-tight">{plan.networkSize.doctors.toLocaleString()}</span>
                    <span className="text-[10px] text-blue-700 font-medium">In-Network Doctors</span>
                  </div>
                  <div className="bg-emerald-50/70 p-2.5 rounded-2xl border border-emerald-100">
                    <span className="text-base sm:text-lg font-black text-emerald-900 block leading-tight">{plan.networkSize.hospitals}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Hospitals</span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-2xl border border-purple-100">
                    <span className="text-base sm:text-lg font-black text-purple-900 block leading-tight">{plan.networkSize.pharmacies.toLocaleString()}</span>
                    <span className="text-[10px] text-purple-700 font-medium">Pharmacies</span>
                  </div>
                </div>
              )}

              {/* Major Hospital Partners */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Affiliated Hospital Health Systems</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Texas Health Presbyterian & Baylor Scott & White Health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Medical City Healthcare & Tampa General Hospital</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>AdventHealth System & St. Joseph's Hospitals</span>
                  </div>
                </div>
              </div>

              {/* Preferred Pharmacy Network */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Preferred Pharmacy Retail Partners</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['CVS Pharmacy (Preferred)', 'Walgreens (Preferred)', 'Kroger Pharmacy', 'Walmart Pharmacy', 'Costco / Sam\'s Club'].map((pharmacy, i) => (
                    <span key={i} className="text-[11px] bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg text-slate-700 font-medium">
                      {pharmacy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Disclaimers & CMS Regulatory Notice */}
          <div className="text-[10px] text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 space-y-1">
            <p className="font-semibold text-slate-500">Official CMS Notice:</p>
            <p className="leading-snug">Every year, Medicare evaluates plans based on a 5-star rating system. Plan availability and benefits can change on January 1 of each year.</p>
          </div>
        </div>

        {/* Compact Bottom Action Bar */}
        <div className="py-2.5 px-3.5 bg-white border-t border-slate-200/80 shrink-0 flex items-center justify-between gap-2 shadow-[0_-2px_8px_rgba(0,0,0,0.03)] z-10">
          <div className="flex items-center gap-1.5">
            {/* Call Agent Button */}
            <button
              onClick={() => {
                onClose();
                toggleAgentChat(true);
              }}
              className="w-9 h-9 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
              title="Ask agent about this plan"
              aria-label="Call or chat with agent"
            >
              <PhoneCall className="w-4 h-4 text-blue-700" />
            </button>

            {/* Compare Button */}
            <button
              onClick={() => toggleComparePlan(plan.id)}
              className={`h-9 px-3 rounded-xl text-xs font-bold border transition-all shrink-0 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isCompared
                  ? 'bg-blue-50 text-blue-900 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isCompared ? 'In Comparison' : 'Compare'}
            </button>
          </div>

          {/* Primary CTA: Get Quote & Enroll */}
          <button
            onClick={handleEnrollQuote}
            className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap flex-1 sm:flex-initial"
          >
            <span>Get Quote & Enroll</span>
          </button>
        </div>

      </div>
    </div>
  );
};
