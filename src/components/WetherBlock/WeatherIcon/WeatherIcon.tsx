import { memo } from 'react';

import style from './WeatherIcon.module.scss';

type WeatherIconProps = {
  isCurrent?: boolean;
  src: string;
};

export const WeatherIcon = memo(({ isCurrent, src }: WeatherIconProps) => {
  const iconStyle = isCurrent ? `${style.icon} ${style.current}` : style.icon;

  return (
    <div className={iconStyle}>
      <img src={src} alt="clearDayIcon" />
    </div>
  );
});
