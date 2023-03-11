import { memo } from 'react';

import style from './WeatherList.module.scss';

import { WeatherCondition } from 'api/weatherAPI';
import { WeatherBlock } from 'components';
import { convertUnixToTime, convertUnixToWeekDay } from 'utils';

type WeatherListProps = {
  weatherForecastData: WeatherCondition[];
  weatherForecastType: 'hourly' | 'daily';
};
export const WeatherList = memo(
  ({ weatherForecastData, weatherForecastType }: WeatherListProps) => {
    const weatherBlocks = weatherForecastData.map(({ temp, datetimeEpoch, icon }) => {
      const weatherDate =
        weatherForecastType === 'hourly'
          ? convertUnixToTime(datetimeEpoch)
          : convertUnixToWeekDay(datetimeEpoch);

      return (
        <div key={datetimeEpoch} className={style.weatherBlock}>
          <WeatherBlock date={weatherDate} icon={icon} temp={temp} />
        </div>
      );
    });

    return <div className={style.weatherListWrp}>{weatherBlocks}</div>;
  },
);
