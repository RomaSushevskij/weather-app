import { WeatherCondition } from 'api/weatherAPI';
import { ActionType } from 'store';
import { CurrentWeather, LocationFromState } from 'store/reducers/weather/types';

export enum WEATHER_ACTIONS_TYPE {
  SET_LOCATION = 'weather/SET_LOCATION',
  SET_CURRENT_WEATHER = 'weather/SET_CURRENT_WEATHER',
}
export type WeatherInitialState = typeof initialState;
export type WeatherActionsType =
  | ReturnType<typeof setLocation>
  | ReturnType<typeof setCurrentWeather>;

const initialState = {
  location: {
    cityName: null,
    latitude: null,
    longitude: null,
    country: null,
  } as LocationFromState,
  currentWeather: {
    icon: null,
    temp: null,
    hourlyWeather: [],
  } as CurrentWeather,
  dailyWeather: [] as WeatherCondition[],
};

export const weatherReducer = (
  state: WeatherInitialState = initialState,
  action: WeatherActionsType,
): WeatherInitialState => {
  switch (action.type) {
    case WEATHER_ACTIONS_TYPE.SET_LOCATION: {
      const location = action.payload as LocationFromState;

      return { ...state, location: { ...location } };
    }
    case WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER: {
      const currentWeather = action.payload ?? ({} as CurrentWeather);

      return { ...state, currentWeather };
    }
    default:
      return state;
  }
};

export const setLocation = (
  location: LocationFromState,
): ActionType<WEATHER_ACTIONS_TYPE.SET_LOCATION, LocationFromState> => {
  return {
    type: WEATHER_ACTIONS_TYPE.SET_LOCATION,
    payload: location,
  } as const;
};

export const setCurrentWeather = (
  currentWeather: CurrentWeather,
): ActionType<WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER, CurrentWeather> => {
  return {
    type: WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER,
    payload: currentWeather,
  } as const;
};
