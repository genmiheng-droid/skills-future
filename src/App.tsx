/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CourseDirectory, SortOption } from './components/CourseDirectory';
import { FeaturedTracksSection } from './components/FeaturedTracksSection';
import { Footer } from './components/Footer';
import { FundingGuideSection } from './components/FundingGuideSection';
import { GovSgBanner } from './components/GovSgBanner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SingpassModal } from './components/SingpassModal';
import {
  COURSES,
  Course,
  CourseCategory,
  DurationFilter,
  PriceRangeFilter,
  SkillsFutureScheme,
  TrainingMode,
} from './data/courses';
import {
  CitizenEligibilityTier,
  calculateFeeBreakdown,
} from './utils/pricing';

const OPENING_CREDIT = 500;
const MID_CAREER_CREDIT = 4000;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickScope, setActiveQuickScope] = useState<
    'all' | 'credit' | 'mid_career'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<
    CourseCategory | 'All'
  >('All');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedSchemes, setSelectedSchemes] = useState<SkillsFutureScheme[]>(
    []
  );
  const [selectedModes, setSelectedModes] = useState<TrainingMode[]>([]);
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [priceRangeFilter, setPriceRangeFilter] =
    useState<PriceRangeFilter>('all');
  const [maxNettFee, setMaxNettFee] = useState<number>(3000);
  const [onlyWithStartDate, setOnlyWithStartDate] = useState<boolean>(false);
  const [showingSavedOnly, setShowingSavedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('best_match');

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('msf_saved_courses');
      return raw ? JSON.parse(raw) : ['crs-001', 'crs-003'];
    } catch {
      return ['crs-001', 'crs-003'];
    }
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [eligibilityTier, setEligibilityTier] =
    useState<CitizenEligibilityTier>('sg_above_40');
  const [applyCreditInPreview, setApplyCreditInPreview] = useState(false);

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [singpassModalOpen, setSingpassModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('msf_saved_courses', JSON.stringify(savedIds));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [savedIds]);

  const availableCredit =
    OPENING_CREDIT + (eligibilityTier === 'sg_above_40' ? MID_CAREER_CREDIT : 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickScopeChange = (scope: 'all' | 'credit' | 'mid_career') => {
    setActiveQuickScope(scope);
    if (scope === 'all') {
      setSelectedSchemes([]);
    } else if (scope === 'credit') {
      setSelectedSchemes(['SkillsFuture Credit']);
    } else if (scope === 'mid_career') {
      setSelectedSchemes(['Level-Up Programme (40+)']);
    }
  };

  const handleToggleProvider = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };

  const handleToggleScheme = (scheme: SkillsFutureScheme) => {
    setActiveQuickScope('all');
    setSelectedSchemes((prev) =>
      prev.includes(scheme)
        ? prev.filter((s) => s !== scheme)
        : [...prev, scheme]
    );
  };

  const handleToggleMode = (mode: TrainingMode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleToggleSave = (courseId: string) => {
    setSavedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveQuickScope('all');
    setSelectedCategory('All');
    setSelectedProviders([]);
    setSelectedSchemes([]);
    setSelectedModes([]);
    setDurationFilter('all');
    setPriceRangeFilter('all');
    setMaxNettFee(3000);
    setOnlyWithStartDate(false);
    setShowingSavedOnly(false);
    setSortBy('best_match');
  };

  const handlePriceRangeChange = (range: PriceRangeFilter) => {
    setPriceRangeFilter(range);
    if (range !== 'all') {
      setMaxNettFee(3000);
    }
  };

  const handleMaxNettFeeChange = (val: number) => {
    setMaxNettFee(val);
    if (val < 3000) {
      setPriceRangeFilter('all');
    }
  };

  const handleSelectTrack = (category: CourseCategory, query?: string) => {
    setSelectedCategory(category);
    setSearchQuery(query || '');
    setShowingSavedOnly(false);
    scrollToSection('directory');
  };

  const handleFilterByProvider = (provider: string) => {
    setSelectedProviders([provider]);
    setSelectedCategory('All');
    setShowingSavedOnly(false);
    scrollToSection('directory');
  };

  const filteredCourses = useMemo(() => {
    const queryLower = searchQuery.trim().toLowerCase();

    const filtered = COURSES.filter((course) => {
      if (showingSavedOnly && !savedIds.includes(course.id)) {
        return false;
      }

      if (selectedCategory !== 'All' && course.category !== selectedCategory) {
        return false;
      }

      if (
        selectedProviders.length > 0 &&
        !selectedProviders.includes(course.providerShort)
      ) {
        return false;
      }

      if (
        selectedSchemes.length > 0 &&
        !selectedSchemes.every((scheme) => course.schemes.includes(scheme))
      ) {
        return false;
      }

      if (selectedModes.length > 0 && !selectedModes.includes(course.mode)) {
        return false;
      }

      if (onlyWithStartDate && !course.nextStartDate) {
        return false;
      }

      if (durationFilter === 'short' && course.durationHours > 16) {
        return false;
      }
      if (
        durationFilter === 'medium' &&
        (course.durationHours <= 16 || course.durationHours > 40)
      ) {
        return false;
      }
      if (durationFilter === 'long' && course.durationHours <= 40) {
        return false;
      }

      const breakdown = calculateFeeBreakdown(
        course,
        eligibilityTier,
        availableCredit,
        applyCreditInPreview
      );

      if (priceRangeFilter === 'under_200' && breakdown.finalPayable >= 200) {
        return false;
      }
      if (
        priceRangeFilter === '200_500' &&
        (breakdown.finalPayable < 200 || breakdown.finalPayable > 500)
      ) {
        return false;
      }
      if (
        priceRangeFilter === '500_1000' &&
        (breakdown.finalPayable <= 500 || breakdown.finalPayable > 1000)
      ) {
        return false;
      }
      if (priceRangeFilter === 'above_1000' && breakdown.finalPayable <= 1000) {
        return false;
      }

      if (maxNettFee < 3000 && breakdown.finalPayable > maxNettFee) {
        return false;
      }

      if (queryLower) {
        const haystack = [
          course.title,
          course.provider,
          course.category,
          course.referenceNumber,
          course.summary,
          ...course.objectives,
        ]
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(queryLower)) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'highest_rated') {
        return b.rating - a.rating || b.ratingCount - a.ratingCount;
      }
      if (sortBy === 'most_attended') {
        return b.attendanceCount - a.attendanceCount;
      }
      if (sortBy === 'lowest_fee') {
        const feeA = calculateFeeBreakdown(
          a,
          eligibilityTier,
          availableCredit,
          applyCreditInPreview
        ).finalPayable;
        const feeB = calculateFeeBreakdown(
          b,
          eligibilityTier,
          availableCredit,
          applyCreditInPreview
        ).finalPayable;
        return feeA - feeB;
      }
      if (sortBy === 'earliest_date') {
        if (!a.nextStartDate && !b.nextStartDate) return 0;
        if (!a.nextStartDate) return 1;
        if (!b.nextStartDate) return -1;
        return a.nextStartDate.localeCompare(b.nextStartDate);
      }
      // best_match
      return Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending));
    });
  }, [
    searchQuery,
    showingSavedOnly,
    savedIds,
    selectedCategory,
    selectedProviders,
    selectedSchemes,
    selectedModes,
    onlyWithStartDate,
    durationFilter,
    priceRangeFilter,
    eligibilityTier,
    availableCredit,
    applyCreditInPreview,
    maxNettFee,
    sortBy,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <GovSgBanner />

      <Header
        savedCount={savedIds.length}
        isSignedIn={isSignedIn}
        totalCredit={availableCredit}
        onOpenSingpass={() => setSingpassModalOpen(true)}
        onNavigateSection={scrollToSection}
        onToggleSavedFilter={() => setShowingSavedOnly((prev) => !prev)}
        showingSavedOnly={showingSavedOnly}
      />

      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => scrollToSection('directory')}
          activeQuickScope={activeQuickScope}
          onQuickScopeChange={handleQuickScopeChange}
          durationFilter={durationFilter}
          onDurationChange={setDurationFilter}
          priceRangeFilter={priceRangeFilter}
          onPriceRangeChange={handlePriceRangeChange}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <FeaturedTracksSection onSelectTrack={handleSelectTrack} />

        <CourseDirectory
          courses={filteredCourses}
          totalCourseCount={COURSES.length}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedProviders={selectedProviders}
          onToggleProvider={handleToggleProvider}
          selectedSchemes={selectedSchemes}
          onToggleScheme={handleToggleScheme}
          selectedModes={selectedModes}
          onToggleMode={handleToggleMode}
          maxNettFee={maxNettFee}
          onMaxNettFeeChange={handleMaxNettFeeChange}
          onlyWithStartDate={onlyWithStartDate}
          onToggleStartDate={() => setOnlyWithStartDate((prev) => !prev)}
          showingSavedOnly={showingSavedOnly}
          onToggleSavedOnly={() => setShowingSavedOnly((prev) => !prev)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectCourse={setActiveCourse}
          onResetFilters={handleResetFilters}
          eligibilityTier={eligibilityTier}
          onEligibilityTierChange={setEligibilityTier}
          availableCredit={availableCredit}
          applyCreditInPreview={applyCreditInPreview}
          onToggleApplyCredit={() => setApplyCreditInPreview((prev) => !prev)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          durationFilter={durationFilter}
          onDurationChange={setDurationFilter}
          priceRangeFilter={priceRangeFilter}
          onPriceRangeChange={handlePriceRangeChange}
        />

        <FundingGuideSection
          onFilterByProvider={handleFilterByProvider}
          onOpenSingpass={() => setSingpassModalOpen(true)}
        />
      </main>

      <Footer onNavigateSection={scrollToSection} />

      <CourseDetailModal
        course={activeCourse}
        onClose={() => setActiveCourse(null)}
        isSaved={activeCourse ? savedIds.includes(activeCourse.id) : false}
        onToggleSave={handleToggleSave}
        eligibilityTier={eligibilityTier}
        onEligibilityTierChange={setEligibilityTier}
        availableCredit={availableCredit}
      />

      <SingpassModal
        open={singpassModalOpen}
        onClose={() => setSingpassModalOpen(false)}
        isSignedIn={isSignedIn}
        onSignIn={() => {
          setIsSignedIn(true);
          setApplyCreditInPreview(true);
        }}
        onSignOut={() => {
          setIsSignedIn(false);
          setApplyCreditInPreview(false);
        }}
        eligibilityTier={eligibilityTier}
        onEligibilityTierChange={setEligibilityTier}
        openingCredit={OPENING_CREDIT}
        midCareerCredit={MID_CAREER_CREDIT}
      />
    </div>
  );
}
