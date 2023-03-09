import { memo } from 'react';

import style from './WeatherBlock.module.scss';

import { Chip } from 'components/Chip';
import { WeatherIcon } from 'components/WetherBlock/WeatherIcon/WeatherIcon';

type WeatherBlockProps = {
  date: string;
  isCurrentDate?: boolean;
  iconSrc: string;
};

export const WeatherBlock = memo(
  ({ isCurrentDate, iconSrc, date }: WeatherBlockProps) => {
    const weatherBlockStyle = isCurrentDate
      ? `${style.weatherBlock} ${style.current}`
      : style.weatherBlock;

    return (
      <div className={weatherBlockStyle}>
        {isCurrentDate && <WeatherIcon src={iconSrc} isCurrent={isCurrentDate} />}
        <div className={style.weatherInfo}>
          <Chip label={date} size={isCurrentDate ? 'medium' : 'small'} />
          {!isCurrentDate && <WeatherIcon src={iconSrc} />}
          <p className={style.temp}>12</p>
        </div>
      </div>
    );
  },
);
