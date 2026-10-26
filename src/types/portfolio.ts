export type MediaType = 'image' | 'video';
export type MediaSource = 'indexeddb' | 'external' | 'local';

export interface ProjectMediaItem {
  id: string;
  type: MediaType;
  url: string;
  name: string;
  size?: number;
  source: MediaSource;
  caption?: string;
  isCover?: boolean;
  externalProvider?: 'youtube' | 'vimeo' | 'direct' | 'none';
  embedUrl?: string;
}

export interface ProjectMedia {
  coverImage?: string;
  screenshots: string[];
  videoUrl?: string;
  gifUrl?: string;
  trailerUrl?: string;
  placeholderLabel?: string;
  gallery?: ProjectMediaItem[];
}

export interface ProjectLinks {
  githubUrl?: string;
  liveUrl?: string;
  otherUrl?: string;
}

export interface ProjectAiAssistance {
  enabled: boolean;
  label: string; // e.g. "AI-assisted prototype"
  disclosure?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  engine: string;
  technology: string[];
  designFocus: string[]; // Tension, Pacing, Environmental Storytelling, etc.
  overview: string;      // 01 — Overview
  idea: string;          // 02 — The Idea
  coreGameplay: string[];// 03 — Core Gameplay
  designDecisions: string[]; // 04 — Design Decisions
  playerExperience: string;  // 05 — Player Experience
  development: string;   // 06 — Development
  media: ProjectMedia;   // 07 — Media
  links: ProjectLinks;   // 08 — Links
  tags: string[];
  featured: boolean;
  futureConcept: boolean;
  conceptStatus?: string; // e.g. "Concept / Future Project"
  aiAssistance: ProjectAiAssistance;
  status: string;
  order: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  priority: 'primary' | 'secondary' | 'supporting';
  skills: {
    name: string;
    highlight?: boolean;
    description?: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period?: string;
  responsibilities: string[];
  secondaryNote?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  score: string;
  scoreType: string;
  highlight?: string;
  period?: string;
}

export interface AchievementItem {
  title: string;
  event: string;
  year: string;
  type: 'award' | 'publication' | 'copyright';
  description?: string;
  publisher?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}
