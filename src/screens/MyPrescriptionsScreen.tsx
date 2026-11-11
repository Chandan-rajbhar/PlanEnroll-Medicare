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
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            My Prescriptions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulary tier ratings & estimated out-of-pocket costs
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Med</span>
        </button>
      </div>

      {/* Senior Insulin & Drug Price Protection Notice */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-emerald-900">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Inflation Reduction Act Protection</span>
        </div>
        <p className="text-[11px] leading-snug">
          All covered insulins are capped at a maximum of <strong>$35 per month</strong>. In addition, your total annual out-of-pocket drug costs cannot exceed <strong>$2,000</strong> per year in 2026.
        </p>
      </div>

      {/* Cost Estimator Card */}
      {userPrescriptions.length > 0 && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Estimated Medication Costs ({userPrescriptions.length} Meds)
            </h3>
            <span className="text-[10px] text-slate-400">Estimates only</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Preferred Pharmacy</span>
              <span className="text-lg font-black text-emerald-700 block">${totalPreferredMonthly.toFixed(2)}</span>
              <span className="text-[10px] text-emerald-600">per month</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Standard Retail</span>
              <span className="text-lg font-black text-slate-700 block">${totalStandardMonthly.toFixed(2)}</span>
              <span className="text-[10px] text-slate-500">per month</span>
            </div>

            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-800 uppercase block">90-Day Mail Order</span>
              <span className="text-lg font-black text-blue-700 block">${totalMailOrder90.toFixed(2)}</span>
              <span className="text-[10px] text-blue-600">every 3 mos</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center italic">
            *Actual costs may vary based on your specific plan formulary, deductible phase, and pharmacy choice.
          </p>
        </div>
      )}

      {/* User Medications List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Currently Managed Medications
        </h3>

        {userPrescriptions.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2">
            <Pill className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-600 font-medium">No medications added yet.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-bold text-blue-700 hover:underline"
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
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900 leading-snug">{item.name}</h4>
                          {drug && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                              Tier {drug.tier}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{item.dosage} • {item.frequency}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removePrescription(item.prescriptionId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove medication"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {drug && (
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Pref. Copay</span>
                        <span className="font-bold text-emerald-700">${drug.avgPreferredPrice30Day.toFixed(2)} /mo</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Mail Order 90-Day</span>
                        <span className="font-bold text-blue-700">${drug.avgMailOrderPrice90Day.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {drug?.requiresPriorAuth && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
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

