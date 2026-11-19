import { Bookmark, Calendar, MapPin, Star, Users } from 'lucide-react';
import { Course } from '../data/courses';
import {
  CitizenEligibilityTier,
  calculateFeeBreakdown,
  formatSGD,
} from '../utils/pricing';

interface CourseCardProps {
  course: Course;
  isSaved: boolean;
  onToggleSave: (courseId: string) => void;
  onSelectCourse: (course: Course) => void;
  eligibilityTier: CitizenEligibilityTier;
  availableCredit: number;
  applyCreditInPreview: boolean;
  viewMode: 'grid' | 'list';
}

export function CourseCard({
  course,
  isSaved,
  onToggleSave,
  onSelectCourse,
  eligibilityTier,
  availableCredit,
  applyCreditInPreview,
  viewMode,
}: CourseCardProps) {
  const breakdown = calculateFeeBreakdown(
    course,
    eligibilityTier,
    availableCredit,
    applyCreditInPreview
  );

  const nextDateDisplay = course.nextStartDate
    ? new Date(course.nextStartDate).toLocaleDateString('en-SG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Flexible On-Demand';

  if (viewMode === 'list') {
    return (
      <article className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-1.5">
            <p className="text-xs text-slate-500 truncate">
              {course.category} <span aria-hidden="true">·</span> {course.mode}{' '}
              <span aria-hidden="true">·</span> {course.durationLabel}
            </p>
          </div>

          <h3 className="font-display text-lg font-bold text-[#0F172A] leading-snug mb-1">
            <button
              type="button"
              onClick={() => onSelectCourse(course)}
              className="text-left hover:text-[#C8102E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
            >
              {course.title}
            </button>
          </h3>

          <p className="text-sm text-slate-700 font-medium mb-2">
            {course.provider}{' '}
            <span className="font-mono text-xs text-slate-400 font-normal ml-1.5">
              {course.referenceNumber}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 tabular-nums">
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <strong className="text-slate-900">{course.rating.toFixed(1)}</strong>
              <span className="text-slate-500">
                ({course.ratingCount.toLocaleString()})
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.attendanceCount.toLocaleString()} attended</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Next intake: {nextDateDisplay}</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2.5 truncate">
            Eligible: {course.schemes.join(' · ')}
          </p>
        </div>

        <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 shrink-0">
          <div className="md:text-right">
            <p className="text-xs text-slate-400 line-through tabular-nums">
              Full fee {formatSGD(breakdown.fullFee)}
            </p>
            <p className="text-xl font-bold text-[#0F172A] tabular-nums">
              {formatSGD(breakdown.finalPayable)}
            </p>
            <p className="text-xs text-emerald-700 font-medium tabular-nums">
              {breakdown.subsidyPercent}% govt subsidy
              {breakdown.creditApplied > 0
                ? ` · ${formatSGD(breakdown.creditApplied)} credit`
                : ''}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleSave(course.id)}
              aria-label={isSaved ? 'Remove course from saved' : 'Save course'}
              aria-pressed={isSaved}
              className={`p-2.5 rounded-md border transition-colors cursor-pointer ${
                isSaved
                  ? 'border-[#C8102E] text-[#C8102E] bg-[#C8102E]/5'
                  : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => onSelectCourse(course)}
              className="px-4 py-2 text-xs font-semibold bg-[#0F172A] hover:bg-[#C8102E] text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-colors flex flex-col justify-between h-full">
      <div>
        {/* Top Metadata + Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <p className="text-xs text-slate-500 leading-snug">
            {course.category} <span aria-hidden="true">·</span> {course.mode}{' '}
            <span aria-hidden="true">·</span> {course.durationLabel}
          </p>
          <button
            type="button"
            onClick={() => onToggleSave(course.id)}
            aria-label={isSaved ? 'Remove course from saved' : 'Save course'}
            aria-pressed={isSaved}
            className={`p-2 -mt-1.5 -mr-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
              isSaved
                ? 'text-[#C8102E]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Provider */}
        <h3 className="font-display text-base font-bold text-[#0F172A] leading-snug mb-1.5">
          <button
            type="button"
            onClick={() => onSelectCourse(course)}
            className="text-left hover:text-[#C8102E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
          >
            {course.title}
          </button>
        </h3>

        <p className="text-xs font-medium text-slate-700 mb-0.5">
          {course.provider}
        </p>
        <p className="font-mono text-[11px] text-slate-400 mb-3">
          {course.referenceNumber}
        </p>

        {/* Rating, Attendance, Location & Date */}
        <div className="space-y-1.5 text-xs text-slate-600 tabular-nums mb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <strong className="text-slate-900">{course.rating.toFixed(1)}</strong>
              <span className="text-slate-400">
                ({course.ratingCount.toLocaleString()})
              </span>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.attendanceCount.toLocaleString()} attended</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Next intake: {nextDateDisplay}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{course.location}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Schemes */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-500 mb-3 truncate">
          Eligible: {course.schemes.join(' · ')}
        </p>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-slate-400 line-through tabular-nums">
              Full fee {formatSGD(breakdown.fullFee)}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#0F172A] tabular-nums">
                {formatSGD(breakdown.finalPayable)}
              </span>
              <span className="text-[11px] font-medium text-emerald-700 tabular-nums">
                ({breakdown.subsidyPercent}% off)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCourse(course)}
            className="px-3.5 py-2 text-xs font-semibold bg-[#0F172A] hover:bg-[#C8102E] text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Course Details
          </button>
        </div>
      </div>
    </article>
  );
}
