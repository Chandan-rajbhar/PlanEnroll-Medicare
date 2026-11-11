import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Bookmark, 
  Stethoscope, 
  Building2, 
  Pill, 
  FileText, 
  ChevronRight,
  HelpCircle,
  Save,
  Check
} from 'lucide-react';

export const UserProfileScreen: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    logout, 
    navigateTo, 
    savedPlanIds,
    userDoctorIds,
    userPharmacyIds,
    userPrescriptions
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile || {
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@gmail.com',
    phone: '(971) 752-9054',
    zipCode: '75080',
    county: 'Collin County',
    state: 'TX',
    birthDate: '1959-04-18',
    medicareNumber: '1EG4-TE5-MK72',
    hasMedicaid: false,
    hasExtraHelp: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-[#0F2544] to-blue-900 rounded-3xl p-5 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-black text-white leading-tight">
                {formData.firstName} {formData.lastName}
              </h2>
              <span className="text-xs text-blue-200 block">{formData.email}</span>
              <span className="text-[10px] text-amber-300 font-semibold mt-0.5 block">
                Medicare Beneficiary ID: {formData.medicareNumber}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-sm transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {/* Assets quick count counter row */}
        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-blue-800 text-center">
          <button onClick={() => navigateTo('saved-plans')} className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
            <span className="text-sm font-black text-white block">{savedPlanIds.length}</span>
            <span className="text-[9px] text-blue-200 font-medium">Saved</span>
          </button>
          <button onClick={() => navigateTo('my-doctors')} className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
            <span className="text-sm font-black text-white block">{userDoctorIds.length}</span>
            <span className="text-[9px] text-blue-200 font-medium">Doctors</span>
          </button>
          <button onClick={() => navigateTo('my-pharmacies')} className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
            <span className="text-sm font-black text-white block">{userPharmacyIds.length}</span>
            <span className="text-[9px] text-blue-200 font-medium">Pharmacies</span>
          </button>
          <button onClick={() => navigateTo('my-prescriptions')} className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
            <span className="text-sm font-black text-white block">{userPrescriptions.length}</span>
            <span className="text-[9px] text-blue-200 font-medium">Meds</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs animate-in fade-in">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Edit Personal Details</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Medicare Number</label>
            <input
              type="text"
              value={formData.medicareNumber}
              onChange={(e) => setFormData({ ...formData, medicareNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>

          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasMedicaid}
                onChange={(e) => setFormData({ ...formData, hasMedicaid: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="font-medium text-slate-700">Enrolled in Medicaid (D-SNP Eligible)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </form>
      )}

      {/* Navigation Links Group */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs">
        {[
          { label: 'Saved Plans & Cart', icon: Bookmark, screen: 'saved-plans', count: `${savedPlanIds.length} plans` },
          { label: 'My Doctors Directory', icon: Stethoscope, screen: 'my-doctors', count: `${userDoctorIds.length} doctors` },
          { label: 'My Preferred Pharmacies', icon: Building2, screen: 'my-pharmacies', count: `${userPharmacyIds.length} locations` },
          { label: 'My Prescription Medications', icon: Pill, screen: 'my-prescriptions', count: `${userPrescriptions.length} meds` },
          { label: 'Medicare Learning Center', icon: FileText, screen: 'learning-center', count: '4 guides' },
          { label: 'Medicare Disclaimers & CMS Notices', icon: ShieldCheck, screen: 'medicare-disclaimers', count: 'Required' },
          { label: 'Settings & Display Preferences', icon: Settings, screen: 'settings', count: '' },
          { label: 'Help & Customer Support', icon: HelpCircle, screen: 'help-support', count: '1-855-700-8583' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => navigateTo(item.screen as any)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-800 text-xs">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && <span className="text-[11px] text-slate-400 font-medium">{item.count}</span>}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
          navigateTo('login');
        }}
        className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out of PlanEnroll</span>
      </button>
    </div>
  );
};

