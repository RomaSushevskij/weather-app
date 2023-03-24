import {
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLatest,
} from 'redux-saga/effects';

import { visualCrossingWeatherAPI } from 'api';
import { GetOpenWeatherResponseData, openWeatherAPI } from 'api/openWeatherAPI';
import { GetVisualCrossingWeatherResponseData } from 'api/visualCrossingWeatherAPI';
import { appAC, AppActionsType } from 'store/reducers/appReducer/appReducer';
import { WeatherAPI } from 'store/reducers/weatherReducer';
import {
  weatherAC,
  WeatherActionsType,
} from 'store/reducers/weatherReducer/weatherReducer';
import { fetchGeolocation } from 'store/sagas/geolocationSagas/geolocationSagas';
import { geolocationSelectors, weatherSelectors } from 'store/selectors';
import { PayloadAction } from 'store/types';
import { checkIfGeolocationIsRequired, normalizeState } from 'utils';

export type FetchWeatherParams = {
  localityName: string;
  weatherAPI: WeatherAPI;
};

export type FetchWeatherReturned = Generator<
  | CallEffect<GetOpenWeatherResponseData | GetVisualCrossingWeatherResponseData | void>
  | PutEffect<WeatherActionsType | AppActionsType>
  | SelectEffect,
  void,
  never
>;

export enum weatherActionsType {
  GET_WEATHER = 'weather/GET_WEATHER',
}

export function* fetchWeather(
  action: ReturnType<typeof weatherSagasAC.getWeather>,
): FetchWeatherReturned {
  try {
    yield put(appAC.setStatus({ status: 'loading' }));

    const prevCity = yield select(geolocationSelectors.city);
    const prevCountry = yield select(geolocationSelectors.country);
    const prevWeatherAPI = yield select(weatherSelectors.weatherAPI);
    const nextLocalityName = action.payload.localityName;
    const prevLatitude = yield select(geolocationSelectors.latitude);
    const prevLongitude = yield select(geolocationSelectors.longitude);
    const nextWeatherAPI = action.payload.weatherAPI;

    const isVisualCrossingAPISelected =
      action.payload.weatherAPI === WeatherAPI.VISUAL_CROSSING_WEATHER;
    const isWeatherAPIChanged = prevWeatherAPI !== nextWeatherAPI;
    const isLocalityNameChanged = checkIfGeolocationIsRequired({
      searchLocality: nextLocalityName,
      stateCity: prevCity,
      stateCountry: prevCountry,
    });

    if (isLocalityNameChanged) {
      if (nextLocalityName) {
        yield call(fetchGeolocation, { localityName: nextLocalityName });
      } else {
        yield call(fetchGeolocation);
      }
    }

    const nextLatitude = yield select(geolocationSelectors.latitude);
    const nextLongitude = yield select(geolocationSelectors.longitude);
    const isNextCoordsMatchPrev =
      nextLatitude === prevLatitude && nextLongitude === prevLongitude;

    if (
      (!isNextCoordsMatchPrev && nextLatitude && nextLongitude) ||
      isWeatherAPIChanged
    ) {
      if (isVisualCrossingAPISelected) {
        const weather: GetVisualCrossingWeatherResponseData = yield call(
          visualCrossingWeatherAPI.getCurrentWeather,
          { latitude: nextLatitude, longitude: nextLongitude },
        );
        const weatherState = normalizeState.visualCrossingWeather(weather);

        yield put(weatherAC.setGeneralWeather(weatherState));
      } else {
        const weather: GetOpenWeatherResponseData = yield call(
          openWeatherAPI.getWeather,
          {
            latitude: nextLatitude,
            longitude: nextLongitude,
          },
        );
        const weatherState = normalizeState.openWeather(weather);

        yield put(weatherAC.setGeneralWeather(weatherState));
      }
      yield put(weatherAC.setWeatherAPI({ weatherAPI: nextWeatherAPI }));
    }
    yield put(appAC.setStatus({ status: 'succeeded' }));
  } catch (e) {
    console.log(e);
    yield put(appAC.setStatus({ status: 'failed' }));
  }
}

export const weatherSagasAC = {
  getWeather(
    params: FetchWeatherParams,
  ): PayloadAction<weatherActionsType.GET_WEATHER, FetchWeatherParams> {
    return {
      type: weatherActionsType.GET_WEATHER,
      payload: params,
    } as const;
  },
};

export function* weatherWatcherSaga(): Generator {
  yield takeLatest(weatherActionsType.GET_WEATHER, fetchWeather);
}
