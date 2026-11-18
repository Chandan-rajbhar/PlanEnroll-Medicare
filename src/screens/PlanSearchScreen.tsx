import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { PlanCard } from '../components/PlanCard';
import { PlanDiscoveryWizard } from '../components/PlanDiscoveryWizard';
import { Select } from '../components/ui/Select';
import { 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  Sparkles, 
  Search,
  Check,
  Stethoscope,
  Pill,
  Heart,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export const PlanSearchScreen: React.FC = () => {
  const { 
    filteredPlans, 
    plans,
    zipCode, 
    countyState,
    setIsZipModalOpen,
    filters, 
    updateFilters, 
    resetFilters,
    navigateTo,
    userDoctorIds,
    userPrescriptions
  } = useApp();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Unique carriers and network types for filter lists
  const carriers = ['all', 'Molina Healthcare', 'Blue Cross Blue Shield', 'UnitedHealthcare', 'Humana', 'Aetna', 'Cigna Healthcare', 'Wellcare by Centene', 'Mutual of Omaha'];
  const networkTypes = ['all', 'HMO', 'PPO', 'HMO-POS', 'Medigap', 'PDP'];

  const sortLabels: Record<string, string> = {
    'recommended': 'Featured',
    'premium-asc': 'Premium: Low to High',
    'premium-desc': 'Premium: High to Low',
    'deductible-asc': 'Lowest Deductible',
    'star-desc': 'Highest Rating',
    'moop-asc': 'Lowest OOP'
  };

  const sortShortLabels: Record<string, string> = {
    'recommended': 'Featured',
    'premium-asc': 'Price: Low',
    'premium-desc': 'Price: High',
    'deductible-asc': 'Deductible',
    'star-desc': 'Rating',
    'moop-asc': 'Lowest OOP'
  };

  const locationLabel = zipCode === '33602' || zipCode.startsWith('33') 
    ? 'Tampa, FL 33602' 
    : (zipCode === '75080' ? 'Tampa, FL 33602' : `${countyState.split(',')[0] || 'Service Area'}, ${zipCode}`);

  const hasActiveFilters = 
    filters.carrier !== 'all' || 
    filters.networkType !== 'all' || 
    filters.minStarRating > 0 || 
    filters.prescriptionCoverageOnly || 
    filters.maxPremium < 200 ||
    filters.hasDental ||
    filters.hasVision ||
    filters.hasHearing;

  return (
    <div className="pb-10 space-y-3">
      {/* Category Tabs at the very top */}
      <div className="pt-2">
        <CategoryTabs />
      </div>

      {/* Search Input, Filter Button matching image */}
      <div className="px-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            placeholder="Search plan or carrier..."
            className="w-full h-10 pl-9.5 pr-8 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400/20 shadow-2xs transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => updateFilters({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Drawer Trigger Button */}
        <button
          type="button"
          onClick={() => setIsFilterModalOpen(true)}
          title="Filter plans"
          aria-label="Filter plans"
          className="relative w-10 h-10 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-blue-600 shadow-2xs flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          {hasActiveFilters && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          )}
        </button>
      </div>

      {/* Showing 10 Plans in Tampa, FL 33602        Sort: Featured ⌄ */}
      <div className="px-4 flex items-center justify-between gap-2 text-xs py-1">
        {/* Left: Location & Plan Count in a unified sentence with clean wrapping */}
        <div className="min-w-0 flex-1 truncate">
          <p className="text-xs text-slate-600 truncate">
            <span>Showing </span>
            <span className="font-bold text-slate-900">{filteredPlans.length} Plans</span>
            <span> in </span>
            <button
              type="button"
              onClick={() => setIsZipModalOpen(true)}
              className="text-blue-600 underline font-bold cursor-pointer hover:text-blue-800 transition-colors inline"
            >
              {locationLabel}
            </button>
          </p>
        </div>

        {/* Right: Mobile Sort Dropdown Button */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
            className="h-7.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-2xs"
          >
            <span className="text-slate-400 font-medium">Sort:</span>
            <span className="text-blue-600 font-bold">{sortShortLabels[filters.sortBy] || 'Featured'}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-blue-600 transition-transform duration-200 ${isSortMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort Dropdown Menu */}
          {isSortMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsSortMenuOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Sort Plans By
                </div>
                {Object.entries(sortLabels).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      updateFilters({ sortBy: key as any });
                      setIsSortMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      filters.sortBy === key
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span>{label}</span>
                    {filters.sortBy === key && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active Filter Tags */}
      {(filters.carrier !== 'all' || filters.networkType !== 'all' || filters.minStarRating > 0 || filters.prescriptionCoverageOnly || filters.maxPremium < 200) && (
        <div className="px-4 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active:</span>
          {filters.carrier !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
              Carrier: {filters.carrier}
              <button onClick={() => updateFilters({ carrier: 'all' })}><X className="w-2.5 h-2.5" /></button>
            </span>
          )}
          {filters.networkType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
              Network: {filters.networkType}
              <button onClick={() => updateFilters({ networkType: 'all' })}><X className="w-2.5 h-2.5" /></button>
            </span>
          )}
          {filters.minStarRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
              {filters.minStarRating}+ Stars
              <button onClick={() => updateFilters({ minStarRating: 0 })}><X className="w-2.5 h-2.5" /></button>
            </span>
          )}
          {filters.maxPremium < 200 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
              Max ${filters.maxPremium}/mo
              <button onClick={() => updateFilters({ maxPremium: 200 })}><X className="w-2.5 h-2.5" /></button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-[10px] text-rose-600 font-bold hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Plan Cards List */}
      <div className="px-4 space-y-3">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Matching Plans Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Try adjusting your filters or resetting to view all plans available in {zipCode}.
            </p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-4 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Step Discovery Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto">
          <div className="w-full max-w-[380px] my-auto">
            <PlanDiscoveryWizard
              onComplete={() => setIsWizardOpen(false)}
              onCancel={() => setIsWizardOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Filter Modal Sheet */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0">
          <div className="bg-white text-slate-900 w-full max-h-[88%] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in">
            {/* Filter Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-base text-slate-900">Filter Plans</h3>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {/* Sort By Filter (Shadcn UI) */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                  Sort Plans By
                </label>
                <Select
                  value={filters.sortBy}
                  onChange={(val) => updateFilters({ sortBy: val as any })}
                  options={[
                    { value: 'recommended', label: 'Recommended' },
                    { value: 'premium-asc', label: 'Premium: Low to High' },
                    { value: 'premium-desc', label: 'Premium: High to Low' },
                    { value: 'deductible-asc', label: 'Lowest Deductible' },
                    { value: 'star-desc', label: 'Highest Star Rating' },
                    { value: 'moop-asc', label: 'Lowest Out-of-Pocket' },
                  ]}
                />
              </div>

              {/* Carrier Filter (Shadcn UI) */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                  Insurance Company / Carrier
                </label>
                <Select
                  value={filters.carrier}
                  onChange={(val) => updateFilters({ carrier: val })}
                  options={[
                    { value: 'all', label: 'All Carriers' },
                    ...carriers.filter(c => c !== 'all').map(c => ({ value: c, label: c }))
                  ]}
                />
              </div>

              {/* Network Type Filter */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                  Network Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {networkTypes.map((net) => {
                    const isSelected = filters.networkType === net;
                    return (
                      <button
                        key={net}
                        onClick={() => updateFilters({ networkType: net })}
                        className={`px-3 py-1.5 rounded-xl border font-bold transition-colors ${
                          isSelected
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {net === 'all' ? 'All Networks' : net}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Maximum Monthly Premium Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Max Monthly Premium
                  </label>
                  <span className="font-black text-blue-700 text-sm">
                    {filters.maxPremium === 0 ? '$0 only' : `$${filters.maxPremium}/mo`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={5}
                  value={filters.maxPremium}
                  onChange={(e) => updateFilters({ maxPremium: Number(e.target.value) })}
                  className="w-full accent-blue-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>$0 (Free Plan)</span>
                  <span>$100</span>
                  <span>$200+</span>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                  Minimum Medicare Star Rating
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 3.5, 4.0, 4.5].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => updateFilters({ minStarRating: stars })}
                      className={`py-2 rounded-xl border text-center font-bold ${
                        filters.minStarRating === stars
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {stars === 0 ? 'Any' : `${stars}+ ★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.prescriptionCoverageOnly}
                    onChange={(e) => updateFilters({ prescriptionCoverageOnly: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">Must include Part D drug coverage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasDental}
                    onChange={(e) => updateFilters({ hasDental: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">Includes Dental coverage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasVision}
                    onChange={(e) => updateFilters({ hasVision: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">Includes Vision & Eyewear allowance</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasHearing}
                    onChange={(e) => updateFilters({ hasHearing: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">Includes Hearing aid allowance</span>
                </label>
              </div>
            </div>

            {/* Filter Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
              <button
                onClick={resetFilters}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-md text-center"
              >
                Show {filteredPlans.length} Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

