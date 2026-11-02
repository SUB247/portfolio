import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function HlsVideoBackground({
  src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8",
  overlayOpacity = "bg-black/80 sm:bg-black/75",
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
      {/* Video element: only rendered and loaded on desktop */}
      {isDesktop && !prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-70 sm:opacity-80 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ filter: 'brightness(0.65) contrast(1.15) saturate(1.1)' }}
        />
      )}

      {/* Atmospheric Charcoal & Soft Blue Gradient Layers (Active on all devices, primary on mobile) */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(78, 133, 191, 0.16) 0%, rgba(13, 19, 26, 0.6) 45%, rgba(10, 10, 10, 0.96) 80%)'
        }}
      />

      {/* Secondary soft atmospheric glow */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 85% 60%, rgba(137, 170, 204, 0.12) 0%, transparent 60%)'
        }}
      />

      {/* Responsive dark overlay to guarantee razor-sharp text readability */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Restrained noise / halftone texture overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-25" />

      {/* Vignette mask for depth */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(10,10,10,0.85) 100%)'
        }} 
      />
    </div>
  );
}
