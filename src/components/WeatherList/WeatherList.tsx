import { memo } from 'react';

import style from './WeatherList.module.scss';

import { WeatherBlock } from 'components';
import { WeatherData } from 'store/reducers/weatherReducer';
import { convertUnixToTime, convertUnixToWeekDay } from 'utils';

type WeatherListProps = {
  weatherForecastData: WeatherData[];
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
