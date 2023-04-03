import { GetOpenWeatherParams, GetOpenWeatherResponseData } from 'api/openWeatherAPI';
import {
  GetVisualCrossingWeatherParams,
  GetVisualCrossingWeatherResponseData,
} from 'api/visualCrossingWeatherAPI';
import { WeatherAPI } from 'store/reducers/weatherReducer/enums';

const CACHE_EXPIRATION_MS = 3.6e6;

type CachedData<T> = {
  metaData: T;
  cacheAddTime: number;
};
type GetWeatherResponseData =
  | GetOpenWeatherResponseData
  | GetVisualCrossingWeatherResponseData;
type GetWeatherParams = GetOpenWeatherParams | GetVisualCrossingWeatherParams;

const checkCacheForValidity = (cacheAddTime: number): boolean => {
  let isCacheValid = true;
  const isExpiredCache = Date.now() - cacheAddTime > CACHE_EXPIRATION_MS;
  const isNextHourCame =
    new Date(Date.now()).getHours() > new Date(cacheAddTime).getHours();

  if (isExpiredCache || isNextHourCame) {
    isCacheValid = false;
  }

  return isCacheValid;
};

const getWeather = (
  coords: GetWeatherParams,
  weatherAPI: WeatherAPI,
): GetWeatherResponseData | undefined => {
  try {
    const key = `${weatherAPI}-${JSON.stringify(coords)}`;
    const valueWeatherData = localStorage.getItem(key);

    if (valueWeatherData) {
      const cachedWeatherData: CachedData<GetWeatherResponseData> =
        JSON.parse(valueWeatherData);
      const isCacheValid = checkCacheForValidity(cachedWeatherData.cacheAddTime);

      if (isCacheValid) {
        return cachedWeatherData.metaData;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const setWeather = (
  coords: GetWeatherParams,
  data: GetWeatherResponseData,
  weatherAPI: WeatherAPI,
): void => {
  try {
    const key = `${weatherAPI}-${JSON.stringify(coords)}`;
    const cachedWeatherData: CachedData<GetWeatherResponseData> = {
      metaData: data,
      cacheAddTime: Date.now(),
    };
    const serializedWeatherData = JSON.stringify(cachedWeatherData);

    localStorage.setItem(key, serializedWeatherData);
  } catch (error) {
    console.log(error);
  }
};

export const cacheAPI = {
  getOpenWeather(coords: GetOpenWeatherParams): GetOpenWeatherResponseData | undefined {
    const cachedWeatherData = getWeather(coords, WeatherAPI.OPEN_WEATHER);

    return cachedWeatherData as GetOpenWeatherResponseData | undefined;
  },
  getVisualCrossingWeather(
    coords: GetVisualCrossingWeatherParams,
  ): GetVisualCrossingWeatherResponseData | undefined {
    const cachedWeatherData = getWeather(coords, WeatherAPI.VISUAL_CROSSING_WEATHER);

    return cachedWeatherData as GetVisualCrossingWeatherResponseData | undefined;
  },
  setOpenWeather(coords: GetOpenWeatherParams, data: GetOpenWeatherResponseData) {
    setWeather(coords, data, WeatherAPI.OPEN_WEATHER);
  },
  setVisualCrossingWeather(
    coords: GetVisualCrossingWeatherParams,
    data: GetVisualCrossingWeatherResponseData,
  ) {
    setWeather(coords, data, WeatherAPI.VISUAL_CROSSING_WEATHER);
  },
  updateCache() {
    const localStorageKeys = Object.keys(localStorage);

    localStorageKeys.forEach(key => {
      const parsedKey = key.split('-');
      const isWeatherKey =
        parsedKey.includes(WeatherAPI.OPEN_WEATHER) ||
        parsedKey.includes(WeatherAPI.VISUAL_CROSSING_WEATHER);

      if (isWeatherKey) {
        const value = localStorage.getItem(key);

        if (value) {
          const parsedValue: CachedData<GetWeatherResponseData> = JSON.parse(value);

          const isCacheValid =
            CACHE_EXPIRATION_MS >= Date.now() - parsedValue.cacheAddTime;

          if (!isCacheValid) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  },
};
