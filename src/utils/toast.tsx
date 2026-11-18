import React from 'react';
import baseToast, { Toaster as BaseToaster, ToastOptions } from 'react-hot-toast';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Bookmark, 
  Scale, 
  Pill, 
  Stethoscope, 
  X,
  Bell,
  MapPin,
  Building2
} from 'lucide-react';

/**
 * Generate a consistent deduplication ID from text
 */
const getDedupeId = (prefix: string, content: string): string => {
  const clean = content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 45);
  return `${prefix}-${clean || 'toast'}`;
};

/**
 * Mobile-optimized toast notification helper for PlanEnroll Mobile App
 * Includes automatic deduplication so duplicate toasts are never shown.
 */
export const showToast = {
  success: (title: string, message?: string, customId?: string) => {
    const toastId = customId || getDedupeId('success', title);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">{title}</p>
            {message && <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{message}</p>}
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3200 }
    );
  },

  error: (title: string, message?: string, customId?: string) => {
    const toastId = customId || getDedupeId('error', title);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#181126]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-rose-500/30 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">{title}</p>
            {message && <p className="text-[11px] text-rose-200/90 mt-0.5 leading-snug">{message}</p>}
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 4000 }
    );
  },

  info: (title: string, message?: string, customId?: string) => {
    const toastId = customId || getDedupeId('info', title);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-cyan-400/20 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">{title}</p>
            {message && <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{message}</p>}
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3200 }
    );
  },

  planSaved: (planName: string, isSaved: boolean) => {
    const toastId = getDedupeId('plan-save', planName);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isSaved ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400' : 'bg-slate-700/50 border border-slate-600/50 text-slate-400'
          }`}>
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">
              {isSaved ? 'Plan Saved to Bookmarks' : 'Removed from Saved Plans'}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5 truncate leading-snug">{planName}</p>
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3000 }
    );
  },

  planCompared: (planName: string, isCompared: boolean, count: number) => {
    const toastId = getDedupeId('plan-compare', planName);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isCompared ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' : 'bg-slate-700/50 border border-slate-600/50 text-slate-400'
          }`}>
            <Scale className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-white leading-snug">
                {isCompared ? 'Added to Comparison' : 'Removed from Comparison'}
              </p>
              {isCompared && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  {count}/4
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 truncate leading-snug">{planName}</p>
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3000 }
    );
  },

  locationUpdated: (zip: string, countyState: string) => {
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-blue-300" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">Service Area Updated</p>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{zip} &bull; {countyState}</p>
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: 'location-updated-toast', duration: 3200 }
    );
  },

  doctorAdded: (doctorName: string, isAdded: boolean) => {
    const toastId = getDedupeId('doctor', doctorName);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isAdded ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-slate-700/50 border border-slate-600/50 text-slate-400'
          }`}>
            <Stethoscope className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">
              {isAdded ? 'Doctor Added to Care Team' : 'Doctor Removed'}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5 truncate leading-snug">{doctorName}</p>
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3000 }
    );
  },

  pharmacyAdded: (pharmacyName: string, isAdded: boolean) => {
    const toastId = getDedupeId('pharmacy', pharmacyName);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isAdded ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' : 'bg-slate-700/50 border border-slate-600/50 text-slate-400'
          }`}>
            <Building2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">
              {isAdded ? 'Preferred Pharmacy Added' : 'Pharmacy Removed'}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5 truncate leading-snug">{pharmacyName}</p>
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3000 }
    );
  },

  rxAdded: (drugName: string, actionText: string) => {
    const toastId = getDedupeId('rx', drugName);
    return baseToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] rounded-2xl border border-white/10 p-3 flex items-start gap-2.5 pointer-events-auto select-none`}
        >
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
            <Pill className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-xs font-bold text-white leading-snug">{actionText}</p>
            <p className="text-[11px] text-slate-300 mt-0.5 truncate leading-snug">{drugName}</p>
          </div>
          <button
            onClick={() => baseToast.dismiss(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 3000 }
    );
  },

  notificationPush: (title: string, message: string, onClick?: () => void) => {
    const toastId = getDedupeId('push-notif', title);
    return baseToast.custom(
      (t) => (
        <div
          onClick={() => {
            if (onClick) onClick();
            baseToast.dismiss(t.id);
          }}
          className={`${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
          } transition-all duration-200 ease-out max-w-[360px] w-full bg-[#0B1E3B]/95 text-white backdrop-blur-md shadow-[0_14px_35px_rgba(0,0,0,0.4)] rounded-2xl border border-blue-400/30 p-3 flex items-start gap-2.5 pointer-events-auto cursor-pointer select-none active:scale-[0.98]`}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-500/30 border border-blue-400/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
            <Bell className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-cyan-300 uppercase tracking-wider">PlanEnroll Alert</span>
              <span className="text-[9px] text-slate-400">Now</span>
            </div>
            <p className="text-xs font-bold text-white leading-tight mt-0.5">{title}</p>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-snug">{message}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              baseToast.dismiss(t.id);
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      { id: toastId, duration: 4500 }
    );
  }
};

/**
 * Enhanced deduplicating toast wrapper
 * Ensures any standard toast(...) call is automatically assigned an ID based on its text
 */
type ToastFunction = typeof baseToast;

const createDeduplicatedToast = (): ToastFunction => {
  const handler = (message: any, opts?: ToastOptions) => {
    const text = typeof message === 'string' ? message : '';
    const dedupeOpts: ToastOptions = {
      id: opts?.id || (text ? getDedupeId('toast', text) : undefined),
      ...opts
    };
    return baseToast(message, dedupeOpts);
  };

  handler.success = (message: any, opts?: ToastOptions) => {
    const text = typeof message === 'string' ? message : '';
    const dedupeOpts: ToastOptions = {
      id: opts?.id || (text ? getDedupeId('success', text) : undefined),
      ...opts
    };
    return baseToast.success(message, dedupeOpts);
  };

  handler.error = (message: any, opts?: ToastOptions) => {
    const text = typeof message === 'string' ? message : '';
    const dedupeOpts: ToastOptions = {
      id: opts?.id || (text ? getDedupeId('error', text) : undefined),
      ...opts
    };
    return baseToast.error(message, dedupeOpts);
  };

  handler.loading = (message: any, opts?: ToastOptions) => {
    const text = typeof message === 'string' ? message : '';
    const dedupeOpts: ToastOptions = {
      id: opts?.id || (text ? getDedupeId('loading', text) : undefined),
      ...opts
    };
    return baseToast.loading(message, dedupeOpts);
  };

  handler.custom = (jsx: any, opts?: ToastOptions) => {
    return baseToast.custom(jsx, opts);
  };

  handler.dismiss = (toastId?: string) => baseToast.dismiss(toastId);
  handler.remove = (toastId?: string) => baseToast.remove(toastId);
  handler.promise = baseToast.promise;

  return handler as unknown as ToastFunction;
};

export const toast = createDeduplicatedToast();

/**
 * Mobile-contained Toaster wrapper component
 */
export const AppToaster: React.FC = () => {
  return (
    <BaseToaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 60,
        left: 12,
        right: 12,
        zIndex: 99999
      }}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#0B1E3B',
          color: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
          padding: '10px 14px',
          fontSize: '12px',
          fontWeight: 600,
          maxWidth: '360px',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  );
};

export default toast;
