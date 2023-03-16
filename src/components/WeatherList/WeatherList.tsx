import { memo } from 'react';

import style from './WeatherList.module.scss';

import { WeatherBlock } from 'components';
import { WeatherData, WeatherForecast } from 'store/reducers/weatherReducer';
import { convertUnixToTime, convertUnixToWeekDay } from 'utils';

type WeatherListProps = {
  weatherForecastData: WeatherData[];
  weatherForecastType: WeatherForecast;
};
export const WeatherList = memo(
  ({ weatherForecastData, weatherForecastType }: WeatherListProps) => {
    const weatherBlocks = weatherForecastData.map(({ temp, datetimeEpoch, icon }) => {
      const weatherDate =
        weatherForecastType === WeatherForecast.HOURLY
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
