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
  ChevronRight
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

  // Unique carriers and network types for filter lists
  const carriers = ['all', 'Molina Healthcare', 'Blue Cross Blue Shield', 'UnitedHealthcare', 'Humana', 'Aetna', 'Cigna Healthcare', 'Wellcare by Centene', 'Mutual of Omaha'];
  const networkTypes = ['all', 'HMO', 'PPO', 'HMO-POS', 'Medigap', 'PDP'];

  return (
    <div className="pb-10 space-y-3">
      {/* Top ZIP & Results Summary Bar - Compact typography */}
      <div className="px-4 pt-2.5 pb-0.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xs sm:text-[13px] font-bold text-slate-800 flex items-center gap-1 leading-tight">
              <span>{filteredPlans.length} plans available in</span>
              <span className="text-blue-700 underline decoration-blue-300 decoration-1 underline-offset-2 cursor-pointer hover:text-blue-800 transition-colors" onClick={() => setIsZipModalOpen(true)}>
                {zipCode}
              </span>
            </h2>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{countyState}</p>
          </div>

          <button
            onClick={() => setIsZipModalOpen(true)}
            className="text-[10px] font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/70 px-2 py-0.5 rounded-lg transition-colors cursor-pointer active:scale-95 shrink-0"
          >
            Edit ZIP
          </button>
        </div>
      </div>

      {/* Preferences Banner - Compact, modern, mobile-optimized */}
      <div className="px-4">
        <div className="bg-[#EBF6FD] rounded-2xl p-3 border border-sky-200/90 shadow-xs">
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-bold text-sky-950 truncate">
                  Personalized Cost Estimator
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <Stethoscope className="w-3 h-3 text-blue-600" />
                  <Heart className="w-3 h-3 text-rose-500" />
                  <Pill className="w-3 h-3 text-amber-500" />
                  <MapPin className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
              <p className="text-[11px] text-sky-800 leading-tight">
                {userDoctorIds.length > 0 || userPrescriptions.length > 0
                  ? `Configured with ${userDoctorIds.length} doctors & ${userPrescriptions.length} medications.`
                  : 'Add prescriptions & doctors for exact out-of-pocket costs.'}
              </p>
            </div>

            <button
              onClick={() => setIsWizardOpen(true)}
              className="shrink-0 mt-0.5 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-[11px] font-black transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>{userDoctorIds.length > 0 ? 'Update Preferences' : 'Preferences'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs />

      {/* Search Input, Filter Button & Sort Selector Row */}
      <div className="px-4 flex items-center gap-2">
        {/* Search by plan name */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            placeholder="Search plan or carrier..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilters({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Drawer Trigger */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs"
        >
          <Filter className="w-3.5 h-3.5 text-blue-700" />
          <span>Filters</span>
        </button>

        {/* Sort Select (Shadcn UI) */}
        <div className="w-[165px]">
          <Select
            value={filters.sortBy}
            onChange={(val) => updateFilters({ sortBy: val as any })}
            triggerClassName="py-2 px-2.5 rounded-xl border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 shadow-xs"
            contentClassName="w-[185px] right-0 left-auto"
            prefixIcon={<ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />}
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
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
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

