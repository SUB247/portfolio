import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function HlsVideoBackground({
  src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8",
  overlayOpacity = "bg-black/40 sm:bg-black/35",
  className = ""
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check user preference for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Only load and stream background video on desktop (>= 768px) to optimize mobile performance and battery
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // If on mobile or reduced motion is requested, do not load or play HLS video
    if (!isDesktop || prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let hlsInstance = null;

    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true,
        lowLatencyMode: false,
      });

      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoaded(true);
        video.play().catch((err) => {
          console.debug("Video autoplay handled:", err);
        });
      });

      hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hlsInstance.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hlsInstance.recoverMediaError();
              break;
            default:
              hlsInstance.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        setIsLoaded(true);
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [src, isDesktop, prefersReducedMotion]);

  // Pause video when scrolled offscreen on desktop
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused && isLoaded) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isDesktop, isLoaded, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Video element: only rendered and loaded on desktop with natural cinematic brightness */}
      {isDesktop && !prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-85 sm:opacity-90 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ filter: 'brightness(0.88) contrast(1.1) saturate(1.15)' }}
        />
      )}

      {/* Atmospheric Charcoal & Soft Blue Gradient Layers (Active on all devices, luminous on mobile) */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 18%, rgba(78, 133, 191, 0.28) 0%, rgba(20, 30, 44, 0.5) 40%, rgba(10, 14, 20, 0.72) 80%)'
        }}
      />

      {/* Secondary soft atmospheric glow (top-right) */}
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 85% 45%, rgba(137, 170, 204, 0.22) 0%, transparent 60%)'
        }}
      />

      {/* Tertiary soft atmospheric glow (bottom-left) */}
      <div 
        className="absolute inset-0 opacity-55 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 15% 75%, rgba(78, 133, 191, 0.18) 0%, transparent 60%)'
        }}
      />

      {/* Responsive dark overlay to guarantee razor-sharp text readability without blacking out the video */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Restrained noise / halftone texture overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-20" />

      {/* Subtle soft vignette mask for edge depth */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(8, 10, 14, 0.55) 100%)'
        }} 
      />
    </div>
  );
}
