import React from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { RotateCcw, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleReplay = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-[#07070a] text-zinc-400">
      {/* ── Memorable Ending Block ── */}
      <div className="py-12 sm:py-16 px-6 max-w-4xl mx-auto text-center space-y-5">
        {/* End-game chapter label */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-1">
          <span className="w-5 h-px bg-amber-400/60 inline-block" />
          <span>END / THE LOOP</span>
          <span className="w-5 h-px bg-amber-400/60 inline-block" />
        </div>

        <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-zinc-500 font-semibold block">
          MISSION STATUS: COMPLETED
        </span>

        <h3 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
          YOU&apos;VE REACHED THE END.
        </h3>

        <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-md mx-auto">
          BUT GAMES AREN&apos;T ABOUT ENDINGS. THEY&apos;RE ABOUT THE LOOP.
        </p>

        <div className="pt-2">
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg group transform hover:-translate-y-0.5"
            aria-label="Restart portfolio from top"
          >
            <span>REPLAY</span>
            <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-90 duration-300" />
          </button>
        </div>
      </div>

      {/* ── Bottom Identity & Copyright Bar ── */}
      <div className="py-6 sm:py-7 px-6 border-t border-zinc-900/80 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="block font-semibold text-zinc-200">
              {PROFILE_INFO.name}
            </span>
            <span className="block text-xs text-zinc-400 mt-0.5 font-mono">
              {PROFILE_INFO.primaryTitle} · {PROFILE_INFO.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-zinc-700 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-zinc-700 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="h-10 px-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-zinc-300 hover:text-amber-400 hover:border-zinc-700 transition-colors text-xs font-mono"
              aria-label="Send Email"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{PROFILE_INFO.email}</span>
            </a>
          </div>

          <div className="text-zinc-400 text-xs text-center sm:text-right font-mono">
            © {currentYear} {PROFILE_INFO.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
