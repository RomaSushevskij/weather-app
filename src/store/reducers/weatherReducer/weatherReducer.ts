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
  SET_FORECAST_TYPE = 'weather/SET_FORECAST_TYPE',
  SET_WEATHER_API = 'weather/SET_WEATHER_API',
}

export type WeatherInitialState = typeof initialState;
export type WeatherConditionState = Omit<
  WeatherInitialState,
  'weatherAPI' | 'weatherForecast'
>;

type WeatherACParam<T = void, F = void> = F extends WeatherForecast
  ? { weatherForecast: WeatherForecast }
  : T extends WeatherAPI
  ? { weatherAPI: WeatherAPI }
  : T extends WeatherForecast.HOURLY
  ? { hourlyWeather: HourlyWeather }
  : T extends WeatherForecast.DAILY
  ? { dailyWeather: DailyWeather }
  : T extends void
  ? { currentWeather: CurrentWeather }
  : { generalWeather: WeatherInitialState };

export type WeatherActionsType =
  | ReturnType<typeof weatherAC.setCurrentWeather>
  | ReturnType<typeof weatherAC.setHourlyWeather>
  | ReturnType<typeof weatherAC.setDailyWeather>
  | ReturnType<typeof weatherAC.setGeneralWeather>
  | ReturnType<typeof weatherAC.setForecastType>
  | ReturnType<typeof weatherAC.setWeatherAPI>;

const initialState = {
  currentWeather: {
    icon: null,
    temp: null,
  } as CurrentWeather,
  hourlyWeather: [] as HourlyWeather,
  dailyWeather: [] as DailyWeather,
  weatherForecast: WeatherForecast.HOURLY,
  weatherAPI: WeatherAPI.OPEN_WEATHER,
};

export const weatherReducer = (
  state: WeatherInitialState = initialState,
  action: WeatherActionsType,
): WeatherInitialState => {
  switch (action.type) {
    case WEATHER_ACTIONS_TYPE.SET_GENERAL_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_CURRENT_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_HOURLY_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_DAILY_WEATHER:
    case WEATHER_ACTIONS_TYPE.SET_FORECAST_TYPE:
    case WEATHER_ACTIONS_TYPE.SET_WEATHER_API: {
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
  setForecastType(
    forecastType: WeatherACParam<void, WeatherForecast>,
  ): PayloadAction<
    WEATHER_ACTIONS_TYPE.SET_FORECAST_TYPE,
    WeatherACParam<void, WeatherForecast>
  > {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_FORECAST_TYPE,
      payload: forecastType,
    };
  },
  setWeatherAPI(
    weatherAPI: WeatherACParam<WeatherAPI>,
  ): PayloadAction<WEATHER_ACTIONS_TYPE.SET_WEATHER_API, WeatherACParam<WeatherAPI>> {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_WEATHER_API,
      payload: weatherAPI,
    };
  },
};
