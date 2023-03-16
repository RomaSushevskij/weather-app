import { CSSProperties, memo, useEffect, useState } from 'react';

import style from './WeatherFrame.module.scss';

import bgcImage from 'assets/cloudly-background.jpg';
import {
  DateDisplay,
  Input,
  Location,
  Preloader,
  ToggleButton,
  WeatherBlock,
  WeatherList,
} from 'components';
import { SearchIcon } from 'components/icons';
import { EMPTY_STRING, TODAY } from 'constantsGlobal';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useInput } from 'hooks/useInput/useInput';
import { weatherData } from 'mockData/mockData';
import { WeatherForecast, WeatherIcons } from 'store/reducers/weatherReducer';
import { weatherSagasAC } from 'store/sagas/weather/weatherSagas';
import { appSelectors, geolocationSelectors, weatherSelectors } from 'store/selectors';

const forecasts: WeatherForecast[] = [WeatherForecast.HOURLY, WeatherForecast.DAILY];

export const WeatherFrame = memo(() => {
  const dispatch = useAppDispatch();
  const { icon, temp } = useAppSelector(weatherSelectors.current);
  const hourlyWeather = useAppSelector(weatherSelectors.hourlyForecast);
  // const forecastType = useAppSelector(weatherSelectors.forecastType);
  const city = useAppSelector(geolocationSelectors.city);
  const country = useAppSelector(geolocationSelectors.country);
  const appStatus = useAppSelector(appSelectors.status);

  const { inputValue, onInputValueChange, handleSetInputValue } = useInput(
    city || country || EMPTY_STRING,
  );

  const [forecastType, setForecastType] = useState<WeatherForecast>(() => forecasts[0]);

  const styles: CSSProperties = {
    backgroundImage: `url(${bgcImage})`,
  };

  const fetchWeatherByCityName = (): void => {
    if (inputValue) {
      dispatch(
        weatherSagasAC.getOpenWeather({
          localityName: inputValue,
        }),
      );
    }
  };

  useEffect(() => {
    handleSetInputValue(city || country || EMPTY_STRING);
  }, [city, country, handleSetInputValue]);

  return (
    <div className={style.weatherFrameWrp} style={styles}>
      <div className={style.citySelection}>
        <Input
          value={inputValue}
          onChange={onInputValueChange}
          onEnter={fetchWeatherByCityName}
          startIcon={<SearchIcon width={20} height={20} color="#bac1d2" />}
        />
      </div>
      <div className={style.dateAndLocation}>
        <DateDisplay />
        <Location city={city} country={country} />
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
          icon={icon || WeatherIcons.CLEAR_DAY}
          isCurrentDate
        />
        <WeatherList
          weatherForecastData={hourlyWeather.length ? hourlyWeather : weatherData}
          weatherForecastType="hourly"
        />
      </div>
      {appStatus === 'loading' && <Preloader />}
    </div>
  );
});
