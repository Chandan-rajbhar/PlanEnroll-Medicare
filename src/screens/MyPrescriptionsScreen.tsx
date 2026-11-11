import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRESCRIPTIONS_DATA } from '../data/prescriptionsData';
import { Select } from '../components/ui/Select';
import { 
  Pill, 
  Search, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Check, 
  Sparkles, 
  Truck, 
  DollarSign, 
  ShieldAlert, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const MyPrescriptionsScreen: React.FC = () => {
  const { 
    userPrescriptions, 
    addPrescription, 
    removePrescription, 
    navigateTo 
  } = useApp();

  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(PRESCRIPTIONS_DATA[0]);
  const [dosageInput, setDosageInput] = useState(PRESCRIPTIONS_DATA[0].dosage);
  const [freqInput, setFreqInput] = useState(PRESCRIPTIONS_DATA[0].frequency);

  // Compute total estimated monthly & annual drug cost
  let totalPreferredMonthly = 0;
  let totalStandardMonthly = 0;
  let totalMailOrder90 = 0;

  userPrescriptions.forEach((item) => {
    const drug = PRESCRIPTIONS_DATA.find(d => d.id === item.prescriptionId);
    if (drug) {
      totalPreferredMonthly += drug.avgPreferredPrice30Day;
      totalStandardMonthly += drug.avgRetailPrice30Day;
      totalMailOrder90 += drug.avgMailOrderPrice90Day;
    }
  });

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    addPrescription({
      prescriptionId: selectedDrug.id,
      name: selectedDrug.name,
      dosage: dosageInput || selectedDrug.dosage,
      frequency: freqInput || selectedDrug.frequency,
      quantityPerMonth: 1
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-full pb-24 px-4 pt-3 space-y-3.5">
      {/* Header Row: Title & Add Med Button */}
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
            My Prescriptions
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate font-medium">
            Formulary tier ratings & estimated out-of-pocket costs
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="h-8 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Med</span>
        </button>
      </div>

      {/* Senior Insulin & Drug Price Protection Notice */}
      <div className="p-3 bg-emerald-50/90 rounded-2xl border border-emerald-200/80 text-emerald-950 space-y-1 shadow-2xs">
        <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Inflation Reduction Act Protection (2026)</span>
        </div>
        <p className="text-[11px] text-emerald-800/90 leading-relaxed">
          Covered insulins capped at <strong>$35/month</strong>. Total annual out-of-pocket drug costs capped at <strong>$2,000/year</strong>.
        </p>
      </div>

      {/* Cost Estimator Card */}
      {userPrescriptions.length > 0 && (
        <div className="bg-white rounded-3xl p-3.5 border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Estimated Costs ({userPrescriptions.length} Meds)
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Estimates only</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-50/80 p-2.5 rounded-2xl border border-emerald-100/80 shadow-2xs">
              <span className="text-[9px] font-bold text-emerald-800 uppercase block leading-tight">Preferred</span>
              <span className="text-base sm:text-lg font-black text-emerald-700 block my-0.5">${totalPreferredMonthly.toFixed(2)}</span>
              <span className="text-[9px] text-emerald-600 font-medium block">/month</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[9px] font-bold text-slate-600 uppercase block leading-tight">Retail</span>
              <span className="text-base sm:text-lg font-black text-slate-800 block my-0.5">${totalStandardMonthly.toFixed(2)}</span>
              <span className="text-[9px] text-slate-500 font-medium block">/month</span>
            </div>

            <div className="bg-blue-50/80 p-2.5 rounded-2xl border border-blue-100/80 shadow-2xs">
              <span className="text-[9px] font-bold text-blue-800 uppercase block leading-tight">90-Day Mail</span>
              <span className="text-base sm:text-lg font-black text-blue-700 block my-0.5">${totalMailOrder90.toFixed(2)}</span>
              <span className="text-[9px] text-blue-600 font-medium block">every 3 mos</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center italic">
            *Actual costs may vary based on plan formulary tier and pharmacy network.
          </p>
        </div>
      )}

      {/* User Medications List */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Currently Managed Medications
        </h3>

        {userPrescriptions.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-2xs">
            <Pill className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-600 font-medium">No medications added yet.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
            >
              Add your first medication
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {userPrescriptions.map((item) => {
              const drug = PRESCRIPTIONS_DATA.find(d => d.id === item.prescriptionId);
              return (
                <div
                  key={item.prescriptionId}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs space-y-2.5 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100/80 flex items-center justify-center shrink-0 shadow-2xs">
                        <Pill className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-snug truncate">{item.name}</h4>
                          {drug && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 leading-none">
                              Tier {drug.tier}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5 font-medium truncate">{item.dosage} • {item.frequency}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removePrescription(item.prescriptionId)}
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                      title="Remove medication"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {drug && (
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Pref. Copay</span>
                        <span className="font-bold text-emerald-700 text-xs">${drug.avgPreferredPrice30Day.toFixed(2)} <span className="font-normal text-[10px] text-slate-400">/mo</span></span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Mail Order 90-Day</span>
                        <span className="font-bold text-blue-700 text-xs">${drug.avgMailOrderPrice90Day.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {drug?.requiresPriorAuth && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-900 bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/80">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Prior authorization required by some carrier plans.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Medication Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-[360px] w-full p-5 shadow-2xl relative">
            <h3 className="text-base font-bold text-slate-900 mb-3">Add Prescription Medication</h3>

            <form onSubmit={handleAddNew} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Medication</label>
                <Select
                  value={selectedDrug.id}
                  onChange={(val) => {
                    const found = PRESCRIPTIONS_DATA.find(d => d.id === val);
                    if (found) {
                      setSelectedDrug(found);
                      setDosageInput(found.dosage);
                      setFreqInput(found.frequency);
                    }
                  }}
                  options={PRESCRIPTIONS_DATA.map((d) => ({
                    value: d.id,
                    label: `${d.name} (Tier ${d.tier})`,
                    description: `${d.dosage} • ${d.form}`
                  }))}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dosage Form</label>
                <input
                  type="text"
                  value={dosageInput}
                  onChange={(e) => setDosageInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Frequency</label>
                <input
                  type="text"
                  value={freqInput}
                  onChange={(e) => setFreqInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 shadow-md"
                >
                  Save Med
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

