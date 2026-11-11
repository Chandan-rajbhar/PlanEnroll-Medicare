import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MedicarePlan } from '../types';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Info, 
  PhoneCall, 
  Building2, 
  Pill, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Bookmark,
  Share2
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
  const isSaved = savedPlanIds.includes(plan.id);
  const isCompared = comparePlanIds.includes(plan.id);

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

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 overflow-hidden animate-in fade-in">
      <div className="bg-white text-slate-900 w-full h-[94%] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Sticky Header */}
        <div className="bg-[#0F2544] text-white p-4 shrink-0 flex items-start justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <img
              src={plan.carrierLogo}
              alt={plan.carrier}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-blue-200">{plan.carrier}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-800 text-cyan-300 font-bold">
                  {plan.planType}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {plan.name}
              </h3>
              <span className="text-[10px] text-blue-300 font-medium">
                Contract ID: {plan.contractId} • Plan Year {plan.effectiveYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleSavePlan(plan.id)}
              className={`p-2 rounded-full ${isSaved ? 'text-amber-400 bg-blue-800' : 'text-blue-200 hover:bg-blue-800'}`}
              title={isSaved ? 'Saved' : 'Save Plan'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-blue-200 hover:bg-blue-800 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cost Summary Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 grid grid-cols-3 gap-2 text-center shrink-0">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Monthly Premium</span>
            <span className="text-lg font-black text-emerald-600 block">
              ${plan.monthlyPremium.toFixed(2)}
            </span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Med. Deductible</span>
            <span className="text-lg font-black text-slate-800 block">
              ${plan.medicalDeductible}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Out-of-Pocket Max</span>
            <span className="text-lg font-black text-slate-800 block">
              ${plan.maxOutOfPocket.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-white shrink-0">
          {[
            { id: 'benefits', label: 'Benefits & Perks' },
            { id: 'copays', label: 'Doctor & Copays' },
            { id: 'drugs', label: 'Rx Formularies' },
            { id: 'network', label: 'Provider Network' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700 bg-blue-50/40'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: Benefits & Perks */}
          {activeTab === 'benefits' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Included Supplemental Coverages
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {Object.entries(plan.benefits).map(([key, benefit]) => (
                  <div
                    key={key}
                    className="p-3 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${benefit.covered ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                      {benefit.covered ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{benefit.name}</span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {benefit.cost}
                        </span>
                      </div>
                      {benefit.description && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{benefit.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Copays */}
          {activeTab === 'copays' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Medical & Hospital Cost Sharing
              </h4>

              <div className="space-y-2 bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs">
                {Object.entries(plan.copays).map(([service, copay]) => {
                  const formattedTitle = service
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={service} className="flex justify-between py-1.5 border-b border-slate-200/80 last:border-0">
                      <span className="text-slate-600 font-medium">{formattedTitle}:</span>
                      <span className="font-bold text-slate-900">{copay}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Prescription Drugs */}
          {activeTab === 'drugs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Prescription Drug Tiers (Part D)
                </h4>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  $2,000 Annual Cap
                </span>
              </div>

              {plan.rxTiers && plan.rxTiers.length > 0 ? (
                <div className="space-y-2.5">
                  {plan.rxTiers.map((tier) => (
                    <div key={tier.tier} className="p-3 rounded-2xl border border-slate-200 bg-white">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          Tier {tier.tier}: {tier.tierName}
                        </span>
                        <span className="text-[10px] text-slate-400">30-day vs 90-day</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] bg-slate-50 p-2 rounded-xl">
                        <div>
                          <span className="text-[9px] text-slate-500 block">Pref. Retail</span>
                          <span className="font-bold text-emerald-700">{tier.preferredRetail30Day}</span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[9px] text-slate-500 block">Std. Retail</span>
                          <span className="font-bold text-slate-700">{tier.standardRetail30Day}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block">90-Day Mail</span>
                          <span className="font-bold text-blue-700">{tier.mailOrder90Day}</span>
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
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Provider & Hospital Network
              </h4>

              {plan.networkSize && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
                    <span className="text-xl font-black text-blue-900 block">{plan.networkSize.doctors.toLocaleString()}</span>
                    <span className="text-[10px] text-blue-700 font-medium">Doctors</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                    <span className="text-xl font-black text-emerald-900 block">{plan.networkSize.hospitals}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Hospitals</span>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100">
                    <span className="text-xl font-black text-purple-900 block">{plan.networkSize.pharmacies}</span>
                    <span className="text-[10px] text-purple-700 font-medium">Pharmacies</span>
                  </div>
                </div>
              )}

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Network includes Texas Health Presbyterian, Baylor Scott & White, and Medical City Dallas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Preferred pharmacy status with CVS, Walgreens, and Kroger.</span>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimers & CMS Regulatory Notice */}
          <div className="text-[10px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <p className="font-semibold text-slate-500">Official CMS Notice:</p>
            <p>Every year, Medicare evaluates plans based on a 5-star rating system. Plan availability and benefits can change on January 1 of each year.</p>
          </div>
        </div>

        {/* Fixed Footer CTAs */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2.5">
          <button
            onClick={() => {
              onClose();
              toggleAgentChat(true);
            }}
            className="p-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center shrink-0"
            title="Ask agent about this plan"
          >
            <PhoneCall className="w-5 h-5 text-blue-700" />
          </button>

          <button
            onClick={() => toggleComparePlan(plan.id)}
            className={`py-3 px-3.5 rounded-2xl text-xs font-bold border transition-colors shrink-0 ${
              isCompared
                ? 'bg-blue-100 text-blue-900 border-blue-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isCompared ? 'In Comparison' : 'Compare'}
          </button>

          <button
            onClick={handleEnrollQuote}
            className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-1.5"
          >
            <span>Get Quote & Enroll</span>
          </button>
        </div>
      </div>
    </div>
  );
};

