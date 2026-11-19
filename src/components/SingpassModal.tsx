import { CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { useEffect } from 'react';
import {
  CitizenEligibilityTier,
  ELIGIBILITY_LABELS,
  formatSGD,
} from '../utils/pricing';

interface SingpassModalProps {
  open: boolean;
  onClose: () => void;
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  eligibilityTier: CitizenEligibilityTier;
  onEligibilityTierChange: (tier: CitizenEligibilityTier) => void;
  openingCredit: number;
  midCareerCredit: number;
}

export function SingpassModal({
  open,
  onClose,
  isSignedIn,
  onSignIn,
  onSignOut,
  eligibilityTier,
  onEligibilityTierChange,
  openingCredit,
  midCareerCredit,
}: SingpassModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const totalCredit =
    openingCredit + (eligibilityTier === 'sg_above_40' ? midCareerCredit : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="singpass-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#C8102E]" />
            <div>
              <h2
                id="singpass-modal-title"
                className="font-display text-lg font-bold text-[#0F172A]"
              >
                {isSignedIn ? 'SkillsFuture Credit Account' : 'Singpass Portal Access'}
              </h2>
              <p className="text-xs text-slate-500">
                Personalise subsidies & view credit balance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          {!isSignedIn ? (
            <>
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-md p-4 text-xs text-slate-600 space-y-2">
                <p className="font-semibold text-slate-900">
                  Check your SkillsFuture Credit & subsidy tier
                </p>
                <p className="leading-relaxed">
                  Signing in lets you preview personalised out-of-pocket fees
                  across every course in the directory using your citizenship
                  tier and SkillsFuture Credit balance.
                </p>
              </div>

              <div>
                <label
                  htmlFor="singpass-tier"
                  className="block text-xs font-semibold text-slate-800 mb-1.5"
                >
                  Select Citizen Profile for Session
                </label>
                <select
                  id="singpass-tier"
                  value={eligibilityTier}
                  onChange={(e) =>
                    onEligibilityTierChange(
                      e.target.value as CitizenEligibilityTier
                    )
                  }
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#C8102E]"
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

              <button
                type="button"
                onClick={onSignIn}
                className="w-full py-2.5 px-4 bg-[#C8102E] hover:bg-[#A60D25] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Continue with Singpass Profile
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified session · {ELIGIBILITY_LABELS[eligibilityTier]}</span>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-200 rounded-md p-4 space-y-3 tabular-nums">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Opening & Top-Up Credit (No Expiry)</span>
                  <span className="font-semibold text-slate-900">
                    {formatSGD(openingCredit)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>SkillsFuture Credit (Mid-Career 40+)</span>
                  <span className="font-semibold text-slate-900">
                    {eligibilityTier === 'sg_above_40'
                      ? formatSGD(midCareerCredit)
                      : 'S$0.00 (Age 40+ only)'}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">
                    Total Available Credit
                  </span>
                  <span className="text-xl font-bold text-[#C8102E]">
                    {formatSGD(totalCredit)}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="signed-in-tier"
                  className="block text-xs font-semibold text-slate-800 mb-1.5"
                >
                  Switch Citizen Profile
                </label>
                <select
                  id="signed-in-tier"
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

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 px-4 bg-[#0F172A] text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Apply to Directory
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="py-2 px-4 border border-slate-300 text-slate-700 text-xs font-semibold rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
