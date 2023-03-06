import { WeatherCondition } from 'api';
import { Location } from 'api/geocodingAPI/types';
import { weatherIcons } from 'api/weatherAPI/enums';
import { WeatherACReturned } from 'store/reducers/types';
import { Nullable } from 'types';

export enum WEATHER_ACTIONS_TYPE {
  SET_LOCATION = 'SET_LOCATION',
}

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

type InitialStateType = typeof initialState;

export const weatherReducer = (
  action: WeatherActionsType,
  state: InitialStateType = initialState,
): InitialStateType => {
  switch (action.type) {
    case WEATHER_ACTIONS_TYPE.SET_LOCATION: {
      const { lat: latitude, lon: longitude, country, name: cityName } = action.payload;

      return { ...state, location: { cityName, longitude, country, latitude } };
    }
    default:
      return state;
  }
};

export type WeatherActionsType = ReturnType<typeof setLocation>;

const setLocation = (location: Location): WeatherACReturned<Location> => {
  return {
    type: WEATHER_ACTIONS_TYPE.SET_LOCATION,
    payload: location,
  } as const;
};
