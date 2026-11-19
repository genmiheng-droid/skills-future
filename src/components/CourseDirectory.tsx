import {
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useState } from 'react';
import {
  CATEGORIES,
  Course,
  CourseCategory,
  DURATION_OPTIONS,
  DurationFilter,
  PRICE_RANGE_OPTIONS,
  PriceRangeFilter,
  PROVIDERS,
  SCHEMES,
  SkillsFutureScheme,
  TRAINING_MODES,
  TrainingMode,
} from '../data/courses';
import {
  CitizenEligibilityTier,
  ELIGIBILITY_LABELS,
  formatSGD,
} from '../utils/pricing';
import { CourseCard } from './CourseCard';

export type SortOption =
  | 'best_match'
  | 'highest_rated'
  | 'most_attended'
  | 'lowest_fee'
  | 'earliest_date';

interface CourseDirectoryProps {
  courses: Course[];
  totalCourseCount: number;
  selectedCategory: CourseCategory | 'All';
  onCategoryChange: (cat: CourseCategory | 'All') => void;
  selectedProviders: string[];
  onToggleProvider: (provider: string) => void;
  selectedSchemes: SkillsFutureScheme[];
  onToggleScheme: (scheme: SkillsFutureScheme) => void;
  selectedModes: TrainingMode[];
  onToggleMode: (mode: TrainingMode) => void;
  maxNettFee: number;
  onMaxNettFeeChange: (val: number) => void;
  onlyWithStartDate: boolean;
  onToggleStartDate: () => void;
  showingSavedOnly: boolean;
  onToggleSavedOnly: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectCourse: (course: Course) => void;
  onResetFilters: () => void;
  eligibilityTier: CitizenEligibilityTier;
  onEligibilityTierChange: (tier: CitizenEligibilityTier) => void;
  availableCredit: number;
  applyCreditInPreview: boolean;
  onToggleApplyCredit: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  durationFilter: DurationFilter;
  onDurationChange: (duration: DurationFilter) => void;
  priceRangeFilter: PriceRangeFilter;
  onPriceRangeChange: (range: PriceRangeFilter) => void;
}

