import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  Pill, 
  Calendar, 
  PhoneCall, 
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck 
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
        return <Pill className="w-5 h-5 text-rose-600" />;
      case 'enrollment':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'agent':
        return <PhoneCall className="w-5 h-5 text-emerald-600" />;
      case 'prior_auth':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
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
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {unreadNotificationCount} unread updates and alerts
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              markNotificationAsRead(item.id);
              if (item.actionScreen) {
                navigateTo(item.actionScreen);
              }
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              item.read
                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                : 'bg-gradient-to-r from-blue-50/50 to-white border-blue-300 text-slate-900 shadow-sm'
            }`}
          >
            {!item.read && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-600"></span>
            )}

            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${getBg(item.type)}`}>
                {getIcon(item.type)}
              </div>

              <div className="flex-1 pr-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs leading-snug">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{item.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.message}</p>

                {item.actionLabel && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 mt-2 hover:underline">
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

