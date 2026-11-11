import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCcw, 
  Check, 
  ShieldCheck,
  Type
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { 
    resetFilters,
    clearComparison 
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetData = () => {
    resetFilters();
    clearComparison();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Settings & Preferences
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure application display, alerts, and accessibility
          </p>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="space-y-4 text-xs">
        {/* Display & Readability Group */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Display & Accessibility
          </h3>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="font-bold text-slate-900 block">High Contrast & Large Text</span>
              <span className="text-[11px] text-slate-500">Optimized font size for senior readability</span>
            </div>
            <button
              onClick={() => setLargeText(!largeText)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                largeText ? 'bg-blue-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  largeText ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications Group */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Alerts & Notifications
          </h3>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="font-bold text-slate-900 block">Prescription Refill Reminders</span>
              <span className="text-[11px] text-slate-500">Get notified when maintenance drugs need refills</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                notificationsEnabled ? 'bg-blue-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-slate-100">
            <div>
              <span className="font-bold text-slate-900 block">Annual Enrollment (AEP) Updates</span>
              <span className="text-[11px] text-slate-500">Notices when 2026 carrier formularies update</span>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                emailAlerts ? 'bg-blue-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  emailAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset & Privacy Group */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Data Storage & Privacy
          </h3>

          <p className="text-[11px] text-slate-500">
            Clear locally cached plan comparisons, active filters, and reset discovery queries.
          </p>

          <button
            onClick={handleResetData}
            className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {resetSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Cache Cleared Successfully</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Reset Filters & Comparisons</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center text-[10px] text-slate-400 space-y-0.5">
          <p>PlanEnroll Medicare Mobile Portal v2.6.4 (Build 2026.11)</p>
          <p>CMS TPMO Certified Reference Application</p>
        </div>
      </div>
    </div>
  );
};
