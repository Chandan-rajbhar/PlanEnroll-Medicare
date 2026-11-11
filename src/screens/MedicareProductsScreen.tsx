import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlanCategory } from '../types';
import { 
  ShieldCheck, 
  Heart, 
  Pill, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  Info
} from 'lucide-react';

export const MedicareProductsScreen: React.FC = () => {
  const { setSelectedCategory, navigateTo, toggleAgentChat } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<PlanCategory>('medicare-advantage');

  const products = [
    {
      id: 'medicare-advantage' as PlanCategory,
      title: 'Medicare Advantage',
      subtitle: 'Part C "All-in-One" Bundles',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Most Popular',
      description: 'Private insurance alternative that bundles Part A (Hospital), Part B (Medical), and usually Part D (Prescription Drugs) into a single unified plan.',
      highlights: [
        '$0 Monthly Premium options available in most ZIP codes',
        'Built-in Part D Prescription Drug coverage',
        'Extra benefits: Dental, Vision, Hearing, OTC Allowance, & Gym Memberships',
        'Network types: HMO (coordinated care) and PPO (out-of-network flexibility)',
        'Annual Maximum Out-of-Pocket (MOOP) protection limit'
      ],
      planLetterSummary: 'HMO, PPO, HMO-POS, and PFFS network structures.'
    },
    {
      id: 'medicare-supplement' as PlanCategory,
      title: 'Medicare Supplement',
      subtitle: 'Medigap Policies (Plan G, Plan N)',
      icon: Heart,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Zero Network Limits',
      description: 'Policies sold by private insurance carriers (like Mutual of Omaha and Aetna) that pay the "gaps" in Original Medicare, such as hospital deductibles and 20% coinsurance.',
      highlights: [
        'See ANY doctor or hospital in the entire United States that accepts Medicare',
        'No specialist referrals required',
        'Plan G covers 100% of hospital and medical costs after the $240 Part B deductible',
        'Plan N provides lower monthly premiums with small copays ($0-$20/visit)',
        'Guaranteed renewable for life regardless of future health conditions'
      ],
      planLetterSummary: 'Standardized CMS Plan Letters: Plan A through N (Plan G & N most popular).'
    },
    {
      id: 'prescription-drug' as PlanCategory,
      title: 'Prescription Drug Plans',
      subtitle: 'Stand-alone Part D Plans (PDP)',
      icon: Pill,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      badge: '$2,000 Max Cap',
      description: 'Stand-alone insurance plans that add outpatient prescription drug coverage to Original Medicare or Medigap policies.',
      highlights: [
        'Annual out-of-pocket prescription cap: $2,000 maximum under Inflation Reduction Act',
        'Preferred pharmacy discounts at CVS, Walgreens, Walmart, and local chains',
        '90-day mail-order direct doorstep delivery options',
        'Tiered formulary pricing: Tier 1 & 2 generic drugs often $0 copay',
        'Coverage for essential vaccines (Shingrix, Tdap, COVID-19, Flu) at $0 copay'
      ],
      planLetterSummary: 'Offered by carriers such as SilverScript by CVS Health and Wellcare.'
    },
    {
      id: 'special-needs' as PlanCategory,
      title: 'Special Needs Plans',
      subtitle: 'D-SNP, C-SNP, and I-SNP',
      icon: Users,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'Extra Assistance',
      description: 'Tailored Medicare Advantage plans specifically engineered for individuals with specific financial or health conditions.',
      highlights: [
        'D-SNP (Dual-Eligible): For beneficiaries with both Medicare and Medicaid with $0 copays',
        'C-SNP (Chronic Condition): For individuals with Diabetes, Heart Disease, or Lung Conditions',
        'I-SNP (Institutional): For beneficiaries residing in a nursing home or long-term care facility',
        'Generous monthly spending credits ($100-$185/mo) for healthy groceries and utilities',
        'Dedicated nurse care coordinators to navigate healthcare appointments'
      ],
      planLetterSummary: 'Eligibility verification required (Medicaid card or chronic diagnosis).'
    }
  ];

  const current = products.find(p => p.id === selectedProduct)!;

  const handleBrowseCategory = (cat: PlanCategory) => {
    setSelectedCategory(cat);
    navigateTo('plan-search');
  };

  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Medicare Product Portfolio
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          Compare Medicare Options
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Understand the four distinct types of Medicare coverage to choose what matches your healthcare needs and budget.
        </p>
      </div>

      {/* Product Selector Pills */}
      <div className="grid grid-cols-2 gap-2">
        {products.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedProduct === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-[85px] ${
                isSelected
                  ? 'bg-[#0F2544] text-white border-[#0F2544] shadow-md ring-2 ring-blue-900/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20 text-white' : p.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {p.badge}
                </span>
              </div>
              <span className="font-bold text-xs leading-tight">{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Product Detailed Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4 animate-in fade-in">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
              {current.subtitle}
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-tight mt-0.5">
              {current.title}
            </h3>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {current.planLetterSummary}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {current.description}
        </p>

        {/* Highlights List */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Key Features & Benefits:
          </h4>
          <div className="space-y-1.5">
            {current.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => toggleAgentChat(true)}
            className="p-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center shrink-0"
            title="Ask agent"
          >
            <PhoneCall className="w-4 h-4 text-blue-700" />
          </button>

          <button
            onClick={() => handleBrowseCategory(current.id)}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Browse {current.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

