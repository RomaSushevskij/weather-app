import { memo } from 'react';

import style from './Location.module.scss';

import { Nullable } from 'types';

type LocationProps = {
  city?: Nullable<string>;
  country?: Nullable<string>;
};

export const Location = memo(({ city, country }: LocationProps) => {
  const isBothCityCountry = country && city;
  const isCityOrCountry = city || country;

  return (
    <div className={style.location}>
      <p className={style.city}>{isCityOrCountry}</p>
      {isBothCityCountry && <p className={style.country}>{country}</p>}
    </div>
  );
});
