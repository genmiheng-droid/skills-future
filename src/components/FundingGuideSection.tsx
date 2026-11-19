import { ArrowRight } from 'lucide-react';
import { PROVIDERS } from '../data/courses';

interface FundingGuideSectionProps {
  onFilterByProvider: (provider: string) => void;
  onOpenSingpass: () => void;
}

const FUNDING_SCHEMES = [
  {
    code: '01',
    title: 'SkillsFuture Credit (Opening & Mid-Career)',
    summary:
      'Singaporeans aged 25 and above receive S$500 opening credit. Those aged 40 and above receive a S$4,000 Mid-Career top-up for selected courses with strong employability outcomes.',
    benefit: 'Up to S$4,500 offset',
  },
  {
    code: '02',
    title: 'Mid-Career Enhanced Subsidy (MCES)',
    summary:
      'Singapore Citizens aged 40 and above enjoy up to 90% course fee subsidies for SSG-supported certifiable courses at autonomous universities, polytechnics, ITE, and private providers.',
    benefit: 'Up to 90% fee subsidy',
  },
  {
    code: '03',
    title: 'Workfare Training Support (WTS) Scheme',
    summary:
      'Lower-wage Singaporean workers aged 30 and above receive up to 95% course fee support alongside training allowance incentives for completed WSQ programmes.',
    benefit: 'Up to 95% fee support',
  },
];

export function FundingGuideSection({
  onFilterByProvider,
  onOpenSingpass,
}: FundingGuideSectionProps) {
  return (
    <>
      {/* Funding & Subsidy Overview */}
      <section
        id="funding-guide"
        className="py-12 bg-[#F8FAFC] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#C8102E] mb-1">
                Financial Support
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                SkillsFuture Subsidies & Credit Schemes
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenSingpass}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8102E] hover:underline whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Check your credit eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FUNDING_SCHEMES.map((item) => (
              <div
                key={item.code}
                className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-slate-400 mb-2">
                    {item.code}.
                  </p>
                  <h3 className="font-display text-base font-bold text-[#0F172A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>
                <p className="pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700 tabular-nums">
                  {item.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approved Training Providers Directory Strip */}
      <section id="providers" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                Browse by Approved Training Provider
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select an institution to view its accredited courses in the
                directory above.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROVIDERS.map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => onFilterByProvider(provider)}
                className="p-4 text-left bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-[#C8102E] rounded-lg transition-colors group cursor-pointer"
              >
                <p className="text-sm font-semibold text-slate-900 group-hover:text-[#C8102E] transition-colors">
                  {provider}
                </p>
                <p className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1">
                  <span>View courses</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
