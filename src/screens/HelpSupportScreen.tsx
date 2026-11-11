import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  PhoneCall, 
  MessageSquare, 
  FileQuestion, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

export const HelpSupportScreen: React.FC = () => {
  const { toggleAgentChat } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [isTicketSubmitted, setIsTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Is there any fee or cost to use PlanEnroll?',
      a: 'No. PlanEnroll is 100% free for beneficiaries to explore plans, estimate prescription costs, compare benefits, and speak with licensed agents. Insurance premiums are paid directly to your chosen insurance company.'
    },
    {
      q: 'When can I enroll in or switch my Medicare plan?',
      a: 'You can enroll during the Annual Enrollment Period (AEP) from October 15 to December 7 each year. If you are turning 65, you have an Initial Enrollment Period (IEP). Special Enrollment Periods (SEPs) are also available if you move, lose employer coverage, or qualify for Extra Help/Medicaid.'
    },
    {
      q: 'Will my current doctors accept my new Medicare plan?',
      a: 'With Medicare Advantage (HMO/PPO), you must verify that your doctors participate in the plan’s provider network. With Medicare Supplement (Medigap Plan G/Plan N), you can see ANY doctor or hospital across the entire United States that accepts Medicare.'
    },
    {
      q: 'How does the $2,000 Part D prescription drug cap work in 2026?',
      a: 'Under the Inflation Reduction Act, no Medicare beneficiary will pay more than $2,000 in total out-of-pocket costs for covered Part D prescription drugs in a single calendar year, after which the plan pays 100% of covered drug costs.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject && ticketMsg) {
      setIsTicketSubmitted(true);
    }
  };

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Customer Service & Assistance
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          Help & Support
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Get fast answers to Medicare questions or speak directly with our licensed guides.
        </p>
      </div>

      {/* Emergency Contact Quick Links */}
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="tel:18557008583"
          className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">PlanEnroll Helpline</span>
            <span className="text-xs font-black text-slate-900">1-855-700-8583</span>
          </div>
        </a>

        <button
          onClick={() => toggleAgentChat(true)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Live Agent Chat</span>
            <span className="text-xs font-black text-slate-900">Chat with Sarah</span>
          </div>
        </button>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Frequently Asked Questions
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                <div
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-xs text-slate-900 leading-snug">{faq.q}</span>
                  <div className="p-0.5 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Message Ticket Form */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Submit a Question to Support
        </h3>

        {isTicketSubmitted ? (
          <div className="bg-emerald-50 rounded-2xl p-4 text-center space-y-2 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-xs text-emerald-950">Inquiry Dispatched</h4>
            <p className="text-[11px] text-emerald-800">
              Our support team has logged your inquiry. You will receive a response within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Question about HMO specialist referrals"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Question or Issue</label>
              <textarea
                required
                rows={3}
                value={ticketMsg}
                onChange={(e) => setTicketMsg(e.target.value)}
                placeholder="Explain what information you need regarding your Medicare plan..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

