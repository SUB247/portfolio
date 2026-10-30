import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Terminal,
  Cpu,
  Code,
  Layers,
  Sparkles,
  HardDrive,
  Maximize2,
  X,
  Compass,
  ArrowUpRight,
  Shield,
  Activity,
  Binary,
} from 'lucide-react';
import { explorationsData } from '../data/explorations';

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const [activeLightbox, setActiveLightbox] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Parallax scroll effect between the two columns
      // Col 1 moves slightly upwards as user scrolls down
      // Col 2 starts offset and moves down or with different delta
      if (col1Ref.current && col2Ref.current) {
        gsap.to(col1Ref.current, {
          y: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(col2Ref.current, {
          y: 70,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getThemeVisual = (type) => {
    switch (type) {
      case 'terminal':
        return (
          <div className="relative h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 font-mono text-[11px] overflow-hidden flex flex-col justify-between">
            <div className="flex items-center space-x-1.5 border-b border-white/10 pb-2">
              <span className="w-2 h-2 rounded-full bg-red-500/70" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
              <span className="text-[10px] text-muted ml-2">netcat // tcp_inspect</span>
            </div>
            <div className="space-y-1 text-[#89AACC]">
              <p>&gt; nc -v -z target.lab 1-1024</p>
              <p className="text-white/70">&gt; Packet headers captured: 48 bytes</p>
              <p className="text-emerald-400">&gt; Payload validated: [SYN, ACK]</p>
            </div>
            <div className="text-[10px] text-muted/50 font-mono">
              [ DEFENSIVE TELEMETRY ONLINE ]
            </div>
          </div>
        );
      case 'neural':
        return (
          <div className="relative h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span>LATENT_SPACE_VIS</span>
              <span className="text-[#89AACC]">Dim: 1536</span>
            </div>
            <div className="relative flex items-center justify-center py-4">
              <div className="w-24 h-24 rounded-full border border-dashed border-[#89AACC]/40 flex items-center justify-center animate-spin-slow">
                <div className="w-14 h-14 rounded-full border border-dotted border-[#4E85BF]/60 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] animate-pulse" />
                </div>
              </div>
            </div>
            <div className="text-[10px] text-muted font-mono flex justify-between">
              <span>Cosine Sim: 0.941</span>
              <span>Gemini Embeddings</span>
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="relative h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 font-mono text-[11px] overflow-hidden flex flex-col justify-between">
            <div className="text-[10px] text-muted flex justify-between">
              <span>pointer_alloc.c</span>
              <span className="text-emerald-400">HEAP: OK</span>
            </div>
            <div className="text-white/80 space-y-0.5 text-[10px] bg-white/[0.02] p-2 rounded border border-white/5">
              <p className="text-sky-300">void *buffer = malloc(size);</p>
              <p className="text-muted">if (!buffer) return ERROR_MEM;</p>
              <p className="text-indigo-300">memcpy(dest, src, size);</p>
              <p className="text-emerald-300">free(buffer);</p>
            </div>
            <div className="text-[10px] text-[#89AACC] flex items-center justify-between">
              <span>Zero Leak Policy</span>
              <span>Systems Core</span>
            </div>
          </div>
        );
      case 'interface':
        return (
          <div className="relative h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span>HUD_VIEWPORT</span>
              <span className="text-[#89AACC]">120Hz</span>
            </div>
            <div className="space-y-2">
              <div className="h-6 rounded-lg bg-white/[0.04] border border-white/10 flex items-center px-3 justify-between text-[10px]">
                <span className="text-white font-serif italic">Glassmorphic Layer</span>
                <span className="text-[#89AACC]">98% Blur</span>
              </div>
              <div className="h-6 rounded-lg bg-gradient-to-r from-[#89AACC]/15 to-[#4E85BF]/15 border border-white/10 flex items-center px-3 justify-between text-[10px]">
                <span className="text-white font-serif italic">Editorial Contrast</span>
                <span className="text-emerald-400">Active</span>
              </div>
            </div>
            <div className="text-[10px] text-muted font-mono">
              Designed for Tactile Immersion
            </div>
          </div>
        );
      case 'motion':
        return (
          <div className="relative h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span>GSAP_CHOREOGRAPHY</span>
              <span className="text-emerald-400">60.0 FPS</span>
            </div>
            <div className="relative h-16 flex items-center justify-center">
              <svg className="w-full h-12" viewBox="0 0 200 40">
                <path
                  d="M0 35 C 50 35, 70 5, 120 5 C 160 5, 170 35, 200 35"
                  fill="none"
                  stroke="url(#motionGrad)"
                  strokeWidth="2.5"
                />
                <defs>
                  <linearGradient id="motionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#89AACC" />
                    <stop offset="100%" stopColor="#4E85BF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-[10px] text-[#89AACC] font-mono flex justify-between">
              <span>cubic-bezier(0.16, 1, 0.3, 1)</span>
              <span>Smooth Scrub</span>
            </div>
          </div>
        );
      case 'hardware':
        return (
          <div className="relative h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span>HARDWARE_METRICS</span>
              <span className="text-[#89AACC]">PCIe 4.0 x16</span>
            </div>
            <div className="grid grid-cols-2 gap-2 my-auto">
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-[10px] text-muted font-mono">TDP Draw</div>
                <div className="text-sm font-semibold text-white mt-0.5">65W / 125W</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-[10px] text-muted font-mono">Thermals</div>
                <div className="text-sm font-semibold text-emerald-400 mt-0.5">38°C Idle</div>
              </div>
            </div>
            <div className="text-[10px] text-muted font-mono">
              Desktop Silicon Architecture &amp; Cooling
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const col1Items = explorationsData.filter((_, i) => i % 2 === 0);
  const col2Items = explorationsData.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-bg overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#89AACC]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <Compass className="w-3.5 h-3.5 text-[#89AACC]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
              [ 04 // LEARNING JOURNEY ]
            </span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] mb-4">
            Curiosity has no limits.
          </h2>

          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            An evolving journey through technology, creativity and experimentation.
          </p>
        </div>

        {/* Two Column Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Column 1 */}
          <div ref={col1Ref} className="space-y-8">
            {col1Items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-3xl bg-surface/85 border border-white/10 hover:border-[#89AACC]/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4E85BF]/10 cursor-pointer"
                style={{
                  transform: idx % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)',
                }}
              >
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#89AACC] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <button
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-muted hover:text-white transition-colors"
                      title="Enlarge details"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif italic text-2xl sm:text-3xl text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {getThemeVisual(item.imageType)}

                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="space-y-8 md:mt-12">
            {col2Items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-3xl bg-surface/85 border border-white/10 hover:border-[#89AACC]/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4E85BF]/10 cursor-pointer"
                style={{
                  transform: idx % 2 === 0 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
                }}
              >
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#89AACC] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <button
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-muted hover:text-white transition-colors"
                      title="Enlarge details"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif italic text-2xl sm:text-3xl text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {getThemeVisual(item.imageType)}

                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-[#89AACC] uppercase tracking-wider">
                  {activeLightbox.category} • Exploration Notes
                </span>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-white mb-2">
                  {activeLightbox.title}
                </h3>
                <p className="text-sm font-mono text-[#89AACC] mb-4">
                  {activeLightbox.aspect}
                </p>
                <p className="text-sm text-text/80 leading-relaxed font-light">
                  {activeLightbox.description}
                </p>
              </div>

              {/* Theme visual full preview */}
              <div className="rounded-2xl border border-white/10 p-2 bg-black/50">
                {getThemeVisual(activeLightbox.imageType)}
              </div>

              {/* Exploration Takeaways */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] text-[#89AACC]">
                    Investigative Focus
                  </div>
                  <p className="text-muted leading-relaxed">
                    {activeLightbox.details.focus}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] text-[#89AACC]">
                    Core Takeaway
                  </div>
                  <p className="text-muted leading-relaxed">
                    {activeLightbox.details.learnings}
                  </p>
                </div>
              </div>

              {/* Guiding Quote */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 border border-[#89AACC]/20 text-center">
                <blockquote className="font-serif italic text-base sm:text-lg text-white">
                  &ldquo;{activeLightbox.details.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
