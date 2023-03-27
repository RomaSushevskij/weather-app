import { CSSProperties, memo, useCallback, useEffect, useRef } from 'react';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import style from './WeatherFrame.module.scss';

import {
  Button,
  CalendarEvents,
  DateDisplay,
  Input,
  Location,
  Preloader,
  ToggleButton,
  UserInfo,
  WeatherBlock,
  WeatherList,
} from 'components';
import { GoogleCalendarIcon, SearchIcon } from 'components/icons';
import { InputClearBtn } from 'components/Input/InputClearBtn';
import { ACCESS_TOKEN_KEY, EMPTY_STRING, NOW } from 'constantsGlobal';
import { useInput, useAppDispatch, useAppSelector } from 'hooks';
import { setWeatherSettingToLocalStorage } from 'services/localStorage';
import { weatherAC, WeatherIcons } from 'store/reducers/weatherReducer';
import { WeatherAPI, WeatherForecast } from 'store/reducers/weatherReducer/enums';
import { authSagasAC } from 'store/sagas/authSagas';
import { weatherSagasAC } from 'store/sagas/weatherSagas/weatherSagas';
import {
  appSelectors,
  authSelectors,
  eventsSelectors,
  geolocationSelectors,
  weatherSelectors,
} from 'store/selectors';
import { getWeatherWallpaperLink } from 'utils/getWeatherWallpaperLink/getWeatherWallpaperLink';

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
  const geolocation = useAppSelector(geolocationSelectors.geoLocation);
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn);
  const email = useAppSelector(authSelectors.email);
  const name = useAppSelector(authSelectors.name);
  const events = useAppSelector(eventsSelectors.event);

  const isWeatherData = icon && temp && hourlyWeather && dailyWeather;

  const inputRef = useRef<HTMLInputElement>(null);

  const { inputValue, onInputValueChange, handleSetInputValue } = useInput(
    city || country || EMPTY_STRING,
  );

  const weatherForecastData =
    forecastType === WeatherForecast.HOURLY ? hourlyWeather : dailyWeather;

  const styles: CSSProperties = {
    backgroundImage: `url(${getWeatherWallpaperLink(icon as WeatherIcons)})`,
  };

  const calendarEventsStyle = isLoggedIn
    ? style.calendarEvents
    : `${style.calendarEvents} ${style.empty}`;

  const fetchWeatherByCityName = useCallback((): void => {
    if (inputValue.trim()) {
      dispatch(
        weatherSagasAC.getWeather({
          weatherAPI,
          localityName: inputValue,
        }),
      );
    }
  }, [dispatch, inputValue, weatherAPI]);

  const onClearInputClick = (): void => {
    handleSetInputValue(EMPTY_STRING);
    inputRef.current?.focus();
  };

  const onForecastTypeChange = useCallback(
    (forecastType: WeatherForecast): void => {
      dispatch(weatherAC.setForecastType({ weatherForecast: forecastType }));
      setWeatherSettingToLocalStorage({
        weatherForecast: forecastType,
        weatherAPI,
      });
    },
    [dispatch],
  );

  const onWeatherAPIChange = useCallback(
    (weatherAPI: WeatherAPI): void => {
      dispatch(
        weatherSagasAC.getWeather({
          weatherAPI,
          localityName: city || country || EMPTY_STRING,
        }),
      );
      setWeatherSettingToLocalStorage({ weatherAPI, weatherForecast: forecastType });

      if ((city && inputValue !== city) || inputValue !== country) {
        const resultLocalityName = city || country || EMPTY_STRING;

        handleSetInputValue(resultLocalityName as string);
      }
    },
    [city, dispatch, country, handleSetInputValue, inputValue],
  );

  const onGetEventsClick = useGoogleLogin({
    onSuccess: async tokenResponse => {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokenResponse.access_token);
      dispatch(authSagasAC.checkAuthorizationInfo());
    },
    scope: process.env.REACT_APP_GOOGLE_CLOUD_SCOPE,
    onError: errorResponse => {
      console.log(errorResponse);
    },
  });

  const onSighOutCLick = useCallback((): void => {
    googleLogout();
    dispatch(authSagasAC.signOut());
  }, [dispatch]);

  useEffect(() => {
    handleSetInputValue(
      geolocation.city || geolocation.country || inputValue || EMPTY_STRING,
    );
  }, [geolocation, handleSetInputValue]);

  return (
    <div className={style.weatherFrameWrp} style={styles}>
      <div className={style.tab}>
        {isLoggedIn && <UserInfo email={email} name={name} onClickBtn={onSighOutCLick} />}
        <div className={style.citySelection}>
          <Input
            value={inputValue}
            placeholder="City or country"
            ref={inputRef}
            onChange={onInputValueChange}
            onEnter={fetchWeatherByCityName}
            startIcon={<SearchIcon width={20} height={20} color="#bac1d2" />}
            endIcon={
              inputValue ? <InputClearBtn onClick={onClearInputClick} /> : undefined
            }
          />
        </div>
      </div>
      <div className={style.dateAndLocation}>
        <DateDisplay />
        <Location city={city} country={country} />
      </div>
      <div className={calendarEventsStyle}>
        {isLoggedIn ? (
          <CalendarEvents events={events} />
        ) : (
          <div className={style.showEventsBtn}>
            <Button onClick={() => onGetEventsClick()}>
              <GoogleCalendarIcon width={28} height={28} />
              Show events
            </Button>
          </div>
        )}
      </div>
      {isWeatherData && (
        <>
          <div className={style.selection}>
            <div>
              <ToggleButton
                value={forecastType}
                options={forecasts}
                onChangeOption={onForecastTypeChange}
              />
            </div>
            <div>
              <ToggleButton
                value={weatherAPI}
                options={weatherAPIs}
                onChangeOption={onWeatherAPIChange}
              />
            </div>
          </div>
          <div className={style.weather}>
            <WeatherBlock
              date={NOW}
              temp={temp || 0}
              icon={icon || WeatherIcons.CLEAR_DAY}
              isCurrentDate
            />
            <WeatherList
              weatherForecastData={weatherForecastData}
              weatherForecastType={forecastType}
            />
          </div>
        </>
      )}
      {appStatus === 'loading' && <Preloader />}
    </div>
  );
});
