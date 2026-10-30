import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 text-text max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616]/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs text-[#89AACC] px-2 py-0.5 rounded bg-[#4E85BF]/10 border border-[#89AACC]/20">
                PROJ {project.number}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted font-mono">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif italic text-3xl sm:text-4xl text-white">
                  {project.title}
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#89AACC]">
                  {project.status}
                </span>
              </div>
              <p className="text-sm sm:text-base text-text/80 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Core Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Core Features & Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start space-x-2 text-xs text-text/90"
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
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
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
            <div className="p-4 rounded-xl bg-[#4E85BF]/10 border border-[#89AACC]/20 text-xs text-text/80 leading-relaxed font-mono">
              <span className="text-[#89AACC] font-semibold block mb-1">Authentic Project Note:</span>
              This project is part of Vivek Maurya&apos;s practical learning trajectory at UIT Prayagraj. Work-in-progress components are actively iterated upon to explore real-world software architecture.
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#161616]/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-muted" />
                </a>
              ) : (
                <span className="text-xs text-muted font-mono">
                  GitHub link configurable
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-muted hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
