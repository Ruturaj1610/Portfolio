import React, { useRef } from 'react';
import { CERTIFICATIONS } from '../data/profileData';
import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CertificationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="reveal py-14 sm:py-16 px-6 max-w-6xl mx-auto border-t border-zinc-800/80 scroll-mt-20"
    >
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
          <span className="w-5 h-px bg-amber-400/60 inline-block" />
          <span>06 / PROFESSIONAL LEARNING</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Certifications
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-mono">Verified specializations in engine development, data, and programming.</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CERTIFICATIONS.map((cert, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                <span>{cert.issuer}</span>
                <span>{cert.year}</span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 leading-snug">
                {cert.title}
              </h3>
            </div>
            <div className="pt-3 mt-3 border-t border-zinc-900 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <CheckCircle className="w-3 h-3 text-amber-400" />
              <span>Verified Certificate</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
