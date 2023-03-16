import { AppStateType } from 'store';
import {
  CurrentWeather,
  WeatherForecast,
  WeatherData,
  WeatherAPI,
} from 'store/reducers/weatherReducer';

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
};
