import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('eleanor.vance@gmail.com');
  const [password, setPassword] = useState('Medicare2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      showToast.error('Missing Credentials', 'Please enter both email and password.');
      return;
    }
    login(email);
    navigateTo('home');
  };

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-10 relative">
      {/* 1. Fluid Wavy Header Graphic with Back Button */}
      <div className="relative w-full overflow-hidden shrink-0 select-none">
        <svg
          viewBox="0 0 430 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          {/* Subtle background wave */}
          <path
            d="M0 0H430V75C345 105 240 50 145 78C65 100 0 85 0 85V0Z"
            fill="url(#wave-gradient-light)"
            opacity="0.45"
          />
          {/* Main primary wave */}
          <path
            d="M0 0H430V50C330 92 215 32 115 62C50 78 0 68 0 68V0Z"
            fill="url(#wave-gradient-dark)"
          />
          <defs>
            <linearGradient id="wave-gradient-light" x1="0" y1="0" x2="430" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#2563EB" />
              <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="wave-gradient-dark" x1="0" y1="0" x2="430" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="0.5" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#0B1E3B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Header Back Button */}
        <button
          onClick={() => navigateTo('home')}
          className="absolute top-3.5 left-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          title="Back to Home"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Main Body Content */}
      <div className="px-5 sm:px-6 pt-1 max-w-sm w-full mx-auto space-y-4 flex-1">
        {/* Title & Subtitle */}
        <div className="text-center space-y-0.5">
          <h2 className="text-2xl font-black text-[#1E3A8A] tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Login
          </p>
        </div>

        {/* Healthcare Security / Account Vector Illustration */}
        <div className="w-full flex justify-center py-1 select-none">
          <div className="w-48 h-32 relative flex items-center justify-center">
            <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              {/* Device / Portal Screen */}
              <rect x="75" y="12" width="90" height="116" rx="14" fill="#F0F7FF" stroke="#2563EB" strokeWidth="2.5" />
              <rect x="85" y="22" width="70" height="24" rx="8" fill="#DBEAFE" />
              {/* User Avatar circle inside device */}
              <circle cx="120" cy="34" r="7" fill="#2563EB" />
              {/* Password dots */}
              <rect x="90" y="56" width="60" height="8" rx="4" fill="#E2E8F0" />
              <circle cx="98" cy="60" r="2" fill="#64748B" />
              <circle cx="106" cy="60" r="2" fill="#64748B" />
              <circle cx="114" cy="60" r="2" fill="#64748B" />
              <circle cx="122" cy="60" r="2" fill="#64748B" />
              {/* Login Button Bar */}
              <rect x="90" y="74" width="60" height="12" rx="6" fill="#2563EB" />
              <rect x="105" y="78" width="30" height="4" rx="2" fill="#FFFFFF" opacity="0.9" />

              {/* Specialist standing on right */}
              <g transform="translate(162, 28)">
                <circle cx="16" cy="10" r="8" fill="#1E3A8A" />
                <path d="M8 24C8 20 14 18 16 18C18 18 24 20 24 24V50H8V24Z" fill="#2563EB" />
                {/* Doctor coat / stethoscope accents */}
                <path d="M12 24V44M20 24V44" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
                {/* Legs */}
                <rect x="10" y="50" width="5" height="40" rx="2.5" fill="#1E40AF" />
                <rect x="17" y="50" width="5" height="40" rx="2.5" fill="#1E40AF" />
                {/* Shoes */}
                <ellipse cx="11" cy="91" rx="4" ry="2" fill="#0B1E3B" />
                <ellipse cx="20" cy="91" rx="4" ry="2" fill="#0B1E3B" />
              </g>

              {/* Patient / Beneficiary sitting on left */}
              <g transform="translate(38, 40)">
                <circle cx="18" cy="10" r="7.5" fill="#0891B2" />
                <path d="M10 24C10 21 15 19 18 19C21 19 26 21 26 24V48H10V24Z" fill="#06B6D4" />
                {/* Stool */}
                <line x1="18" y1="56" x2="18" y2="82" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="10" y1="82" x2="26" y2="82" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="18" cy="54" rx="10" ry="3.5" fill="#64748B" />
                {/* Bent legs sitting */}
                <path d="M14 48H22L26 68L22 76" stroke="#0E7490" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>

              {/* Little sparkle/shield badge */}
              <circle cx="120" cy="102" r="10" fill="#10B981" opacity="0.15" />
              <path d="M116 102L119 105L124 99" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Error Feedback Display */}
        {error && (
          <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 leading-snug">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email Input */}
          <div>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Email Address"
                className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Password Input with Visibility Toggle & Forgot Password Link */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Password"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-slate-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>

            {/* Forgot Password Right-aligned */}
            <div className="flex justify-end mt-1.5 px-0.5">
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Primary Action Button: Login */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center mt-2"
          >
            Login
          </button>
        </form>

        {/* Terms & Privacy Policies Notice */}
        <p className="text-[10px] text-center text-slate-500 leading-relaxed px-2 pt-1">
          By continuing you are agreeing to our{' '}
          <button
            onClick={() => navigateTo('medicare-disclaimers')}
            className="text-blue-600 hover:underline font-semibold"
          >
            Terms & conditions
          </button>{' '}
          and our{' '}
          <button
            onClick={() => navigateTo('medicare-disclaimers')}
            className="text-blue-600 hover:underline font-semibold"
          >
            privacy policies
          </button>
          .
        </p>

        {/* Footer Navigation */}
        <div className="text-center text-xs text-slate-500 pt-1 pb-2">
          <span>Don't have an Account? </span>
          <button
            onClick={() => navigateTo('registration')}
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};
