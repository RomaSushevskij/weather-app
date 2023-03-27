import { useCallback, useEffect, useState } from 'react';

import { MS_IN_SECOND } from 'constantsGlobal';
import { convertToUTCDate } from 'utils';

type CurrentDate = {
  time: string;
  day: string;
  setDate: (data: Date) => void;
};
export const useCurrentDate = (tzOffsetMS: number): CurrentDate => {
  const [date, setDate] = useState(new Date(convertToUTCDate(Date.now(), tzOffsetMS)));

  const time = date.toLocaleTimeString('en-SU', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const day = date.toLocaleDateString('en-SU', { dateStyle: 'full' });

  const refreshClock = useCallback((): void => {
    setDate(new Date(convertToUTCDate(Date.now(), tzOffsetMS)));
  }, [tzOffsetMS]);

  useEffect(() => {
    const timerId = setInterval(refreshClock, MS_IN_SECOND);

    return () => {
      clearInterval(timerId);
    };
  }, [refreshClock]);

  return { time, day, setDate };
};
