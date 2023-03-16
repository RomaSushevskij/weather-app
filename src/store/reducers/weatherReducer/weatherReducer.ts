import { WeatherForecast, WeatherAPI } from 'store/reducers/weatherReducer/enums';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from 'store/reducers/weatherReducer/types';
import { PayloadAction } from 'store/types';

enum WEATHER_ACTIONS_TYPE {
  SET_CURRENT_WEATHER = 'weather/SET_CURRENT_WEATHER',
  SET_HOURLY_WEATHER = 'weather/SET_HOURLY_WEATHER',
  SET_DAILY_WEATHER = 'weather/SET_DAILY_WEATHER',
  SET_GENERAL_WEATHER = 'weather/SET_GENERAL_WEATHER',
}

export type WeatherInitialState = typeof initialState;
export type WeatherConditionState = Omit<
  WeatherInitialState,
  'selectedWeatherAPI' | 'weatherForecast'
>;

type WeatherACParam<F> = F extends WeatherForecast.HOURLY
  ? { hourlyWeather: HourlyWeather }
  : F extends WeatherForecast.DAILY
  ? { dailyWeather: DailyWeather }
  : F extends void
  ? { currentWeather: CurrentWeather }
  : { generalWeather: WeatherInitialState };

export type WeatherActionsType =
  | ReturnType<typeof weatherAC.setCurrentWeather>
  | ReturnType<typeof weatherAC.setHourlyWeather>
  | ReturnType<typeof weatherAC.setDailyWeather>
  | ReturnType<typeof weatherAC.setGeneralWeather>;

const initialState = {
  currentWeather: {
    icon: null,
    temp: null,
  } as CurrentWeather,
  hourlyWeather: [] as HourlyWeather,
  dailyWeather: [] as DailyWeather,
  weatherForecast: WeatherForecast.HOURLY,
  selectedWeatherAPI: WeatherAPI.OPEN_WEATHER,
};

export const weatherReducer = (
  state: WeatherInitialState = initialState,
  action: WeatherActionsType,
): WeatherInitialState => {
  switch (action.type) {
    case WEATHER_ACTIONS_TYPE.SET_GENERAL_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_HOURLY_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_DAILY_WEATHER: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export const weatherAC = {
  setCurrentWeather(
    currentWeather: WeatherACParam<void>,
  ): PayloadAction<WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER, WeatherACParam<void>> {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER,
      payload: currentWeather,
    } as const;
  },
  setHourlyWeather(
    hourlyWeather: WeatherACParam<WeatherForecast.HOURLY>,
  ): PayloadAction<
    WEATHER_ACTIONS_TYPE.SET_HOURLY_WEATHER,
    WeatherACParam<WeatherForecast.HOURLY>
  > {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_HOURLY_WEATHER,
      payload: hourlyWeather,
    } as const;
  },
  setDailyWeather(
    dailyWeather: WeatherACParam<WeatherForecast.DAILY>,
  ): PayloadAction<
    WEATHER_ACTIONS_TYPE.SET_DAILY_WEATHER,
    WeatherACParam<WeatherForecast.DAILY>
  > {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_DAILY_WEATHER,
      payload: dailyWeather,
    } as const;
  },
  setGeneralWeather(
    generalWeather: WeatherConditionState,
  ): PayloadAction<WEATHER_ACTIONS_TYPE.SET_GENERAL_WEATHER, WeatherConditionState> {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_GENERAL_WEATHER,
      payload: generalWeather,
    } as const;
  },
};