import React, { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* Project-specific accent colors and distinct design identities */
const PROJECT_ACCENTS: Record<string, {
  accentClass: string;
  accentBg: string;
  symbol: string;
  themeLine: string;
  genreBadge: string;
  designStatement: string;
  glowGradient: string;
}> = {
  andhaar: {
    accentClass: 'text-zinc-200',
    accentBg: 'bg-zinc-800/40',
    symbol: '◈',
    themeLine: 'TENSION · PACING · ENVIRONMENTAL STORYTELLING',
    genreBadge: 'A PSYCHOLOGICAL HORROR EXPERIENCE',
    designStatement: 'Fear emerges from vulnerability, ambiguous threats, and claustrophobic atmosphere rather than predictable jump scares.',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(63,63,70,0.35) 0%, rgba(9,9,11,0.95) 75%)'
  },
  judgement: {
    accentClass: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    symbol: '◇',
    themeLine: 'PREDICTION · RISK / REWARD · MULTIPLAYER STRATEGY',
    genreBadge: 'MULTIPLAYER STRATEGY & DECISION-MAKING',
    designStatement: 'Competitive trick-taking where social psychology and calculated prediction matter as much as card strength.',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(217,119,6,0.16) 0%, rgba(9,9,11,0.95) 75%)'
  },
  konre: {
    accentClass: 'text-cyan-300',
    accentBg: 'bg-cyan-500/10',
    symbol: '○',
    themeLine: 'CURIOSITY · ANONYMITY · SOCIAL PSYCHOLOGY',
    genreBadge: 'ANONYMITY & SOCIAL DEDUCTION WEB SYSTEM',
    designStatement: 'Investigates the tension between digital anonymity, player curiosity, and social friction in real-time communication.',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.16) 0%, rgba(9,9,11,0.95) 75%)'
  },
  'dungeon-escape': {
    accentClass: 'text-emerald-300',
    accentBg: 'bg-emerald-500/10',
    symbol: '□',
    themeLine: 'EXPLORATION · CONDITIONAL PROGRESSION · PROBLEM SOLVING',
    genreBadge: 'SYSTEMIC DUNGEON NAVIGATION & PROGRESSION',
    designStatement: 'Action-adventure navigation requiring spatial awareness, hazard timing, and conditional puzzle solving.',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.14) 0%, rgba(9,9,11,0.95) 75%)'
  }
};

