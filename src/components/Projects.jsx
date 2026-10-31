import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, Info } from 'lucide-react';
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
          y: 35,
          opacity: 0,
          stagger: 0.15,
          duration: 0.85,
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
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 bg-bg overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#4E85BF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#89AACC]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
              [ 02 // SELECTED WORK ]
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                Featured Projects.
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-text/80 max-w-xl font-normal leading-relaxed">
                Practical platforms, AI explorations, and interactive experiments built to deepen technical knowledge and solve tangible problems.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted/90 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All repositories actively maintained</span>
            </div>
          </div>
        </div>

        {/* Responsive Bento Grid: 1 column on mobile/tablet, 12 cols bento on desktop */}
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
                <div className="p-5 sm:p-7 lg:p-8 pb-3 relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-[#89AACC] px-2 py-0.5 rounded bg-[#4E85BF]/10 border border-[#89AACC]/20">
                        {project.number}
                      </span>
                      <span className="text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono truncate max-w-[170px] sm:max-w-none">
                        {project.category}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/5 whitespace-nowrap shrink-0">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-white transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-text/80 leading-relaxed mb-4 sm:mb-5 font-sans font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Interactive Live Component Showcase */}
                <div className="px-4 sm:px-7 lg:px-8 pb-4 relative z-10">
                  {renderProjectVisual(project)}
                </div>

                {/* Card Footer: Tech tags + Action buttons */}
                <div className="p-4 sm:p-6 lg:p-8 pt-3 sm:pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 relative z-10 bg-[#0d0d0d]/40">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {project.techStack.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-text/80 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono text-muted/70 self-center">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 transition-colors min-h-[36px]"
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
                        className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white border border-white/10 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="GitHub Repository"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <GithubIcon className="w-4 h-4" />
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
