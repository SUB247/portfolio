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
  const [isVisible, setIsVisible] = useState(true);

  // Check user preference for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // If reduced motion is enabled, don't stream or autoplay background video
    if (prefersReducedMotion) return;

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
      // Native HLS support (Safari / iOS)
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
  }, [src, prefersReducedMotion]);

  // Pause video when offscreen using IntersectionObserver for battery/GPU performance
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
  }, [isLoaded, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Video element (only if reduced motion is not preferred) */}
      {!prefersReducedMotion && (
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

      {/* Fallback & base ambient background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded && !prefersReducedMotion ? 'opacity-50' : 'opacity-100'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 25%, rgba(78, 133, 191, 0.22) 0%, rgba(10, 10, 10, 0.96) 75%)'
        }}
      />

      {/* Responsive dark overlay to maintain razor-sharp text readability */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Subtle halftone overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-30" />

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
