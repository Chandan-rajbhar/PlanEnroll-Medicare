import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeftRight, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Star, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Stethoscope,
  Pill,
  HeartHandshake,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const PlanComparisonScreen: React.FC = () => {
  const { 
    comparePlanIds, 
    toggleComparePlan, 
    clearComparison, 
    plans, 
    navigateTo, 
    openPlanDetails,
    submitQuoteRequest,
    userProfile
  } = useApp();

  const [highlightDiffs, setHighlightDiffs] = useState(false);
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const comparedPlans = plans.filter(p => comparePlanIds.includes(p.id));

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableScrollRef.current) {
      const scrollAmount = direction === 'left' ? -160 : 160;
      tableScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  interface ComparisonRow {
    label: string;
    getValue: (p: any) => string;
    highlight?: boolean;
    icon?: string;
  }

  interface ComparisonSection {
    id: string;
    title: string;
    icon: React.ElementType;
    rows: ComparisonRow[];
  }

  const comparisonSections: ComparisonSection[] = [
    {
      id: 'cost',
      title: 'Cost & Out-of-Pocket',
      icon: DollarSign,
      rows: [
        { label: 'Monthly Premium', getValue: (p: any) => `$${p.monthlyPremium.toFixed(2)}`, highlight: true },
        { label: 'Medical Deductible', getValue: (p: any) => `$${p.medicalDeductible}` },
        { label: 'Drug Deductible', getValue: (p: any) => `$${p.drugDeductible}` },
        { label: 'Max Out-of-Pocket', getValue: (p: any) => `$${p.maxOutOfPocket.toLocaleString()}`, highlight: true }
      ]
    },
    {
      id: 'medical',
      title: 'Doctor & Hospital Copays',
      icon: Stethoscope,
      rows: [
        { label: 'Primary Care Doctor', getValue: (p: any) => p.copays.primaryCareDoctor },
        { label: 'Specialist Doctor', getValue: (p: any) => p.copays.specialist },
        { label: 'Emergency Room', getValue: (p: any) => p.copays.emergencyRoom },
        { label: 'Urgent Care', getValue: (p: any) => p.copays.urgentCare },
        { label: 'Inpatient Hospital', getValue: (p: any) => p.copays.inpatientHospital },
        { label: 'Ambulance Service', getValue: (p: any) => p.copays.ambulance },
        { label: 'Outpatient Surgery', getValue: (p: any) => p.copays.outpatientSurgery },
        { label: 'Preventive Care', getValue: (p: any) => p.copays.preventiveCare }
      ]
    },
    {
      id: 'drugs',
      title: 'Prescription Drug Coverage',
      icon: Pill,
      rows: [
        { label: 'Part D Included', getValue: (p: any) => p.prescriptionDrugCoverage ? 'Yes' : 'No' },
        { label: 'Tier 1 Preferred Generic', getValue: (p: any) => p.rxTiers?.[0]?.preferredRetail30Day || 'N/A' },
        { label: 'Tier 2 Generic', getValue: (p: any) => p.rxTiers?.[1]?.preferredRetail30Day || 'N/A' },
        { label: 'Tier 3 Preferred Brand', getValue: (p: any) => p.rxTiers?.[2]?.preferredRetail30Day || 'N/A' },
        { label: '90-Day Mail Order', getValue: (p: any) => p.rxTiers?.[0]?.mailOrder90Day || 'N/A' },
        { label: 'Annual Rx Cap', getValue: (p: any) => p.prescriptionDrugCoverage ? '$2,000 Cap' : 'N/A' }
      ]
    },
    {
      id: 'benefits',
      title: 'Extra Supplemental Benefits',
      icon: HeartHandshake,
      rows: [
        { label: 'Dental Benefit', getValue: (p: any) => p.benefits.dental.cost },
        { label: 'Vision & Eyewear', getValue: (p: any) => p.benefits.vision.cost },
        { label: 'Hearing Aids', getValue: (p: any) => p.benefits.hearing.cost },
        { label: 'Fitness / SilverSneakers', getValue: (p: any) => p.benefits.fitness.cost },
        { label: 'OTC Health Card', getValue: (p: any) => p.benefits.overTheCounterAllowance.cost },
        { label: 'Non-emergency Transport', getValue: (p: any) => p.benefits.transportation.cost },
        { label: 'Post-discharge Meals', getValue: (p: any) => p.benefits.meals.cost }
      ]
    }
  ];

  const handleEnroll = (plan: any) => {
    submitQuoteRequest({
      planId: plan.id,
      planName: plan.name,
      carrier: plan.carrier,
      monthlyPremium: plan.monthlyPremium,
      zipCode: plan.zipCodes[0] || '75080',
      userName: userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Beneficiary',
      userEmail: userProfile ? userProfile.email : 'user@example.com',
      userPhone: userProfile ? userProfile.phone : '(971) 752-9054',
      preferredContactTime: 'Morning',
      notes: `Comparison enrollment inquiry for ${plan.name}`
    });
    navigateTo('saved-plans');
  };

  return (
    <div className="pb-28 space-y-3.5">
      {/* Top Header Row */}
      <div className="px-4 pt-3 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
              Side-by-Side Comparison
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 leading-tight mt-1">
            Compare Medicare Plans
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {comparedPlans.length} of 4 plans selected for comparison
          </p>
        </div>

        {comparedPlans.length > 0 && (
          <button
            onClick={clearComparison}
            className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl border border-rose-200 transition-colors shrink-0 active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {comparedPlans.length === 0 ? (
        <div className="mx-4 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3.5 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
            <ArrowLeftRight className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Plans Selected for Comparison</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Check the <strong className="text-slate-800">"Add to compare"</strong> box on any Medicare plan card to view their premiums, copays, and benefits side-by-side.
          </p>
          <button
            onClick={() => navigateTo('plan-search')}
            className="py-2.5 px-4 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-md inline-flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Browse Plans to Compare</span>
          </button>
        </div>
      ) : (
        <div className="px-3.5 space-y-3">
          {/* Action Row: Mode Toggles & Add Slot Button */}
          <div className="flex items-center justify-between gap-2">
            {/* View Mode Pill Switcher */}
            <div className="bg-slate-200/80 p-0.5 rounded-xl flex items-center text-[11px] font-bold">
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Card View
              </button>
            </div>

            {/* Add More Plan Button */}
            {comparedPlans.length < 4 && (
              <button
                onClick={() => navigateTo('plan-search')}
                className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200/90 transition-colors active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add ({4 - comparedPlans.length} left)</span>
              </button>
            )}
          </div>

          {/* VIEW 1: Interactive Side-by-Side Matrix with Sticky Header & Auto Responsive Columns */}
          {viewMode === 'matrix' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
              {/* Swipe Guidance Bar & Scroll Controls */}
              <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 px-3 py-2 border-b border-blue-100/80 flex items-center justify-between text-[11px] text-blue-900 font-semibold select-none">
                <div className="flex items-center gap-1.5">
                  {comparedPlans.length <= 2 ? (
                    <span className="text-[10px] text-slate-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0"></span>
                      <strong className="text-slate-800">Side-by-Side View</strong>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-600 flex items-center gap-1">
                      <span>← Swipe to compare all {comparedPlans.length} plans →</span>
                    </span>
                  )}
                </div>

                {/* Right controls: Scroll arrows if 3+ plans, and Plan Count badge */}
                <div className="flex items-center gap-1.5">
                  {comparedPlans.length > 2 && (
                    <div className="flex items-center gap-1 mr-0.5">
                      <button
                        onClick={() => scrollTable('left')}
                        className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs active:scale-90"
                        title="Scroll left"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => scrollTable('right')}
                        className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs active:scale-90"
                        title="Scroll right"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <span className="bg-white/90 px-2 py-0.5 rounded-full text-blue-800 border border-blue-200 font-bold text-[10px] shrink-0">
                    {comparedPlans.length} Plans
                  </span>
                </div>
              </div>

              {/* Scrollable Table Area */}
              <div 
                ref={tableScrollRef}
                className="overflow-x-auto no-scrollbar scroll-smooth w-full"
              >
                <table className={`text-left border-collapse ${comparedPlans.length <= 2 ? 'w-full' : 'min-w-[480px]'}`}>
                  {/* Sticky Header Row */}
                  <thead>
                    <tr className="bg-slate-100/90 border-b border-slate-200">
                      {/* Top-Left Corner Cell: Clear Comparison Metric Block with Diff Toggle */}
                      <th className="p-2.5 w-[100px] min-w-[95px] max-w-[105px] sticky left-0 bg-slate-100 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.06)] border-r border-slate-200 align-top">
                        <div className="flex flex-col justify-between h-full min-h-[145px]">
                          <div>
                            <div className="flex items-center gap-1 text-blue-800">
                              <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="text-[10px] font-black uppercase tracking-wider">Features</span>
                            </div>
                            <p className="text-[9px] text-slate-500 font-medium mt-1 leading-tight">
                              Coverage & copay details
                            </p>
                          </div>

                          {/* Highlight Differences Button */}
                          <div className="pt-2 border-t border-slate-200">
                            <button
                              onClick={() => setHighlightDiffs(!highlightDiffs)}
                              className={`w-full text-[9px] font-bold py-1 px-1 rounded-lg border flex items-center justify-center gap-1 transition-all active:scale-95 ${
                                highlightDiffs 
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs' 
                                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                              }`}
                              title="Highlight metric differences between plans"
                            >
                              <Sparkles className="w-2.5 h-2.5 shrink-0" />
                              <span>{highlightDiffs ? 'Diffs On' : 'Diffs'}</span>
                            </button>
                            <span className="block text-[8px] text-slate-400 text-center mt-0.5">
                              {highlightDiffs ? 'Highlighted' : 'Click to diff'}
                            </span>
                          </div>
                        </div>
                      </th>

                      {/* Plan Column Headers */}
                      {comparedPlans.map((plan) => {
                        const isLowestPremium = comparedPlans.every(p => p.monthlyPremium >= plan.monthlyPremium);
                        return (
                          <th 
                            key={plan.id} 
                            className={`p-2.5 align-top border-r border-slate-200/80 last:border-r-0 bg-white ${
                              comparedPlans.length <= 2 
                                ? 'w-1/2 min-w-[134px]' 
                                : 'w-[155px] min-w-[155px] max-w-[170px]'
                            }`}
                          >
                            <div className="flex flex-col justify-between h-full min-h-[145px] space-y-1.5">
                              {/* Top Bar: Plan Type badge and Remove button */}
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    {plan.planType}
                                  </span>
                                  <button
                                    onClick={() => toggleComparePlan(plan.id)}
                                    className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                                    title="Remove plan"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {/* Plan Name - Clean line wrapping without cutting off text */}
                                <h4 
                                  onClick={() => openPlanDetails(plan)}
                                  className="text-xs font-bold text-slate-900 leading-snug line-clamp-3 hover:text-blue-700 cursor-pointer transition-colors"
                                  title={plan.name}
                                >
                                  {plan.name}
                                </h4>

                                {/* Star Rating & Carrier */}
                                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold mt-1">
                                  <span className="truncate max-w-[65px] text-[10px] text-slate-600 font-bold">{plan.carrier}</span>
                                  <div className="flex items-center gap-0.5 text-amber-500 font-bold shrink-0">
                                    <Star className="w-3 h-3 fill-amber-400" />
                                    <span>{plan.starRating}★</span>
                                  </div>
                                </div>
                              </div>

                              {/* Middle: Monthly Premium */}
                              <div className="pt-1 border-t border-slate-100">
                                <div className="flex items-baseline gap-0.5">
                                  <span className="text-base font-black text-emerald-600 leading-none">
                                    ${plan.monthlyPremium.toFixed(2)}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-normal">/mo</span>
                                </div>
                                {isLowestPremium && plan.monthlyPremium === 0 && (
                                  <span className="inline-block mt-0.5 text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded">
                                    Lowest Premium
                                  </span>
                                )}
                              </div>

                              {/* Bottom: Action Buttons */}
                              <div className="grid grid-cols-2 gap-1 pt-1">
                                <button
                                  onClick={() => openPlanDetails(plan)}
                                  className="py-1 px-1 rounded-lg border border-slate-300 text-[10px] font-bold text-slate-700 hover:bg-slate-50 text-center transition-colors whitespace-nowrap active:scale-95"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleEnroll(plan)}
                                  className="py-1 px-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black text-center shadow-xs transition-colors whitespace-nowrap active:scale-95"
                                >
                                  Quote
                                </button>
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  {/* Body Metrics Rows */}
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {comparisonSections.map((section) => {
                      const SectionIcon = section.icon;
                      return (
                        <React.Fragment key={section.id}>
                          {/* Section Header Row */}
                          <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-200">
                            <td 
                              colSpan={comparedPlans.length + 1} 
                              className="py-2 px-3 text-[10px] uppercase tracking-wider sticky left-0 z-10 bg-slate-100 border-y border-slate-200"
                            >
                              <div className="flex items-center gap-1.5 text-blue-900">
                                <SectionIcon className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                                <span className="font-bold">{section.title}</span>
                              </div>
                            </td>
                          </tr>

                          {/* Individual Metric Rows */}
                          {section.rows.map((row, rIdx) => {
                            // Check if this row has differences across compared plans
                            const values = comparedPlans.map(p => row.getValue(p));
                            const hasDiff = new Set(values).size > 1;
                            const isDiffHighlighted = highlightDiffs && hasDiff;

                            return (
                              <tr key={rIdx} className="hover:bg-blue-50/25 transition-colors">
                                {/* Sticky Metric Name Column */}
                                <td className="py-2.5 px-2.5 font-semibold text-slate-700 text-[11px] leading-tight sticky left-0 bg-slate-50/95 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.06)] border-r border-slate-200/90 align-middle">
                                  {row.label}
                                </td>

                                {/* Value for each plan */}
                                {comparedPlans.map((plan) => {
                                  const val = row.getValue(plan);
                                  const isZero = val === '$0' || val === '$0.00' || val.toLowerCase().includes('$0 copay');
                                  const isYes = val.toLowerCase() === 'yes';

                                  return (
                                    <td 
                                      key={plan.id} 
                                      className={`py-2.5 px-2.5 sm:px-3 border-r border-slate-100 last:border-r-0 text-xs align-middle ${
                                        isDiffHighlighted 
                                          ? 'bg-amber-50/70 font-semibold text-slate-900' 
                                          : row.highlight 
                                            ? 'font-bold text-blue-950 bg-blue-50/30' 
                                            : 'text-slate-800 font-medium'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1">
                                        {isZero ? (
                                          <span className="font-bold text-emerald-700">{val}</span>
                                        ) : isYes ? (
                                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
                                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                            <span>Yes</span>
                                          </span>
                                        ) : (
                                          <span className="break-words leading-tight">{val}</span>
                                        )}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 2: Stacked Mobile Cards Breakdown */}
          {viewMode === 'cards' && (
            <div className="space-y-3">
              {comparedPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {plan.planType}
                        </span>
                        <span className="text-[10px] text-slate-400">Contract {plan.contractId}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mt-1 leading-snug">
                        {plan.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{plan.starRating} Stars ({plan.carrier})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-600 block">
                        ${plan.monthlyPremium.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400">/month</span>
                    </div>
                  </div>

                  {/* Key Highlights Grid */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-semibold">Med. Deductible</span>
                      <span className="font-bold text-slate-800">${plan.medicalDeductible}</span>
                    </div>
                    <div className="border-x border-slate-200">
                      <span className="text-[9px] text-slate-400 block uppercase font-semibold">Max Out-of-Pocket</span>
                      <span className="font-bold text-slate-800">${plan.maxOutOfPocket.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-semibold">PCP Visit</span>
                      <span className="font-bold text-emerald-700">{plan.copays.primaryCareDoctor}</span>
                    </div>
                  </div>

                  {/* Benefits pills */}
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-100">
                      Dental: {plan.benefits.dental.cost}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                      Vision: {plan.benefits.vision.cost}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-100">
                      Hearing: {plan.benefits.hearing.cost}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => openPlanDetails(plan)}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center"
                    >
                      View All Details
                    </button>
                    <button
                      onClick={() => handleEnroll(plan)}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black text-center shadow-xs flex items-center justify-center gap-1"
                    >
                      <span>Get Official Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
