import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';
import { 
  Home, 
  Compass, 
  ArrowLeftRight, 
  Bookmark, 
  User 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    savedPlanIds, 
    comparePlanIds 
  } = useApp();

  // Hide nav bar on auth screens
  const authScreens: ScreenType[] = ['login', 'registration', 'forgot-password'];
  if (authScreens.includes(currentScreen)) {
    return null;
  }

  interface NavTab {
    id: ScreenType;
    label: string;
    icon: React.ElementType;
    badgeCount?: number;
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
      icon: Compass
    },
    {
      id: 'plan-comparison',
      label: 'Compare',
      icon: ArrowLeftRight,
      badgeCount: comparePlanIds.length
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
      icon: User
    }
  ];

  // Map every screen in the app to its parent navigation tab
  // This guarantees an active tab ALWAYS exists and never causes navbar jumpiness
  const getActiveTabId = (screen: ScreenType): ScreenType => {
    switch (screen) {
      case 'home':
      case 'contact-agent':
      case 'notifications':
        return 'home';

      case 'plan-search':
      case 'plan-details':
      case 'products':
      case 'medicare-disclaimers':
        return 'plan-search';

      case 'plan-comparison':
        return 'plan-comparison';

      case 'saved-plans':
      case 'personalized-quote':
        return 'saved-plans';

      case 'user-profile':
      case 'my-doctors':
      case 'my-pharmacies':
      case 'my-prescriptions':
      case 'settings':
      case 'help-support':
      case 'learning-center':
        return 'user-profile';

      default:
        return 'home';
    }
  };

  const activeTabId = getActiveTabId(currentScreen);

  return (
    <div className="w-full shrink-0 z-30 px-3.5 pb-3.5 pt-1.5 bg-slate-50 border-t border-slate-200/70 shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
      {/* 
        Solid Opaque Dark Capsule Bar:
        - 100% solid #0B192C background so page content never bleeds or affects the color.
        - Fixed grid-cols-5 layout so each tab has an exact 20% width.
        - When switching tabs, neighboring tabs NEVER move or shift!
      */}
      <nav 
        role="navigation"
        aria-label="Bottom Navigation"
        className="mx-auto max-w-[390px] w-full rounded-full bg-[#0B192C] shadow-lg shadow-slate-950/25 border border-slate-800/90 p-1.5 grid grid-cols-5 items-center select-none"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabId === tab.id;

          return (
            <div key={tab.id} className="flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => navigateTo(tab.id)}
                className={`w-full max-w-[64px] h-[44px] rounded-full flex flex-col items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-95 relative ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={tab.label}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative flex items-center justify-center">
                  <Icon 
                    className={`${
                      isActive 
                        ? 'w-4.5 h-4.5 text-blue-700 stroke-[2.2]' 
                        : 'w-5 h-5 stroke-[1.8]'
                    }`} 
                  />
                  {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                    <span 
                      className={`absolute -top-1 -right-2.5 min-w-[15px] h-3.5 px-1 text-[9px] font-black rounded-full flex items-center justify-center leading-none ${
                        isActive 
                          ? 'bg-blue-700 text-white shadow-2xs' 
                          : 'bg-blue-500 text-white ring-2 ring-[#0B192C]'
                      }`}
                    >
                      {tab.badgeCount}
                    </span>
                  )}
                </div>

                {isActive && (
                  <span className="text-[10px] font-bold text-blue-700 leading-tight mt-0.5 tracking-tight">
                    {tab.label}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
