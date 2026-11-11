import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const RegistrationScreen: React.FC = () => {
  const { registerUser, navigateTo, zipCode } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userZip, setUserZip] = useState(zipCode || '75080');
  const [password, setPassword] = useState('');
  const [hasMedicare, setHasMedicare] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      firstName,
      lastName,
      email,
      phone,
      zipCode: userZip
    });
    navigateTo('home');
  };

  return (
    <div className="pb-10 p-4 min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create Free Account</h2>
          <p className="text-xs text-slate-500">
            Save plans, track prescription formularies, & compare coverage.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Eleanor"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Vance"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eleanor@example.com"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(971) 752-9054"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">ZIP Code</label>
              <input
                type="text"
                required
                maxLength={5}
                value={userZip}
                onChange={(e) => setUserZip(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="75080"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Create Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={hasMedicare}
              onChange={(e) => setHasMedicare(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="font-medium text-slate-700">Currently enrolled in Medicare Part A or Part B</span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <span>Already registered? </span>
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-blue-700 hover:underline"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};

