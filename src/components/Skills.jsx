import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Terminal,
  Code2,
  FileCode,
  Globe,
  Palette,
  Boxes,
  Layers,
  Sparkles,
  GitBranch,
  Laptop,
  Zap,
  Database,
  Bot,
  ShieldCheck,
  Cpu,
  PlayCircle,
  HardDrive,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { skillsData } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      });

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 25,
          opacity: 0,
          stagger: 0.05,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const iconMap = {
    Terminal: <Terminal className="w-5 h-5 text-[#89AACC]" />,
    Code2: <Code2 className="w-5 h-5 text-[#89AACC]" />,
    FileCode: <FileCode className="w-5 h-5 text-[#89AACC]" />,
    Globe: <Globe className="w-5 h-5 text-[#89AACC]" />,
    Palette: <Palette className="w-5 h-5 text-[#89AACC]" />,
    Boxes: <Boxes className="w-5 h-5 text-[#89AACC]" />,
    Layers: <Layers className="w-5 h-5 text-[#89AACC]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#89AACC]" />,
    GitBranch: <GitBranch className="w-5 h-5 text-[#89AACC]" />,
    Github: <GithubIcon className="w-5 h-5 text-[#89AACC]" />,
    Laptop: <Laptop className="w-5 h-5 text-[#89AACC]" />,
    Zap: <Zap className="w-5 h-5 text-[#89AACC]" />,
    Database: <Database className="w-5 h-5 text-[#89AACC]" />,
    Bot: <Bot className="w-5 h-5 text-[#89AACC]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#89AACC]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#89AACC]" />,
    PlayCircle: <PlayCircle className="w-5 h-5 text-[#89AACC]" />,
    HardDrive: <HardDrive className="w-5 h-5 text-[#89AACC]" />,
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? skillsData.categories
      : skillsData.categories.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 bg-bg overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#4E85BF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
              [ 03 // {skillsData.eyebrow} ]
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
            <div>
              <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                {skillsData.sectionTitle}.
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-text/80 max-w-2xl font-normal leading-relaxed">
                {skillsData.subtitle}
              </p>
            </div>

            {/* Authenticity Disclaimer Box */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#89AACC] mt-1 shrink-0" />
                <p className="text-xs sm:text-[13px] font-mono text-text/80 leading-relaxed">
                  {skillsData.disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills (horizontal scroll on mobile) */}
          <div className="flex items-center gap-2 mt-6 sm:mt-8 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 shrink-0 min-h-[36px] ${
                selectedCategory === 'all'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/[0.04] text-text/70 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              All Skills ({skillsData.categories.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {skillsData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 shrink-0 min-h-[36px] ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-black font-bold shadow-md shadow-[#4E85BF]/20'
                    : 'bg-white/[0.04] text-text/70 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {cat.name} ({cat.skills.length})
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div ref={gridRef} className="space-y-8 sm:space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/10 gap-1">
                <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
                  {category.name}
                </h3>
                <span className="text-xs font-mono text-muted/90">
                  {category.tagline}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="group relative p-4 sm:p-5 rounded-2xl bg-surface/75 border border-stroke hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#4E85BF]/5"
                  >
                    {/* Animated gradient hover border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10 flex items-start justify-between mb-2.5">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#89AACC]/50 group-hover:scale-105 transition-all shrink-0">
                          {iconMap[skill.icon] || <Sparkles className="w-4 h-4 text-[#89AACC]" />}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] font-mono text-muted">
                            {skill.tag}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#4E85BF]/10 text-[#89AACC] border border-[#89AACC]/20 shrink-0">
                        {skill.level}
                      </span>
                    </div>

                    <p className="relative z-10 text-sm text-text/80 leading-relaxed group-hover:text-text/95 transition-colors">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
