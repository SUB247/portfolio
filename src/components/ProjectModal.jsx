import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 text-text max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#161616]/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2.5">
              <span className="font-mono text-xs text-[#89AACC] px-2 py-0.5 rounded bg-[#4E85BF]/10 border border-[#89AACC]/20">
                PROJ {project.number}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted font-mono truncate max-w-[160px] sm:max-w-none">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-white/10 text-muted hover:text-white transition-colors flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7 md:p-8 overflow-y-auto space-y-5 sm:space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white">
                  {project.title}
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#89AACC]">
                  {project.status}
                </span>
              </div>
              <p className="text-sm sm:text-base text-text/90 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Optional Screenshot in Modal: Clean & vibrant */}
            {project.image && (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0e1219] aspect-[16/10] max-h-72 w-full flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}

            {/* Core Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Core Highlights & Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start space-x-2 text-xs sm:text-[13px] text-text/90"
                    >
                      <span className="text-[#89AACC] font-mono mt-0.5">›</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Status Note */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#4E85BF]/10 border border-[#89AACC]/20 text-xs sm:text-[13px] text-text/80 leading-relaxed font-mono">
              <span className="text-[#89AACC] font-semibold block mb-1">Authentic Project Note:</span>
              This project represents practical student engineering work at UIT Prayagraj. Live deployments and public source repositories are provided only where officially published.
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-white/10 bg-[#161616]/60 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-white/90 transition-all min-h-[38px]"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                </a>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all min-h-[38px]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-muted" />
                </a>
              )}

              {!project.links.demo && !project.links.github && (
                <span className="text-xs text-muted font-mono">
                  {project.status === 'In Development' ? 'Repository staging in progress' : 'Demonstrated in controlled testbed'}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-muted hover:text-white transition-colors px-3 py-1.5 min-h-[38px] flex items-center"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
