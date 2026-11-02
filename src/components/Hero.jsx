import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
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
        { opacity: 0, y: 16, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.15 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.5'
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.55'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
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
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden bg-bg"
    >
      {/* Background layer: HLS video on desktop, lightweight atmospheric gradient on mobile */}
      <HlsVideoBackground
        src={personalData.hero.hlsVideoUrl}
        overlayOpacity="bg-black/80 sm:bg-black/75"
      />

      {/* Subtle top spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[320px] bg-gradient-to-b from-[#4E85BF]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Main Hero Body */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto w-full text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="opacity-0 mb-3 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-text/85">
              {personalData.hero.eyebrow}
            </span>
          </div>
        </div>

        {/* Oversized Instrument Serif Italic Heading */}
        <h1
          ref={headingRef}
          className="opacity-0 font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-white tracking-tight leading-[1.08] mb-4 sm:mb-5 select-none"
        >
          {personalData.hero.greeting}{' '}
          <span className="bg-gradient-to-r from-white via-[#f0f0f0] to-[#89AACC] bg-clip-text text-transparent">
            {personalData.hero.name}
          </span>
        </h1>

        {/* Dynamic Role Section: Centered layout with role on its own line on mobile */}
        <div
          ref={introRef}
          className="opacity-0 flex flex-col items-center justify-center text-center max-w-3xl mb-4 sm:mb-6 px-2"
        >
          <p className="text-base sm:text-xl md:text-2xl text-text/90 font-light leading-snug">
            I'm a Developer exploring the intersection of
          </p>

          {/* Changing role on its own horizontally centered line */}
          <div className="h-9 sm:h-11 flex items-center justify-center mt-1 sm:mt-1.5 overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="text-lg sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-[#89AACC] to-[#4E85BF] bg-clip-text text-transparent underline decoration-[#89AACC]/40 underline-offset-4 text-center whitespace-nowrap"
              >
                {currentRole}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Narrative Description (15-16px on mobile with high contrast) */}
        <p
          ref={descRef}
          className="opacity-0 text-[15px] sm:text-base md:text-lg text-text/85 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-sans font-normal"
        >
          {personalData.hero.description}
        </p>

        {/* Action CTAs: touch-friendly min-h-[48px] */}
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
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-black bg-white hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 w-full sm:w-auto min-h-[48px] overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform pointer-events-none" />
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
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto min-h-[48px]"
          >
            <span>{personalData.hero.ctaConnect}</span>
            <ArrowUpRight className="w-4 h-4 text-[#89AACC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="opacity-0 relative z-10 flex flex-col items-center justify-center pt-4 sm:pt-6 text-muted/70 hover:text-muted transition-colors cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1.5">
          Scroll Down
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-7 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#89AACC]" />
        </motion.div>
      </div>
    </section>
  );
}
