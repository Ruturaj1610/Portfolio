import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_INFO } from '../data/profileData';

export const Hero: React.FC = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      // Normalized -1 to +1
      setMouseX((e.clientX - rect.left) / rect.width - 0.5);
      setMouseY((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 72;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Very subtle parallax offsets
  const px = mouseX * 14;
  const py = mouseY * 10;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* Atmospheric warm glow, shifts slightly with mouse */}
        <div
          className="absolute top-1/3 left-1/2 rounded-full transition-transform duration-700 ease-out"
          style={{
            width: '60vw',
            height: '40vh',
            background: 'radial-gradient(ellipse, rgba(217,119,6,0.09) 0%, transparent 70%)',
            transform: `translate(calc(-50% + ${px * 0.6}px), calc(-50% + ${py * 0.6}px))`
          }}
        />
        {/* Secondary cool-slate depth */}
        <div
          className="absolute bottom-1/4 right-1/4 rounded-full transition-transform duration-1000 ease-out"
          style={{
            width: '30vw',
            height: '30vh',
            background: 'radial-gradient(ellipse, rgba(63,63,70,0.07) 0%, transparent 70%)',
            transform: `translate(${-px * 0.4}px, ${-py * 0.4}px)`
          }}
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute inset-0 hero-bottom-gradient bg-gradient-to-b from-transparent via-[#09090b]/30 to-[#09090b]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
        {/* ── Top row: location + availability status ── */}
        <div
          className={`flex flex-wrap items-center gap-3 mb-6 sm:mb-8 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-2'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono font-medium tracking-wider uppercase text-zinc-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>{PROFILE_INFO.location}</span>
          </div>
          <span className="text-zinc-600 font-bold" aria-hidden="true">·</span>
          <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono font-medium tracking-wider uppercase text-zinc-300">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>
        </div>

        {/* ── Name label ── */}
        <div
          className={`transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-2">
            RUTURAJ PATIL
          </p>
        </div>

        {/* ── Giant editorial headline: GAME DESIGNER ── */}
        <div
          className={`transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <h1
            className="hero-heading text-white mb-0 leading-[0.88]"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
              willChange: 'transform',
              transform: `translate(${px * 0.3}px, ${py * 0.3}px)`,
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            GAME
          </h1>
          <h1
            className="hero-heading hero-heading-outline mb-0 leading-[0.88]"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
              willChange: 'transform',
              transform: `translate(${-px * 0.2}px, ${py * 0.2}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            DESIGNER
          </h1>
        </div>

        {/* ── Cinematic statement: I DESIGN HOW PLAYERS FEEL ── */}
        <div
          className={`mt-6 sm:mt-7 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.45s' }}
        >
          <div className="flex flex-col items-start gap-0.5">
            <p
              className="font-display font-semibold text-zinc-200 leading-tight"
              style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.85rem)' }}
            >
              I DESIGN
            </p>
            <p
              className="font-display font-semibold text-amber-400 leading-tight"
              style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.85rem)' }}
            >
              HOW PLAYERS
            </p>
            <p
              className="font-display font-semibold text-zinc-200 leading-tight"
              style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.85rem)' }}
            >
              FEEL.
            </p>
          </div>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-md leading-relaxed">
            {PROFILE_INFO.secondaryPositioning}
          </p>
        </div>

        {/* ── CTAs: Primary filled button vs Secondary subtle text/scroll link ── */}
        <div
          className={`mt-7 sm:mt-8 flex flex-wrap items-center gap-6 sm:gap-8 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.6s' }}
        >
          {/* PRIMARY: Filled amber CTA button — scrolls to About / Design Thinking */}
          <button
            onClick={() => scrollTo('about')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-zinc-950 font-display font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer transform hover:-translate-y-0.5"
            aria-label="Enter portfolio — View design philosophy and about"
          >
            <span>ENTER PORTFOLIO</span>
            <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>

          {/* SECONDARY: Subtle text/link scroll cue (no filled background, subtle downward nudge) — scrolls to Selected Work */}
          <button
            onClick={() => scrollTo('work')}
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer py-2"
            aria-label="Scroll directly to selected work"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </button>
        </div>

        {/* ── Bottom strip: Social controls + Design Philosophy Process ── */}
        <div
          className={`mt-12 sm:mt-14 pt-6 border-t border-zinc-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.85s' }}
        >
          {/* Social icons: 44px clickable area, 20px icon, strong contrast & tactile hover */}
          <div className="flex items-center gap-3">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 hover:bg-zinc-800/90 transition-all shadow-sm cursor-pointer"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 hover:bg-zinc-800/90 transition-all shadow-sm cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 hover:bg-zinc-800/90 transition-all shadow-sm cursor-pointer"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Design Philosophy Process Strip: Noticeably larger, clear statement, amber arrows, wrap-safe */}
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.16em] text-zinc-300 flex items-center gap-2 sm:gap-3 flex-wrap justify-start lg:justify-end font-semibold">
            <span className="text-zinc-200">IDEA</span>
            <span className="text-amber-400 font-bold px-0.5 text-sm" aria-hidden="true">→</span>
            <span className="text-zinc-200">DESIGN</span>
            <span className="text-amber-400 font-bold px-0.5 text-sm" aria-hidden="true">→</span>
            <span className="text-zinc-200">PROTOTYPE</span>
            <span className="text-amber-400 font-bold px-0.5 text-sm" aria-hidden="true">→</span>
            <span className="text-zinc-200">GAMEPLAY</span>
            <span className="text-amber-400 font-bold px-0.5 text-sm" aria-hidden="true">→</span>
            <span className="text-zinc-100 font-bold text-amber-300/90">PLAYER EXPERIENCE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
