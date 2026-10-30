import React from 'react';
import { ArrowUp, Heart, Terminal } from 'lucide-react';
import { personalData } from '../data/personal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/10 py-12 px-6 sm:px-10 lg:px-16 text-text">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <span className="font-serif italic font-bold text-xs text-white">VM</span>
              </div>
            </div>
            <span className="font-semibold text-sm tracking-wide text-white">Vivek Maurya</span>
          </div>

          <span className="hidden sm:inline text-white/20">•</span>

          <p className="text-xs text-muted font-sans font-light">
            Available for learning, collaboration and interesting projects.
          </p>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center space-x-6 text-xs text-muted font-mono">
          <span>&copy; {currentYear} Vivek Maurya</span>

          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#89AACC] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
