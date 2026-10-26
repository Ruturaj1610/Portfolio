import React, { useState, useRef } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { Compass, Target, Brain, Eye, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  // Interactive Game Loop state
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);

  const gameLoopSteps = [
    {
      id: 'player',
      label: 'PLAYER',
      num: '01',
      question: 'Who is the player and what do they expect?',
      focus: 'Mindset & Anticipation',
      detail: 'Every interaction begins with understanding the player’s mental model — their tolerance for ambiguity, sensory expectations, and intrinsic motivations. Designing without player empathy produces empty mechanics.'
    },
    {
      id: 'action',
      label: 'ACTION',
      num: '02',
      question: 'What choices does the player make?',
      focus: 'Agency & Meaningful Friction',
      detail: 'Core verbs must feel tactile, deliberate, and clear. Whether making an evasion decision in Andhaar or bidding under uncertainty in Judgement, the player’s agency should always carry consequence.'
    },
    {
      id: 'feedback',
      label: 'FEEDBACK',
      num: '03',
      question: 'What tells the player their action mattered?',
      focus: 'Audio-Visual & Diegetic Clarity',
      detail: 'Immediate, expressive feedback closes the cognitive loop. Audio cues, camera framing, subtle light flickers, and UI state changes communicate game state without pulling the player out of immersion.'
    },
    {
      id: 'reward',
      label: 'REWARD',
      num: '04',
      question: 'Why should they continue?',
      focus: 'Emotional Payoff & Mastery',
      detail: 'Rewards go beyond numeric scores: relief after surviving darkness, the satisfaction of a calculated deduction, or the realization of a clever escape sequence provide authentic player gratification.'
    },
    {
      id: 'repeat',
      label: 'REPEAT',
      num: '05',
      question: 'What makes the loop engaging over time?',
      focus: 'Progression & Emergent Variety',
      detail: 'A strong loop evolves. As the player gains confidence, escalating stakes, dynamic environmental variables, or human multiplayer unpredictability keep the experience fresh.'
    }
  ];

  const pillars = [
    {
      icon: Target,
      title: 'What the Player Does',
      subtitle: 'Mechanics & Agency',
      description: 'Designing intuitive core verbs, tactile collision responses, and balanced decision loops that give players real impact.'
    },
    {
      icon: Brain,
      title: 'Why They Keep Doing It',
      subtitle: 'Psychology & Motivation',
      description: 'Understanding risk-reward trade-offs, anticipation curves, social friction, and emotional tension that sustain engagement.'
    },
    {
      icon: Eye,
      title: 'How It Feels',
      subtitle: 'Atmosphere & Feedback',
      description: 'Layering diegetic sound cues, dynamic lighting, and clear visual state changes so mechanics communicate naturally.'
    },
    {
      icon: RefreshCw,
      title: 'Playable Iteration',
      subtitle: 'Prototyping & Systems',
      description: 'Transforming abstract concepts into rapid, testable prototypes across Unreal Engine and real-time multiplayer frameworks.'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal pt-4 sm:pt-6 pb-20 sm:pb-24 px-6 max-w-6xl mx-auto border-t border-zinc-800/80 scroll-mt-20"
    >
      {/* ── Editorial Identity Transition ── */}
      <div className="pb-4 sm:pb-5 border-b border-zinc-800/60 mb-6 sm:mb-8 flex items-center justify-between gap-4">
        <div>
          <span className="block text-zinc-100 font-display font-semibold text-lg sm:text-xl tracking-[0.16em] uppercase">
            RUTURAJ PATIL
          </span>
          <span className="block font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.14em] uppercase mt-1">
            GAME DESIGNER
          </span>
        </div>
        <div className="w-12 sm:w-16 h-px bg-amber-500/40 shrink-0" aria-hidden="true" />
      </div>

      {/* ── PART 1: Philosophy & Narrative ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16 sm:mb-20">
        {/* Left Column: Heading & Narrative */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono uppercase tracking-widest text-amber-500 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>02 / DESIGN PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Designing for Player Experience
          </h2>

          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-200/90 text-sm sm:text-base leading-relaxed italic">
            &ldquo;{PROFILE_INFO.designPhilosophy}&rdquo;
          </div>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            {PROFILE_INFO.aboutStory.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Core Design Interests */}
          <div className="pt-3">
            <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
              Core Design Interests
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Gameplay Mechanics',
                'Game Loops',
                'Player Psychology',
                'Level Design',
                'Game Balancing',
                'Environmental Storytelling',
                'Multiplayer Experiences',
                'Tension Pacing'
              ].map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 4 Design Pillars Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-zinc-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-105 group-hover:border-amber-500/40 transition-all shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PART 2: Interactive Game Loop — How I Think About Game Design ── */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#111219] via-[#0d0e14] to-[#09090b] border border-zinc-800/80 shadow-2xl">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono uppercase tracking-widest text-amber-500 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Framework</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
            How I Think About Game Design
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Games are closed-loop experiential systems. Click or hover each stage of the loop to inspect how I approach mechanic design, feedback loops, and player motivation.
          </p>
        </div>

        {/* The 5-Step Loop Visual Sequence */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6 sm:mb-8">
          {gameLoopSteps.map((step, idx) => {
            const isActive = activeLoopStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveLoopStep(idx)}
                onMouseEnter={() => setActiveLoopStep(idx)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer loop-node ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={isActive ? 'text-amber-400 font-bold' : 'text-zinc-400 font-medium'}>
                    {step.num}
                  </span>
                  {idx < 4 && (
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                  )}
                  {idx === 4 && (
                    <RefreshCw className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                  )}
                </div>
                <span className={`block font-display font-bold text-sm sm:text-base tracking-wide ${
                  isActive ? 'text-amber-300' : 'text-zinc-200'
                }`}>
                  {step.label}
                </span>
                <span className="block text-xs font-mono text-zinc-400 mt-1 truncate">
                  {step.focus}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Panel */}
        <div className="p-5 sm:p-7 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-amber-400 uppercase tracking-widest font-semibold">
              <span>Stage {gameLoopSteps[activeLoopStep].num}</span>
              <span className="text-zinc-600">·</span>
              <span>{gameLoopSteps[activeLoopStep].focus}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-display text-white">
              &ldquo;{gameLoopSteps[activeLoopStep].question}&rdquo;
            </h4>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed pt-2">
              {gameLoopSteps[activeLoopStep].detail}
            </p>
          </div>

          <div className="shrink-0 text-right font-mono text-xs text-zinc-400 hidden md:block">
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold">Loop Status</span>
            <span className="text-amber-400 font-bold">ACTIVE CYCLE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
