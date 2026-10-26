import React, { useRef } from 'react';
import { useProjects } from '../context/ProjectContext';
import { ProjectCard } from './ProjectCard';
import { ConceptCard } from './ConceptCard';
import type { Project } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProjectSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

const SectionHeader: React.FC<{
  number: string;
  label: string;
  title: string;
  subtitle: string;
  accentClass?: string;
}> = ({
  number,
  label,
  title,
  subtitle,
  accentClass = 'text-amber-400'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  return (
    <div ref={ref} className="reveal max-w-6xl mx-auto px-6 pb-2">
      <div className="border-t border-white/[0.08] pt-6 sm:pt-8">
        {/* Section marker & eyebrow row */}
        <div className="flex items-center gap-3 mb-2.5">
          <span className={`font-mono font-bold text-sm sm:text-base tracking-[0.18em] ${accentClass}`}>
            {number} /
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-zinc-300">
            {label}
          </span>
        </div>

        {/* Main section heading */}
        <h2
          className="font-display font-bold text-white tracking-tight leading-[0.92] mb-3 sm:mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
        >
          {title}
        </h2>

        {/* Supporting description text */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export const ProjectSection: React.FC<ProjectSectionProps> = ({ onOpenCaseStudy }) => {
  const { featuredProjects, futureConceptProjects } = useProjects();

  return (
    <section id="work" className="pt-2 sm:pt-4 pb-16 sm:pb-20 scroll-mt-20" aria-label="Selected Work">
      {/* ── Featured Work ── */}
      <SectionHeader
        number="01"
        label="PROTOTYPES & PLAYABLE SYSTEMS"
        title="Selected Work"
        subtitle="Interactive prototypes exploring tension pacing, player prediction, multiplayer deduction, and environmental gameplay mechanics."
      />

      {/* Chapter-based editorial list */}
      <div className="mt-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        ))}
      </div>

      {/* ── Future Game Concepts ── */}
      <div className="mt-16 sm:mt-20">
        <SectionHeader
          number="02"
          label="CONCEPTUAL DESIGN"
          title="Future Game Concepts"
          subtitle="Design proposals investigating novel player perspectives, historical scenario immersion, and sporting psychology."
          accentClass="text-cyan-400"
        />

        <div className="mt-6 max-w-6xl mx-auto px-6">
          {futureConceptProjects.map((concept) => (
            <ConceptCard
              key={concept.id}
              project={concept}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
