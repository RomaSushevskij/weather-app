import { CSSProperties, memo, useState } from 'react';

import style from './WeatherFrame.module.scss';

import { weatherIcons } from 'api/weatherAPI';
import bgcImage from 'assets/cloudly-background.jpg';
import {
  DateDisplay,
  Input,
  Location,
  ToggleButton,
  WeatherBlock,
  WeatherList,
} from 'components';
import { SearchIcon } from 'components/icons';
import { TODAY } from 'constantsGlobal';
import { useAppSelector } from 'hooks';
import { useInput } from 'hooks/useInput/useInput';
import { weatherData } from 'mockData/mockData';
import { selectCurrentWeather, selectWeatherLocation } from 'store/selectors';
import { ForecastType } from 'types';

const forecasts: ForecastType[] = ['Hourly', 'Daily'];

export const WeatherFrame = memo(() => {
  const { icon, temp, hourlyWeather } = useAppSelector(selectCurrentWeather);
  const { cityName, country } = useAppSelector(selectWeatherLocation);
  const { inputValue, onInputValueChange } = useInput(cityName ?? '');

  const [forecastType, setForecastType] = useState<ForecastType>(() => forecasts[0]);

  const styles: CSSProperties = {
    backgroundImage: `url(${bgcImage})`,
  };

  return (
    <div className={style.weatherFrameWrp} style={styles}>
      <div className={style.citySelection}>
        <Input
          value={inputValue}
          onChange={onInputValueChange}
          startIcon={<SearchIcon width={20} height={20} color="#bac1d2" />}
        />
      </div>
      <div className={style.dateAndLocation}>
        <DateDisplay />
        <Location cityName={cityName || 'City name'} country={country || 'Country'} />
      </div>
      <div className={style.forecastSelection}>
        <ToggleButton
          value={forecastType}
          options={forecasts}
          onChangeOption={setForecastType}
        />
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
