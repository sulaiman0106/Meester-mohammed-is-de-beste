import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUDIO_URL =
  'https://raw.githubusercontent.com/sulaiman0106/Anasheed/main/taiba.mp3';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [prevVolume, setPrevVolume] = useState(0.35);
  const [showVolume, setShowVolume] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  /* ── Bootstrap the <audio> element ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.crossOrigin = 'anonymous';

    const onCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };
    const onDurationChange = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && isFinite(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => {
      // Loop is set on the element, but just in case:
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  /* ── Play / Pause ── */
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }
  }, [isPlaying]);

  /* ── Volume ── */
  const handleVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setVolume(v);
      if (audioRef.current) audioRef.current.volume = v;
    },
    [],
  );

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    } else {
      const restore = prevVolume || 0.35;
      setVolume(restore);
      if (audioRef.current) audioRef.current.volume = restore;
    }
  }, [volume, prevVolume]);

  /* ── Seek ── */
  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const bar = progressRef.current;
      if (!audio || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      audio.currentTime = pct * duration;
    },
    [duration],
  );

  /* ── Helpers ── */
  const fmt = (s: number) => {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* The actual <audio> element — always rendered, never autoplay */}
      <audio ref={audioRef} loop preload="metadata" crossOrigin="anonymous">
        <source src={AUDIO_URL} type="audio/mpeg" />
      </audio>

      {/* Player UI — always visible */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8, type: 'spring', stiffness: 120 }}
        className="fixed bottom-5 right-5 z-50 select-none"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setShowVolume(false);
        }}
      >
        <div className="audio-player rounded-2xl shadow-2xl overflow-hidden">
          {/* ── Progress bar (top edge) ── */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="h-1 w-full bg-gold-500/10 cursor-pointer group relative"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 relative"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            >
              {/* glowing dot at end */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold-300 shadow-[0_0_6px_rgba(212,168,67,0.7)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          <div className="px-4 py-3 flex items-center gap-3">
            {/* ── Play / Pause button ── */}
            <button
              onClick={togglePlay}
              disabled={hasError}
              className="relative w-11 h-11 rounded-full flex items-center justify-center bg-gold-500/20 hover:bg-gold-500/40 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group/btn shrink-0"
              aria-label={isPlaying ? 'Pauzeer anasheed' : 'Speel anasheed af'}
            >
              {/* Spinning loader ring */}
              {isLoading && !hasError && (
                <span className="absolute inset-0 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
              )}

              {hasError ? (
                /* Error icon */
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : isPlaying ? (
                /* Pause icon */
                <svg className="w-5 h-5 text-gold-300 group-hover/btn:text-gold-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                /* Play icon */
                <svg className="w-5 h-5 text-gold-300 group-hover/btn:text-gold-200 transition-colors ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* ── Animated music bars ── */}
            <div className="flex items-end gap-[3px] h-5 shrink-0">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gold-400"
                  animate={
                    isPlaying
                      ? {
                          height: ['6px', `${14 + i * 3}px`, '8px', `${18 - i * 2}px`, '6px'],
                        }
                      : { height: '4px' }
                  }
                  transition={
                    isPlaying
                      ? {
                          duration: 0.9 + i * 0.15,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.12,
                        }
                      : { duration: 0.4 }
                  }
                />
              ))}
            </div>

            {/* ── Label + time ── */}
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="text-gold-200 text-xs font-semibold tracking-wide truncate">
                {hasError ? 'Fout bij laden' : isPlaying ? '♪ Anasheed' : 'Anasheed'}
              </span>
              {duration > 0 && (
                <span className="text-gold-400/50 text-[10px] tabular-nums">
                  {fmt(currentTime)} / {fmt(duration)}
                </span>
              )}
            </div>

            {/* ── Volume section ── */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Volume icon / mute toggle */}
              <button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolume(true)}
                className="text-gold-400 hover:text-gold-200 transition-colors p-1"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {volume === 0 ? (
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  ) : volume < 0.5 ? (
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  ) : (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  )}
                </svg>
              </button>

              {/* Slider */}
              <AnimatePresence>
                {(showVolume || expanded) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 80, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.02"
                      value={volume}
                      onChange={handleVolume}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #d4a843 0%, #d4a843 ${volume * 100}%, rgba(212,168,67,0.15) ${volume * 100}%, rgba(212,168,67,0.15) 100%)`,
                      }}
                      aria-label="Volume"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Tooltip on error ── */}
        <AnimatePresence>
          {hasError && expanded && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute -top-9 right-0 whitespace-nowrap text-[11px] text-red-300 bg-islamic-green-950/90 rounded-lg px-3 py-1.5 border border-red-400/20 shadow-lg"
            >
              Audio kon niet geladen worden
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
