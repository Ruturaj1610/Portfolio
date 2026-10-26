import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectSection } from './components/ProjectSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AdminEditor } from './admin/AdminEditor';
import type { Project } from './types/portfolio';

const PortfolioContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      return '/admin';
    }
    return '/';
  });

  const { activeCaseStudy, setActiveCaseStudy } = useProjects();

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setCurrentRoute('/admin');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (path === '/admin') {
      window.history.pushState(null, '', '/admin');
      setCurrentRoute('/admin');
    } else {
      window.history.pushState(null, '', '/');
      setCurrentRoute('/');
    }
  };

  // If visiting /admin route, display the private client-side editor
  if (currentRoute === '/admin') {
    return <AdminEditor onBackToPublic={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen theme-bg-main bg-[#09090b] text-[#f4f4f5] selection:bg-amber-500/20 selection:text-amber-200 transition-colors duration-200">
      <Navbar currentPath={currentRoute} onNavigate={navigateTo} />
      
      <main>
        <Hero />
        <ProjectSection onOpenCaseStudy={(proj: Project) => setActiveCaseStudy(proj)} />
        <AboutSection />
        <SkillsSection />
        <ExperienceEducationSection />
        <AchievementsSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Deep Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <PortfolioContent />
      </ProjectProvider>
    </ThemeProvider>
  );
};

export default App;
