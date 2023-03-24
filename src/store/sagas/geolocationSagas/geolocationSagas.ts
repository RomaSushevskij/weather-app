import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { geocodeAPI } from 'api';
import { Geolocation } from 'api/geocodeAPI/types';
import { errorMessages } from 'enum';
import { appAC, AppActionsType } from 'store/reducers/appReducer/appReducer';
import {
  geolocationAC,
  GeolocationActionsType,
} from 'store/reducers/geolocationReducer/geolocationReducer';
import { handleError } from 'store/sagas/handleError/handleError';
import { FetchWeatherParams } from 'store/sagas/weatherSagas/weatherSagas';
import { getCurrentPosition, GetPositionReturned } from 'utils';

export type FetchGeolocationParams = Omit<FetchWeatherParams, 'weatherAPI'>;

export type FetchGeolocationReturned = Generator<
  | CallEffect<GetPositionReturned | Geolocation | void>
  | PutEffect<GeolocationActionsType | AppActionsType>,
  void,
  never
>;

export function* fetchGeolocation(
  locality?: FetchGeolocationParams,
): FetchGeolocationReturned {
  try {
    let location: Geolocation;

    if (locality?.localityName) {
      location = yield call(geocodeAPI.search, {
        localityName: locality?.localityName,
      });
    } else {
      const { latitude, longitude }: GetPositionReturned = yield call(getCurrentPosition);

      location = yield call(geocodeAPI.reverse, {
        latitude,
        longitude,
      });
    }
    yield put(geolocationAC.setLocation(location));
  } catch (e) {
    if (e instanceof TypeError) {
      yield put(appAC.setErrorMessage({ errorMessage: errorMessages.NOTHING_FOUND }));
      yield put(appAC.setStatus({ status: 'failed' }));
    } else {
      yield call(handleError, e);
    }
  }
}
