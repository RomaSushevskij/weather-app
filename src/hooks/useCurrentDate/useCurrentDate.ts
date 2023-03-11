import { useEffect, useState } from 'react';

import { MS_IN_ONE_SECOND } from 'constantsCommon';

type CurrentDate = {
  time: string;
  day: string;
};
export const useCurrentDate = (): CurrentDate => {
  const [date, setDate] = useState(new Date());

  const time = date.toLocaleTimeString('ru', { timeStyle: 'short' });
  const day = date.toLocaleDateString('en', { dateStyle: 'full' });

  const refreshClock = (): void => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, MS_IN_ONE_SECOND);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { time, day };
};
