import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const RegistrationScreen: React.FC = () => {
  const { registerUser, navigateTo, zipCode } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasMedicare, setHasMedicare] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
      showToast.error('Password Mismatch', 'Please ensure both passwords match.');
      return;
    }

    const nameParts = fullName.trim().split(/\s+/);
    const fName = nameParts[0] || 'User';
    const lName = nameParts.slice(1).join(' ') || '';

    registerUser({
      firstName: fName,
      lastName: lName,
      email,
      phone: '',
      zipCode: zipCode || '75080'
    });
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
            fill="url(#wave-reg-light)"
            opacity="0.45"
          />
          {/* Main primary wave */}
          <path
            d="M0 0H430V50C330 92 215 32 115 62C50 78 0 68 0 68V0Z"
            fill="url(#wave-reg-dark)"
          />
          <defs>
            <linearGradient id="wave-reg-light" x1="0" y1="0" x2="430" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#2563EB" />
              <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="wave-reg-dark" x1="0" y1="0" x2="430" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="0.5" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#0B1E3B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Header Back Button */}
        <button
          onClick={() => navigateTo('login')}
          className="absolute top-3.5 left-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          title="Back to Login"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Main Body Content */}
      <div className="px-5 sm:px-6 pt-1 max-w-sm w-full mx-auto space-y-3.5 flex-1">
        {/* Title & Subtitle matching the image */}
        <div className="text-center space-y-0.5">
          <h2 className="text-2xl font-black text-[#1E3A8A] tracking-tight">
            Create Account
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Enter your Personal Data
          </p>
        </div>

        {/* Error Feedback Display */}
        {error && (
          <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 leading-snug">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Full Name Input */}
          <div>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>

          {/* Create Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Create Password"
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
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Confirm Password"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 text-slate-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Medicare Beneficiary Status */}
          <label className="flex items-center gap-2 pt-0.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasMedicare}
              onChange={(e) => setHasMedicare(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-[11px] font-medium text-slate-700">
              Currently enrolled in Medicare (Part A/B)
            </span>
          </label>

          {/* Primary Action Button: Signup */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center mt-2"
          >
            Signup
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
          <span>Already have an Account? </span>
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
