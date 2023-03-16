import { useEffect, useState } from 'react';

import { MS_IN_SECOND } from 'constantsGlobal';

type CurrentDate = {
  time: string;
  day: string;
};
export const useCurrentDate = (): CurrentDate => {
  const [date, setDate] = useState(new Date());

  const time = date.toLocaleTimeString('en-SU', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const day = date.toLocaleDateString('en-SU', { dateStyle: 'full' });

  const refreshClock = (): void => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, MS_IN_SECOND);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { time, day };
};
