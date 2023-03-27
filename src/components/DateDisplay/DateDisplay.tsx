import { memo, useEffect } from 'react';

import style from './DateDisplay.module.scss';

import { useAppSelector, useCurrentDate } from 'hooks';
import { weatherSelectors } from 'store/selectors';
import { convertToUTCDate, getMyTimeZoneOffset } from 'utils';

export const DateDisplay = memo(() => {
  const timeZoneOffset = useAppSelector(weatherSelectors.timeZoneOffset);
  const { time, day, setDate } = useCurrentDate(timeZoneOffset || getMyTimeZoneOffset());

  useEffect(() => {
    setDate(
      new Date(convertToUTCDate(Date.now(), timeZoneOffset || getMyTimeZoneOffset())),
    );
  }, [timeZoneOffset, setDate]);

  return (
    <div className={style.date}>
      <p className={style.time}>{time}</p>
      <p className={style.day}>{day}</p>
    </div>
  );
});