export function CourseDirectory({
  courses,
  totalCourseCount,
  selectedCategory,
  onCategoryChange,
  selectedProviders,
  onToggleProvider,
  selectedSchemes,
  onToggleScheme,
  selectedModes,
  onToggleMode,
  maxNettFee,
  onMaxNettFeeChange,
  onlyWithStartDate,
  onToggleStartDate,
  showingSavedOnly,
  onToggleSavedOnly,
  sortBy,
  onSortChange,
  savedIds,
  onToggleSave,
  onSelectCourse,
  onResetFilters,
  eligibilityTier,
  onEligibilityTierChange,
  availableCredit,
  applyCreditInPreview,
  onToggleApplyCredit,
  searchQuery,
  onClearSearch,
  durationFilter,
  onDurationChange,
  priceRangeFilter,
  onPriceRangeChange,
}: CourseDirectoryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedProviders.length > 0 ||
    selectedSchemes.length > 0 ||
    selectedModes.length > 0 ||
    maxNettFee < 3000 ||
    durationFilter !== 'all' ||
    priceRangeFilter !== 'all' ||
    onlyWithStartDate ||
    showingSavedOnly ||
    searchQuery.trim().length > 0;

  const FilterPanelContent = () => (
    <div className="space-y-6">
      {/* Citizen Fee Preview Profile */}
      <div className="pb-5 border-b border-slate-200">
        <label
          htmlFor="eligibility-tier-select"
          className="block text-xs font-semibold text-slate-900 mb-2"
        >
          Preview Fees For
        </label>
        <select
          id="eligibility-tier-select"
          value={eligibilityTier}
          onChange={(e) =>
            onEligibilityTierChange(e.target.value as CitizenEligibilityTier)
          }
          className="w-full h-9 px-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-[#C8102E]"
        >
          {(Object.keys(ELIGIBILITY_LABELS) as CitizenEligibilityTier[]).map(
            (key) => (
              <option key={key} value={key}>
                {ELIGIBILITY_LABELS[key]}
              </option>
            )
          )}
        </select>
        <label className="mt-2.5 flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={applyCreditInPreview}
            onChange={onToggleApplyCredit}
            disabled={eligibilityTier === 'employer_sme'}
            className="rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
          />
          <span className="tabular-nums">
            Offset with SkillsFuture Credit ({formatSGD(availableCredit)})
          </span>
        </label>
      </div>

      {/* Availability Toggle */}
      <div className="pb-5 border-b border-slate-200">
        <p className="text-xs font-semibold text-slate-900 mb-2.5">
          Course Intake Availability
        </p>
        <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyWithStartDate}
            onChange={onToggleStartDate}
            className="mt-0.5 rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
          />
          <span>Only show courses with upcoming start dates</span>
        </label>
      </div>

      {/* SkillsFuture Schemes */}
      <div className="pb-5 border-b border-slate-200">
        <p className="text-xs font-semibold text-slate-900 mb-2.5">
          SkillsFuture Schemes
        </p>
        <div className="space-y-2">
          {SCHEMES.map((scheme) => (
            <label
              key={scheme}
              className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSchemes.includes(scheme)}
                onChange={() => onToggleScheme(scheme)}
                className="mt-0.5 rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
              />
              <span>{scheme}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Course Duration */}
      <div className="pb-5 border-b border-slate-200">
        <label
          htmlFor="sidebar-duration-select"
          className="block text-xs font-semibold text-slate-900 mb-2"
        >
          Course Duration
        </label>
        <select
          id="sidebar-duration-select"
          value={durationFilter}
          onChange={(e) => onDurationChange(e.target.value as DurationFilter)}
          className="w-full h-9 px-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-[#C8102E]"
        >
          {DURATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Max Nett Fee Slider */}
      <div className="pb-5 border-b border-slate-200">
        <div className="flex items-center justify-between text-xs mb-2">
          <label htmlFor="fee-slider" className="font-semibold text-slate-900">
            Max Est. Nett Fee
          </label>
          <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
            {maxNettFee >= 3000 ? 'Any' : `Up to S$${maxNettFee}`}
          </span>
        </div>
        <input
          id="fee-slider"
          type="range"
          min={0}
          max={3000}
          step={100}
          value={maxNettFee}
          onChange={(e) => onMaxNettFeeChange(Number(e.target.value))}
          className="w-full accent-[#C8102E] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 tabular-nums mt-1">
          <span>S$0</span>
          <span>S$1,500</span>
          <span>S$3,000+</span>
        </div>
      </div>

      {/* Mode of Training */}
      <div className="pb-5 border-b border-slate-200">
        <p className="text-xs font-semibold text-slate-900 mb-2.5">
          Mode of Training
        </p>
        <div className="space-y-2">
          {TRAINING_MODES.map((mode) => (
            <label
              key={mode}
              className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedModes.includes(mode)}
                onChange={() => onToggleMode(mode)}
                className="rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Training Provider */}
      <div>
        <p className="text-xs font-semibold text-slate-900 mb-2.5">
          Training Provider
        </p>
        <div className="space-y-2">
          {PROVIDERS.map((provider) => (
            <label
              key={provider}
              className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedProviders.includes(provider)}
                onChange={() => onToggleProvider(provider)}
                className="rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
              />
              <span>{provider}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="directory" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Directory Heading & Area of Training Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Course Directory
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Filter by area of training, funding scheme, training provider,
                and out-of-pocket fee.
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8102E] hover:underline whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Browse by Area of Training"
            className="flex items-center gap-2 overflow-x-auto pb-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'All'}
              onClick={() => onCategoryChange('All')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              All Areas
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => onCategoryChange(category)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-[#F8FAFC] border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Refine Results
                </h3>
              </div>
            </div>
            <FilterPanelContent />
          </aside>

          {/* Main Results Column */}
          <div className="lg:col-span-9">
            {/* Top Results Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen((prev) => !prev)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-800 rounded-md cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                <p className="text-sm text-slate-700 tabular-nums">
                  Showing{' '}
                  <strong className="text-slate-900">{courses.length}</strong>{' '}
                  of {totalCourseCount} approved courses
                </p>

                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#C8102E] hover:underline cursor-pointer"
                  >
                    <span>Query: “{searchQuery}”</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {durationFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onDurationChange('all')}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#C8102E] hover:underline cursor-pointer"
                  >
                    <span>
                      Duration:{' '}
                      {
                        DURATION_OPTIONS.find((d) => d.value === durationFilter)
                          ?.label
                      }
                    </span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {priceRangeFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onPriceRangeChange('all')}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#C8102E] hover:underline cursor-pointer"
                  >
                    <span>
                      Price:{' '}
                      {
                        PRICE_RANGE_OPTIONS.find(
                          (p) => p.value === priceRangeFilter
                        )?.label
                      }
                    </span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {showingSavedOnly && (
                  <button
                    type="button"
                    onClick={onToggleSavedOnly}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#C8102E] hover:underline cursor-pointer"
                  >
                    <span>Saved Only</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-courses"
                    className="text-xs text-slate-500 whitespace-nowrap"
                  >
                    Sort by
                  </label>
                  <select
                    id="sort-courses"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="h-9 px-2.5 text-xs font-medium bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-[#C8102E]"
                  >
                    <option value="best_match">Best Match</option>
                    <option value="highest_rated">Highest Rated</option>
                    <option value="most_attended">Most Attended</option>
                    <option value="lowest_fee">Lowest Payable Fee</option>
                    <option value="earliest_date">Earliest Start Date</option>
                  </select>
                </div>

                <div
                  role="group"
                  aria-label="Course view layout"
                  className="hidden sm:inline-flex items-center border border-slate-200 rounded-md p-0.5 bg-slate-50"
                >
                  <button
                    type="button"
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Collapsible Filter Drawer */}
            {mobileFiltersOpen && (
              <div className="lg:hidden mb-6 bg-[#F8FAFC] border border-slate-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900">
                    Refine Results
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
                <FilterPanelContent />
              </div>
            )}

            {/* Course Results or Empty State */}
            {courses.length === 0 ? (
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-12 text-center">
                <p className="font-display text-lg font-bold text-slate-900 mb-2">
                  No matching courses found
                </p>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
                  No SkillsFuture courses matched your current combination of
                  keywords, providers, and fee ceiling.
                </p>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="px-4 py-2 text-xs font-semibold bg-[#C8102E] text-white rounded-md hover:bg-[#A60D25] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isSaved={savedIds.includes(course.id)}
                    onToggleSave={onToggleSave}
                    onSelectCourse={onSelectCourse}
                    eligibilityTier={eligibilityTier}
                    availableCredit={availableCredit}
                    applyCreditInPreview={applyCreditInPreview}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isSaved={savedIds.includes(course.id)}
                    onToggleSave={onToggleSave}
                    onSelectCourse={onSelectCourse}
                    eligibilityTier={eligibilityTier}
                    availableCredit={availableCredit}
                    applyCreditInPreview={applyCreditInPreview}
                    viewMode="list"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
