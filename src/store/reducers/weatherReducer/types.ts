import { WEATHER_ACTIONS_TYPE } from 'store/reducers/weatherReducer/weatherReducer';

export type WeatherACReturned<T> = {
  type: WEATHER_ACTIONS_TYPE;
  payload: T;
};
