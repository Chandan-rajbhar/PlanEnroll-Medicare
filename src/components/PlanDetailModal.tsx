import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MedicarePlan } from '../types';
import { 
  X, 
  Check, 
  PhoneCall, 
  CheckCircle2, 
  Bookmark
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
    toggleAgentChat 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'benefits' | 'copays' | 'drugs' | 'network'>('benefits');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const isSaved = savedPlanIds.includes(plan.id);
  const isCompared = comparePlanIds.includes(plan.id);

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleTabClick = (tabId: 'benefits' | 'copays' | 'drugs' | 'network', event: React.MouseEvent<HTMLButtonElement>) => {
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
    { id: 'benefits', label: 'Benefits & Perks' },
    { id: 'copays', label: 'Doctor & Copays' },
    { id: 'drugs', label: 'Rx Formularies' },
    { id: 'network', label: 'Provider Network' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 overflow-hidden overscroll-none animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full h-[92%] sm:h-[90%] max-w-lg rounded-t-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="bg-[#0F2544] pt-2 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Sticky Header */}
        <div className="bg-[#0F2544] text-white px-3.5 pb-3 pt-1 shrink-0 flex items-start justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
            <img
              src={plan.carrierLogo}
              alt={plan.carrier}
              className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-sm shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-blue-200 truncate">{plan.carrier}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-800/80 text-cyan-300 font-bold shrink-0">
                  {plan.planType}
                </span>
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

        {/* 1. Smooth Horizontal Scrolling Category Tabs (Single row, no-wrap) */}
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

        {/* 2. Scrollable Body with Clean Layout & No Scrollbar */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar overscroll-contain px-3.5 py-3 space-y-3">
          {/* TAB 1: Benefits & Perks */}
          {activeTab === 'benefits' && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5">
                Included Supplemental Coverages
              </h4>

              <div className="grid grid-cols-1 gap-2">
                {Object.entries(plan.benefits).map(([key, benefit]) => (
                  <div
                    key={key}
                    className="p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:border-blue-200 transition-all flex items-start gap-2.5"
                  >
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${benefit.covered ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60' : 'bg-slate-100 text-slate-400'}`}>
                      {benefit.covered ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <span className="text-xs font-bold text-slate-900 leading-snug">{benefit.name}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
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
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5">
                Medical & Hospital Cost Sharing
              </h4>

              <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-2xs text-xs divide-y divide-slate-100">
                {Object.entries(plan.copays).map(([service, copay]) => {
                  const formattedTitle = service
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={service} className="flex justify-between items-center py-2 first:pt-0 last:pb-0 gap-2">
                      <span className="text-slate-600 font-medium text-[11px] leading-tight">{formattedTitle}</span>
                      <span className="font-bold text-slate-900 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-lg shrink-0 text-xs">{copay}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Prescription Drugs */}
          {activeTab === 'drugs' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Prescription Drug Tiers (Part D)
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  $2,000 Annual Cap
                </span>
              </div>

              {plan.rxTiers && plan.rxTiers.length > 0 ? (
                <div className="space-y-2">
                  {plan.rxTiers.map((tier) => (
                    <div key={tier.tier} className="p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
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
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5">
                Provider & Hospital Network
              </h4>

              {plan.networkSize && (
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-blue-50/70 p-2 rounded-2xl border border-blue-100">
                    <span className="text-base sm:text-lg font-black text-blue-900 block leading-tight">{plan.networkSize.doctors.toLocaleString()}</span>
                    <span className="text-[10px] text-blue-700 font-medium">Doctors</span>
                  </div>
                  <div className="bg-emerald-50/70 p-2 rounded-2xl border border-emerald-100">
                    <span className="text-base sm:text-lg font-black text-emerald-900 block leading-tight">{plan.networkSize.hospitals}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Hospitals</span>
                  </div>
                  <div className="bg-purple-50/70 p-2 rounded-2xl border border-purple-100">
                    <span className="text-base sm:text-lg font-black text-purple-900 block leading-tight">{plan.networkSize.pharmacies}</span>
                    <span className="text-[10px] text-purple-700 font-medium">Pharmacies</span>
                  </div>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] leading-snug">Network includes Texas Health Presbyterian, Baylor Scott & White, and Medical City Dallas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] leading-snug">Preferred pharmacy status with CVS, Walgreens, and Kroger.</span>
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

        {/* Compact, Properly Sized Bottom Action Bar */}
        <div className="py-2 px-3 bg-white border-t border-slate-200/80 shrink-0 flex items-center justify-between gap-2 shadow-[0_-2px_8px_rgba(0,0,0,0.03)] z-10">
          <div className="flex items-center gap-1.5">
            {/* Call Agent Button */}
            <button
              onClick={() => {
                onClose();
                toggleAgentChat(true);
              }}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
              title="Ask agent about this plan"
              aria-label="Call or chat with agent"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
            </button>

            {/* Compare Button */}
            <button
              onClick={() => toggleComparePlan(plan.id)}
              className={`h-8 px-2.5 rounded-lg text-[10px] font-bold border transition-all shrink-0 active:scale-95 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                isCompared
                  ? 'bg-blue-50 text-blue-900 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isCompared ? 'In Comparison' : 'Compare'}
            </button>
          </div>

          {/* Primary CTA: Get Quote & Enroll - Compact Size */}
          <button
            onClick={handleEnrollQuote}
            className="h-8 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-[11px] transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>Get Quote & Enroll</span>
          </button>
        </div>

      </div>
    </div>
  );
};
