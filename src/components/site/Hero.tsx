import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import CtaButton from './CtaButton';
import { Play, Volume, VolumeOff } from './icons';

/**
 * Hero video slot.
 * Set HERO_VIDEO_SRC to a hosted file (e.g. '/hero.mp4' dropped into /public)
 * and the placeholder is replaced automatically. Until then a motion-safe
 * gradient stands in.
 */
export const HERO_VIDEO_SRC: string | null = null;
export const HERO_VIDEO_POSTER: string | null = null;

function scrollToId(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const hasVideo = Boolean(HERO_VIDEO_SRC);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      id="hero"
      aria-label="Featured"
      className="relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden bg-v1-black p-4 sm:p-6 lg:p-8"
    >
      <div className="absolute inset-0" aria-hidden={!hasVideo}>
        {hasVideo ? (
          <video
            ref={videoRef}
            className="hero-video-slot"
            src={HERO_VIDEO_SRC ?? undefined}
            poster={HERO_VIDEO_POSTER ?? undefined}
            autoPlay={!reduced}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div className={`hero-fallback absolute inset-0 ${reduced ? '' : 'hero-fallback--animate'}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
      </div>

      <div className="page-shell relative z-10 pb-16 pt-40 sm:pb-20">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Live from Dhaka
          </span>

          <h1 className="whitespace-pre-line text-[36px] font-black leading-[1.05] tracking-[0.2px] text-white sm:text-[52px] lg:text-[68px]">
            Bangladesh,
            {'\n'}in full frame.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Breaking news, deep reporting and long-form narratives from across the
            country and the world — told with clarity, verve and care.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaButton variant="signal" onClick={() => scrollToId('latest', !reduced)}>
              Read the latest
            </CtaButton>

            {hasVideo ? (
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute hero video' : 'Mute hero video'}
                className="relative flex h-[62px] w-[62px] items-center justify-center rounded-[18px] border border-white/10 text-white backdrop-blur-[24px] transition-transform hover:scale-105"
              >
                {muted ? <VolumeOff size={22} /> : <Volume size={22} />}
              </button>
            ) : (
              <span className="inline-flex items-center gap-3 rounded-[18px] border border-white/10 px-5 py-4 text-sm font-medium text-white/70 backdrop-blur-[24px]">
                <Play size={16} />
                Hero video slot ready
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <button
          type="button"
          onClick={() => scrollToId('latest', !reduced)}
          aria-label="Scroll to stories"
          className="pointer-events-auto flex flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          Scroll
          <span className={`flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1 ${reduced ? '' : 'animate-bounce'}`}>
            <span className="h-2 w-1.5 rounded-full bg-white/70" />
          </span>
        </button>
      </div>
    </section>
  );
}
