import { useEffect } from 'react';

export const useFullHeight = (): void => {
  const onResizeHandler = (): void => {
    // eslint-disable-next-line no-debugger
    debugger;
    const initHeight = 0.01;
    const vh = window.innerHeight * initHeight;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('resize', onResizeHandler);
    };
  });
};
