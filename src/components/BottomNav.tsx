import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';
import { 
  Home, 
  Layers, 
  ArrowLeftRight, 
  Bookmark, 
  UserCircle 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    savedPlanIds, 
    comparePlanIds 
  } = useApp();

  interface NavTab {
    id: ScreenType;
    label: string;
    icon: React.ElementType;
    badgeCount?: number;
    isCenter?: boolean;
  }

  const tabs: NavTab[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home
    },
    {
      id: 'plan-search',
      label: 'Plans',
      icon: Layers
    },
    {
      id: 'plan-comparison',
      label: 'Compare',
      icon: ArrowLeftRight,
      badgeCount: comparePlanIds.length,
      isCenter: true
    },
    {
      id: 'saved-plans',
      label: 'Saved',
      icon: Bookmark,
      badgeCount: savedPlanIds.length
    },
    {
      id: 'user-profile',
      label: 'Profile',
      icon: UserCircle
    }
  ];

  return (
    <nav className="w-full shrink-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] relative">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className="group relative flex flex-col items-center -top-3.5 focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-3 border-white ${
                    isActive
                      ? 'bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-blue-500/40 ring-2 ring-blue-600'
                      : 'bg-gradient-to-tr from-[#0F2544] to-blue-800 text-white shadow-slate-900/20 hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 font-black text-[11px] rounded-full border-2 border-white flex items-center justify-center shadow">
                      {tab.badgeCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-0.5 font-semibold transition-colors ${
                    isActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-800'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-blue-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-700' : ''}`} />
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {tab.badgeCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
