import React from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';
import { 
  Bell, 
  CheckCheck, 
  Pill, 
  Calendar, 
  PhoneCall, 
  AlertTriangle, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    navigateTo,
    unreadNotificationCount 
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <Pill className="w-4 h-4 text-rose-600" />;
      case 'enrollment':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'agent':
        return <PhoneCall className="w-4 h-4 text-emerald-600" />;
      case 'prior_auth':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'prescription': return 'bg-rose-50 border-rose-100';
      case 'enrollment': return 'bg-blue-50 border-blue-100';
      case 'agent': return 'bg-emerald-50 border-emerald-100';
      case 'prior_auth': return 'bg-amber-50 border-amber-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="pb-10 p-3.5 space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            Notifications
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {unreadNotificationCount} unread updates and alerts
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Interactive Live Hot Toast Simulation */}
      <div className="bg-gradient-to-br from-[#0B1E3B] to-[#132A52] text-white p-3 rounded-2xl border border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-[11px] font-bold text-white tracking-wide">React Hot Toast Tester</span>
          </div>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
            Live Demo
          </span>
        </div>
        <p className="text-[10px] text-slate-300 leading-snug">
          Trigger live in-app toast alerts inside the PlanEnroll mobile device frame:
        </p>
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => {
              showToast.notificationPush(
                'Ready for Refill: Lantus 15ml',
                'Your Lantus 100u/mL insulin is ready for pickup at CVS Pharmacy (605 W Campbell Rd).',
                () => navigateTo('my-prescriptions')
              );
            }}
            className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-[10px] font-bold text-cyan-200 flex flex-col items-center gap-1 transition-all border border-white/10 cursor-pointer"
          >
            <Pill className="w-3.5 h-3.5 text-rose-300" />
            <span>Refill Alert</span>
          </button>

          <button
            type="button"
            onClick={() => {
              showToast.notificationPush(
                'Agent Callback in 10 Min',
                'Licensed Specialist Sarah Miller will call (971) 752-9054.',
                () => navigateTo('contact-agent')
              );
            }}
            className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-[10px] font-bold text-emerald-200 flex flex-col items-center gap-1 transition-all border border-white/10 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
            <span>Agent Call</span>
          </button>

          <button
            type="button"
            onClick={() => {
              showToast.info(
                'AEP Open Enrollment Active',
                'Compare 2026 Medicare Advantage and Part D plans with updated Collin County networks.'
              );
            }}
            className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-[10px] font-bold text-blue-200 flex flex-col items-center gap-1 transition-all border border-white/10 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span>AEP Alert</span>
          </button>
        </div>
      </div>

      {/* Notifications List - Compact Mobile Cards */}
      <div className="space-y-2">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              markNotificationAsRead(item.id);
              if (item.actionScreen) {
                navigateTo(item.actionScreen);
              }
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden active:scale-[0.99] ${
              item.read
                ? 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 shadow-2xs'
                : 'bg-gradient-to-r from-blue-50/60 to-white border-blue-300/90 text-slate-900 shadow-xs'
            }`}
          >
            {!item.read && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            )}

            <div className="flex items-start gap-2.5">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${getBg(item.type)}`}>
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-baseline justify-between gap-1">
                  <h4 className="font-bold text-xs text-slate-900 leading-snug truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">{item.message}</p>

                {item.actionLabel && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 mt-1 hover:underline">
                    <span>{item.actionLabel}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
