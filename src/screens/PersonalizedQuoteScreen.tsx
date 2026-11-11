import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlanDiscoveryWizard } from '../components/PlanDiscoveryWizard';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Stethoscope, 
  Pill, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall,
  DollarSign
} from 'lucide-react';

export const PersonalizedQuoteScreen: React.FC = () => {
  const { 
    zipCode, 
    countyState, 
    effectiveDate, 
    coveragePreference, 
    userDoctorIds, 
    userPrescriptions,
    filteredPlans,
    submitQuoteRequest,
    userProfile,
    navigateTo,
    calculatePlanAnnualCost,
    toggleAgentChat
  } = useApp();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [preferredContact, setPreferredContact] = useState('Morning (9am - 12pm)');
  const [notes, setNotes] = useState('Looking to verify doctor network and minimize prescription out-of-pocket costs.');

  const topPlan = filteredPlans[0];
  const estAnnualCost = topPlan ? calculatePlanAnnualCost(topPlan) : 731;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topPlan) return;

    submitQuoteRequest({
      planId: topPlan.id,
      planName: topPlan.name,
      carrier: topPlan.carrier,
      monthlyPremium: topPlan.monthlyPremium,
      zipCode,
      userName: userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Beneficiary',
      userEmail: userProfile ? userProfile.email : 'user@example.com',
      userPhone: userProfile ? userProfile.phone : '(971) 752-9054',
      preferredContactTime: preferredContact,
      notes
    });

    setIsSubmitted(true);
  };

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Personalized Medicare Quote
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          Your Customized Coverage Estimate
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Calculated for {zipCode} ({countyState}) with your selected doctors and medications.
        </p>
      </div>

      {/* Summary Profile Box */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Your Profile & Preferences
          </h3>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            Edit Preferences
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Service Area</span>
            <span className="font-bold text-slate-800">{zipCode} ({countyState})</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Effective Date</span>
            <span className="font-bold text-slate-800">{effectiveDate}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Doctors Verified</span>
            <span className="font-bold text-emerald-700">{userDoctorIds.length} in network</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Medications Checked</span>
            <span className="font-bold text-blue-700">{userPrescriptions.length} formularized</span>
          </div>
        </div>
      </div>

      {/* Top Matching Plan Projection */}
      {topPlan && (
        <div className="bg-gradient-to-br from-[#0F2544] to-blue-900 rounded-3xl p-5 text-white shadow-lg space-y-4">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
              #1 Top Match for You
            </span>
            <span className="text-xs font-bold text-blue-200">{topPlan.carrier}</span>
          </div>

          <div>
            <h3 className="text-base font-black text-white leading-tight">{topPlan.name}</h3>
            <p className="text-xs text-blue-200 mt-0.5">{topPlan.planType} • Contract {topPlan.contractId}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-blue-800/80">
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] text-blue-200 block uppercase">Monthly Premium</span>
              <span className="text-xl font-black text-emerald-400">${topPlan.monthlyPremium.toFixed(2)}</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] text-blue-200 block uppercase">Est. Annual Cost</span>
              <span className="text-xl font-black text-amber-300">${estAnnualCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Official Quote Submission Form */}
      {isSubmitted ? (
        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-emerald-950">Quote Request Submitted!</h3>
          <p className="text-xs text-emerald-800 max-w-xs mx-auto">
            A licensed Medicare specialist will contact you at your preferred time to verify doctor participation and finalize enrollment options.
          </p>
          <button
            onClick={() => navigateTo('saved-plans')}
            className="py-2.5 px-4 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-sm"
          >
            View Saved Plans & Quotes
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Request Official Carrier Quote Summary
          </h3>

          <form onSubmit={handleSubmitQuote} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Contact Window</label>
              <select
                value={preferredContact}
                onChange={(e) => setPreferredContact(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              >
                <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                <option value="Evening (4pm - 7pm)">Evening (4pm - 7pm)</option>
                <option value="Saturday Morning">Saturday Morning</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Notes / Questions for Agent</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit for Official Plan Quote</span>
            </button>
          </form>
        </div>
      )}

      {/* Discovery Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto">
          <div className="w-full max-w-[380px] my-auto">
            <PlanDiscoveryWizard
              onComplete={() => setIsWizardOpen(false)}
              onCancel={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

