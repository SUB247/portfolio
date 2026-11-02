import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, GraduationCap, MapPin, Mail, Sparkles, Terminal, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 text-text"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#161616]/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-black font-bold text-xs">
                VM
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">Developer Resume</h3>
                <p className="text-[11px] text-muted font-mono">Vivek Maurya • B.Tech CSE Student</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors min-h-[36px]"
                title="Print or Save PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#89AACC]" />
                <span className="hidden sm:inline">Save / Print</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-white/10 text-muted hover:text-white transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-5 sm:p-7 md:p-8 overflow-y-auto space-y-5 sm:space-y-6 text-sm leading-relaxed">
            {/* Identity Card */}
            <div className="border border-white/10 rounded-xl p-4 sm:p-5 bg-white/[0.02]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="font-serif italic text-2xl sm:text-4xl text-white">Vivek Maurya</h1>
                  <p className="text-sm font-medium text-[#89AACC] mt-1">
                    Student Developer • Cybersecurity & AI Explorer
                  </p>
                </div>
                <div className="text-xs space-y-1.5 text-muted font-mono">
                  <div className="flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#89AACC]" />
                    <span>B.Tech CSE, UIT Prayagraj</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#89AACC]" />
                    <span>Prayagraj, India</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#89AACC]" />
                    <span>vmaurya905@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Profiles Row */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono">
                <a
                  href="https://github.com/SUB247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/90 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#89AACC]" />
                  <span>github.com/SUB247</span>
                  <ArrowUpRight className="w-3 h-3 text-muted" />
                </a>
                <a
                  href="https://www.linkedin.com/in/viivek0247/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/90 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#89AACC]" />
                  <span>linkedin.com/in/viivek0247</span>
                  <ArrowUpRight className="w-3 h-3 text-muted" />
                </a>
              </div>
            </div>

            {/* Profile Overview */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Overview
              </h4>
              <p className="text-text/90 text-sm sm:text-base leading-relaxed font-normal">
                B.Tech Computer Science and Engineering student at UIT Prayagraj interested in cybersecurity, artificial intelligence, and software development. Focused on strengthening programming fundamentals, experimenting with real projects, and building practical digital solutions.
              </p>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-2 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" /> Education
              </h4>
              <div className="p-3.5 sm:p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">Bachelor of Technology (B.Tech) in Computer Science and Engineering</div>
                  <div className="text-xs sm:text-sm text-text/80">United Institute of Technology (UIT), Prayagraj</div>
                  <div className="text-xs text-muted/90 mt-1">Focus: Computer Science, Programming & Systems Engineering</div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#4E85BF]/10 text-[#89AACC] border border-[#89AACC]/20 w-fit">
                  Undergraduate Student
                </span>
              </div>
            </div>

            {/* Key Technical Projects */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" /> Highlighted Projects
              </h4>
              <div className="space-y-3">
                {/* 1. ESP32 */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-white text-sm">ESP32 Bluetooth Security Experiment</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">Lab Completed</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text/80 leading-relaxed font-normal">
                    Hands-on wireless security experiment exploring Bluetooth Low Energy (BLE) behavior, frame inspection, and telemetry telemetry analysis in an isolated lab testbed.
                  </p>
                  <div className="text-xs font-mono text-[#89AACC]">ESP32 • C/C++ • BLE Protocol • Embedded Systems • Hardware Security</div>
                </div>

                {/* 2. CYBERLAB */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-white text-sm">CYBERLAB — Cybersecurity Learning Platform</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#4E85BF]/15 text-[#89AACC] border border-[#89AACC]/30 shrink-0">Live Platform</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text/80 leading-relaxed font-normal">
                    Interactive security learning platform with guided defensive missions, simulated terminal, progressive hint engine, and command validation.
                  </p>
                  <div className="text-xs font-mono text-[#89AACC]">Next.js • React • Supabase • Tailwind CSS • Linux CLI • Web Security</div>
                </div>

                {/* 3. CraveAI */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-white text-sm">CraveAI — AI-Powered Cookbook</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">Live Platform</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text/80 leading-relaxed font-normal">
                    Digital cookbook web application powered by Google Gemini API to discover recipes, generate customized meals based on available ingredients, and navigate cuisines.
                  </p>
                  <div className="text-xs font-mono text-[#89AACC]">Next.js • React • Google Gemini API • Supabase • Tailwind CSS</div>
                </div>
              </div>
            </div>

            {/* Technical Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] mb-2 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" /> Technical Exploration
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-[13px]">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="font-semibold text-white block mb-1">Languages:</span>
                  <span className="text-text/80">C, Python, JavaScript (ES6+), SQL</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="font-semibold text-white block mb-1">Web Development:</span>
                  <span className="text-text/80">React, Next.js, HTML5, CSS3, Tailwind CSS</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="font-semibold text-white block mb-1">Tools & Platforms:</span>
                  <span className="text-text/80">Git, GitHub, VS Code, Vercel, Supabase, Linux</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="font-semibold text-white block mb-1">Areas of Interest:</span>
                  <span className="text-text/80">Cybersecurity, Artificial Intelligence, Creative Technology, Motion Graphics, PC Hardware</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-white/10 bg-[#161616]/60 flex items-center justify-between text-xs text-muted">
            <span>Portfolio of Vivek Maurya • UIT Prayagraj</span>
            <button
              onClick={onClose}
              className="text-white hover:text-[#89AACC] transition-colors py-1 px-2"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
