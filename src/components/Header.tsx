import { UserCheck, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { formatSGD } from '../utils/pricing';

interface HeaderProps {
  savedCount: number;
  isSignedIn: boolean;
  totalCredit: number;
  onOpenSingpass: () => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleSavedFilter: () => void;
  showingSavedOnly: boolean;
}

export function Header({
  savedCount,
  isSignedIn,
  totalCredit,
  onOpenSingpass,
  onNavigateSection,
  onToggleSavedFilter,
  showingSavedOnly,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded"
        >
          <span
            aria-hidden="true"
            className="w-2.5 h-6 bg-[#C8102E] rounded-xs inline-block"
          />
          <span>MySkillsFuture</span>
        </a>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => handleNavClick('directory')}
            className="hover:text-[#C8102E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            Find Courses
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('top-picks')}
            className="hover:text-[#C8102E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            Top Picks
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('funding-guide')}
            className="hover:text-[#C8102E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            Funding & Credit
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('providers')}
            className="hover:text-[#C8102E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            Providers
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleSavedFilter();
              handleNavClick('directory');
            }}
            className={`hover:text-[#C8102E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
              showingSavedOnly ? 'text-[#C8102E] font-semibold underline' : ''
            }`}
          >
            Saved ({savedCount})
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSingpass}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C8102E] ${
              isSignedIn
                ? 'bg-[#0F172A] text-white hover:bg-slate-800'
                : 'bg-[#C8102E] text-white hover:bg-[#A60D25]'
            }`}
          >
            {isSignedIn ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span className="tabular-nums">
                  Credit: {formatSGD(totalCredit)}
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Log in with Singpass</span>
              </>
            )}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-md cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleNavClick('directory')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Find Courses
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('top-picks')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Top Picks
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('funding-guide')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Funding & Credit
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('providers')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Providers
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleSavedFilter();
              handleNavClick('directory');
            }}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Saved Courses ({savedCount})
          </button>
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSingpass();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#C8102E] rounded-md"
            >
              {isSignedIn ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span className="tabular-nums">
                    SkillsFuture Credit: {formatSGD(totalCredit)}
                  </span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Log in with Singpass</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
