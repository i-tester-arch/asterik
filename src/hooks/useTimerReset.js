import { useRef } from 'react';

// Fixes an edge case where hitting backspace before any character
// had been typed would still mark the timer as "started", causing
// WPM calculations to include time before the user actually began typing.
export function useTimerReset() {
  const startTime = useRef(null);
  const hasTypedRef = useRef(false);

  function onKeyDown(key) {
    if (key === 'Backspace' && !hasTypedRef.current) {
      startTime.current = null;
      return;
    }
    if (!hasTypedRef.current) {
      hasTypedRef.current = true;
      startTime.current = Date.now();
    }
  }

  function reset() {
    startTime.current = null;
    hasTypedRef.current = false;
  }

  return { startTime, onKeyDown, reset };
}
