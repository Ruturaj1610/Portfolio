import React, { useState, useRef } from 'react';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_INFO } from '../data/profileData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="reveal pt-12 sm:pt-16 pb-12 sm:pb-16 px-6 max-w-6xl mx-auto border-t border-zinc-800/80 scroll-mt-20"
    >
      <div className="relative rounded-3xl p-7 sm:p-12 lg:p-14 bg-gradient-to-b from-[#111219] to-[#090a0f] border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Subtle background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <span>07 / COLLABORATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight">
            Let&apos;s Build Something Players Remember.
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Whether you want to discuss a game design role, explore multiplayer game loops, exchange feedback on Unreal prototypes, or bounce interactive mechanics, I’d love to connect.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send an Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-8 mt-8 border-t border-zinc-800/80 text-left">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                Email
              </span>
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="text-xs font-medium text-zinc-200 hover:text-amber-400 transition-colors truncate block font-mono"
              >
                {PROFILE_INFO.email}
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                Phone
              </span>
              <a
                href={`tel:${PROFILE_INFO.phone}`}
                className="text-xs font-medium text-zinc-200 hover:text-amber-400 transition-colors block font-mono"
              >
                {PROFILE_INFO.phone}
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                Location
              </span>
              <span className="text-xs font-medium text-zinc-200 block">
                {PROFILE_INFO.location}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                Socials
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-zinc-700">·</span>
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