const DEFAULT_ACCENT = {
  accentClass: 'text-amber-400',
  accentBg: 'bg-amber-500/10',
  symbol: '◈',
  themeLine: 'GAME DESIGN · PLAYER EXPERIENCE',
  genreBadge: 'PLAYABLE GAME PROTOTYPE',
  designStatement: 'Interactive systems designed to deliver clear emotional arcs and tactile gameplay feedback.',
  glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(217,119,6,0.12) 0%, rgba(9,9,11,0.95) 75%)'
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onOpenCaseStudy
}) => {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const accent = PROJECT_ACCENTS[project.id] ?? DEFAULT_ACCENT;
  const num = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;

  return (
    <article
      ref={ref}
      className="project-chapter reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
      aria-label={`Project: ${project.title}`}
    >
      <div className={`max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        !isEven ? 'lg:grid-flow-dense' : ''
      }`}>

        {/* ── Left column: meta + text ── */}
        <div className={`lg:col-span-5 space-y-4 ${!isEven ? 'lg:col-start-8' : ''}`}>
          {/* Chapter number + genre badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="project-number">{num} /</span>
            <span className={`label-mono ${accent.accentClass} font-bold`}>{accent.genreBadge}</span>

            {project.aiAssistance.enabled && (
              <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-zinc-900 border border-zinc-700/80 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                {project.aiAssistance.label}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold text-white leading-[0.94] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
          >
            {project.title}
          </h3>

          {/* Strong Design Statement Callout */}
          <div className={`p-3.5 rounded-xl border ${accent.accentBg} border-white/[0.08] text-xs sm:text-[13px] leading-relaxed italic ${accent.accentClass}`}>
            &ldquo;{accent.designStatement}&rdquo;
          </div>

          {/* Theme line */}
          <div className={`flex items-center gap-2 ${accent.accentClass}`}>
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.14em] font-semibold">{accent.themeLine}</span>
          </div>

          {/* Role + engine row */}
          <div className="grid grid-cols-2 gap-6 text-xs font-mono py-2.5 border-y border-white/[0.06]">
            <div>
              <span className="block text-zinc-400 uppercase tracking-wider text-xs font-semibold mb-1">
                ROLE
              </span>
              <span className="text-zinc-200 text-xs sm:text-sm font-medium">{project.role}</span>
            </div>
            <div>
              <span className="block text-zinc-400 uppercase tracking-wider text-xs font-semibold mb-1">
                ENGINE / TECH
              </span>
              <span className="text-zinc-200 text-xs sm:text-sm font-medium">{project.engine}</span>
            </div>
          </div>

          {/* Overview snippet */}
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
            {project.overview.length > 170
              ? project.overview.slice(0, 170) + '…'
              : project.overview}
          </p>

          {/* Design focus tags */}
          <div>
            <span className="block label-mono mb-2 text-zinc-300 font-semibold">DESIGN FOCUS</span>
            <div className="flex flex-wrap gap-2">
              {project.designFocus.map((focus, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-white/[0.08] ${accent.accentBg} text-zinc-200`}
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-zinc-950 font-display font-bold text-xs sm:text-[13px] tracking-wider uppercase rounded-full hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-black/20 group transform hover:-translate-y-0.5"
            >
              <span>EXPLORE CASE STUDY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>

            {project.links.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-semibold tracking-wider uppercase border border-white/15 text-zinc-200 hover:border-amber-500/50 hover:text-amber-400 rounded-full transition-all"
                aria-label={`Launch ${project.title} live`}
              >
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                PLAY LIVE
              </a>
            )}

            {project.links.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/15 text-zinc-400 hover:text-white hover:border-white/30 rounded-full transition-all"
                aria-label={`${project.title} GitHub`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* ── Right column: visual area ── */}
        <div className={`lg:col-span-7 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300"
            style={{ aspectRatio: '16/10' }}
            onClick={() => onOpenCaseStudy(project)}
            role="button"
            tabIndex={0}
            aria-label={`Open case study for ${project.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenCaseStudy(project);
              }
            }}
          >
            {/* Atmospheric ambient glow tailored to each project's mood */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{ background: accent.glowGradient }}
            />

            {/* Placeholder visual surface */}
            <div className="absolute inset-0 media-placeholder opacity-60 rounded-2xl" />

            {/* Top editorial meta strip */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between text-xs font-mono border-b border-white/[0.06] bg-gradient-to-b from-zinc-950/80 to-transparent z-10">
              <span className="text-zinc-400 font-medium tracking-wider">
                PROTOTYPE // {project.engine.toUpperCase()}
              </span>
              <span className={`text-xs font-semibold tracking-wider ${accent.accentClass}`}>
                {accent.symbol} CASE STUDY
              </span>
            </div>

            {/* Symbol/glyph watermark */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span
                className={`font-display font-black opacity-[0.09] leading-none select-none ${accent.accentClass}`}
                style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
                aria-hidden="true"
              >
                {accent.symbol}
              </span>
            </div>

            {/* Hover overlay with tactile cue */}
            <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/70 transition-all duration-300 flex items-center justify-center rounded-2xl backdrop-blur-[2px] z-20">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-2 text-center transform translate-y-2 group-hover:translate-y-0">
                <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase font-semibold">
                  DEEP CASE STUDY
                </span>
                <span className="font-display font-bold text-white text-xl tracking-tight">
                  EXPLORE DESIGN →
                </span>
              </div>
            </div>

            {/* Bottom media label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent flex items-center justify-between z-10">
              <span className="label-mono text-zinc-300 font-semibold tracking-wider">
                {project.media.placeholderLabel ?? 'GAMEPLAY FOOTAGE COMING SOON'}
              </span>
              <span className="hidden sm:inline-block font-mono text-xs text-zinc-400 uppercase tracking-wider">
                CLICK TO OPEN
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
