import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS_DATA } from '../data/doctorsData';
import { 
  Stethoscope, 
  Search, 
  Plus, 
  Check, 
  Trash2, 
  Star, 
  MapPin, 
  Phone, 
  Building2, 
  ShieldCheck, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const MyDoctorsScreen: React.FC = () => {
  const { userDoctorIds, addDoctor, removeDoctor, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const specialties = ['All', 'Primary Care', 'Cardiology', 'Endocrinology', 'Geriatric', 'Eye Care', 'Dental'];

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.hospitalAffiliation.toLowerCase().includes(search.toLowerCase());
    
    const matchesSpec = specialtyFilter === 'All' || doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
    return matchesSearch && matchesSpec;
  });

  const mySavedDoctors = DOCTORS_DATA.filter(d => userDoctorIds.includes(d.id));

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            My Doctors & Providers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Check network participation across 2026 Medicare plans
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
          {userDoctorIds.length} Saved
        </span>
      </div>

      {/* Saved Doctors Section */}
      {mySavedDoctors.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Your Selected Healthcare Providers ({mySavedDoctors.length})</span>
          </h3>

          <div className="space-y-2.5">
            {mySavedDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{doc.name}</h4>
                      <p className="text-[11px] text-blue-700 font-semibold mt-0.5">{doc.specialty}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{doc.rating} ({doc.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeDoctor(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.hospitalAffiliation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.address}, {doc.city}, {doc.state} {doc.zipCode}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`tel:${doc.phone.replace(/[^0-9]/g, '')}`} className="text-blue-700 font-semibold hover:underline">
                      {doc.phone}
                    </a>
                  </div>
                </div>

                {/* Verified in-network carriers badges */}
                <div className="pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Verified In-Network Carriers:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {doc.inNetworkCarriers.map((carrier, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                      >
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{carrier}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Directory Search & Add Doctors */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Search Doctor Directory
        </h3>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name or hospital..."
            className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Specialty filter pills */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                specialtyFilter === spec
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Directory List */}
        <div className="space-y-2.5">
          {filteredDoctors.map((doc) => {
            const isSaved = userDoctorIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between gap-3 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug">{doc.name}</h4>
                    <span className="text-[11px] text-blue-700 font-semibold block">{doc.specialty}</span>
                    <span className="text-[10px] text-slate-400">{doc.hospitalAffiliation}</span>
                  </div>
                </div>

                <button
                  onClick={() => isSaved ? removeDoctor(doc.id) : addDoctor(doc.id)}
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

