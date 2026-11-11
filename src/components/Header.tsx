import React from 'react';
import { useApp } from '../context/AppContext';
import logoSvg from '../assets/Logo.svg';
import { 
  Search, 
  Bell, 
  User
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    unreadNotificationCount, 
    isAuthenticated,
    userProfile
  } = useApp();

  return (
    <header className="bg-[#0B1E3B] text-white px-4 h-14 shadow-sm border-b border-white/5 shrink-0 z-20 flex items-center">
      {/* Main Header Container */}
      <div className="w-full flex items-center justify-between">
        {/* Brand Logo - Official Vector Logo */}
        <div 
          onClick={() => navigateTo('home')}
          className="flex items-center cursor-pointer select-none group"
          role="button"
          tabIndex={0}
          aria-label="Home"
        >
          <img 
            src={logoSvg} 
            alt="Logo" 
            className="h-[25px] sm:h-7 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Search Icon */}
          <button
            onClick={() => navigateTo('plan-search')}
            className={`w-9 h-9 flex items-center justify-center transition-colors focus:outline-none ${
              currentScreen === 'plan-search' ? 'text-cyan-300' : 'text-blue-100 hover:text-white'
            }`}
            title="Search plans"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications with Badge (No pulse animation) */}
          <button
            onClick={() => navigateTo('notifications')}
            className={`w-9 h-9 flex items-center justify-center relative transition-colors focus:outline-none ${
              currentScreen === 'notifications' ? 'text-cyan-300' : 'text-blue-100 hover:text-white'
            }`}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile / Auth Button (Clean, no ring, no green dot) */}
          <button
            onClick={() => navigateTo(isAuthenticated ? 'user-profile' : 'login')}
            className="w-9 h-9 flex items-center justify-center transition-opacity focus:outline-none hover:opacity-85 cursor-pointer"
            title={isAuthenticated ? 'My Profile' : 'Sign In'}
            aria-label="User Account"
          >
            {isAuthenticated && userProfile ? (
              userProfile.photoUrl ? (
                /* Profile Photo - Clean, no colored ring, no green dot */
                <img 
                  src={userProfile.photoUrl} 
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  className="w-7 h-7 rounded-full object-cover shadow-xs"
                />
              ) : (
                /* Short Name / Initials if no profile picture */
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-[11px] flex items-center justify-center select-none shadow-xs">
                  {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                </div>
              )
            ) : (
              <User className="w-5 h-5 text-blue-100 hover:text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
