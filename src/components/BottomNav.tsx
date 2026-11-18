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
    <div className="w-full shrink-0 z-30 px-4 pb-3 pt-1 bg-transparent pointer-events-none">
      <nav 
        role="navigation"
        aria-label="Bottom Navigation"
        className="mx-auto max-w-[390px] w-full h-[58px] rounded-full bg-[#0B1527] shadow-xl shadow-slate-950/30 border border-slate-800/80 px-1.5 grid grid-cols-5 items-center select-none pointer-events-auto"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabId === tab.id;

          return (
            <div key={tab.id} className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigateTo(tab.id)}
                className={`relative flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-100 ${
                  isActive
                    ? 'w-[62px] h-[46px] rounded-full bg-white text-blue-600 shadow-md'
                    : 'w-10 h-10 rounded-full text-slate-400 hover:text-white'
                }`}
                title={tab.label}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative flex items-center justify-center">
                  <Icon className={isActive ? 'w-4 h-4 text-blue-600 stroke-[2.2]' : 'w-5 h-5 stroke-[1.8]'} />
                  {!isActive && tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 text-[10px] font-black rounded-full bg-blue-600 text-white flex items-center justify-center leading-none ring-2 ring-[#0B1527] shadow-xs">
                      {tab.badgeCount}
                    </span>
                  )}
                </div>
                {isActive && (
                  <span className="text-[10px] font-extrabold text-blue-600 leading-tight mt-0.5">
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
