import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Truck,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';

export const QuickActionCards: React.FC = () => {
  const {
    navigateTo,
    userPharmacyIds,
    zipCode
  } = useApp();

  const primaryActions = [
    {
      title: 'Find Plans',
      desc: `Explore Medicare in ${zipCode || '75080'}`,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
      onClick: () => navigateTo('plan-search')
    },
    {
      title: 'Compare Plans',
      desc: 'Side-by-side benefits table',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
      onClick: () => navigateTo('plan-comparison')
    },
    {
      title: 'My Doctors',
      desc: 'Check in-network physicians',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
      onClick: () => navigateTo('my-doctors')
    },
    {
      title: 'My Prescriptions',
      desc: 'Drug pricing & formulary check',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
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
      {/* 4 Main Quick Action Cards matching Image 1 photo cards layout */}
      <div className="grid grid-cols-2 gap-2.5">
        {primaryActions.map((action, idx) => (
          <button
            key={idx}
            type="button"
            onClick={action.onClick}
            className="relative h-[122px] sm:h-[130px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-left group cursor-pointer border border-slate-900/10"
          >
            {/* Background Lifestyle Image */}
            <img
              src={action.image}
              alt={action.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Dark Gradient Overlay for Maximum Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />

            {/* Bottom Content: Title with Chevron & Subtitle */}
            <div className="relative z-10 p-3 h-full flex flex-col justify-end">
              <h4 className="font-extrabold text-[14px] sm:text-[15px] text-white tracking-tight leading-tight flex items-center gap-1 drop-shadow-xs">
                <span>{action.title}</span>
                <ChevronRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
              </h4>
              <p className="text-[11px] text-white/85 font-medium mt-0.5 leading-snug line-clamp-1 drop-shadow-xs">
                {action.desc}
              </p>
            </div>
          </button>
        ))}
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
