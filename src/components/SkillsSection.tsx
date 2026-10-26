import React, { useRef } from 'react';
import { SKILL_CATEGORIES } from '../data/profileData';
import { Compass, Cpu, Wrench, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const designCategory = SKILL_CATEGORIES.find((c) => c.priority === 'primary') ?? SKILL_CATEGORIES[0];
  const devCategory = SKILL_CATEGORIES.find((c) => c.priority === 'secondary') ?? SKILL_CATEGORIES[1];
  const toolsCategory = SKILL_CATEGORIES.find((c) => c.priority === 'supporting') ?? SKILL_CATEGORIES[2];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="reveal py-16 sm:py-20 px-6 max-w-6xl mx-auto border-t border-zinc-800/80 scroll-mt-20"
    >
      {/* ── Section Header ── */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>03 / COMPETENCY MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Game Design &amp; Systems Thinking
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-3 leading-relaxed">
          Prioritizing player agency, systemic mechanics, and feedback loops — validated through rapid prototyping across Unreal Engine 5 and real-time interactive systems.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* ── Primary Discipline: Game Design Core ── */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-zinc-900/90 via-[#13141d]/80 to-zinc-950 border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800/80 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {designCategory.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs uppercase font-mono tracking-wider bg-amber-500 text-zinc-950 font-bold">
                    Core Discipline
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  {designCategory.description}
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-amber-400/90 tracking-wider uppercase font-semibold hidden lg:block text-right">
              <span>PLAYER PSYCHOLOGY · MECHANICS · LOOPS</span>
            </div>
          </div>

          {/* 12 Game Design Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {designCategory.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-xl transition-all ${
                  skill.highlight
                    ? 'bg-zinc-900/90 border border-amber-500/30 hover:border-amber-500/50 shadow-sm'
                    : 'bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm sm:text-[15px] font-semibold text-zinc-100 font-display">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  )}
                </div>

                {skill.description && (
                  <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Supporting Split: Implementation & Production ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Engine & Development Execution */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-7 bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-5 border-b border-zinc-800/80 mb-5">
                <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {devCategory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                    {devCategory.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {devCategory.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-zinc-200 font-display">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      )}
                    </div>
                    {skill.description && (
                      <p className="text-xs text-zinc-400 mt-1 leading-snug">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tools & Workflow */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-5 border-b border-zinc-800/80 mb-5">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 text-zinc-400 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {toolsCategory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                    {toolsCategory.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {toolsCategory.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 transition-all flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-zinc-200 font-display">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">Production Tool</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Loop Summary Strip */}
            <div className="pt-5 mt-5 border-t border-zinc-800/80">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                Workflow Rhythm
              </span>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Design Docs → Whitebox Prototype → Playtest → Tuning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
