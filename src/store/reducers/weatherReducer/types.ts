import { WeatherIcons } from 'store/reducers/weatherReducer';
import { NullableDeep } from 'types/Nullable';

export type WeatherData = {
  temp: number;
  icon: WeatherIcons;
  datetimeEpoch: number;
};
export type CurrentWeather = NullableDeep<Omit<WeatherData, 'datetimeEpoch'>>;
export type HourlyWeather = WeatherData[];
export type DailyWeather = WeatherData[];
