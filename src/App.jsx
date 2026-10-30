import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set dark mode class on root
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-[#4E85BF]/30 selection:text-white font-sans overflow-x-hidden">
      {/* Cinematic Fullscreen Loader */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* Custom Cursor Follower */}
      <CustomCursor />

      {/* Floating Pill Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
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
