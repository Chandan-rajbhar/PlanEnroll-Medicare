import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PHARMACIES_DATA } from '../data/pharmaciesData';
import { 
  Building2, 
  Search, 
  Plus, 
  Check, 
  Trash2, 
  MapPin, 
  Phone, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Car,
  Sparkles
} from 'lucide-react';

export const MyPharmaciesScreen: React.FC = () => {
  const { userPharmacyIds, addPharmacy, removePharmacy } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredPharmacies = PHARMACIES_DATA.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.chain.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || p.type === filterType;
    return matchSearch && matchType;
  });

  const mySavedPharmacies = PHARMACIES_DATA.filter(p => userPharmacyIds.includes(p.id));

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            My Pharmacies
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Preferred pharmacy networks save up to 80% on drug copays
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
          {userPharmacyIds.length} Preferred
        </span>
      </div>

      {/* Tip Banner */}
      <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Medicare Tip:</strong> Choosing a <em>Preferred Pharmacy</em> reduces Tier 1 generic copays to $0 in most Medicare Advantage and Part D plans compared to standard retail pharmacies.
        </p>
      </div>

      {/* My Selected Pharmacies */}
      {mySavedPharmacies.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Your Preferred Pharmacies ({mySavedPharmacies.length})
          </h3>

          <div className="space-y-2.5">
            {mySavedPharmacies.map((pharm) => (
              <div
                key={pharm.id}
                className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0">
                      {pharm.type === 'Mail Order' ? <Truck className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{pharm.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-emerald-700">{pharm.type} Pharmacy</span>
                        {pharm.distanceMiles > 0 && (
                          <>
                            <span>•</span>
                            <span>{pharm.distanceMiles} miles away</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removePharmacy(pharm.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove pharmacy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{pharm.address}, {pharm.city}, {pharm.state} {pharm.zipCode}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`tel:${pharm.phone.replace(/[^0-9]/g, '')}`} className="text-blue-700 font-semibold hover:underline">
                      {pharm.phone}
                    </a>
                  </div>
                </div>

                {/* Features & Preferred Carrier Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    {pharm.driveThru && (
                      <span className="flex items-center gap-1 text-slate-700">
                        <Car className="w-3.5 h-3.5 text-blue-600" />
                        <span>Drive-Thru</span>
                      </span>
                    )}
                    {pharm.is24Hours && (
                      <span className="flex items-center gap-1 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>24 Hours Open</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Preferred Network For:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pharm.preferredInCarriers.map((carrier, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-semibold border border-blue-100"
                        >
                          <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
                          <span>{carrier}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pharmacy Directory Search */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Nearby Pharmacy Directory
        </h3>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by pharmacy name or address..."
            className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Directory List */}
        <div className="space-y-2.5">
          {filteredPharmacies.map((pharm) => {
            const isSaved = userPharmacyIds.includes(pharm.id);
            return (
              <div
                key={pharm.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between gap-3 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center shrink-0">
                    {pharm.type === 'Mail Order' ? <Truck className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug">{pharm.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{pharm.address}</span>
                    <span className="text-[10px] text-emerald-700 font-bold">{pharm.type} • {pharm.distanceMiles} mi</span>
                  </div>
                </div>

                <button
                  onClick={() => isSaved ? removePharmacy(pharm.id) : addPharmacy(pharm.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    isSaved
                      ? 'bg-blue-100 text-blue-800 hover:bg-rose-100 hover:text-rose-700'
                      : 'bg-blue-700 text-white hover:bg-blue-800 shadow-sm'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

