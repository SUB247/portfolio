import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Info } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData } from '../data/projects';
import Esp32SecurityVisual from './Esp32SecurityVisual';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Content-first entrance: Cards are ALWAYS visible by default (opacity: 1)
  // We NEVER set initial opacity: 0 on project cards so they can never fail to render.
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle heading slide-in with guaranteed visibility
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 24, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            clearProps: 'transform,opacity',
          }
        );
      }

      // Subtle upward reveal for cards WITHOUT hiding them initially
      if (gridRef.current && gridRef.current.children) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 20 },
          {
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            clearProps: 'transform',
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger positions once mounted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 bg-bg overflow-hidden"
    >
      {/* Background visible atmospheric glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#4E85BF]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#89AACC]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
                Hands-on systems, cybersecurity platforms, and AI applications built to learn through practical engineering and real-world experiments.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted/90 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified student projects</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Responsive Bento Grid: 1 column on mobile, 12-col bento on desktop */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {projectsData.map((project) => {
            // Asymmetric Bento Grid:
            // Project 01 (ESP32): lg:col-span-12 (spans full width with telemetry & hardware lab)
            // Project 02 (CYBERLAB): lg:col-span-7 (large featured live project with dashboard)
            // Project 03 (CraveAI): lg:col-span-5 (featured AI cookbook with screenshot)
            let colSpan = 'lg:col-span-12';
            if (project.id === 'cyberlab') {
              colSpan = 'lg:col-span-7';
            } else if (project.id === 'craveai') {
              colSpan = 'lg:col-span-5';
            }

            return (
              <div
                key={project.id}
                className={`${colSpan} group relative rounded-3xl bg-[#10141c]/90 hover:bg-[#131824]/95 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-[#4E85BF]/10 opacity-100 visible`}
              >
                {/* Animated gradient border on hover */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#89AACC]/40 via-transparent to-[#4E85BF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                {/* Card Header & Content */}
                <div className="p-5 sm:p-7 lg:p-8 pb-3 relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-[#89AACC] px-2 py-0.5 rounded bg-[#4E85BF]/15 border border-[#89AACC]/25">
                        {project.number}
                      </span>
                      <span className="text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono truncate max-w-[170px] sm:max-w-none">
                        {project.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        project.status === 'Live'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : project.status === 'In Development'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : 'bg-[#4E85BF]/10 text-[#89AACC] border-[#89AACC]/20'
                      }`}
                    >
                      {project.status === 'Live' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      <span>{project.status}</span>
                    </span>
                  </div>

                  <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-white transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-text/80 leading-relaxed mb-4 sm:mb-5 font-sans font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Project Visual / Real Screenshot Showcase: Clear, vibrant, unobscured */}
                <div className="px-4 sm:px-7 lg:px-8 pb-4 relative z-10 flex-1 flex flex-col justify-center">
                  {project.image ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1219] group/img aspect-[16/10] sm:aspect-[16/9] min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] w-full flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        loading="eager"
                        decoding="async"
                        onLoad={() => {
                          ScrollTrigger.refresh();
                        }}
                        onError={(e) => {
                          // Fallback in case of broken image path
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                      />
                    </div>
                  ) : project.id === 'esp32-security' ? (
                    <Esp32SecurityVisual />
                  ) : null}
                </div>

                {/* Card Footer: Tech tags + Action buttons with clean contrast */}
                <div className="p-4 sm:p-6 lg:p-8 pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10 bg-white/[0.02]">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {project.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-text/80 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Live Demo button ONLY if live demo exists */}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-white/90 active:bg-white/80 transition-colors min-h-[36px]"
                        title="Open Live Application"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                      </a>
                    )}

                    {/* GitHub button ONLY if repository exists */}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 transition-colors min-h-[36px]"
                        title="GitHub Repository"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {/* Details modal trigger */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 transition-colors min-h-[36px]"
                      title="View Architecture Details"
                    >
                      <Info className="w-3.5 h-3.5 text-[#89AACC]" />
                      <span>Details</span>
                    </button>
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
