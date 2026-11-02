import React from 'react';
import { ArrowUp, ArrowUpRight, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalData } from '../data/personal';

const currentYear = 2026;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/10 py-8 sm:py-12 px-4 sm:px-8 lg:px-16 text-text">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        {/* Left: Logo & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] p-[1.5px] flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <span className="font-serif italic font-bold text-xs text-white">VM</span>
              </div>
            </div>
            <span className="font-semibold text-sm sm:text-base tracking-wide text-white">Vivek Maurya</span>
          </div>

          <span className="hidden sm:inline text-white/20">•</span>

          <p className="text-xs sm:text-sm text-text/75 font-sans font-normal text-center leading-relaxed">
            B.Tech CSE Student, UIT Prayagraj.
            <span className="block mt-0.5">Open to learning & collaborations.</span>
          </p>
        </div>

        {/* Center/Right: Socials & Source Code */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted/90">
          <a
            href="https://github.com/SUB247"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            title="GitHub (@SUB247)"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#89AACC]" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/viivek0247/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            title="LinkedIn (viivek0247)"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#89AACC]" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personalData.portfolioRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white text-[#89AACC] transition-colors"
            title="Portfolio Repository"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Source</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <span className="hidden sm:inline text-white/20">•</span>

          <span>&copy; {currentYear} Vivek Maurya</span>

          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-all border border-white/10 min-h-[36px]"
            title="Back to Top"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#89AACC] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
