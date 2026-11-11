import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Bell, 
  User, 
  MapPin, 
  CheckCircle2, 
  X 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    zipCode, 
    setZipCode, 
    countyState,
    unreadNotificationCount, 
    isAuthenticated,
    userProfile,
    toggleAgentChat
  } = useApp();

  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [zipInput, setZipInput] = useState(zipCode);

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length === 5) {
      setZipCode(zipInput.trim());
      setIsZipModalOpen(false);
    }
  };

  return (
    <>
      <header className="bg-[#0B1E3B] text-white pt-3 pb-3 px-4 shadow-md shrink-0 z-20">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-xl font-black text-white tracking-tighter">PE</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-base tracking-tight text-white">PlanEnroll</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-800 text-cyan-300">Medicare</span>
              </div>
              <p className="text-[11px] text-blue-200/80 mt-0.5">Insurance Mobile Portal</p>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* ZIP Selector Pill */}
            <button
              onClick={() => setIsZipModalOpen(true)}
              className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-900/70 hover:bg-blue-800 border border-blue-700/60 text-xs text-blue-100 transition-all"
              title="Change ZIP code"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span className="font-semibold text-white">{zipCode}</span>
            </button>

            {/* Search Icon */}
            <button
              onClick={() => navigateTo('plan-search')}
              className={`p-2 rounded-full transition-colors ${
                currentScreen === 'plan-search' ? 'bg-blue-700 text-white' : 'hover:bg-blue-900/80 text-blue-100'
              }`}
              title="Search plans"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications with Badge */}
            <button
              onClick={() => navigateTo('notifications')}
              className={`p-2 rounded-full relative transition-colors ${
                currentScreen === 'notifications' ? 'bg-blue-700 text-white' : 'hover:bg-blue-900/80 text-blue-100'
              }`}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            <button
              onClick={() => navigateTo(isAuthenticated ? 'user-profile' : 'login')}
              className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                currentScreen === 'user-profile' || currentScreen === 'login'
                  ? 'ring-2 ring-cyan-400 bg-blue-700'
                  : 'hover:bg-blue-900/80'
              }`}
              title={isAuthenticated ? 'My Profile' : 'Sign In'}
              aria-label="User Account"
            >
              {isAuthenticated && userProfile ? (
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-xs flex items-center justify-center shadow">
                  {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-800 text-blue-200 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile ZIP bar on narrow screens */}
        <div className="flex xs:hidden items-center justify-between mt-2 pt-2 border-t border-blue-900/60 text-xs">
          <div className="flex items-center gap-1 text-blue-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Coverage area: <strong className="text-white">{zipCode}</strong> ({countyState})</span>
          </div>
          <button 
            onClick={() => setIsZipModalOpen(true)}
            className="text-cyan-300 hover:text-white font-medium underline text-[11px]"
          >
            Change
          </button>
        </div>
      </header>

      {/* ZIP Code Change Modal */}
      {isZipModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-[360px] w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsZipModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Change Your ZIP Code</h3>
            <p className="text-xs text-slate-500 mt-1">
              Medicare plan availability, premiums, and network providers depend directly on your home ZIP code and county.
            </p>

            <form onSubmit={handleZipSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  5-Digit ZIP Code
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 75080"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base font-semibold text-slate-800"
                  autoFocus
                />
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 w-full">Popular sample ZIP codes:</span>
                {['75080 (Dallas)', '90001 (LA)', '33101 (Miami)', '10001 (NYC)', '60601 (Chicago)'].map((item) => {
                  const z = item.split(' ')[0];
                  return (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setZipInput(z)}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                        zipInput === z 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsZipModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={zipInput.length !== 5}
                  className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-50 shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Area</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
