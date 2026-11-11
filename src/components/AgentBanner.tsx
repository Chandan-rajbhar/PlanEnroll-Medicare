import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Phone, Inbox, ShieldCheck, HeartHandshake, X, Mail } from 'lucide-react';

export const AgentBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { toggleAgentChat, navigateTo, unreadNotificationCount } = useApp();
  const [showCallModal, setShowCallModal] = useState(false);

  const handleInboxClick = (e: React.MouseEvent) => {
    const recipient = 'support@planenroll.com';
    const subject = encodeURIComponent('Medicare Coverage & Plan Inquiry - PlanEnroll');
    const body = encodeURIComponent(
      'Hello Licensed Medicare Agent,\n\nI am contacting you from the PlanEnroll Medicare Mobile Portal regarding 2026 Medicare plan options in my area (ZIP: 75080).\n\nPlease assist me with:\n- Verifying in-network doctors & hospitals\n- Estimating prescription medication costs & copays\n- Comparing Medicare Advantage vs. Medigap Supplement plans\n\nThank you!'
    );

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      // On desktop browsers, open Gmail Web compose in a new tab directly
      e.preventDefault();
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    }
    // On mobile devices, allow default mailto to launch the native Gmail / Mail app
  };

  const recipient = 'support@planenroll.com';
  const defaultSubject = encodeURIComponent('Medicare Coverage & Plan Inquiry - PlanEnroll');
  const defaultBody = encodeURIComponent(
    'Hello Licensed Medicare Agent,\n\nI am contacting you from the PlanEnroll Medicare Mobile Portal regarding 2026 Medicare plan options in my area (ZIP: 75080).\n\nPlease assist me with:\n- Verifying in-network doctors & hospitals\n- Estimating prescription medication costs & copays\n- Comparing Medicare Advantage vs. Medigap Supplement plans\n\nThank you!'
  );
  const mailtoLink = `mailto:${recipient}?subject=${defaultSubject}&body=${defaultBody}`;

  return (
    <>
      <div className={`mx-4 my-2.5 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,37,68,0.08)] border border-blue-100/80 relative overflow-hidden ${className}`}>
        {/* Subtle decorative background glow */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-100/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3">
          {/* Left Text */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <span className="text-slate-900">Our Licensed Agents are humans, here to help.</span>
              <span className="text-rose-500">❤️</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Compare plans, verify doctor networks, & calculate drug costs at zero fee.
            </p>

            {/* Quick Action Buttons Row */}
            <div className="flex items-center gap-4 mt-3">
              {/* Chat Action */}
              <button
                onClick={() => toggleAgentChat(true)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200/90 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 mt-1 group-hover:text-blue-700">Chat</span>
              </button>

              {/* Call Action */}
              <button
                onClick={() => setShowCallModal(true)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200/90 flex items-center justify-center text-blue-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 mt-1 group-hover:text-emerald-700">Call</span>
              </button>

              {/* Inbox Action - Navigates directly to Gmail / Mail client */}
              <a
                href={mailtoLink}
                onClick={handleInboxClick}
                className="flex flex-col items-center group cursor-pointer relative"
                title="Send email via Gmail / Email app"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200/90 flex items-center justify-center text-blue-700 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <Inbox className="w-4 h-4" />
                </div>
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                    {unreadNotificationCount}
                  </span>
                )}
                <span className="text-[11px] font-semibold text-slate-700 mt-1 group-hover:text-indigo-700">Inbox</span>
              </a>
            </div>
          </div>

          {/* Right Agent Portrait with Online Indicator */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                alt="Sarah Miller, Licensed Medicare Agent"
                className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <span 
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center"
                title="Agent Online Now"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1 text-center">Sarah M.</span>
            <span className="text-[9px] text-blue-700 font-semibold bg-blue-100/70 px-1.5 py-0.2 rounded-full mt-0.5">Licensed</span>
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

