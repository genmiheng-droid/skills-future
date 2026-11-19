import { Search, ArrowRight, GraduationCap } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
  activeQuickScope: 'all' | 'credit' | 'mid_career';
  onQuickScopeChange: (scope: 'all' | 'credit' | 'mid_career') => void;
}

const POPULAR_TERMS = [
  'Generative AI',
  'Data Analytics',
  'Food Safety',
  'ESG Sustainability',
  'ACLP',
  'Cybersecurity',
];

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  activeQuickScope,
  onQuickScopeChange,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Search & Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#C8102E] mb-3 tracking-tight">
              SkillsFuture Singapore · Course Directory
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0F172A] leading-[1.15] tracking-tight text-balance mb-4">
              Find government-approved courses to advance your career
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-6">
              Search over 24,000 SkillsFuture-eligible programmes from autonomous
              universities, polytechnics, and certified training providers.
              Check fee subsidies and offset out-of-pocket costs with your
              SkillsFuture Credit.
            </p>

            {/* Quick Scope Segmented Control */}
            <div
              role="group"
              aria-label="Course funding scope"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg mb-4 w-fit"
            >
              <button
                type="button"
                onClick={() => onQuickScopeChange('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeQuickScope === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Courses
              </button>
              <button
                type="button"
                onClick={() => onQuickScopeChange('credit')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeQuickScope === 'credit'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SkillsFuture Credit Eligible
              </button>
              <button
                type="button"
                onClick={() => onQuickScopeChange('mid_career')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeQuickScope === 'mid_career'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Level-Up Programme (40+)
              </button>
            </div>

            {/* Signature MySkillsFuture Search Bar */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2.5 mb-5"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="What do you want to learn? (e.g. Python, Food Safety, AI)"
                  aria-label="What do you want to learn?"
                  className="w-full h-12 pl-11 pr-4 text-sm sm:text-base bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 bg-[#C8102E] hover:bg-[#A60D25] text-white text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Search Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Popular Searches (clean unboxed text buttons) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Popular searches:</span>
              {POPULAR_TERMS.map((term, idx) => (
                <span key={term} className="inline-flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange(term);
                      onSearchSubmit();
                    }}
                    className="text-slate-600 hover:text-[#C8102E] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {term}
                  </button>
                  {idx < POPULAR_TERMS.length - 1 && (
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Hero Visual */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full min-h-[260px] lg:min-h-[360px] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              {!imgError ? (
                <img
                  src="/src/assets/images/hero_skillsfuture_learners_1795062667871.jpg"
                  alt="Adult professionals collaborating in a Singapore lifelong learning campus"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
                  <GraduationCap className="w-12 h-12 text-[#C8102E] mb-3" />
                  <p className="text-sm font-semibold text-slate-800">
                    Lifelong Learning Institute, Singapore
                  </p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 text-white">
                <p className="text-xs font-medium text-slate-200 mb-0.5">
                  SkillsFuture Level-Up Programme
                </p>
                <p className="text-sm font-semibold leading-snug">
                  Singaporeans aged 40 and above receive a S$4,000 SkillsFuture
                  Credit (Mid-Career) top-up for selected industry courses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Key Figures Row */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
              24,800+
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              SkillsFuture-approved courses
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
              Up to 90%
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Course fee subsidy for eligible Citizens
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
              S$4,000
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Mid-Career Credit top-up (aged 40+)
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
              600+
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified universities, polytechnics & academies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
