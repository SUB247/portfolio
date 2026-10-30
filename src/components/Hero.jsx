import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Terminal, Sparkles, Shield, Cpu } from 'lucide-react';
import HlsVideoBackground from './HlsVideoBackground';
import { personalData } from '../data/personal';

export default function Hero({ isLoaded }) {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Dynamic role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % personalData.dynamicRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=0.5'
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const currentRole = personalData.dynamicRoles[currentRoleIndex];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 sm:pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden bg-bg"
    >
      {/* Cinematic HLS Video Background */}
      <HlsVideoBackground
        src={personalData.hero.hlsVideoUrl}
        overlayOpacity="bg-black/75"
      />

      {/* Subtle top spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[350px] bg-gradient-to-b from-[#4E85BF]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Main Hero Body */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto w-full text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="opacity-0 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-text/80">
              {personalData.hero.eyebrow}
            </span>
          </div>
        </div>

        {/* Oversized Instrument Serif Italic Heading */}
        <h1
          ref={headingRef}
          className="opacity-0 font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[1.05] mb-5 select-none"
        >
          {personalData.hero.greeting}{' '}
          <span className="bg-gradient-to-r from-white via-[#f0f0f0] to-[#89AACC] bg-clip-text text-transparent">
            {personalData.hero.name}
          </span>
        </h1>

        {/* Dynamic Animated Role Introduction */}
        <div
          ref={introRef}
          className="opacity-0 text-lg sm:text-2xl md:text-3xl text-text/90 font-light max-w-3xl flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mb-5"
        >
          <span>I'm a Developer exploring the intersection of</span>
          <span className="inline-flex items-center min-w-[220px] sm:min-w-[280px] justify-center sm:justify-start h-9 sm:h-11">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-medium bg-gradient-to-r from-[#89AACC] to-[#4E85BF] bg-clip-text text-transparent underline decoration-[#89AACC]/40 underline-offset-4"
              >
                {currentRole}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* Narrative Description */}
        <p
          ref={descRef}
          className="opacity-0 text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-sans"
        >
          {personalData.hero.description}
        </p>

        {/* Action CTAs */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Explore My Work */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-black bg-white hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 w-full sm:w-auto overflow-hidden"
          >
            {/* Subtle light shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform" />
            <span className="relative z-10">{personalData.hero.ctaWork}</span>
            <ArrowDown className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary CTA: Let's Connect */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
          >
            <span>{personalData.hero.ctaConnect}</span>
            <ArrowUpRight className="w-4 h-4 text-[#89AACC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="opacity-0 relative z-10 flex flex-col items-center justify-center pt-6 text-muted/60 hover:text-muted transition-colors cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
          Scroll Down
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[#89AACC]" />
        </motion.div>
      </div>
    </section>
  );
}
