import { WeatherCondition } from 'api/weatherAPI';
import { weatherIcons } from 'api/weatherAPI';
import { Nullable } from 'types';

export type CurrentWeather = {
  icon: Nullable<weatherIcons>;
  temp: Nullable<number>;
  hourlyWeather: WeatherCondition[];
};

export type LocationFromState = {
  cityName: Nullable<string>;
  latitude: Nullable<number>;
  longitude: Nullable<number>;
  country: Nullable<string>;
};
