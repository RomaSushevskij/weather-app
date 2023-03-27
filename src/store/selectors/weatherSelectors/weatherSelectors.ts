import { AppStateType } from 'store';
import { CurrentWeather, WeatherData } from 'store/reducers/weatherReducer';
import { WeatherAPI, WeatherForecast } from 'store/reducers/weatherReducer/enums';
import { Nullable } from 'types';

export const weatherSelectors = {
  current(state: AppStateType): CurrentWeather {
    return state.weather.currentWeather;
  },
  dailyForecast(state: AppStateType): WeatherData[] {
    return state.weather.dailyWeather;
  },
  hourlyForecast(state: AppStateType): WeatherData[] {
    return state.weather.hourlyWeather;
  },
  forecastType(state: AppStateType): WeatherForecast {
    return state.weather.weatherForecast;
  },
  weatherAPI(state: AppStateType): WeatherAPI {
    return state.weather.weatherAPI;
  },
  timeZoneOffset(state: AppStateType): Nullable<number> {
    return state.weather.timeZoneOffset;
  },
};
