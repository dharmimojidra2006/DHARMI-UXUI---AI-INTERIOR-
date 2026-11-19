import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET_VOLUME = 0.24;

export function useAmbientSoundscape() {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number>(0);
  const isSoundOnRef = useRef<boolean>(false);

  const fadeVolume = useCallback(
    (toVolume: number, durationMs: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      window.cancelAnimationFrame(fadeRafRef.current);
      const startVol = audio.volume;
      const startTime = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / Math.max(1, durationMs));
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        audio.volume = Math.max(
          0,
          Math.min(1, startVol + (toVolume - startVol) * eased)
        );

        if (t < 1) {
          fadeRafRef.current = window.requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };

      fadeRafRef.current = window.requestAnimationFrame(step);
    },
    []
  );

  // Initialize single persistent audio instance across all website navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const audio = new Audio('/assets/audio/sanctuary-ambience.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      window.cancelAnimationFrame(fadeRafRef.current);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isSoundOnRef.current) {
      isSoundOnRef.current = true;
      setIsSoundOn(true);
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          if (isSoundOnRef.current) {
            fadeVolume(TARGET_VOLUME, 1200);
          }
        })
        .catch(() => {
          isSoundOnRef.current = false;
          setIsSoundOn(false);
        });
    } else {
      isSoundOnRef.current = false;
      setIsSoundOn(false);
      fadeVolume(0, 320, () => {
        if (!isSoundOnRef.current) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
  }, [fadeVolume]);

  return {
    isSoundOn,
    toggleSound,
  };
}
