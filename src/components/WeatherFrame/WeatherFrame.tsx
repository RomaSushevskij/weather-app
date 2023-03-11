import { CSSProperties, memo } from 'react';

import style from './WeatherFrame.module.scss';

import { weatherIcons } from 'api/weatherAPI';
import bgcImage from 'assets/cloudly-background.jpg';
import { DateDisplay } from 'components/DateDisplay';
import { Location } from 'components/Location';
import { WeatherList } from 'components/WeatherList';
import { WeatherBlock } from 'components/WetherBlock';
import { TODAY } from 'constantsCommon';
import { useAppSelector } from 'hooks';
import { weatherData } from 'mockData/mockData';
import { selectCurrentWeather, selectWeatherLocation } from 'store/selectors';

export const WeatherFrame = memo(() => {
  const { icon, temp, hourlyWeather } = useAppSelector(selectCurrentWeather);
  const { cityName, country } = useAppSelector(selectWeatherLocation);

  const styles: CSSProperties = {
    backgroundImage: `url(${bgcImage})`,
  };

  return (
    <div className={style.weatherFrameWrp} style={styles}>
      <div className={style.dateAndLocation}>
        <DateDisplay />
        <Location cityName={cityName || 'City name'} country={country || 'Country'} />
      </div>
      <div className={style.weather}>
        <WeatherBlock
          date={TODAY}
          temp={temp || 0}
          icon={icon || weatherIcons.CLEAR_DAY}
          isCurrentDate
        />
        <WeatherList
          weatherForecastData={hourlyWeather.length ? hourlyWeather : weatherData}
          weatherForecastType="daily"
        />
      </div>
    </div>
  );
});
