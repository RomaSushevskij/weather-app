import { WeatherCondition } from 'api';
import { weatherIcons } from 'api/weatherAPI/enums';
import { Nullable } from 'types';

export type CurrentWeather = {
  icon: Nullable<weatherIcons>;
  temp: Nullable<number>;
  hourlyWeather: WeatherCondition[];
};
