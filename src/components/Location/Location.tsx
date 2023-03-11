import { memo } from 'react';

import style from './Location.module.scss';

type LocationProps = {
  cityName: string;
  country?: string;
};

export const Location = memo(({ cityName, country }: LocationProps) => {
  return (
    <div className={style.location}>
      <p className={style.city}>{cityName}</p>
      {!!country && <p className={style.country}>{country}</p>}
    </div>
  );
});
