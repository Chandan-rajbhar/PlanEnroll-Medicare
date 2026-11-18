import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Phone, Mail, ShieldCheck, HeartHandshake, X } from 'lucide-react';

export const AgentBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { toggleAgentChat, navigateTo, unreadNotificationCount } = useApp();
  const [showCallModal, setShowCallModal] = useState(false);

  const recipient = 'support@planenroll.com';
  const defaultSubject = encodeURIComponent('Medicare Coverage & Clinical Inquiry - PlanEnroll');
  const defaultBody = encodeURIComponent(
    'Hello Licensed Medicare Team,\n\nI am contacting you from the PlanEnroll Medicare Mobile App regarding Medicare coverage and plan guidance in my area.\n\nPlease assist me with:\n- Verifying in-network doctors & hospitals\n- Estimating prescription drug copays\n- Comparing Medicare Advantage vs. Medigap plans\n\nThank you!'
  );
  const mailtoLink = `mailto:${recipient}?subject=${defaultSubject}&body=${defaultBody}`;

  const handleEmailClick = (e: React.MouseEvent) => {
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${defaultSubject}&body=${defaultBody}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      e.preventDefault();
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className={`mx-4 my-2 bg-white rounded-3xl p-4.5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${className}`}>
        <div>
          {/* Card Title */}
          <h3 className="font-black text-[17px] text-slate-900 leading-tight tracking-tight">
            Licensed Clinical Triage
          </h3>
          {/* Subtitle / Description */}
          <p className="text-xs text-slate-500 font-normal mt-1 leading-snug">
            Direct physician-engineering consultation. Rapid zero-fee intake.
          </p>

          {/* 3 Action Buttons: Live Chat, Call Direct, Email */}
          <div className="grid grid-cols-3 gap-2.5 mt-3.5">
            {/* 1. Live Chat */}
            <button
              type="button"
              onClick={() => toggleAgentChat(true)}
              className="bg-[#EEF4FF] hover:bg-[#E0ECFF] active:scale-95 border border-blue-100/90 rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
              title="Open Live Chat"
            >
              <MessageSquare className="w-5 h-5 text-blue-600 stroke-[2] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-slate-900 leading-tight">
                Live Chat
              </span>
            </button>

            {/* 2. Call Direct */}
            <button
              type="button"
              onClick={() => setShowCallModal(true)}
              className="bg-[#EEF4FF] hover:bg-[#E0ECFF] active:scale-95 border border-blue-100/90 rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
              title="Call Clinical Team"
            >
              <Phone className="w-5 h-5 text-blue-600 stroke-[2] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-slate-900 leading-tight">
                Call Direct
              </span>
            </button>

            {/* 3. Email Us */}
            <a
              href={mailtoLink}
              onClick={handleEmailClick}
              className="bg-[#EEF4FF] hover:bg-[#E0ECFF] active:scale-95 border border-blue-100/90 rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
              title="Send Email / Message"
            >
              <Mail className="w-5 h-5 text-blue-600 stroke-[2] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-slate-900 leading-tight">
                Email Us
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Call Agent Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-[360px] w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Speak to a Licensed Agent</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              PlanEnroll connects you with licensed, CMS-certified Medicare agents who represent top carriers in your ZIP code.
            </p>

            <div className="my-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Toll-Free Helpline</span>
              <a 
                href="tel:18557008583" 
                className="text-2xl font-black text-blue-900 hover:text-blue-700 tracking-tight block mt-1"
              >
                1-855-700-8583
              </a>
              <span className="text-[11px] text-slate-400 mt-0.5 block">TTY Users: 711 | Mon-Fri 8am-8pm CST</span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No pressure, zero obligation consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Verify prescription formulary & doctor networks</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setShowCallModal(false);
                  navigateTo('contact-agent');
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Request Callback
              </button>
              <a
                href="tel:18557008583"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

