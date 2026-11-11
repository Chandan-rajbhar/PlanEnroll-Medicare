import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Select } from '../components/ui/Select';
import { 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  HeartHandshake, 
  Send,
  User,
  Mail,
  MapPin
} from 'lucide-react';

export const ContactAgentScreen: React.FC = () => {
  const { 
    zipCode, 
    userProfile, 
    submitCallbackRequest, 
    toggleAgentChat 
  } = useApp();

  const [fullName, setFullName] = useState(userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : '');
  const [phone, setPhone] = useState(userProfile ? userProfile.phone : '');
  const [email, setEmail] = useState(userProfile ? userProfile.email : '');
  const [preferredTime, setPreferredTime] = useState('Morning (9am - 12pm)');
  const [topic, setTopic] = useState('Compare Medicare Advantage vs Medigap');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCallbackRequest({
      fullName,
      phone,
      email,
      zipCode,
      preferredTime,
      topic,
      message
    });
    setSubmitted(true);
  };

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Licensed Agent Assistance
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          Connect with a Medicare Specialist
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Get non-commissioned, unbiased Medicare plan guidance at zero fee or obligation.
        </p>
      </div>

      {/* Immediate Contact Methods Row */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Direct Call Button */}
        <a
          href="tel:18557008583"
          className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md text-left flex flex-col justify-between h-[120px] active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <PhoneCall className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-emerald-200 block uppercase">Call Toll-Free</span>
            <span className="text-sm font-black leading-tight block">1-855-700-8583</span>
          </div>
        </a>

        {/* Live Chat Simulator Button */}
        <button
          onClick={() => toggleAgentChat(true)}
          className="p-4 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white shadow-md text-left flex flex-col justify-between h-[120px] active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-blue-200 block uppercase">Live Agent Chat</span>
            <span className="text-sm font-black leading-tight block">Instant Chat Now</span>
          </div>
        </button>
      </div>

      {/* Request a Callback Form */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-700" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">Schedule a Free Callback</h3>
            <span className="text-[11px] text-slate-400">A licensed agent will phone you at your convenience</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 rounded-2xl p-5 text-center space-y-2 border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-emerald-950">Callback Request Confirmed</h4>
            <p className="text-xs text-emerald-800">
              We received your request. An advisor will reach you at <strong>{phone}</strong> during your preferred window (<strong>{preferredTime}</strong>).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={zipCode}
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-600 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Time to Speak</label>
              <Select
                value={preferredTime}
                onChange={(val) => setPreferredTime(val)}
                options={[
                  { value: 'Morning (9am - 12pm)', label: 'Morning (9am - 12pm)' },
                  { value: 'Afternoon (12pm - 4pm)', label: 'Afternoon (12pm - 4pm)' },
                  { value: 'Evening (4pm - 7pm)', label: 'Evening (4pm - 7pm)' },
                  { value: 'Saturday Morning (10am - 1pm)', label: 'Saturday Morning (10am - 1pm)' },
                ]}
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Topic / Concern</label>
              <Select
                value={topic}
                onChange={(val) => setTopic(val)}
                options={[
                  { value: 'Compare Medicare Advantage vs Medigap', label: 'Compare Medicare Advantage vs Medigap' },
                  { value: 'Check Doctor Network Participation', label: 'Check Doctor Network Participation' },
                  { value: 'Verify Insulin & Prescription Drug Costs', label: 'Verify Insulin & Prescription Drug Costs' },
                  { value: 'Enroll in a $0 Premium Plan', label: 'Enroll in a $0 Premium Plan' },
                  { value: 'Check D-SNP Dual Eligibility Assistance', label: 'Check D-SNP Dual Eligibility Assistance' },
                ]}
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Optional Message / Questions</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention specific medications or current health insurance concerns..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Confirm Callback Request</span>
            </button>
          </form>
        )}
      </div>

      {/* Disclaimers */}
      <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-[10px] text-slate-500 leading-relaxed">
        <p>
          By submitting this request, you agree that an authorized licensed sales agent contracted with Medicare-approved plans may contact you by phone, email, or text to answer your Medicare questions. This consent is not a condition of purchasing any insurance product.
        </p>
      </div>
    </div>
  );
};

