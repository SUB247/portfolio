import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import ResumeModal from './ResumeModal';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Track active section and scroll offset
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative flex items-center justify-between sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#0f0f0f]/90 shadow-2xl shadow-black/80 backdrop-blur-xl border border-white/10'
              : 'bg-[#141414]/70 shadow-lg backdrop-blur-md border border-white/[0.08]'
          }`}
          style={{
            maxWidth: '920px',
            width: '100%',
          }}
        >
          {/* Subtle gradient hover border glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#89AACC]/20 via-transparent to-[#4E85BF]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Minimal circular monogram logo */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, 'home')}
            className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-[#181818] border border-white/10 hover:border-white/20 transition-all duration-300 shrink-0"
            aria-label="Vivek Maurya - Home"
          >
            {/* Animated gradient ring */}
            <div className="absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 blur-[1px]" />
            <div className="relative w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <span className="font-serif italic font-bold text-xs tracking-wider text-white group-hover:text-[#89AACC] transition-colors">
                VM
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-muted hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action: Resume Button */}
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setResumeOpen(true)}
              className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <FileText className="w-3.5 h-3.5 text-[#89AACC] group-hover:scale-110 transition-transform" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setResumeOpen(true)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-xs text-[#89AACC]"
              title="Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-text hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col space-y-4 md:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono uppercase text-muted">
              <span>Navigation</span>
              <span className="text-[#89AACC]">Vivek Maurya</span>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#89AACC]/20 to-[#4E85BF]/20 border border-[#89AACC]/30"
              >
                <FileText className="w-4 h-4 text-[#89AACC]" />
                <span>View Full Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
