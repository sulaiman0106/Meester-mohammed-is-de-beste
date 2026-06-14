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

  /* ───────────── AUDIO SETUP ───────────── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    const tryPlay = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    // 1. direct proberen bij load
    tryPlay();

    // 2. fallback: user interactie (browser requirement)
    const events = ['click', 'touchstart', 'scroll'];

    const onInteract = () => {
      tryPlay();
      events.forEach((e) =>
        window.removeEventListener(e, onInteract)
      );
    };

    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true })
    );

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, onInteract)
      );
    };
  }, [volume]);

  /* ───────────── AUDIO EVENTS ───────────── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsPlaying(true);
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
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  /* ───────────── PLAY / PAUSE ───────────── */
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      audio.play().catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, [isPlaying]);

  /* ───────────── VOLUME ───────────── */
  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

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

  /* ───────────── SEEK ───────────── */
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
    [duration]
  );

  const fmt = (s: number) => {
    if (!s) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} loop preload="auto">
        <source src={AUDIO_URL} type="audio/mpeg" />
      </audio>

      {/* UI */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8, type: 'spring' }}
        className="fixed bottom-5 right-5 z-50 select-none"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setShowVolume(false);
        }}
      >
        <div className="audio-player rounded-2xl shadow-2xl overflow-hidden">
          
          {/* progress */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="h-1 w-full bg-gold-500/10 cursor-pointer"
          >
            <div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="px-4 py-3 flex items-center gap-3">

            {/* play button */}
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-gold-500/20 flex items-center justify-center"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            {/* text */}
            <div className="hidden sm:flex flex-col">
              <span className="text-gold-200 text-xs">
                {isPlaying ? '♪ Anasheed' : 'Anasheed'}
              </span>
              <span className="text-gold-400/50 text-[10px]">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
            </div>

            {/* volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-gold-400">
                🔊
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={volume}
                onChange={handleVolume}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
