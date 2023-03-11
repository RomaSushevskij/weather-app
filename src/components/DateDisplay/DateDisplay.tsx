import { memo } from 'react';

import style from './DateDisplay.module.scss';

import { useCurrentDate } from 'hooks';

export const DateDisplay = memo(() => {
  const { time, day } = useCurrentDate();

  return (
    <div className={style.date}>
      <p className={style.time}>{time}</p>
      <p className={style.day}>{day}</p>
    </div>
  );
});
