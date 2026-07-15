import { useEffect, useState } from 'react';

const BLOCKED_EFFECTIVE_TYPES = ['slow-2g', '2g'];

interface NetworkInformation extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

function computeShouldPlay(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const connection = getConnection();
  if (connection?.saveData) return false;
  if (connection?.effectiveType && BLOCKED_EFFECTIVE_TYPES.includes(connection.effectiveType)) {
    return false;
  }
  return true;
}

export function useHeroMedia(): { shouldPlayVideo: boolean } {
  const [shouldPlayVideo, setShouldPlayVideo] = useState<boolean>(() => computeShouldPlay());

  useEffect(() => {
    const update = () => setShouldPlayVideo(computeShouldPlay());

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', update);

    const connection = getConnection();
    connection?.addEventListener('change', update);

    return () => {
      motionQuery.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  return { shouldPlayVideo };
}
