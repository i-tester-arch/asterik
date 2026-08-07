import { useState, useEffect, useRef } from 'react';

export function useWpmCounter(text, input) {
  const [wpm, setWpm] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    if (input.length === 1 && !startTime.current) {
      startTime.current = Date.now();
    }
    if (input.length > 0 && startTime.current) {
      const elapsedMinutes = (Date.now() - startTime.current) / 60000;
      const wordsTyped = input.trim().split(' ').length;
      setWpm(Math.round(wordsTyped / elapsedMinutes) || 0);
    }
  }, [input]);

  return wpm;
}
