import { useCallback, useRef } from 'react';

export const useDebounce = (callback: Function, delay: number): Function => {
  const timer = useRef(null as any);

  const debouncedCallback = useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};
