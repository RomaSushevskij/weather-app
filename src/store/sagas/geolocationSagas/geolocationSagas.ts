import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { geocodeAPI } from 'api';
import { Geolocation } from 'api/geocodeAPI/types';
import {
  geolocationAC,
  GeolocationActionsType,
} from 'store/reducers/geolocationReducer/geolocationReducer';
import { FetchWeatherParams } from 'store/sagas/weather/weatherSagas';
import { getCurrentPosition, GetPositionReturned } from 'utils';

type FetchGeolocationParams = Omit<FetchWeatherParams, 'weatherAPI'>;

export type FetchGeolocationReturned = Generator<
  CallEffect<GetPositionReturned | Geolocation> | PutEffect<GeolocationActionsType>,
  void,
  never
>;

export function* fetchGeolocation(
  locality?: FetchGeolocationParams,
): FetchGeolocationReturned {
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
}
