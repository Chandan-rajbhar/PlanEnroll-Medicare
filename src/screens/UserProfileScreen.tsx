import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
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
  Camera, 
  Eye, 
  Upload, 
  Trash2, 
  X,
  ShieldCheck
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
  const [isViewPhotoModalOpen, setIsViewPhotoModalOpen] = useState(false);
  const [isPhotoMenuOpen, setIsPhotoMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState(userProfile || {
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@gmail.com',
    phone: '(971) 752-9054',
    photoUrl: '',
    zipCode: '75080',
    county: 'Collin County',
    state: 'TX',
    birthDate: '1959-04-18',
    medicareNumber: '1EG4-TE5-MK72',
    hasMedicaid: false,
    hasExtraHelp: false
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target?.result as string;
        if (dataUrl) {
          setFormData(prev => ({ ...prev, photoUrl: dataUrl }));
          updateUserProfile({ photoUrl: dataUrl });
          setIsPhotoMenuOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photoUrl: '' }));
    updateUserProfile({ photoUrl: '' });
    setIsPhotoMenuOpen(false);
    setIsViewPhotoModalOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  const shortName = `${formData.firstName?.charAt(0) || 'E'}${formData.lastName?.charAt(0) || 'V'}`;

  return (
    <div className="bg-slate-50 min-h-full pb-28 px-3.5 pt-3 space-y-3.5">
      {/* Hidden Native File Input for Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Premium Navy Brand Profile Header Card with High-Contrast Typography & Frosted Tiles */}
      <div className="relative rounded-3xl p-4 sm:p-5 overflow-hidden bg-gradient-to-br from-[#0B1E36] via-[#123661] to-[#1D4ED8] text-white shadow-md border border-blue-900/30">
        {/* Subtle decorative background glow circles */}
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Profile Avatar / Photo with Camera overlay & Click-to-view */}
              <div className="relative group shrink-0">
                <button
                  type="button"
                  onClick={() => setIsViewPhotoModalOpen(true)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden focus:outline-none ring-2 ring-white/30 shadow-md transition-transform active:scale-95 flex items-center justify-center bg-white/15 text-white font-black text-xl select-none cursor-pointer backdrop-blur-xs"
                  title="Click to view profile picture"
                >
                  {formData.photoUrl ? (
                    <img
                      src={formData.photoUrl}
                      alt={`${formData.firstName} ${formData.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{shortName}</span>
                  )}
                </button>

                {/* Camera / Edit Photo Quick Button */}
                <button
                  type="button"
                  onClick={() => setIsPhotoMenuOpen(true)}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center shadow-md border-2 border-[#123661] transition-all cursor-pointer active:scale-90"
                  title="Update Profile Photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-black text-white leading-tight truncate tracking-tight">
                  {formData.firstName} {formData.lastName}
                </h2>
                <span className="text-xs text-blue-100/80 block leading-tight truncate mt-0.5 font-medium">
                  {formData.email}
                </span>
                
                <span className="text-[10px] text-blue-100 font-bold bg-white/15 border border-white/20 px-2.5 py-0.5 rounded-lg inline-block mt-1 backdrop-blur-xs shadow-2xs">
                  Medicare ID: {formData.medicareNumber}
                </span>

                {/* View / Change photo button links */}
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setIsViewPhotoModalOpen(true)}
                    className="text-[11px] text-blue-200 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Photo</span>
                  </button>
                  <span className="text-white/30 text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={() => setIsPhotoMenuOpen(true)}
                    className="text-[11px] text-blue-200 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Change</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs font-bold transition-all shrink-0 cursor-pointer backdrop-blur-xs active:scale-95 shadow-2xs"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* 4 Counter Summary Boxes in Frosted Glass Tiles */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/15 text-center">
            <button 
              onClick={() => navigateTo('saved-plans')} 
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-all cursor-pointer group active:scale-95 shadow-2xs"
            >
              <span className="text-base sm:text-lg font-black text-white block group-hover:scale-105 transition-transform">{savedPlanIds.length}</span>
              <span className="text-[10px] text-blue-100 font-bold block mt-0.5">Saved</span>
            </button>

            <button 
              onClick={() => navigateTo('my-doctors')} 
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-all cursor-pointer group active:scale-95 shadow-2xs"
            >
              <span className="text-base sm:text-lg font-black text-white block group-hover:scale-105 transition-transform">{userDoctorIds.length}</span>
              <span className="text-[10px] text-blue-100 font-bold block mt-0.5">Doctors</span>
            </button>

            <button 
              onClick={() => navigateTo('my-pharmacies')} 
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-all cursor-pointer group active:scale-95 shadow-2xs"
            >
              <span className="text-base sm:text-lg font-black text-white block group-hover:scale-105 transition-transform">{userPharmacyIds.length}</span>
              <span className="text-[10px] text-blue-100 font-bold block mt-0.5">Pharmacies</span>
            </button>

            <button 
              onClick={() => navigateTo('my-prescriptions')} 
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-all cursor-pointer group active:scale-95 shadow-2xs"
            >
              <span className="text-base sm:text-lg font-black text-white block group-hover:scale-105 transition-transform">{userPrescriptions.length}</span>
              <span className="text-[10px] text-blue-100 font-bold block mt-0.5">Meds</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: View Profile Picture Modal */}
      {isViewPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-[340px] w-full p-5 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsViewPhotoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-bold text-slate-900 mb-3">Profile Picture</h3>

            {/* Picture Display Box */}
            <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden shadow-md flex items-center justify-center bg-slate-100 border border-slate-200 relative">
              {formData.photoUrl ? (
                <img
                  src={formData.photoUrl}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-50 text-blue-900 font-black text-5xl flex items-center justify-center select-none">
                  {shortName}
                </div>
              )}
            </div>

            <div className="text-center mt-3">
              <h4 className="font-bold text-base text-slate-900">{formData.firstName} {formData.lastName}</h4>
              <p className="text-[11px] text-slate-500">{formData.email}</p>
              <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full inline-block mt-1">
                {formData.photoUrl ? 'Custom Profile Photo' : `Short Name Initials: "${shortName}"`}
              </span>
            </div>

            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsViewPhotoModalOpen(false);
                  setIsPhotoMenuOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-98"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
              {formData.photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-98"
                  title="Remove and use short name initials"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Update Profile Photo Options Modal */}
      {isPhotoMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-[360px] w-full p-5 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Update Profile Picture</h3>
              </div>
              <button
                onClick={() => setIsPhotoMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option A: Upload from Device */}
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-3.5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-blue-900 flex items-center justify-between transition-colors active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-xs block text-slate-900">Upload from Device</span>
                    <span className="text-[10px] text-slate-500">Choose any image from your gallery</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            {/* Option B: Use Short Name Initials */}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Use Short Name ({shortName})</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPhotoMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-3 text-xs animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Edit Personal Details</h3>
            <button
              type="button"
              onClick={() => setIsPhotoMenuOpen(true)}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 text-[11px]">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 text-[11px]">Medicare Number</label>
            <input
              type="text"
              value={formData.medicareNumber}
              onChange={(e) => setFormData({ ...formData, medicareNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 text-xs font-mono"
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
              <span className="font-medium text-slate-700 text-xs">Enrolled in Medicaid (D-SNP Eligible)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </form>
      )}

      {/* Navigation Links Group */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden text-xs">
        {[
          { label: 'Saved Plans & Cart', icon: Bookmark, screen: 'saved-plans', count: `${savedPlanIds.length} plans`, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { label: 'My Doctors Directory', icon: Stethoscope, screen: 'my-doctors', count: `${userDoctorIds.length} doctors`, color: 'bg-amber-50 text-amber-600 border-amber-100' },
          { label: 'My Preferred Pharmacies', icon: Building2, screen: 'my-pharmacies', count: `${userPharmacyIds.length} locations`, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
          { label: 'My Prescription Medications', icon: Pill, screen: 'my-prescriptions', count: `${userPrescriptions.length} meds`, color: 'bg-rose-50 text-rose-600 border-rose-100' },
          { label: 'Medicare Learning Center', icon: FileText, screen: 'learning-center', count: '4 guides', color: 'bg-sky-50 text-sky-600 border-sky-100' },
          { label: 'Medicare Disclaimers & CMS Notices', icon: ShieldCheck, screen: 'medicare-disclaimers', count: 'Required', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
          { label: 'Settings & Display Preferences', icon: Settings, screen: 'settings', count: '', color: 'bg-slate-100 text-slate-600 border-slate-200' },
          { label: 'Help & Customer Support', icon: HelpCircle, screen: 'help-support', count: '1-855-700-8583', color: 'bg-purple-50 text-purple-600 border-purple-100' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => navigateTo(item.screen as any)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-blue-50/50 transition-colors text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl ${item.color} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-800 text-xs truncate group-hover:text-blue-700 transition-colors">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {item.count && <span className="text-[11px] text-slate-400 font-medium">{item.count}</span>}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
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
        className="w-full py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200/90 hover:border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
      >
        <LogOut className="w-4 h-4 text-rose-500" />
        <span>Log Out</span>
      </button>
    </div>
  );
};
