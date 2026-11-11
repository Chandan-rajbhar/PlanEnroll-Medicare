import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS_DATA } from '../data/doctorsData';
import { PHARMACIES_DATA } from '../data/pharmaciesData';
import { PRESCRIPTIONS_DATA } from '../data/prescriptionsData';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  Stethoscope,
  Building2,
  Pill,
  Sparkles,
  Plus,
  Trash2,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface WizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export const PlanDiscoveryWizard: React.FC<WizardProps> = ({ onComplete, onCancel }) => {
  const {
    zipCode,
    setZipCode,
    countyState,
    effectiveDate,
    setEffectiveDate,
    coveragePreference,
    setCoveragePreference,
    userDoctorIds,
    addDoctor,
    removeDoctor,
    userPharmacyIds,
    addPharmacy,
    removePharmacy,
    userPrescriptions,
    addPrescription,
    removePrescription,
    navigateTo
  } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Search states for selection steps
  const [docSearch, setDocSearch] = useState('');
  const [pharmSearch, setPharmSearch] = useState('');
  const [rxSearch, setRxSearch] = useState('');

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      if (onComplete) {
        onComplete();
      } else {
        navigateTo('plan-search');
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200/90 w-full max-w-[380px] mx-auto my-3">
      {/* Stepper Dots (Matching Screenshot 3) */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <span
            key={num}
            className={`transition-all duration-200 rounded-full ${step === num
                ? 'w-7 h-2 bg-blue-700'
                : num < step
                  ? 'w-2 h-2 bg-emerald-500'
                  : 'w-2 h-2 bg-slate-200'
              }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Step {step} of {totalSteps}
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          {step === 1 && 'Where Do You Live?'}
          {step === 2 && 'Coverage Preferences'}
          {step === 3 && 'Medicare Effective Date'}
          {step === 4 && 'Your Preferred Pharmacy'}
          {step === 5 && 'Your Doctors & Providers'}
          {step === 6 && 'Your Prescription Medications'}
          {step === 7 && 'Review & Calculate'}
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          {step === 1 && 'Plan options, pricing, and provider networks depend on your location.'}
          {step === 2 && 'These optional questions help us estimate your potential costs and recommend matching plans.'}
          {step === 3 && 'Select when you want your new Medicare coverage to begin.'}
          {step === 4 && 'Preferred pharmacies offer significantly lower copayments on Tier 1 and Tier 2 drugs.'}
          {step === 5 && 'Ensure your trusted physicians participate in the plan’s provider network.'}
          {step === 6 && 'Add your medications to see exact formulary tier copays and estimated annual costs.'}
          {step === 7 && 'Everything is set! We have calculated personalized plan recommendations for you.'}
        </p>
      </div>

      {/* Step Content */}
      <div className="min-h-[260px] py-2">
        {/* Step 1: ZIP Code */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-blue-900 font-bold block">Current Service Area</span>
                <span className="text-sm font-black text-slate-900">{zipCode} • {countyState}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enter your 5-digit ZIP code:
              </label>
              <input
                type="text"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold text-lg text-slate-900 tracking-wider"
                placeholder="75080"
              />
            </div>

            <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>We use your ZIP code to fetch verified plan contracts in your specific county.</span>
            </div>
          </div>
        )}

        {/* Step 2: Coverage Type (Matching Screenshot 3) */}
        {step === 2 && (
          <div className="space-y-2.5">
            {[
              {
                id: 'medical-only',
                title: 'Medical only',
                desc: 'Hospital and doctor visits without outpatient drug coverage',
                icon: '➕'
              },
              {
                id: 'rx-only',
                title: 'Prescription drug',
                desc: 'Stand-alone Part D drug plan paired with Original Medicare or Medigap',
                icon: '💊'
              },
              {
                id: 'medical-and-rx',
                title: 'Medical and prescription drug',
                desc: 'All-in-one Medicare Advantage plan covering hospital, medical, and drugs',
                icon: '🏥💊'
              },
              {
                id: 'all',
                title: "I don't know / Show all",
                desc: 'Explore all available plan options and compare benefits',
                icon: '❓'
              }
            ].map((opt) => {
              const isSelected = coveragePreference === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setCoveragePreference(opt.id as any)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${isSelected
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-xl shrink-0 p-1 bg-white rounded-lg border border-slate-100 shadow-xs">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{opt.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 3: Effective Date */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              When do you need your coverage to start?
            </label>

            {[
              { date: '2026-01-01', label: 'January 1, 2026', tag: 'Annual Enrollment Period (AEP)' },
              { date: '2026-02-01', label: 'February 1, 2026', tag: 'Special Enrollment / Turning 65' },
              { date: '2026-03-01', label: 'March 1, 2026', tag: 'Open Enrollment Period (OEP)' },
              { date: '2026-07-01', label: 'Immediate / Next Month', tag: 'Qualifying Life Event' }
            ].map((item) => (
              <button
                key={item.date}
                onClick={() => setEffectiveDate(item.date)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${effectiveDate === item.date
                    ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{item.label}</span>
                    <span className="text-[10px] text-slate-500">{item.tag}</span>
                  </div>
                </div>
                {effectiveDate === item.date && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Preferred Pharmacy */}
        {step === 4 && (
          <div className="space-y-3">
            <input
              type="text"
              value={pharmSearch}
              onChange={(e) => setPharmSearch(e.target.value)}
              placeholder="Search pharmacy (e.g. CVS, Walgreens)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs"
            />

            <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
              {PHARMACIES_DATA.filter(p => p.name.toLowerCase().includes(pharmSearch.toLowerCase())).map((pharm) => {
                const isSelected = userPharmacyIds.includes(pharm.id);
                return (
                  <div
                    key={pharm.id}
                    onClick={() => isSelected ? removePharmacy(pharm.id) : addPharmacy(pharm.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${isSelected
                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">{pharm.name}</span>
                        <span className="text-[10px] text-slate-500">{pharm.address} • {pharm.distanceMiles} mi</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] text-slate-400 text-center block">
              {userPharmacyIds.length} pharmacies currently selected
            </span>
          </div>
        )}

        {/* Step 5: Doctors */}
        {step === 5 && (
          <div className="space-y-3">
            <input
              type="text"
              value={docSearch}
              onChange={(e) => setDocSearch(e.target.value)}
              placeholder="Search doctor or specialty..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs"
            />

            <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
              {DOCTORS_DATA.filter(d => d.name.toLowerCase().includes(docSearch.toLowerCase()) || d.specialty.toLowerCase().includes(docSearch.toLowerCase())).map((doc) => {
                const isSelected = userDoctorIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => isSelected ? removeDoctor(doc.id) : addDoctor(doc.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${isSelected
                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={doc.imageUrl}
                        alt={doc.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">{doc.specialty}</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] text-slate-400 text-center block">
              {userDoctorIds.length} doctors currently saved
            </span>
          </div>
        )}

        {/* Step 6: Prescriptions */}
        {step === 6 && (
          <div className="space-y-3">
            <input
              type="text"
              value={rxSearch}
              onChange={(e) => setRxSearch(e.target.value)}
              placeholder="Search drug name (e.g. Lantus, Eliquis)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs"
            />

            <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
              {PRESCRIPTIONS_DATA.filter(r => r.name.toLowerCase().includes(rxSearch.toLowerCase())).map((rx) => {
                const isSelected = userPrescriptions.some(p => p.prescriptionId === rx.id);
                return (
                  <div
                    key={rx.id}
                    onClick={() => {
                      if (isSelected) {
                        removePrescription(rx.id);
                      } else {
                        addPrescription({
                          prescriptionId: rx.id,
                          name: rx.name,
                          dosage: rx.dosage,
                          frequency: rx.frequency,
                          quantityPerMonth: 1
                        });
                      }
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${isSelected
                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">{rx.name}</span>
                        <span className="text-[10px] text-slate-500">Tier {rx.tier} • Avg Preferred: ${rx.avgPreferredPrice30Day}/mo</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] text-slate-400 text-center block">
              {userPrescriptions.length} medications currently listed
            </span>
          </div>
        )}

        {/* Step 7: Summary & Ready */}
        {step === 7 && (
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950">Preferences Customized!</h4>
              <p className="text-xs text-emerald-800 mt-1">
                We matched your location ({zipCode}), {userDoctorIds.length} doctors, and {userPrescriptions.length} medications against CMS formulary databases.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Service Area:</span>
                <span className="font-bold text-slate-800">{zipCode} ({countyState})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Effective Date:</span>
                <span className="font-bold text-slate-800">{effectiveDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Doctors Checked:</span>
                <span className="font-bold text-slate-800">{userDoctorIds.length} in network</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Medications Formularized:</span>
                <span className="font-bold text-slate-800">{userPrescriptions.length} covered</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Cancel' : 'Previous'}</span>
        </button>

        <button
          onClick={nextStep}
          className="flex-1 max-w-[180px] py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
        >
          <span>{step === totalSteps ? 'View Matching Plans' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

