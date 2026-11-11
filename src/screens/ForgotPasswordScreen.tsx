import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
    }
  };

  return (
    <div className="pb-10 p-4 min-h-[75vh] flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto space-y-4">
        <button
          onClick={() => navigateTo('login')}
          className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-500">
            Enter your email address to receive password reset instructions.
          </p>
        </div>

        {isSent ? (
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-950">Reset Link Dispatched</h3>
            <p className="text-xs text-emerald-800">
              We have dispatched password reset instructions to <strong>{email}</strong>. Check your inbox and spam folder.
            </p>
            <button
              onClick={() => navigateTo('login')}
              className="py-2.5 px-4 rounded-xl bg-blue-700 text-white font-bold text-xs"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor.vance@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              Send Password Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

