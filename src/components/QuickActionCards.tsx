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
  const {
    navigateTo,
    userDoctorIds,
    userPrescriptions,
    userPharmacyIds,
    comparePlanIds,
    filteredPlans,
    zipCode
  } = useApp();

  const primaryActions = [
    {
      title: 'Find Plans',
      desc: `Explore Medicare in ${zipCode || '75080'}`,
      icon: Search,
      bgGradient: 'from-[#2563EB] via-[#1450DA] to-[#1544C2]',
      styleGradient: 'linear-gradient(135deg, #2563EB 0%, #1450DA 50%, #1544C2 100%)',
      badge: `${filteredPlans.length > 0 ? filteredPlans.length : 54} Plans`,
      onClick: () => navigateTo('plan-search')
    },
    {
      title: 'Compare Plans',
      desc: 'Side-by-side benefits table',
      icon: ArrowLeftRight,
      bgGradient: 'from-[#109E7A] via-[#097D62] to-[#0F6B5D]',
      styleGradient: 'linear-gradient(135deg, #109E7A 0%, #097D62 50%, #0F6B5D 100%)',
      badge: comparePlanIds.length > 0 ? `${comparePlanIds.length} Selected` : 'Interactive',
      onClick: () => navigateTo('plan-comparison')
    },
    {
      title: 'My Doctors',
      desc: 'Check in-network physicians',
      icon: Stethoscope,
      bgGradient: 'from-[#EF9E33] via-[#D76F00] to-[#C05500]',
      styleGradient: 'linear-gradient(135deg, #EF9E33 0%, #D76F00 50%, #C05500 100%)',
      badge: `${userDoctorIds.length > 0 ? userDoctorIds.length : 3} Added`,
      onClick: () => navigateTo('my-doctors')
    },
    {
      title: 'My Prescriptions',
      desc: 'Drug pricing & formulary check',
      icon: Pill,
      bgGradient: 'from-[#DE3366] via-[#BC0045] to-[#A90048]',
      styleGradient: 'linear-gradient(135deg, #DE3366 0%, #BC0045 50%, #A90048 100%)',
      badge: `${userPrescriptions.length > 0 ? userPrescriptions.length : 2} Meds`,
      onClick: () => navigateTo('my-prescriptions')
    }
  ];

  const secondaryActions = [
    {
      title: 'Pharmacy Coverage',
      desc: 'Preferred vs retail networks',
      icon: Building2,
      bgColor: 'bg-blue-50 text-blue-700 border border-blue-200/80',
      count: `${userPharmacyIds.length} saved`,
      onClick: () => navigateTo('my-pharmacies')
    },
    {
      title: 'Switch to Mail Order',
      desc: '90-day supply & zero copay',
      icon: Truck,
      bgColor: 'bg-purple-50 text-purple-700 border border-purple-200/80',
      count: 'Save up to 40%',
      onClick: () => navigateTo('my-prescriptions')
    },
    {
      title: 'Transfer a Medication',
      desc: 'Seamless pharmacy switch',
      icon: ArrowRightLeft,
      bgColor: 'bg-amber-50 text-amber-800 border border-amber-200/80',
      count: 'Easy transfer',
      onClick: () => navigateTo('my-prescriptions')
    }
  ];

  return (
    <div className="px-4 py-2 space-y-4">
      {/* 4 Main Quick Action Cards matching exact color theme in screenshot */}
      <div className="grid grid-cols-2 gap-2.5">
        {primaryActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              style={{ background: action.styleGradient }}
              className={`p-3.5 rounded-2xl bg-gradient-to-br ${action.bgGradient} text-white text-left shadow-md hover:shadow-lg transition-all active:scale-[0.98] relative overflow-hidden flex flex-col justify-between group h-[114px] cursor-pointer border border-white/15`}
            >
              {/* Top row: Frosted Icon Box & Frosted Badge */}
              <div className="flex items-start justify-between w-full">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-xs border border-white/25 shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-bold bg-white/20 text-white border border-white/25 px-2 py-0.5 rounded-full backdrop-blur-xs shadow-2xs">
                  {action.badge}
                </span>
              </div>

              {/* Bottom text: Title with Chevron & Subtitle */}
              <div>
                <h4 className="font-bold text-[13px] sm:text-sm text-white tracking-tight leading-tight flex items-center gap-1">
                  <span>{action.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </h4>
                <p className="text-[10px] text-white/80 mt-0.5 line-clamp-1 font-medium">
                  {action.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* "How can we help you today?" Horizontal 3-Card Row */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            How can we help you today?
          </h3>
          <span
            className="text-[11px] text-blue-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigateTo('learning-center')}
          >
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
                className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all text-center flex flex-col items-center justify-between h-[105px] group cursor-pointer active:scale-98"
              >
                <div className={`w-9 h-9 rounded-xl ${item.bgColor} flex items-center justify-center group-hover:scale-105 transition-all shadow-2xs`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h5>
                  <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">
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
