import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set dark mode class on root
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Global window load listener to refresh scroll triggers
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Refresh ScrollTrigger positions once loader finishes exiting
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-[#4E85BF]/30 selection:text-white font-sans overflow-x-hidden">
      {/* Global subtle ambient atmosphere & depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle radial charcoal gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(22, 34, 52, 0.28) 0%, rgba(12, 17, 24, 0.45) 40%, rgba(8, 10, 13, 0.85) 100%)'
          }}
        />
        {/* Soft atmospheric blue glow in upper-mid section */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-gradient-to-b from-[#4E85BF]/12 via-[#1e2d40]/15 to-transparent rounded-full blur-[140px]" />
        {/* Restrained dots/grain texture for tangible depth */}
        <div className="absolute inset-0 bg-dots-subtle opacity-25" />
      </div>

      {/* Cinematic Fullscreen Loader */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* Custom Cursor Follower */}
      <CustomCursor />

      {/* Floating Pill Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero isLoaded={isLoaded} />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Selected Projects Bento Grid */}
        <Projects />

        {/* 4. Skills & Technologies Section */}
        <Skills />

        {/* 5. Parallax Learning Journey & Explorations */}
        <Explorations />

        {/* 6. Learning Stats Section */}
        <Stats />

        {/* 7. Cinematic Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
