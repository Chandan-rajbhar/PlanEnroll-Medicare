import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  KeyRound
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('eleanor.vance@gmail.com');
  const [password, setPassword] = useState('Medicare2026!');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }
    login(email);
    navigateTo('home');
  };

  const handleDemoFill = () => {
    setEmail('eleanor.vance@gmail.com');
    setPassword('Medicare2026!');
  };

  return (
    <div className="pb-10 p-4 min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto space-y-5">
        {/* Logo and Intro */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-blue-700 to-indigo-900 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
            PE
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-500">
            Sign in to access your saved Medicare plans, doctors, & prescriptions.
          </p>
        </div>

        {/* Demo Credentials Quick Fill Button */}
        <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-200 text-center">
          <span className="text-[11px] text-blue-900 font-semibold block">Demo Beneficiary Account</span>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs font-bold text-blue-700 hover:underline mt-0.5"
          >
            Click to autofill Eleanor's demo account
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-[11px] text-blue-700 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <span>Don't have an account yet? </span>
          <button
            onClick={() => navigateTo('registration')}
            className="font-bold text-blue-700 hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

