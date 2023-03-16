import { memo } from 'react';

import style from './WeatherBlock.module.scss';

import { Chip } from 'components/Chip';
import { WeatherIcon } from 'components/WetherBlock/WeatherIcon';
import { WeatherIcons } from 'store/reducers/weatherReducer';
import { getWeatherIconLink } from 'utils';

type WeatherBlockProps = {
  date: string;
  temp: number;
  icon: WeatherIcons;
  isCurrentDate?: boolean;
};

export const WeatherBlock = memo(
  ({ isCurrentDate, icon, date, temp }: WeatherBlockProps) => {
    const weatherBlockStyle = isCurrentDate
      ? `${style.weatherBlock} ${style.current}`
      : style.weatherBlock;

    const iconSrc = getWeatherIconLink(icon);

    return (
      <div className={weatherBlockStyle}>
        {isCurrentDate && (
          <WeatherIcon src={iconSrc} isCurrent={isCurrentDate} alt={icon} />
        )}
        <div className={style.weatherInfo}>
          <Chip label={date} size={isCurrentDate ? 'medium' : 'small'} />
          {!isCurrentDate && <WeatherIcon src={iconSrc} alt={icon} />}
          <p className={style.temp}>{temp}</p>
        </div>
      </div>
    );
  },
);
