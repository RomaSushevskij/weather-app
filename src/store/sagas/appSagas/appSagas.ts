import {
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLatest,
} from 'redux-saga/effects';

import { EMPTY_STRING } from 'constantsGlobal';
import { appAC, AppActionsType } from 'store/reducers/appReducer/appReducer';
import { GeolocationData } from 'store/reducers/geolocationReducer';
import {
  checkAuthorizationInfo,
  CheckAuthorizationInfoReturned,
} from 'store/sagas/authSagas/authSagas';
import { handleError } from 'store/sagas/handleError/handleError';
import {
  fetchWeather,
  FetchWeatherReturned,
  weatherSagasActionsType,
} from 'store/sagas/weatherSagas/weatherSagas';
import { geolocationSelectors, weatherSelectors } from 'store/selectors';
import { Action } from 'store/types';

export type InitializeAppReturned = Generator<
  | FetchWeatherReturned
  | PutEffect<AppActionsType>
  | CallEffect<void | CheckAuthorizationInfoReturned>
  | SelectEffect,
  void,
  never
>;

export enum appActionsType {
  INITIALIZE_APP = 'app/INITIALIZE_APP',
}

export function* initializeApp(): InitializeAppReturned {
  try {
    const weatherAPI = yield select(weatherSelectors.weatherAPI);
    const geolocation: GeolocationData = yield select(geolocationSelectors.geoLocation);

    yield call(fetchWeather, {
      type: weatherSagasActionsType.GET_WEATHER,
      payload: {
        weatherAPI,
        localityName: geolocation.city || geolocation.country || EMPTY_STRING,
      },
    });
    yield call(checkAuthorizationInfo);
    yield put(appAC.setInitialized({ isInitialized: true }));
  } catch (e) {
    yield call(handleError, e);
  }
}

export const appSagasAC = {
  initializeApp(): Action<appActionsType.INITIALIZE_APP> {
    return {
      type: appActionsType.INITIALIZE_APP,
    } as const;
  },
};

export function* appWatcherSaga(): Generator {
  yield takeLatest(appActionsType.INITIALIZE_APP, initializeApp);
}
