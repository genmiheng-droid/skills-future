import { ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { CourseCategory, PRIORITY_TRACKS, PriorityTrack } from '../data/courses';

interface FeaturedTracksSectionProps {
  onSelectTrack: (category: CourseCategory, searchQuery?: string) => void;
}

export function FeaturedTracksSection({
  onSelectTrack,
}: FeaturedTracksSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleTrackClick = (track: PriorityTrack) => {
    onSelectTrack(track.category, track.searchQuery);
  };

  return (
    <section id="top-picks" className="py-12 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#C8102E] mb-1">
              National Skills Demand
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Top Picks & Priority Learning Tracks
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Explore emerging skill areas aligned with Singapore’s Industry
            Transformation Maps and Green Economy growth sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRIORITY_TRACKS.map((track) => {
            const hasFailed = failedImages[track.id];
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => handleTrackClick(track)}
                className="group text-left bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                  {!hasFailed ? (
                    <img
                      src={track.image}
                      alt={track.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [track.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                      <BookOpen className="w-8 h-8 mb-2 text-[#C8102E]" />
                      <span className="text-xs font-medium text-slate-700 text-center">
                        {track.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-1.5 tabular-nums">
                      {track.category} · {track.courseCount}
                    </p>
                    <h3 className="font-display text-base font-bold text-[#0F172A] group-hover:text-[#C8102E] transition-colors leading-snug mb-2">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {track.subtitle}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8102E]">
                    <span>Browse courses</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
