import { WeatherCondition } from 'api';
import { Location } from 'api/geocodingAPI/types';
import { weatherIcons } from 'api/weatherAPI/enums';
import { WeatherACReturned } from 'store/reducers/weatherReducer/types';
import { Nullable } from 'types';

export enum WEATHER_ACTIONS_TYPE {
  SET_LOCATION = 'SET_LOCATION',
}
export type WeatherInitialState = typeof initialState;
export type WeatherActionsType = ReturnType<typeof setLocation>;

const initialState = {
  location: {
    cityName: null as Nullable<string>,
    latitude: null as Nullable<number>,
    longitude: null as Nullable<number>,
    country: null as Nullable<string>,
  },
  currentWeather: {
    icon: null as Nullable<weatherIcons>,
    temp: null as Nullable<number>,
    hourlyWeather: [] as {
      [key: string]: WeatherCondition;
    }[],
  },
  dailyWeather: [] as {
    [key: string]: WeatherCondition;
  }[],
};

export const weatherReducer = (
  state: WeatherInitialState = initialState,
  action: WeatherActionsType,
): WeatherInitialState => {
  switch (action.type) {
    case WEATHER_ACTIONS_TYPE.SET_LOCATION: {
      const { lat: latitude, lon: longitude, country, name: cityName } = action.payload;

      return { ...state, location: { cityName, longitude, country, latitude } };
    }
    default:
      return state;
  }
};

export const setLocation = (location: Location): WeatherACReturned<Location> => {
  return {
    type: WEATHER_ACTIONS_TYPE.SET_LOCATION,
    payload: location,
  } as const;
};
