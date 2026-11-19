interface FooterProps {
  onNavigateSection: (id: string) => void;
}

export function Footer({ onNavigateSection }: FooterProps) {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white mb-3">
              <span
                aria-hidden="true"
                className="w-2.5 h-5 bg-[#C8102E] rounded-xs inline-block"
              />
              <span>MySkillsFuture</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MySkillsFuture is a one-stop education, training, and career
              guidance portal managed by SkillsFuture Singapore (SSG).
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <p className="font-semibold text-white mb-2">Course Directory</p>
            <button
              type="button"
              onClick={() => onNavigateSection('directory')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Find Courses
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('top-picks')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Priority Learning Tracks
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('providers')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Training Providers
            </button>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <p className="font-semibold text-white mb-2">
              Support & Governance
            </p>
            <button
              type="button"
              onClick={() => onNavigateSection('funding-guide')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              SkillsFuture Credit & Subsidies
            </button>
            <p className="text-slate-400">
              Hotline: +65 6785 5785 (Mon–Fri, 8:30am–5:30pm)
            </p>
            <p className="text-slate-400">
              1 Paya Lebar Link, #08-08 PLQ 2, Singapore 408533
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Report Vulnerability</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Statement</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Use</span>
            <span aria-hidden="true">·</span>
            <span>Accessibility</span>
          </div>
          <p>© 2026 Government of Singapore · SkillsFuture Singapore</p>
        </div>
      </div>
    </footer>
  );
}
