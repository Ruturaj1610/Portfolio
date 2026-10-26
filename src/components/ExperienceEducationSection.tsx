import React, { useRef } from 'react';
import { EXPERIENCE, EDUCATION } from '../data/profileData';
import { CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ExperienceEducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="reveal py-16 sm:py-20 px-6 max-w-6xl mx-auto border-t border-zinc-800/80 scroll-mt-20"
    >
      {/* Chapter header — unified */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
          <span className="w-5 h-px bg-amber-400/60 inline-block" />
          <span>04 / BACKGROUND &amp; PROGRESSION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Experience &amp; Education
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-mono max-w-xl">
          Technical practice in modern web &amp; UI systems — built on a computer science &amp; data science foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* ── EXPERIENCE COLUMN ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Technical Practice
            </span>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Timeline */}
          <div className="relative pl-5">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-800" aria-hidden="true" />

            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative">
                <div
                  className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-[#07070a] z-10"
                  aria-hidden="true"
                />
                <div className="pl-6 pb-8">
                  <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold font-display text-white">{exp.role}</h3>
                        <p className="text-xs font-medium text-amber-400 mt-0.5">{exp.company}</p>
                      </div>
                      {exp.period && (
                        <span className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                          {exp.period}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500/70 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>

                    {exp.secondaryNote && (
                      <div className="pt-2.5 border-t border-zinc-900 text-xs text-zinc-400 italic">
                        {exp.secondaryNote}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EDUCATION COLUMN ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Academic Foundation
            </span>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Timeline */}
          <div className="relative pl-5">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-800" aria-hidden="true" />

            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 border-[#07070a] z-10 ${
                    idx === 0 ? 'bg-amber-500' : 'bg-zinc-600'
                  }`}
                  aria-hidden="true"
                />
                <div className="pl-6 pb-8">
                  <div
                    className={`p-5 rounded-2xl transition-all ${
                      idx === 0
                        ? 'bg-zinc-900/60 border border-zinc-700/80'
                        : 'bg-zinc-950/60 border border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold font-display text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">{edu.institution}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`inline-block px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                            idx === 0
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                          }`}
                        >
                          {edu.score}
                        </span>
                        <span className="block text-[10px] text-zinc-500 font-mono mt-0.5">
                          {edu.scoreType}
                        </span>
                      </div>
                    </div>

                    {edu.highlight && (
                      <p className="text-xs text-zinc-300 mt-3 pt-3 border-t border-zinc-800/80">
                        {edu.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
