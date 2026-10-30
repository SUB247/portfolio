import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function HlsVideoBackground({
  src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8",
  overlayOpacity = "bg-black/75",
  className = ""
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
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
          // Autoplay policy might require user interaction, or already muted
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
              setHasError(true);
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
      video.addEventListener('error', () => {
        setHasError(true);
      });
    } else {
      setHasError(true);
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-80 scale-105' : 'opacity-0 scale-100'
        }`}
        style={{ filter: 'brightness(0.7) contrast(1.15) saturate(1.1)' }}
      />

      {/* Fallback ambient glow when loading or if offline */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isLoaded ? 'opacity-40' : 'opacity-100'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(78, 133, 191, 0.18) 0%, rgba(10, 10, 10, 0.95) 75%)'
        }}
      />

      {/* Dark overlay with customizable density */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Halftone dot pattern overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-30" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(10,10,10,0.85) 100%)'
        }} 
      />
    </div>
  );
}
