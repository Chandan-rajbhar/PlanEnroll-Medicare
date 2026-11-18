import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';
import { ChevronLeft, Mail, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
      showToast.success('Reset Link Sent', `Password reset instructions sent to ${email}`);
    }
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
          <path
            d="M0 0H430V75C345 105 240 50 145 78C65 100 0 85 0 85V0Z"
            fill="url(#wave-fp-light)"
            opacity="0.45"
          />
          <path
            d="M0 0H430V50C330 92 215 32 115 62C50 78 0 68 0 68V0Z"
            fill="url(#wave-fp-dark)"
          />
          <defs>
            <linearGradient id="wave-fp-light" x1="0" y1="0" x2="430" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#2563EB" />
              <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="wave-fp-dark" x1="0" y1="0" x2="430" y2="100" gradientUnits="userSpaceOnUse">
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
          title="Back to Sign In"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Main Body Content */}
      <div className="px-5 sm:px-6 pt-3 max-w-sm w-full mx-auto space-y-4 flex-1">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#1E3A8A] tracking-tight">
            Reset Password
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Enter your email address to receive password reset instructions.
          </p>
        </div>

        {isSent ? (
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-xs text-emerald-950">Reset Link Dispatched</h3>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              We have dispatched password reset instructions to <strong>{email}</strong>. Check your inbox and spam folder.
            </p>
            <button
              onClick={() => navigateTo('login')}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-xs tracking-wide shadow-sm"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Registered Email Address"
                  className="w-full h-11 px-3.5 rounded-xl border border-blue-200/90 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center"
            >
              Send Reset Link
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="text-center text-xs text-slate-500 pt-3">
          <span>Remembered your password? </span>
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
