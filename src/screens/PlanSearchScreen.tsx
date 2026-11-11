import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { PlanCard } from '../components/PlanCard';
import { PlanDiscoveryWizard } from '../components/PlanDiscoveryWizard';
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
      {/* Top ZIP & Results Summary Bar (Directly from Screenshot 2: "54 plans available in 75080") */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-1.5 leading-tight">
              <span>{filteredPlans.length} plans available in</span>
              <span className="text-blue-700 underline decoration-blue-300 decoration-2 underline-offset-4 cursor-pointer" onClick={() => setIsZipModalOpen(true)}>
                {zipCode}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">{countyState}</p>
          </div>

          <button
            onClick={() => setIsZipModalOpen(true)}
            className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer active:scale-95"
          >
            Edit ZIP
          </button>
        </div>
      </div>

      {/* Preferences Banner matching Screenshot 2: "Enter preferences to estimate your annual cost." */}
      <div className="px-4">
        <div className="bg-[#EBF6FD] rounded-2xl p-3.5 border border-sky-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-950">
              Enter preferences to estimate your annual cost
            </span>
            <div className="flex items-center gap-1 text-slate-600">
              <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <Pill className="w-3.5 h-3.5 text-amber-500" />
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>

          <p className="text-[11px] text-sky-900 leading-snug">
            {userDoctorIds.length > 0 || userPrescriptions.length > 0
              ? `Currently configured with ${userDoctorIds.length} doctors and ${userPrescriptions.length} medications.`
              : 'Add your current prescriptions and doctors to see exact out-of-pocket costs.'}
          </p>

          <button
            onClick={() => setIsWizardOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs text-center flex items-center justify-center gap-1.5 active:scale-[0.99]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{userDoctorIds.length > 0 ? 'Update Preferences' : 'Add preferences'}</span>
          </button>
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

        {/* Sort Select */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
            className="appearance-none pl-2.5 pr-7 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="premium-asc">Premium: Low to High</option>
            <option value="premium-desc">Premium: High to Low</option>
            <option value="deductible-asc">Lowest Deductible</option>
            <option value="star-desc">Highest Star Rating</option>
            <option value="moop-asc">Lowest Out-of-Pocket</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
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
              {/* Carrier Filter */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                  Insurance Company / Carrier
                </label>
                <select
                  value={filters.carrier}
                  onChange={(e) => updateFilters({ carrier: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                >
                  <option value="all">All Carriers</option>
                  {carriers.filter(c => c !== 'all').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
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

