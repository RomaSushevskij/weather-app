import { weatherIcons } from 'api/weatherAPI';

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
  currentConditions: Omit<WeatherCondition, 'datetimeEpoch'> & { address: string };
  days: {
    hours: WeatherCondition[];
  }[];
  latitude: number;
  longitude: number;
  address: string;
  resolvedAddress: string;
};
