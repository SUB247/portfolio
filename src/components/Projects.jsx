import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, Shield, Bot, Sparkles, Wand2, Info } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData } from '../data/projects';
import CyberlabTerminal from './CyberlabTerminal';
import RelxChatPreview from './RelxChatPreview';
import AiExperimentsVisual from './AiExperimentsVisual';
import CreativeExperimentsVisual from './CreativeExperimentsVisual';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 45,
          opacity: 0,
          stagger: 0.18,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderProjectVisual = (project) => {
    switch (project.id) {
      case 'cyberlab':
        return <CyberlabTerminal />;
      case 'relx':
        return <RelxChatPreview />;
      case 'ai-experiments':
        return <AiExperimentsVisual />;
      case 'creative-experiments':
        return <CreativeExperimentsVisual />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-bg overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#4E85BF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-[#89AACC]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
              [ 02 // SELECTED WORK ]
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08]">
                Featured Projects.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted max-w-xl">
                Practical platforms, AI explorations, and interactive experiments built to deepen technical knowledge and solve tangible problems.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted/80 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All repositories actively maintained</span>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {projectsData.map((project, idx) => {
            // Layout spans: Card 1 (Cyberlab) spans 7 cols, Card 2 (Relx) spans 5 cols
            // Card 3 spans 5 cols, Card 4 spans 7 cols
            const isLarge = idx === 0 || idx === 3;
            const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={project.id}
                className={`${colSpan} group relative rounded-3xl bg-surface/90 border border-white/10 hover:border-transparent transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-[#4E85BF]/10`}
                style={{
                  backgroundClip: 'padding-box',
                }}
              >
                {/* Animated gradient border on hover */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#89AACC] to-[#4E85BF] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                {/* Halftone texture overlay */}
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />

                {/* Card Header */}
                <div className="p-6 sm:p-8 pb-4 relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs text-[#89AACC] px-2 py-0.5 rounded bg-[#4E85BF]/10 border border-[#89AACC]/20">
                        {project.number}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-muted font-mono">
                        {project.category}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-muted border border-white/5">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-serif italic text-3xl sm:text-4xl text-white group-hover:text-white transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Interactive Live Component Showcase */}
                <div className="px-6 sm:px-8 pb-4 relative z-10">
                  {renderProjectVisual(project)}
                </div>

                {/* Card Footer: Tech tags + Action buttons */}
                <div className="p-6 sm:p-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 relative z-10 bg-[#0d0d0d]/40">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.03] text-muted border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono text-muted/60 self-center">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      title="View Architecture Details"
                    >
                      <Info className="w-3.5 h-3.5 text-[#89AACC]" />
                      <span>Details</span>
                    </button>

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
