import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      if (currentPath === '/') {
        const sections = ['contact', 'achievements', 'skills', 'about', 'work', 'home'];
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const navItems = [
    { label: 'WORK',         href: '#work',         id: 'work' },
    { label: 'ABOUT',        href: '#about',         id: 'about' },
    { label: 'SKILLS',       href: '#skills',        id: 'skills' },
    { label: 'ACHIEVEMENTS', href: '#achievements',  id: 'achievements' },
    { label: 'CONTACT',      href: '#contact',       id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-2xl'
          : 'bg-transparent py-6 sm:py-7'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand — pure text, editorial */}
        <button
          onClick={() => handleNavClick('#home')}
          className="text-left group cursor-pointer"
          aria-label="Ruturaj Patil — Home"
        >
          <span className="block font-display font-bold text-white text-sm sm:text-base tracking-tight leading-none group-hover:text-amber-400 transition-colors">
            RUTURAJ PATIL
          </span>
          <span className="block font-mono text-xs tracking-[0.16em] text-zinc-400 mt-1 font-medium">
            GAME DESIGNER
          </span>
        </button>

        {/* Desktop nav + Theme toggle */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav
            className="flex items-center gap-8 lg:gap-10"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isActive = currentPath === '/' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative font-mono text-xs sm:text-[13px] tracking-[0.14em] py-1.5 transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? 'text-amber-500 font-semibold'
                      : 'text-zinc-300 hover:text-white font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Active or hover underline indicator */}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-400 opacity-100 shadow-sm shadow-amber-400/50'
                        : 'bg-amber-400/0 opacity-0 group-hover:bg-amber-400/60 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          <div className="w-px h-5 bg-white/10" aria-hidden="true" />
          <ThemeToggle />
        </div>

        {/* Mobile controls (Theme Toggle + Menu Toggle) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-1.5 cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen
              ? <X className="w-5 h-5 text-zinc-300" aria-hidden="true" />
              : <span className="font-mono text-xs tracking-[0.2em] font-semibold text-zinc-200 border border-zinc-700/80 px-2.5 py-1 rounded-md bg-zinc-900/60">MENU</span>
            }
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090b] border-t border-white/[0.08] px-6 py-8 shadow-2xl">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`text-left font-display font-bold tracking-tight transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-amber-400'
                    : 'text-zinc-200 hover:text-white'
                }`}
                style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)' }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">Theme</span>
              <ThemeToggle showLabel />
            </div>
            <button
              onClick={() => handleNavClick('#work')}
              className="w-full py-3.5 text-center font-mono text-xs tracking-widest uppercase bg-amber-500 text-zinc-950 font-bold rounded-full hover:bg-amber-400 transition-colors cursor-pointer"
            >
              EXPLORE WORK →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
