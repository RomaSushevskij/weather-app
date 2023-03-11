import { call, CallEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import { geocodingAPI, weatherAPI } from 'api';
import { LocationFromAPI } from 'api/geocodingAPI';
import { GetCurrentWeatherResponse } from 'api/weatherAPI/types';
import { ActionType } from 'store';
import { setLocation } from 'store/reducers/weather';
import { CurrentWeather } from 'store/reducers/weather/types';
import {
  setCurrentWeather,
  WeatherActionsType,
} from 'store/reducers/weather/weatherReducer';
import {
  getCurrentPosition,
  GetPositionReturned,
  convertWeatherForState,
  getDateNowInSeconds,
} from 'utils';

export enum weatherActions {
  GET_CURRENT_WEATHER = 'weather/GET_CURRENT_WEATHER',
}

export function* getCurrentWeatherWorkerSaga(): Generator<
  | CallEffect<
      GetPositionReturned | LocationFromAPI | GetCurrentWeatherResponse | CurrentWeather
    >
  | PutEffect<WeatherActionsType>,
  void,
  never
> {
  try {
    const { latitude, longitude }: GetPositionReturned = yield call(getCurrentPosition);
    const location: LocationFromAPI = yield call(geocodingAPI.getLocation, {
      latitude,
      longitude,
    });

    yield put(setLocation(location));
    const weatherFromAPI: GetCurrentWeatherResponse = yield call(
      weatherAPI.getCurrentWeather,
      {
        latitude,
        longitude,
        date1: getDateNowInSeconds(),
      },
    );
    const currentWeather = yield call(convertWeatherForState, weatherFromAPI);

    yield put(setCurrentWeather(currentWeather));
  } catch (e) {
    console.log(e);
  }
}

export const getCurrentWeather = (): ActionType<weatherActions, void> => ({
  type: weatherActions.GET_CURRENT_WEATHER,
});

export function* weatherWatcherSaga(): Generator {
  yield takeEvery(weatherActions.GET_CURRENT_WEATHER, getCurrentWeatherWorkerSaga);
}
