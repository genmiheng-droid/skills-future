import {
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Course } from '../data/courses';
import {
  CitizenEligibilityTier,
  ELIGIBILITY_LABELS,
  calculateFeeBreakdown,
  formatSGD,
} from '../utils/pricing';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  eligibilityTier: CitizenEligibilityTier;
  onEligibilityTierChange: (tier: CitizenEligibilityTier) => void;
  availableCredit: number;
}

export function CourseDetailModal({
  course,
  onClose,
  isSaved,
  onToggleSave,
  eligibilityTier,
  onEligibilityTierChange,
  availableCredit,
}: CourseDetailModalProps) {
  const [selectedIntake, setSelectedIntake] = useState<string>('');
  const [useCredit, setUseCredit] = useState(true);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  useEffect(() => {
    if (course) {
      setSelectedIntake(course.upcomingDates[0] || 'Flexible On-Demand');
      setEnquirySubmitted(false);
    }
  }, [course]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (course) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [course, onClose]);

  if (!course) return null;

  const breakdown = calculateFeeBreakdown(
    course,
    eligibilityTier,
    availableCredit,
    useCredit
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-slate-500 mb-1">
              {course.category} <span aria-hidden="true">·</span>{' '}
              <span className="font-mono">{course.referenceNumber}</span>
            </p>
            <h2
              id="course-modal-title"
              className="font-display text-xl font-bold text-[#0F172A] leading-snug"
            >
              {course.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close course details"
            className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-md cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Columns: Course Info & Objectives */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Conducted by {course.provider}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-slate-600 tabular-nums">
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <strong className="text-slate-900">
                    {course.rating.toFixed(1)}
                  </strong>
                  <span>({course.ratingCount.toLocaleString()} reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{course.durationLabel}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{course.location}</span>
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Course Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.summary}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Key Learning Outcomes
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {course.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-500 mb-0.5">Certification Awarded</p>
                <p className="font-semibold text-slate-900">
                  {course.certification}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mb-0.5">
                  Applicable Funding Schemes
                </p>
                <p className="font-semibold text-slate-900">
                  {course.schemes.join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Fee & Credit Calculator */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-lg p-5 space-y-5 h-fit">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Course Fee & SkillsFuture Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Estimate your nett fee payable after SSG subsidies and credit
                offset.
              </p>
            </div>

            {/* Citizen Profile Selector */}
            <div>
              <label
                htmlFor="modal-eligibility"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Applicant Profile
              </label>
              <select
                id="modal-eligibility"
                value={eligibilityTier}
                onChange={(e) =>
                  onEligibilityTierChange(
                    e.target.value as CitizenEligibilityTier
                  )
                }
                className="w-full h-9 px-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#C8102E]"
              >
                {(
                  Object.keys(ELIGIBILITY_LABELS) as CitizenEligibilityTier[]
                ).map((key) => (
                  <option key={key} value={key}>
                    {ELIGIBILITY_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>

            {/* Intake Date Selector */}
            <div>
              <label
                htmlFor="modal-intake"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Preferred Intake Date
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="modal-intake"
                  value={selectedIntake}
                  onChange={(e) => setSelectedIntake(e.target.value)}
                  className="w-full h-9 pl-8 pr-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#C8102E]"
                >
                  {course.upcomingDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Credit Checkbox */}
            {course.schemes.includes('SkillsFuture Credit') &&
              eligibilityTier !== 'employer_sme' && (
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCredit}
                    onChange={(e) => setUseCredit(e.target.checked)}
                    className="rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="tabular-nums">
                    Apply available SkillsFuture Credit (
                    {formatSGD(availableCredit)})
                  </span>
                </label>
              )}

            {/* Breakdown Table */}
            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs tabular-nums">
              <div className="flex justify-between text-slate-600">
                <span>Full Course Fee (incl. GST)</span>
                <span>{formatSGD(breakdown.fullFee)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>SSG Course Fee Subsidy ({breakdown.subsidyPercent}%)</span>
                <span>- {formatSGD(breakdown.subsidyAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium pt-1 border-t border-slate-200/70">
                <span>Nett Course Fee</span>
                <span>{formatSGD(breakdown.nettAfterSubsidy)}</span>
              </div>
              {breakdown.creditApplied > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>SkillsFuture Credit Offset</span>
                  <span>- {formatSGD(breakdown.creditApplied)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-300 text-sm font-bold text-[#0F172A]">
                <span>Est. Cash Payable</span>
                <span className="text-xl text-[#C8102E]">
                  {formatSGD(breakdown.finalPayable)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {enquirySubmitted ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-900">
                <p className="font-semibold mb-0.5">
                  Registration Intent Recorded
                </p>
                <p>
                  Selected intake: <strong>{selectedIntake}</strong>. Remember
                  to submit your SkillsFuture Credit claim within 60 days
                  before course start date.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setEnquirySubmitted(true)}
                  className="w-full py-2.5 px-4 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Proceed to Provider Enrolment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSave(course.id)}
                  className="w-full py-2 px-4 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved ? 'fill-[#C8102E] text-[#C8102E]' : ''
                    }`}
                  />
                  <span>
                    {isSaved ? 'Saved in My Courses' : 'Save to My Courses'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
