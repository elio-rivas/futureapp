import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useHeroMedia } from '../hooks/useHeroMedia';
import type { VideoSource } from '../lib/media';

interface HeroVideoProps {
  poster: string;
  posterAlt: string;
  sources: VideoSource[];
}

function hasRealSources(sources: VideoSource[]): boolean {
  return sources.some((s) => s.src.length > 0 && !s.src.startsWith('TODO'));
}

export default function HeroVideo({ poster, posterAlt, sources }: HeroVideoProps) {
  const { shouldPlayVideo } = useHeroMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [paused, setPaused] = useState(false);

  const showVideo = shouldPlayVideo && hasRealSources(sources);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) {
      v.pause();
    } else {
      void v.play().catch(() => {
        /* autoplay may be blocked; poster remains visible */
      });
    }
  }, [paused, canPlay]);

  return (
    <div className="absolute inset-0">
      {/* Poster = painted LCP element + fallback. Eager load (above the fold). */}
      <img
        src={poster}
        alt={posterAlt}
        fetchPriority="high"
        className="w-full h-full object-cover scale-110"
      />

      {showVideo && (
        <>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setCanPlay(true)}
            className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-700 ${
              canPlay && !paused ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {sources.map((s) => (
              <source key={s.type} src={s.src} type={s.type} />
            ))}
          </video>

          {canPlay && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play background video' : 'Pause background video'}
              className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-brand-900/40 text-white backdrop-blur-sm transition-colors hover:bg-brand-900/60"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
        </>
      )}
    </div>
  );
}
