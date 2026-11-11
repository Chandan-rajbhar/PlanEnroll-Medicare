import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ArrowLeftRight, 
  Stethoscope, 
  Pill, 
  Building2, 
  Truck, 
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';

export const QuickActionCards: React.FC = () => {
  const { navigateTo, userDoctorIds, userPrescriptions, userPharmacyIds } = useApp();

  const primaryActions = [
    {
      title: 'Find Plans',
      desc: 'Explore Medicare in 75080',
      icon: Search,
      bgGradient: 'from-blue-600 to-blue-800',
      iconBg: 'bg-white/20 text-white',
      textColor: 'text-white',
      badge: '54 Plans',
      onClick: () => navigateTo('plan-search')
    },
    {
      title: 'Compare Plans',
      desc: 'Side-by-side benefits table',
      icon: ArrowLeftRight,
      bgGradient: 'from-emerald-600 to-teal-800',
      iconBg: 'bg-white/20 text-white',
      textColor: 'text-white',
      badge: 'Interactive',
      onClick: () => navigateTo('plan-comparison')
    },
    {
      title: 'My Doctors',
      desc: 'Check in-network physicians',
      icon: Stethoscope,
      bgGradient: 'from-amber-500 to-amber-700',
      iconBg: 'bg-white/20 text-white',
      textColor: 'text-white',
      badge: `${userDoctorIds.length} Added`,
      onClick: () => navigateTo('my-doctors')
    },
    {
      title: 'My Prescriptions',
      desc: 'Drug pricing & formulary check',
      icon: Pill,
      bgGradient: 'from-rose-600 to-pink-800',
      iconBg: 'bg-white/20 text-white',
      textColor: 'text-white',
      badge: `${userPrescriptions.length} Meds`,
      onClick: () => navigateTo('my-prescriptions')
    }
  ];

  const secondaryActions = [
    {
      title: 'Pharmacy Coverage',
      desc: 'Preferred vs retail networks',
      icon: Building2,
      bgColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
      count: `${userPharmacyIds.length} saved`,
      onClick: () => navigateTo('my-pharmacies')
    },
    {
      title: 'Switch to Mail Order',
      desc: '90-day supply & zero copay',
      icon: Truck,
      bgColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
      count: 'Save up to 40%',
      onClick: () => navigateTo('my-prescriptions')
    },
    {
      title: 'Transfer a Medication',
      desc: 'Seamless pharmacy switch',
      icon: ArrowRightLeft,
      bgColor: 'bg-amber-50 text-amber-800 border-amber-200/80',
      count: 'Easy transfer',
      onClick: () => navigateTo('my-prescriptions')
    }
  ];

  return (
    <div className="px-4 py-2 space-y-4">
      {/* 4 Main Quick Action Cards in a 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {primaryActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={`p-3.5 rounded-2xl bg-gradient-to-br ${action.bgGradient} ${action.textColor} text-left shadow-md hover:shadow-lg transition-all active:scale-[0.98] relative overflow-hidden flex flex-col justify-between group h-[110px]`}
            >
              {/* Background badge pill */}
              <div className="flex items-start justify-between w-full">
                <div className={`w-9 h-9 rounded-xl ${action.iconBg} flex items-center justify-center backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold bg-white/25 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {action.badge}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm tracking-tight leading-tight flex items-center gap-1">
                  <span>{action.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </h4>
                <p className="text-[10px] text-white/80 mt-0.5 line-clamp-1">
                  {action.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* "How can we help you today?" Horizontal 3-Card Row (Matching Rightway Screenshot 2) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            How can we help you today?
          </h3>
          <span className="text-[11px] text-blue-700 font-semibold cursor-pointer hover:underline" onClick={() => navigateTo('learning-center')}>
            Guides & FAQ
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {secondaryActions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.onClick}
                className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center flex flex-col items-center justify-between h-[105px] group"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-800 leading-tight">
                    {item.title}
                  </h5>
                  <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
                    {item.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

