import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalData } from '../data/personal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

          <p className="text-xs sm:text-sm text-text/75 font-sans font-normal">
            Available for learning, collaboration and interesting projects.
          </p>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-mono text-muted/90">
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
