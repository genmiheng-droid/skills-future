import { useState } from 'react';
import { ChevronDown, Lock, ShieldCheck } from 'lucide-react';

export function GovSgBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#F0F2F5] border-b border-slate-200/80 text-slate-700 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[#C8102E] shrink-0"
            fill="currentColor"
          >
            <path d="M12 2L14.6 5.5L18.8 4.4L18.1 8.7L21.8 11L19.1 14.3L20.5 18.4L16.2 18.6L14.5 22.5L12 19.6L9.5 22.5L7.8 18.6L3.5 18.4L4.9 14.3L2.2 11L5.9 8.7L5.2 4.4L9.4 5.5L12 2Z" />
          </svg>
          <span className="truncate">
            A Singapore Government Agency Website
          </span>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1 font-medium text-[#1E40AF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] rounded whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>How to identify</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="bg-[#E6E9EE] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Official website links end with .gov.sg
                </p>
                <p className="text-xs leading-relaxed text-slate-600">
                  Government agencies communicate via .gov.sg websites (e.g.
                  courses.myskillsfuture.gov.sg). Trusted websites use official
                  domain endings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Secure websites use HTTPS
                </p>
                <p className="text-xs leading-relaxed text-slate-600">
                  Look for a padlock icon or https:// as an added precaution.
                  Share sensitive information only on verified official websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
