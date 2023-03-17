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
import { checkIfGeolocationIsRequired, normalizeState } from 'utils';

export enum weatherActions {
  GET_OPEN_WEATHER = 'weather/GET_OPEN_WEATHER',
}

export type FetchWeatherParams = {
  localityName: string;
  weatherAPI: WeatherAPI;
};

type FetchWeatherReturned = Generator<
  | CallEffect<GetOpenWeatherResponseData | GetVisualCrossingWeatherResponseData | void>
  | PutEffect<WeatherActionsType | AppActionsType>
  | SelectEffect,
  void,
  never
>;

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
    if (e instanceof TypeError) {
      console.log('Nothing found for your request');
      yield put(
        appAC.setErrorMessage({ errorMessage: 'Nothing found for your request' }),
      );
    } else {
      yield put(appAC.setErrorMessage({ errorMessage: e as string }));
      console.log(e);
    }
    yield put(appAC.setStatus({ status: 'failed' }));
  }
}

export const weatherSagasAC = {
  getWeather(params: FetchWeatherParams): {
    type: weatherActions.GET_OPEN_WEATHER;
    payload: FetchWeatherParams;
  } {
    return {
      type: weatherActions.GET_OPEN_WEATHER,
      payload: params,
    } as const;
  },
};

export function* weatherWatcherSaga(): Generator {
  yield takeLatest(weatherActions.GET_OPEN_WEATHER, fetchWeather);
}
