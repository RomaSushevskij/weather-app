import { call, CallEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import { geocodingAPI, weatherAPI } from 'api';
import { Location } from 'api/geocodingAPI/types';
import { GetCurrentWeatherResponse } from 'api/weatherAPI/types';
import { setLocation } from 'store/reducers/weather';
import { CurrentWeather } from 'store/reducers/weather/types';
import {
  setCurrentWeather,
  WeatherActionsType,
} from 'store/reducers/weather/weatherReducer';
import { ActionType } from 'store/types';
import { getCurrentPosition } from 'utils';
import { convertWeatherForState } from 'utils/convertWeatherForState/convertWeatherForState';
import { GetLocationReturned } from 'utils/getCurrentPosition/getCurrentPosition';
import { getDateNowInSeconds } from 'utils/getDateNowInSeconds/getDateNowInSeconds';

export enum weatherActions {
  GET_CURRENT_WEATHER = 'weather/GET_CURRENT_WEATHER',
}

export function* getCurrentWeatherWorkerSaga(): Generator<
  | CallEffect<
      GetLocationReturned | Location | GetCurrentWeatherResponse | CurrentWeather
    >
  | PutEffect<WeatherActionsType>,
  void,
  never
> {
  try {
    const { latitude, longitude }: GetLocationReturned = yield call(getCurrentPosition);
    const location: Location = yield call(geocodingAPI.getLocation, {
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
