import React, { useRef } from 'react';
import { Lightbulb, Compass, Sparkles, ArrowRight } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ConceptCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ project, onOpenCaseStudy }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useScrollReveal(cardRef);

  return (
    <div
      ref={cardRef}
      className="reveal relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0c0e14] via-[#090b10] to-[#08080c] border border-cyan-900/30 hover:border-cyan-500/40 transition-all shadow-2xl group overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Concept Chapter Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 font-semibold">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>FUTURE GAME CONCEPT · 001</span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-950/60 border border-cyan-700/50 text-cyan-300">
          Not Released · Conceptual Design
        </span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start justify-between">
        <div className="flex-1 space-y-5">
          <div>
            <h3 className="text-3xl sm:text-5xl font-bold font-display text-white group-hover:text-cyan-200 transition-colors tracking-tight">
              {project.title}
            </h3>
            <p className="font-display text-base sm:text-lg text-cyan-300 font-semibold mt-2 tracking-wide">
              WHAT IF YOU COULD STEP INTO HISTORY?
            </p>
            <p className="text-sm text-zinc-400 mt-1 font-mono">
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            {project.overview}
          </p>

          {/* Interactive Decision Sequence Visual: Ball by Ball Decision Vector */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Scenario Over Simulation · Tension Vector
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Decision Loop
              </span>
            </div>
            
            {/* Balls Sequence Strip */}
            <div className="grid grid-cols-6 gap-2 pt-1">
              {[
                { ball: '01', state: 'Dot Ball', tension: 'Pressure mounts' },
                { ball: '02', state: 'Bouncer', tension: 'Reaction test' },
                { ball: '03', state: 'Two Runs', tension: 'Running risk' },
                { ball: '04', state: 'Yorker', tension: 'Split-second timing' },
                { ball: '05', state: 'Boundary', tension: 'Momentum shift' },
                { ball: '06', state: 'Final Ball', tension: 'Decisive play' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-center hover:border-cyan-500/50 transition-colors cursor-default"
                >
                  <span className="block text-xs font-mono text-zinc-400 mb-0.5">BALL</span>
                  <span className="block text-xs sm:text-sm font-mono font-bold text-white mb-1">{item.ball}</span>
                  <span className="block text-[11px] sm:text-xs font-mono text-cyan-300 truncate">{item.state}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-900">
              <span className="text-zinc-500">PLAYER VERBS:</span>
              <span className="text-zinc-300">Read Line → Anticipate Length → Shift Weight → Execute Shot</span>
            </div>
          </div>

          {/* Exploration & Design Variables */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/70">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Exploration & Design Variables</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.designFocus.map((focus, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* Explicit Honesty Disclosure Statement */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs sm:text-sm text-cyan-200/90 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="italic">
              &ldquo;This is currently a game concept that I am interested in developing in the future. It investigates scenario design, first-person batting mechanics, and historical sporting immersion. No playable build or shipping assets exist at this stage.&rdquo;
            </p>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-cyan-500 text-zinc-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 group"
            >
              <span>View Concept Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Minimal Concept Blueprint Panel */}
        <div className="w-full lg:w-80 shrink-0 p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 space-y-5 text-xs font-mono">
          <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-3">
            <span className="tracking-widest">SPECIFICATION</span>
            <span className="text-cyan-400 font-bold">CONCEPT</span>
          </div>

          <div className="space-y-3.5 text-zinc-300">
            <div>
              <span className="text-zinc-400 block text-xs tracking-wider mb-0.5">PERSPECTIVE</span>
              <span className="font-semibold text-zinc-200">First-Person Crease Experience</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-xs tracking-wider mb-0.5">CORE DYNAMIC</span>
              <span className="font-semibold text-zinc-200">Historic Match Decisive Overs</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-xs tracking-wider mb-0.5">VARIABLES</span>
              <span className="text-zinc-300">Line, Length, Trajectory, Speed, Field Placement</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-xs tracking-wider mb-0.5">DESIGN CHALLENGE</span>
              <span className="text-zinc-300">Translating real reflex timings into intuitive mechanics</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-xs tracking-wider mb-0.5">FUTURE HORIZON</span>
              <span className="text-zinc-300">Spatial audio & potential VR perspective</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400 italic">
            Not released · In conceptual design phase
          </div>
        </div>
      </div>
    </div>
  );
};
