import React, { useRef, useEffect } from 'react';
import { Wand2 } from 'lucide-react';

export default function CreativeExperimentsVisual() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isRunning = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Limit particles for battery efficiency on mobile
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 22 : 32;
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? '#89AACC' : '#4E85BF',
      });
    }

    let mouse = { x: width / 2, y: height / 2, active: false };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      const maxDist = isMobile ? 60 : 75;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(137, 170, 204, ${0.2 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            p.x += dx * 0.015;
            p.y += dy * 0.015;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when canvas is off-screen using IntersectionObserver
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          render();
        }
      } else {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.05 });

    observer.observe(container);
    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl bg-[#090909] border border-white/10 overflow-hidden relative shadow-inner"
    >
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#121212] border-b border-white/10 text-xs">
        <div className="flex items-center space-x-1.5 font-mono">
          <Wand2 className="w-3.5 h-3.5 text-[#89AACC]" />
          <span className="text-white font-medium text-xs">Kinetic Canvas Physics</span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-muted">60 FPS Interactive</span>
      </div>

      <div className="relative h-36 sm:h-44 w-full bg-[#070707] cursor-crosshair" style={{ touchAction: 'pan-y' }}>
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-2 left-3 text-[10px] sm:text-[11px] font-mono text-muted/70 pointer-events-none">
          Spring Simulation • Motion Choreography
        </div>
      </div>
    </div>
  );
}
