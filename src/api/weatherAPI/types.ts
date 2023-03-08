import { weatherIcons } from 'api/weatherAPI/enums';

export type GetCurrentWeatherParams = {
  latitude?: number;
  longitude?: number;
  cityName?: string;
  date1?: number;
  date2?: number;
};

export type WeatherCondition = {
  icon: weatherIcons;
  temp: number;
  datetimeEpoch: number;
};

export type GetCurrentWeatherResponse = {
  currentConditions: Omit<WeatherCondition, 'datetimeEpoch'>;
  days: {
    hours: WeatherCondition[];
  }[];
};
