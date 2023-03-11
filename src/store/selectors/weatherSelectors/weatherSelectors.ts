import { WeatherCondition } from 'api/weatherAPI';
import { AppStateType } from 'store';
import { CurrentWeather, LocationFromState } from 'store/reducers/weather/types';

export const selectWeatherLocation = (state: AppStateType): LocationFromState =>
  state.weather.location;
export const selectCurrentWeather = (state: AppStateType): CurrentWeather =>
  state.weather.currentWeather;
export const selectDailyWeather = (state: AppStateType): WeatherCondition[] =>
  state.weather.dailyWeather;
