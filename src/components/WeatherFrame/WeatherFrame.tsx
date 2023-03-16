import { CSSProperties, memo, useEffect } from 'react';

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
import { EMPTY_STRING, NOW, TODAY } from 'constantsGlobal';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useInput } from 'hooks/useInput/useInput';
import { weatherData } from 'mockData/mockData';
import {
  weatherAC,
  WeatherAPI,
  WeatherForecast,
  WeatherIcons,
} from 'store/reducers/weatherReducer';
import { weatherSagasAC } from 'store/sagas/weather/weatherSagas';
import { appSelectors, geolocationSelectors, weatherSelectors } from 'store/selectors';

const forecasts: WeatherForecast[] = [WeatherForecast.HOURLY, WeatherForecast.DAILY];
const weatherAPIs: WeatherAPI[] = [
  WeatherAPI.OPEN_WEATHER,
  WeatherAPI.VISUAL_CROSSING_WEATHER,
];

export const WeatherFrame = memo(() => {
  const dispatch = useAppDispatch();
  const { icon, temp } = useAppSelector(weatherSelectors.current);
  const hourlyWeather = useAppSelector(weatherSelectors.hourlyForecast);
  const dailyWeather = useAppSelector(weatherSelectors.dailyForecast);
  const forecastType = useAppSelector(weatherSelectors.forecastType);
  const weatherAPI = useAppSelector(weatherSelectors.weatherAPI);
  const city = useAppSelector(geolocationSelectors.city);
  const country = useAppSelector(geolocationSelectors.country);
  const appStatus = useAppSelector(appSelectors.status);

  const { inputValue, onInputValueChange, handleSetInputValue } = useInput(
    city || country || EMPTY_STRING,
  );

  const weatherForecastData =
    forecastType === WeatherForecast.HOURLY ? hourlyWeather : dailyWeather;

  const styles: CSSProperties = {
    backgroundImage: `url(${bgcImage})`,
  };

  const fetchWeatherByCityName = (): void => {
    if (inputValue) {
      dispatch(
        weatherSagasAC.getWeather({
          weatherAPI,
          localityName: inputValue,
        }),
      );
    }
  };

  const onForecastTypeChange = (forecastType: WeatherForecast): void => {
    dispatch(weatherAC.setForecastType({ weatherForecast: forecastType }));
  };

  const onWeatherAPIChange = (weatherAPI: WeatherAPI): void => {
    dispatch(weatherAC.setWeatherAPI({ weatherAPI }));
  };

  useEffect(() => {
    dispatch(weatherSagasAC.getWeather({ weatherAPI, localityName: inputValue }));
  }, [weatherAPI, dispatch]);

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
      <div className={style.selection}>
        <div>
          <ToggleButton
            value={weatherAPI}
            options={weatherAPIs}
            onChangeOption={onWeatherAPIChange}
          />
        </div>
        <div>
          <ToggleButton
            value={forecastType}
            options={forecasts}
            onChangeOption={onForecastTypeChange}
          />
        </div>
      </div>
      <div className={style.weather}>
        <WeatherBlock
          date={forecastType === WeatherForecast.HOURLY ? NOW : TODAY}
          temp={temp || 0}
          icon={icon || WeatherIcons.CLEAR_DAY}
          isCurrentDate
        />
        <WeatherList
          weatherForecastData={
            weatherForecastData.length ? weatherForecastData : weatherData
          }
          weatherForecastType={forecastType}
        />
      </div>
      {appStatus === 'loading' && <Preloader />}
    </div>
  );
});
