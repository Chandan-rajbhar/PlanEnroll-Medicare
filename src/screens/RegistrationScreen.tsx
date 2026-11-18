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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userZip, setUserZip] = useState(zipCode || '75080');
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

    registerUser({
      firstName,
      lastName,
      email,
      phone,
      zipCode: userZip
    });
    navigateTo('home');
  };

  const handleGoogleSignup = () => {
    registerUser({
      firstName: 'Eleanor',
      lastName: 'Vance',
      email: 'eleanor.vance@gmail.com',
      phone: '(971) 752-9054',
      zipCode: userZip || '75080'
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
          {/* First Name & Last Name Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
            </div>
            <div>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
            </div>
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

          {/* Phone Number & ZIP Code Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
            </div>
            <div>
              <input
                type="text"
                required
                maxLength={5}
                value={userZip}
                onChange={(e) => setUserZip(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="ZIP Code (75080)"
                className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
            </div>
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

        {/* Divider: or signup with google */}
        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-2.5 text-[10px] font-medium text-slate-400 whitespace-nowrap">
            or signup with google
          </span>
          <div className="border-t border-slate-200 w-full"></div>
        </div>

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full h-11 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
        >
          {/* Authentic Google "G" Logo */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

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
