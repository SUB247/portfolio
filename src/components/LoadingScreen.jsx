import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const words = ["Explore.", "Create.", "Innovate."];

  // Calculate current word based on count progress
  const wordIndex = count < 35 ? 0 : count < 70 ? 1 : 2;
  const currentWord = words[wordIndex];

  useEffect(() => {
    const totalDuration = 2700; // 2.7 seconds as requested
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // Easing for cinematic feel: starts smooth, accelerates slightly, then settles at 100
      const easedProgress = Math.min(Math.round(progress * 100), 100);
      setCount(easedProgress);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Allow exit animation to finish
        }, 200);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  // Format counter to 3 digits: 000, 001, ..., 100
  const formattedCount = String(count).padStart(3, '0');

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0a0a] text-[#f5f5f5] p-6 md:p-12 select-none overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4E85BF]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase text-muted font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#89AACC] animate-pulse" />
              <span className="text-text font-medium">Portfolio</span>
              <span className="text-muted/60">— Vivek Maurya</span>
            </div>
            <div className="hidden sm:block text-muted/80">
              [ UIT PRAYAGRAJ // B.TECH ]
            </div>
          </div>

          {/* Center Content: Big Word Cycle + Counter */}
          <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            {/* Word Cycle with Instrument Serif: generous space, unclipped descenders and italic overhangs */}
            <div className="min-h-[140px] sm:min-h-[180px] md:min-h-[220px] w-full flex items-center justify-center px-4 sm:px-8 py-2 relative">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentWord}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-6xl sm:text-8xl md:text-9xl tracking-tight text-white leading-normal px-4 py-2 text-center select-none"
                  style={{
                    willChange: "transform, opacity, filter"
                  }}
                >
                  {currentWord}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Sub-counter display */}
            <div className="mt-4 flex items-baseline space-x-2 font-mono">
              <span className="text-4xl sm:text-5xl font-light tracking-tighter text-[#89AACC]">
                {formattedCount}
              </span>
              <span className="text-sm text-muted">%</span>
            </div>
            
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted font-mono">
              Initializing Experience
            </p>
          </div>

          {/* Bottom Bar & Progress Line */}
          <div className="relative z-10 w-full space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono uppercase text-muted/70 tracking-wider">
              <span>Cybersecurity • AI • Motion</span>
              <span>Loaded {count}%</span>
            </div>

            {/* Animated gradient progress bar */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${count}%`,
                  background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                  boxShadow: '0 0 12px rgba(137, 170, 204, 0.6)'
                }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
