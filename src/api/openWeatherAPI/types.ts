import { OpenWeatherIcons } from 'api/openWeatherAPI/enums';

type VisualWeather = {
  icon: OpenWeatherIcons;
};

type CurrentWeather = {
  temp: number;
  dt: number;
  weather: VisualWeather[];
};

type DayWeather = {
  dt: number;
  temp: {
    day: number;
  };
  weather: VisualWeather[];
};

type HourWeather = CurrentWeather;

export type GetOpenWeatherResponseData = {
  current: CurrentWeather;
  daily: DayWeather[];
  hourly: HourWeather[];
  timezone_offset: number;
};

export type GetOpenWeatherParams = {
  latitude: number;
  longitude: number;
};
