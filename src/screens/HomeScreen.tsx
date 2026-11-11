import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AgentBanner } from '../components/AgentBanner';
import { CategoryTabs } from '../components/CategoryTabs';
import { QuickActionCards } from '../components/QuickActionCards';
import { PlanCard } from '../components/PlanCard';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Pill, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  BookOpen, 
  Phone,
  ChevronRight,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    filteredPlans, 
    navigateTo, 
    zipCode, 
    countyState,
    setIsZipModalOpen,
    userPrescriptions,
    updateFilters
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      updateFilters({ searchQuery: searchQuery.trim() });
      navigateTo('plan-search');
    }
  };

  return (
    <div className="pb-10 space-y-3.5">
      {/* Search Bar matching Rightway Screenshot 2 ("Find the lowest drug prices") */}
      <div className="px-4 pt-2">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search plans, drugs, or doctors in ${zipCode}...`}
            className="w-full pl-10 pr-24 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-xs text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-blue-700 text-white text-[11px] font-bold hover:bg-blue-800 shadow-xs cursor-pointer active:scale-95"
          >
            Search
          </button>
        </form>
      </div>

      {/* Coverage Area Banner - Native mobile scrollable card (Clean & not fixed to top) */}
      <div className="mx-4 flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">Coverage Area</span>
            <span className="text-xs font-bold text-slate-900 mt-0.5 block leading-tight">
              {zipCode} <span className="font-normal text-slate-500 text-[11px]">({countyState})</span>
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsZipModalOpen(true)}
          className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200/80 transition-colors active:scale-95 cursor-pointer"
        >
          Change
        </button>
      </div>

      {/* Floating Agent Banner matching Screenshot 2 */}
      <AgentBanner />

      {/* Hero Section Banner (Matching Section 3 requirement) */}
      <div className="px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F2544] via-blue-900 to-indigo-900 text-white p-5 shadow-lg">
          {/* Subtle background image overlay */}
          <div 
            className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80')`
            }}
          />

          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Medicare Open Enrollment Active</span>
            </span>

            <div>
              <h2 className="text-xl font-black text-white leading-tight">
                Find the Right Medicare Plan
              </h2>
              <p className="text-xs text-blue-100/90 mt-1 max-w-xs leading-relaxed">
                Explore Medicare Advantage, Medigap, and Part D drug coverage options in {countyState}.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => navigateTo('plan-search')}
                className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Explore Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigateTo('plan-comparison')}
                className="py-2.5 px-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all backdrop-blur-md"
              >
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Category Tabs */}
      <div className="space-y-1">
        <div className="px-4 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Explore by Category
          </h3>
          <span 
            onClick={() => navigateTo('products')}
            className="text-[11px] font-semibold text-blue-700 cursor-pointer hover:underline"
          >
            All Products Guide
          </span>
        </div>
        <CategoryTabs />
      </div>

      {/* Four Quick Action Cards + 3 Service Cards */}
      <QuickActionCards />

      {/* "Your Medications" Alert & Refill Section (Exact replica of Rightway Screenshot 2) */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Your Medications & Refills
          </h3>
          <button 
            onClick={() => navigateTo('my-prescriptions')}
            className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
          >
            <span>See All ({userPrescriptions.length})</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Refill card (Lantus 15ml of 100 units from screenshot) */}
        <div 
          onClick={() => navigateTo('my-prescriptions')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Ready to Refill</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">3 days remaining</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <Pill className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Lantus 15ml of 100 units
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                <span>Refills Left: <strong>3</strong></span>
                <span>•</span>
                <span>Dr. Lubin</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <span className="text-rose-500 font-bold">❤️</span>
              <span>CVS Pharmacy</span>
            </div>
            <a 
              href="tel:9717529054" 
              onClick={(e) => e.stopPropagation()} 
              className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>971-752-9054</span>
            </a>
          </div>
        </div>

        {/* Prior Authorization notice card (from Rightway screenshot) */}
        <div 
          onClick={() => navigateTo('notifications')}
          className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200/90 flex items-center justify-between cursor-pointer hover:bg-amber-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-900 block leading-tight">
                Prior Authorization Denied Notice
              </span>
              <span className="text-[10px] text-amber-800">
                Appeal options & alternate generic available
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-700" />
        </div>
      </div>

      {/* Featured Medicare Plans in 75080 */}
      <div className="px-4 space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Featured Plans in {zipCode}
            </h3>
            <span className="text-[10px] text-slate-400">
              {filteredPlans.length} verified plans matching your area
            </span>
          </div>
          <button 
            onClick={() => navigateTo('plan-search')}
            className="text-[11px] font-bold text-blue-700 hover:underline"
          >
            View All ({filteredPlans.length})
          </button>
        </div>

        <div className="space-y-3">
          {filteredPlans.slice(0, 3).map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Learning Center Promo Card */}
      <div className="px-4 pt-2">
        <div 
          onClick={() => navigateTo('learning-center')}
          className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-4 text-white shadow-md flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Medicare Learning Center</h4>
              <p className="text-[10px] text-blue-200 mt-0.5">
                Understand Parts A, B, C, & D and Medigap rules
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mandatory CMS TPMO Compliance Disclaimer */}
      <div className="px-4 pt-2">
        <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-[10px] text-slate-500 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Official Medicare Disclaimer</span>
          </div>
          <p>
            We do not offer every plan available in your area. Currently we represent 10 organizations which offer 54 products in your area. Please contact Medicare.gov, 1-800-MEDICARE (TTY: 1-877-486-2048), or your local State Health Insurance Program (SHIP) to get information on all of your options.
          </p>
          <p>
            PlanEnroll is operated by Integrity Marketing Group, LLC, a non-government licensed insurance agency.
          </p>
        </div>
      </div>
    </div>
  );
};

