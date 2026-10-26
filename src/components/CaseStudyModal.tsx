import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  Play,
  Compass,
  Film,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Video
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types/portfolio';
import { useMediaGallery } from '../hooks/useMediaGallery';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('01');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { resolvedGallery } = useMediaGallery(project?.media?.gallery);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
          setLightboxIndex(lightboxIndex - 1);
        }
        if (e.key === 'ArrowRight' && lightboxIndex < resolvedGallery.length - 1) {
          setLightboxIndex(lightboxIndex + 1);
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, lightboxIndex, resolvedGallery.length]);

  if (!project) return null;

  const sections = [
    { id: 'sec-overview', num: '01', title: 'OVERVIEW' },
    { id: 'sec-idea', num: '02', title: 'THE IDEA' },
    { id: 'sec-gameplay', num: '03', title: 'GAMEPLAY' },
    { id: 'sec-decisions', num: '04', title: 'DESIGN DECISIONS' },
    { id: 'sec-experience', num: '05', title: 'PLAYER EXPERIENCE' },
    { id: 'sec-dev', num: '06', title: 'DEVELOPMENT' },
    { id: 'sec-media', num: '07', title: 'MEDIA' },
    { id: 'sec-links', num: '08', title: 'LINKS' },
  ];

  const scrollToSection = (id: string, num: string) => {
    setActiveTab(num);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hasGallery = resolvedGallery.length > 0;
  const hasLegacyScreenshots = !hasGallery && project.media.screenshots && project.media.screenshots.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0c12] border border-zinc-800 rounded-3xl shadow-2xl text-zinc-200 focus:outline-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0b0c12]/95 backdrop-blur-md border-b border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
              GAME DESIGN CASE STUDY
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-xs text-zinc-400 font-mono">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Jump Strip (Desktop/Tablet) */}
        <div className="hidden sm:flex items-center gap-1 px-6 py-2 bg-zinc-950/90 border-b border-zinc-900 overflow-x-auto shrink-0 scrollbar-none">
          {sections.map((sec) => (
            <button
              key={sec.num}
              onClick={() => scrollToSection(sec.id, sec.num)}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === sec.num
                  ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {sec.num} {sec.title}
            </button>
          ))}
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-12">
          {/* Project Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                {project.category}
              </span>

              {project.aiAssistance.enabled && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800/90 text-zinc-300 border border-zinc-700/80 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {project.aiAssistance.label}
                </span>
              )}

              {project.futureConcept && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 font-mono">
                  Concept / Future Project
                </span>
              )}
            </div>

            <h2 id="modal-title" className="text-3xl sm:text-5xl font-bold font-display text-white mb-2 tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 font-medium">{project.subtitle}</p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 mt-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
              <div>
                <span className="block text-zinc-400 uppercase tracking-wider font-mono text-xs mb-1">
                  Design Role
                </span>
                <span className="font-semibold text-zinc-200">{project.role}</span>
              </div>
              <div>
                <span className="block text-zinc-400 uppercase tracking-wider font-mono text-xs mb-1">
                  Engine / Framework
                </span>
                <span className="font-semibold text-zinc-200">{project.engine}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-zinc-400 uppercase tracking-wider font-mono text-xs mb-1">
                  Prototype Status
                </span>
                <span className="font-semibold text-amber-400">{project.status}</span>
              </div>
            </div>
          </div>

          {/* DESIGN FOCUS (Dominant, at top) */}
          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Primary Game Design Focus
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.designFocus.map((focus, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-700/80 text-zinc-200"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* 01 — OVERVIEW */}
          <section id="sec-overview" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">01 /</span>
              <h3 className="text-xl font-bold font-display text-white">Overview</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {project.overview}
            </p>
          </section>

          {/* 02 — THE IDEA */}
          <section id="sec-idea" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">02 /</span>
              <h3 className="text-xl font-bold font-display text-white">The Idea &amp; Core Question</h3>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base italic">
                &ldquo;{project.idea}&rdquo;
              </p>
            </div>
          </section>

          {/* 03 — CORE GAMEPLAY */}
          <section id="sec-gameplay" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">03 /</span>
              <h3 className="text-xl font-bold font-display text-white">Core Gameplay</h3>
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
              Player Verbs &amp; Mechanics:
            </p>
            <div className="grid gap-3">
              {project.coreGameplay.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/70 text-sm sm:text-base text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 04 — DESIGN DECISIONS */}
          <section id="sec-decisions" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">04 /</span>
              <h3 className="text-xl font-bold font-display text-white">Key Design Decisions</h3>
            </div>
            <div className="space-y-3">
              {project.designDecisions.map((decision, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 text-sm sm:text-base leading-relaxed text-zinc-300"
                >
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1 font-semibold">
                    Design Decision #{idx + 1}
                  </div>
                  {decision}
                </div>
              ))}
            </div>
          </section>

          {/* 05 — PLAYER EXPERIENCE */}
          <section id="sec-experience" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">05 /</span>
              <h3 className="text-xl font-bold font-display text-white">Player Experience &amp; Emotional Arc</h3>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-[#12131b] border border-zinc-800 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Player Feel &amp; Sensory Atmosphere</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {project.playerExperience}
              </p>
            </div>
          </section>

          {/* 06 — DEVELOPMENT & IMPLEMENTATION */}
          <section id="sec-dev" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">06 /</span>
              <h3 className="text-xl font-bold font-display text-white">Development &amp; Implementation</h3>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4">
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.development}
              </p>

              {/* Technologies List */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technology.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800/80 border border-zinc-700/60 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Disclosure Note */}
              {project.aiAssistance.enabled && project.aiAssistance.disclosure && (
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{project.aiAssistance.disclosure}</span>
                </div>
              )}
            </div>
          </section>

          {/* 07 — MEDIA */}
          <section id="sec-media" className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">07 /</span>
              <h3 className="text-xl font-bold font-display text-white">Media &amp; Gameplay Capture</h3>
            </div>

            {hasGallery ? (
              <div className="space-y-4">
                {/* First item displayed large / featured */}
                {(() => {
                  const featured = resolvedGallery[0];
                  return (
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950">
                      {featured.type === 'video' ? (
                        featured.embedUrl ? (
                          <iframe
                            src={featured.embedUrl}
                            title={featured.name}
                            className="w-full aspect-video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={featured.url}
                            controls
                            playsInline
                            className="w-full max-h-80 object-contain"
                          />
                        )
                      ) : (
                        <div
                          className="cursor-zoom-in relative"
                          onClick={() => setLightboxIndex(0)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Expand ${featured.name}`}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(0); }}
                        >
                          <img
                            src={featured.url}
                            alt={featured.name}
                            className="w-full max-h-80 object-contain"
                          />
                          <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-zinc-300 pointer-events-none">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                      {featured.caption && (
                        <div className="px-4 py-2 text-xs text-zinc-300 bg-zinc-900/80 font-mono">
                          {featured.caption}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Remaining items in a responsive grid */}
                {resolvedGallery.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {resolvedGallery.slice(1).map((item, idx) => (
                      <div
                        key={item.id}
                        className="relative rounded-xl overflow-hidden border border-zinc-800/70 bg-zinc-950 group cursor-pointer"
                        style={{ aspectRatio: '16/10' }}
                        onClick={() => setLightboxIndex(idx + 1)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${item.name}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(idx + 1); }}
                      >
                        {item.type === 'video' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/90 text-amber-400">
                            <Video className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-mono uppercase text-zinc-400">
                              {item.externalProvider === 'youtube' ? 'YouTube' :
                               item.externalProvider === 'vimeo' ? 'Vimeo' : 'Video'}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-zinc-500 font-mono text-right">
                  {resolvedGallery.length} {resolvedGallery.length === 1 ? 'media item' : 'media items'} &middot; Click images to expand
                </p>
              </div>
            ) : hasLegacyScreenshots ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.media.screenshots.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-56 object-cover rounded-2xl border border-zinc-800"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-64 sm:h-72 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 flex flex-col items-center justify-center p-6 text-center group media-placeholder">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3 group-hover:text-amber-500 group-hover:border-amber-500/40 transition-colors">
                  <Film className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1 font-display">
                  {project.media.placeholderLabel || 'Gameplay footage coming soon'}
                </h4>
                <p className="text-xs text-zinc-500 max-w-sm">
                  Captures and video walkthroughs are actively being prepared and can be updated anytime through the client-side editor.
                </p>
              </div>
            )}
          </section>

          {/* 08 — LINKS */}
          <section id="sec-links" className="space-y-4 pt-4 border-t border-zinc-900 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold">08 /</span>
              <h3 className="text-xl font-bold font-display text-white">Project Links</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.links.liveUrl && (
                <a
                  href={project.links.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Game</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.links.githubUrl && (
                <a
                  href={project.links.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {!project.links.liveUrl && !project.links.githubUrl && (
                <p className="text-xs text-zinc-500 italic">
                  No public repository or live link provided for this project.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && resolvedGallery.length > 0 && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Media lightbox"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white z-10 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white z-10 cursor-pointer"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {lightboxIndex < resolvedGallery.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white z-10 cursor-pointer"
              aria-label="Next media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const current = resolvedGallery[lightboxIndex];
              return current.type === 'video' ? (
                current.embedUrl ? (
                  <iframe
                    src={current.embedUrl}
                    title={current.name}
                    className="w-full aspect-video rounded-2xl border border-zinc-800"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={current.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[80vh] object-contain rounded-2xl"
                  />
                )
              ) : (
                <img
                  src={current.url}
                  alt={current.name}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl mx-auto block"
                />
              );
            })()}

            {resolvedGallery[lightboxIndex].caption && (
              <p className="mt-3 text-center text-sm text-zinc-400 font-mono">
                {resolvedGallery[lightboxIndex].caption}
              </p>
            )}

            <div className="mt-2 text-center text-xs text-zinc-500 font-mono">
              {lightboxIndex + 1} / {resolvedGallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
