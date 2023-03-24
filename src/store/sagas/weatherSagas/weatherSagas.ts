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
import {
  GetOpenWeatherParams,
  GetOpenWeatherResponseData,
  openWeatherAPI,
} from 'api/openWeatherAPI';
import { GetVisualCrossingWeatherResponseData } from 'api/visualCrossingWeatherAPI';
import { appAC, AppActionsType } from 'store/reducers/appReducer/appReducer';
import { WeatherAPI } from 'store/reducers/weatherReducer';
import {
  weatherAC,
  WeatherActionsType,
  WeatherConditionState,
} from 'store/reducers/weatherReducer/weatherReducer';
import { fetchGeolocation } from 'store/sagas/geolocationSagas/geolocationSagas';
import { handleError } from 'store/sagas/handleError/handleError';
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

type FetchOpenWeatherReturned = Generator<
  | CallEffect<GetOpenWeatherResponseData | WeatherConditionState | void>
  | PutEffect<WeatherActionsType>,
  void,
  never
>;

type FetchVisualCrossingWeatherReturned = Generator<
  | CallEffect<GetVisualCrossingWeatherResponseData | WeatherConditionState | void>
  | PutEffect<WeatherActionsType>,
  void,
  never
>;

export enum weatherSagasActionsType {
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
      const coords = {
        latitude: nextLatitude,
        longitude: nextLongitude,
      };

      if (isVisualCrossingAPISelected) {
        yield call(fetchVisualCrossingWeather, coords);
      } else {
        yield call(fetchOpenWeather, coords);
      }
      yield put(weatherAC.setWeatherAPI({ weatherAPI: nextWeatherAPI }));
    }
    yield put(appAC.setStatus({ status: 'succeeded' }));
  } catch (e) {
    yield call(handleError, e);
  }
}

export function* fetchOpenWeather({
  latitude,
  longitude,
}: GetOpenWeatherParams): FetchOpenWeatherReturned {
  try {
    const weather: GetOpenWeatherResponseData = yield call(openWeatherAPI.getWeather, {
      latitude,
      longitude,
    });
    const weatherState: WeatherConditionState = yield call(
      normalizeState.openWeather,
      weather,
    );

    yield put(weatherAC.setGeneralWeather(weatherState));
  } catch (e) {
    yield call(handleError, e);
  }
}

export function* fetchVisualCrossingWeather({
  latitude,
  longitude,
}: GetOpenWeatherParams): FetchVisualCrossingWeatherReturned {
  try {
    const weather: GetVisualCrossingWeatherResponseData = yield call(
      visualCrossingWeatherAPI.getCurrentWeather,
      { latitude, longitude },
    );
    const weatherState: WeatherConditionState = yield call(
      normalizeState.visualCrossingWeather,
      weather,
    );

    yield put(weatherAC.setGeneralWeather(weatherState));
  } catch (e) {
    yield call(handleError, e);
  }
}

export const weatherSagasAC = {
  getWeather(
    params: FetchWeatherParams,
  ): PayloadAction<weatherSagasActionsType.GET_WEATHER, FetchWeatherParams> {
    return {
      type: weatherSagasActionsType.GET_WEATHER,
      payload: params,
    } as const;
  },
};

export function* weatherWatcherSaga(): Generator {
  yield takeLatest(weatherSagasActionsType.GET_WEATHER, fetchWeather);
}
