import { Course } from '../data/courses';

export type CitizenEligibilityTier =
  | 'sg_above_40'
  | 'sg_below_40'
  | 'pr'
  | 'employer_sme';

export interface FeeBreakdown {
  fullFee: number;
  subsidyPercent: number;
  subsidyAmount: number;
  nettAfterSubsidy: number;
  creditApplied: number;
  finalPayable: number;
}

export const ELIGIBILITY_LABELS: Record<CitizenEligibilityTier, string> = {
  sg_above_40: 'Singapore Citizen (40 & above)',
  sg_below_40: 'Singapore Citizen (Below 40)',
  pr: 'Singapore Permanent Resident',
  employer_sme: 'Employer-Sponsored (SME)',
};

export function calculateFeeBreakdown(
  course: Course,
  tier: CitizenEligibilityTier,
  availableCredit: number,
  applyCredit: boolean
): FeeBreakdown {
  let subsidyPercent = 0;

  switch (tier) {
    case 'sg_above_40':
      subsidyPercent = course.subsidyPercentAbove40;
      break;
    case 'sg_below_40':
      subsidyPercent = course.subsidyPercentBelow40;
      break;
    case 'pr':
      subsidyPercent = Math.max(0, course.subsidyPercentBelow40 - 20);
      break;
    case 'employer_sme':
      subsidyPercent = course.subsidyPercentAbove40;
      break;
  }

  const subsidyAmount = Math.round((course.fullFee * subsidyPercent) / 100);
  const nettAfterSubsidy = Math.max(0, course.fullFee - subsidyAmount);

  const isCreditEligible = course.schemes.includes('SkillsFuture Credit');
  const creditApplied =
    applyCredit && isCreditEligible && tier !== 'employer_sme'
      ? Math.min(nettAfterSubsidy, availableCredit)
      : 0;

  const finalPayable = Math.max(0, nettAfterSubsidy - creditApplied);

  return {
    fullFee: course.fullFee,
    subsidyPercent,
    subsidyAmount,
    nettAfterSubsidy,
    creditApplied,
    finalPayable,
  };
}

export function formatSGD(amount: number): string {
  return `S$${amount.toLocaleString('en-SG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
