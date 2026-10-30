import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';
import { statsData } from '../data/stats';

gsap.registerPlugin(ScrollTrigger);

function CounterItem({ stat }) {
  const [currentVal, setCurrentVal] = useState(0);
  const itemRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (animatedRef.current) return;
        animatedRef.current = true;

        const duration = 1500;
        const startTime = performance.now();
        const target = stat.number;

        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCurrentVal(Math.round(target * easeProgress));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
    });

    return () => st.kill();
  }, [stat.number]);

  const formattedNum = String(currentVal).padStart(2, '0');

  return (
    <div
      ref={itemRef}
      className="group relative p-8 sm:p-10 rounded-3xl bg-surface/80 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Animated gradient hover border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-baseline space-x-1 mb-3">
          <span className="font-serif italic text-6xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight">
            {formattedNum}
          </span>
          <span className="font-serif italic text-3xl sm:text-4xl text-[#89AACC]">
            {stat.suffix}
          </span>
        </div>

        <h3 className="font-sans font-semibold text-lg sm:text-xl text-white tracking-wide mb-2">
          {stat.label}
        </h3>

        <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans font-light">
          {stat.description}
        </p>
      </div>

      <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-muted/70">
        <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
        <span>Verified Learning Metric</span>
      </div>
    </div>
  );
}

export default function Stats() {
  const containerRef = useRef(null);

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
            [ 05 // VERIFIED STATS ]
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {statsData.map((stat) => (
            <CounterItem key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Footnote on authentic data */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-muted/60">
            * Stats reflect verified student projects, hands-on lab sandbox builds, and active technology explorations at UIT Prayagraj.
          </p>
        </div>
      </div>
    </section>
  );
}
