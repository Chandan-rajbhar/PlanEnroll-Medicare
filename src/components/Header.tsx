import React from 'react';
import { useApp } from '../context/AppContext';
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
    <header className="bg-[#0B1E3B] text-white py-2.5 px-4 shadow-md shrink-0 z-20">
      {/* Main Header Row */}
      <div className="flex items-center justify-between">
        {/* Logo & Brand Name */}
        <div 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-lg font-black text-white tracking-tighter">PE</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-base tracking-tight text-white">PlanEnroll</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-800 text-cyan-300">Medicare</span>
            </div>
            <p className="text-[10px] text-blue-200/80 mt-0.5">Insurance Mobile Portal</p>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Icon */}
          <button
            onClick={() => navigateTo('plan-search')}
            className={`p-1.5 transition-colors focus:outline-none ${
              currentScreen === 'plan-search' ? 'text-cyan-300' : 'text-blue-100 hover:text-white'
            }`}
            title="Search plans"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications with Badge */}
          <button
            onClick={() => navigateTo('notifications')}
            className={`p-1.5 relative transition-colors focus:outline-none ${
              currentScreen === 'notifications' ? 'text-cyan-300' : 'text-blue-100 hover:text-white'
            }`}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile / Auth Button */}
          <button
            onClick={() => navigateTo(isAuthenticated ? 'user-profile' : 'login')}
            className="p-1 transition-opacity flex items-center justify-center focus:outline-none hover:opacity-85 cursor-pointer"
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
