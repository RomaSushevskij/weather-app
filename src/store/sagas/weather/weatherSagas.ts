import { call, CallEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import { geocodingAPI, weatherAPI } from 'api';
import { LocationFromGeoAPI } from 'api/geocodingAPI';
import { GetCurrentWeatherResponse } from 'api/weatherAPI/types';
import { ActionType } from 'store';
import { setLocation } from 'store/reducers/weather';
import { CurrentWeather } from 'store/reducers/weather/types';
import {
  setCurrentWeather,
  WeatherActionsType,
} from 'store/reducers/weather/weatherReducer';
import {
  convertWeatherForState,
  getCurrentPosition,
  getDateNowInSeconds,
  GetPositionReturned,
} from 'utils';
import {
  convertLocationFromGeoAPIForState,
  convertLocationFromWeatherAPIForState,
} from 'utils/convertLocationForState';

export enum weatherActions {
  GET_CURRENT_WEATHER_BY_MY_COORDS = 'weather/GET_CURRENT_WEATHER_BY_MY_COORDS',
  GET_CURRENT_WEATHER_BY_CITY_NAME = 'weather/GET_CURRENT_WEATHER_BY_CITY_NAME',
}

type GetCurrentWeatherWorkerSagaReturned = Generator<
  | CallEffect<
      | GetPositionReturned
      | LocationFromGeoAPI
      | GetCurrentWeatherResponse
      | CurrentWeather
    >
  | PutEffect<WeatherActionsType>,
  void,
  never
>;

export function* fetchCurrentWeatherByMyCoords(): GetCurrentWeatherWorkerSagaReturned {
  try {
    const { latitude, longitude }: GetPositionReturned = yield call(getCurrentPosition);
    const location: LocationFromGeoAPI = yield call(geocodingAPI.getLocation, {
      latitude,
      longitude,
    });
    const locationForState = convertLocationFromGeoAPIForState(location);

    yield put(setLocation(locationForState));
    const weatherFromAPI: GetCurrentWeatherResponse = yield call(
      weatherAPI.getCurrentWeather,
      {
        latitude,
        longitude,
        date1: getDateNowInSeconds(),
      },
    );
    const currentWeather: CurrentWeather = yield call(
      convertWeatherForState,
      weatherFromAPI,
    );

    yield put(setCurrentWeather(currentWeather));
  } catch (e) {
    console.log(e);
  }
}

export function* fetchCurrentWeatherByCityName(
  action: ReturnType<typeof getCurrentWeatherByCityName>,
): GetCurrentWeatherWorkerSagaReturned {
  try {
    const cityName = action.payload?.cityName;
    const weatherFromAPI: GetCurrentWeatherResponse = yield call(
      weatherAPI.getCurrentWeather,
      {
        cityName,
        date1: getDateNowInSeconds(),
      },
    );

    const currentWeather: CurrentWeather = yield call(
      convertWeatherForState,
      weatherFromAPI,
    );
    const locationForState = convertLocationFromWeatherAPIForState(weatherFromAPI);

    yield put(setCurrentWeather(currentWeather));
    yield put(setLocation(locationForState));
  } catch (e) {
    console.log(e);
  }
}

export const getCurrentWeatherByMyCoords = (): ActionType<weatherActions, void> =>
  ({
    type: weatherActions.GET_CURRENT_WEATHER_BY_MY_COORDS,
  } as const);

export const getCurrentWeatherByCityName = (
  cityName?: string,
): ActionType<weatherActions, { cityName?: string }> =>
  ({
    type: weatherActions.GET_CURRENT_WEATHER_BY_CITY_NAME,
    payload: { cityName },
  } as const);

export function* weatherWatcherSaga(): Generator {
  yield takeEvery(
    weatherActions.GET_CURRENT_WEATHER_BY_MY_COORDS,
    fetchCurrentWeatherByMyCoords,
  );
  yield takeEvery(
    weatherActions.GET_CURRENT_WEATHER_BY_CITY_NAME,
    fetchCurrentWeatherByCityName,
  );
}
