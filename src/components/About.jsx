import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Flame, Cpu, GraduationCap, MapPin, Compass } from 'lucide-react';
import { personalData } from '../data/personal';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading and editorial text
      gsap.from([headingRef.current, textRef.current], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Animate the 3 cards
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 25,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#89AACC]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#89AACC]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#89AACC]" />;
      default:
        return <Compass className="w-5 h-5 text-[#89AACC]" />;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 bg-bg overflow-hidden"
    >
      {/* Background Subtle Ambient Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#89AACC]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#4E85BF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
            [ 01 // IDENTITY ]
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Heading + Editorial Story */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h2
              ref={headingRef}
              className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]"
            >
              {personalData.about.heading}
            </h2>

            <div ref={textRef} className="space-y-4 sm:space-y-5 text-[15px] sm:text-base lg:text-lg text-text/90 font-sans leading-relaxed font-normal">
              {personalData.about.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-serif first-letter:italic first-letter:text-white first-letter:mr-1">
                  {p}
                </p>
              ))}

              {/* Verified Identity Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono text-muted/90">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                  <GraduationCap className="w-3.5 h-3.5 text-[#89AACC]" />
                  <span>UIT Prayagraj • B.Tech</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#89AACC]" />
                  <span>Prayagraj, India</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4E85BF]/10 text-[#89AACC] border border-[#89AACC]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
                  <span>Open to Collaborations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Information Blocks */}
          <div ref={cardsRef} className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            {personalData.about.infoBlocks.map((block) => (
              <div
                key={block.id}
                className="group relative p-5 sm:p-6 rounded-2xl bg-surface/85 border border-stroke hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#4E85BF]/5"
              >
                {/* Glow border gradient effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-[#89AACC]/40 transition-all duration-300 shrink-0">
                      {getIcon(block.icon)}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                        {block.title}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#89AACC] uppercase tracking-wider">
                        {block.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="relative z-10 text-sm sm:text-[15px] text-text/80 leading-relaxed group-hover:text-text/95 transition-colors">
                  {block.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
