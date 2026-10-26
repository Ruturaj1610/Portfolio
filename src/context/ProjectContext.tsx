import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project } from '../types/portfolio';
import { INITIAL_PROJECTS } from '../data/initialProjects';

interface ProjectContextType {
  projects: Project[];
  featuredProjects: Project[];
  futureConceptProjects: Project[];
  activeCaseStudy: Project | null;
  setActiveCaseStudy: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (orderedProjects: Project[]) => void;
  resetToDefaults: () => void;
  exportProjectsJson: () => string;
  importProjectsJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'ruturaj_portfolio_projects_v2';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out DON'T STOP if it was accidentally cached in older drafts
          const filtered = parsed.filter(
            (p: Project) => p.id !== 'dont-stop' && p.title.toLowerCase().indexOf('dont stop') === -1
          );
          return filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage:', e);
    }
    return INITIAL_PROJECTS;
  });

  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  const featuredProjects = projects
    .filter((p) => p.featured && !p.futureConcept)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const futureConceptProjects = projects
    .filter((p) => p.futureConcept)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const merged = { ...p, ...updated };
          if (activeCaseStudy?.id === id) {
            setActiveCaseStudy(merged);
          }
          return merged;
        }
        return p;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeCaseStudy?.id === id) {
      setActiveCaseStudy(null);
    }
  };

  const reorderProjects = (orderedProjects: Project[]) => {
    const updated = orderedProjects.map((p, index) => ({
      ...p,
      order: index + 1
    }));
    setProjects(updated);
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    } catch (e) {
      console.error(e);
    }
  };

  const exportProjectsJson = () => {
    return JSON.stringify(projects, null, 2);
  };

  const importProjectsJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProjects(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        featuredProjects,
        futureConceptProjects,
        activeCaseStudy,
        setActiveCaseStudy,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        resetToDefaults,
        exportProjectsJson,
        importProjectsJson
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
