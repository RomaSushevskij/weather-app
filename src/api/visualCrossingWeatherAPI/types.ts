import { WeatherData } from 'store/reducers/weatherReducer';

export type GetVisualCrossingWeatherResponseData = {
  currentConditions: Omit<WeatherData, 'datetimeEpoch'>;
  days: (WeatherData & { hours: WeatherData[] })[];
  tzoffset: number;
};

export type GetVisualCrossingWeatherParams = {
  latitude?: number;
  longitude?: number;
  localityName?: string;
  date1?: number;
  date2?: number;
};
