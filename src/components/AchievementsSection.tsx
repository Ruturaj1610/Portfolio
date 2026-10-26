import React, { useRef } from 'react';
import { ACHIEVEMENTS } from '../data/profileData';
import { Trophy, BookOpen, FileCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="reveal py-16 sm:py-20 px-6 max-w-6xl mx-auto border-t border-zinc-800/80 scroll-mt-20"
    >
      {/* Chapter header */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
          <span className="w-5 h-px bg-amber-400/60 inline-block" />
          <span>05 / RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Milestones
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mt-2 font-mono">
          Competitive prizes, peer-reviewed publication, and government copyright registrations.
        </p>
      </div>

      {/* Milestone track — left spine with numbered nodes */}
      <div className="relative pl-6 sm:pl-8">
        {/* Vertical spine */}
        <div
          className="absolute left-0 top-3 bottom-3 w-px bg-zinc-800"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ACHIEVEMENTS.map((item, idx) => {
            const isAward = item.type === 'award';
            const isPublication = item.type === 'publication';

            const IconEl = isAward ? (
              <Trophy className="w-3.5 h-3.5" />
            ) : isPublication ? (
              <BookOpen className="w-3.5 h-3.5" />
            ) : (
              <FileCheck className="w-3.5 h-3.5" />
            );

            const iconBg = isAward
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : isPublication
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              : 'bg-zinc-800/80 text-zinc-400 border-zinc-700';

            const nodeBg = isAward
              ? 'bg-amber-500'
              : isPublication
              ? 'bg-cyan-500'
              : 'bg-zinc-600';

            return (
              <div key={idx} className="relative group">
                {/* Node on the spine */}
                <div
                  className={`absolute -left-[calc(1.5rem+5px)] sm:-left-[calc(2rem+5px)] top-5 w-2.5 h-2.5 rounded-full border-2 border-[#07070a] z-10 ${nodeBg}`}
                  aria-hidden="true"
                />

                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${iconBg}`}>
                      {IconEl}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 block">
                        MILESTONE {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 mt-0.5 block">{item.year}</span>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold font-display text-white group-hover:text-amber-200 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.event}</p>

                  {item.publisher && (
                    <div className="pt-2.5 mt-2.5 border-t border-zinc-900 text-xs font-mono text-cyan-400">
                      {item.publisher}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


