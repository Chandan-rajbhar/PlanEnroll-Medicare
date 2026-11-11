import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Bot, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  timestamp: string;
}

export const LiveAgentChatModal: React.FC = () => {
  const { isAgentChatOpen, toggleAgentChat, userProfile, zipCode } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: `Hello ${userProfile?.firstName || 'there'}! I'm Sarah Miller, a licensed Medicare agent with PlanEnroll (NPN: 19842103). I can help you check doctor networks, review medication copays, and compare 2026 plans in ${zipCode}. How can I assist you today?`,
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isAgentChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Dynamic Medicare Agent Assistant response simulation
    setTimeout(() => {
      let agentReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('lantus') || lower.includes('insulin')) {
        agentReply = `Great question! Lantus (Insulin Glargine) is covered under Tier 3 on both the Molina Complete Care and Blue Cross Value plans. Thanks to the federal Senior Savings Model under the Inflation Reduction Act, your copay is capped at a maximum of $35 per 30-day supply!`;
      } else if (lower.includes('doctor') || lower.includes('lubin') || lower.includes('network')) {
        agentReply = `I checked Dr. Robert Lubin, MD (Internal Medicine in 75080). He participates in-network with Blue Cross Blue Shield, UnitedHealthcare, Humana, and Molina Healthcare. If you choose a Medigap policy like Mutual of Omaha Plan G, you can see Dr. Lubin or any doctor accepting Medicare with $0 network restrictions.`;
      } else if (lower.includes('compare') || lower.includes('difference') || lower.includes('plan g') || lower.includes('advantage')) {
        agentReply = `Here is the key distinction: Medicare Advantage (Part C) bundles hospital, medical, and prescription coverage into one plan, often with $0 monthly premiums and dental/vision perks, but requires using their network. Medigap Plan G has a monthly premium (approx. $142/mo), but covers 100% of all hospital and medical coinsurance once you pay the $240 annual Part B deductible, with total nationwide doctor freedom!`;
      } else if (lower.includes('cost') || lower.includes('premium') || lower.includes('free') || lower.includes('0')) {
        agentReply = `In ZIP ${zipCode}, we have several $0 monthly premium Medicare Advantage plans available (such as Blue Cross Value HMO and Humana Gold Plus HMO). You still continue paying your standard Part B premium to Medicare, but your plan adds extra dental, vision, hearing, and OTC allowances!`;
      } else {
        agentReply = `Thank you for sharing that! As your licensed advisor, I can guide you through the enrollment forms or schedule a direct telephone consultation to review your exact doctors and prescriptions. Would you like me to reserve a callback time for you, or do you have another plan question?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ag-${Date.now()}`,
          sender: 'agent',
          text: agentReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in">
      <div className="bg-white text-slate-900 w-full h-[92%] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F2544] text-white p-4 flex items-center justify-between border-b border-blue-900 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                alt="Sarah Miller"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shadow"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0F2544] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm leading-none text-white">Sarah Miller</h4>
                <span className="text-[10px] bg-blue-800 text-cyan-300 font-bold px-1.5 py-0.5 rounded-full">
                  Licensed Agent
                </span>
              </div>
              <p className="text-[11px] text-blue-200 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified CMS Advisor • PlanEnroll</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="tel:18557008583"
              className="p-2 rounded-full hover:bg-blue-800 text-blue-200 hover:text-white"
              title="Call agent"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              onClick={() => toggleAgentChat(false)}
              className="p-2 rounded-full hover:bg-blue-800 text-blue-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Disclaimer sub-header */}
        <div className="bg-blue-50 px-3.5 py-1.5 text-[10px] text-blue-900 border-b border-blue-100 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Real-time assistance with zero sales obligation. Call: 1-855-700-8583.</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-700 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 shadow-xs flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] ml-1">Sarah is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {[
            'Does Molina cover Lantus?',
            'Difference between Plan G & HMO?',
            'Is Dr. Lubin in-network?',
            'What plans have $0 premium?'
          ].map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInput(q);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-600 border border-slate-200 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your Medicare question..."
            className="flex-1 py-2 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs text-slate-800"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-40 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

