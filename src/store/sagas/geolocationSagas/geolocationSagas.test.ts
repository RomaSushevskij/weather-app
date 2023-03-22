import { call, put } from 'redux-saga/effects';

import { geolocationAC } from '../../reducers/geolocationReducer/geolocationReducer';

import { fetchGeolocation, FetchGeolocationParams } from './geolocationSagas';

import { geocodeAPI } from 'api';
import { Geolocation } from 'api/geocodeAPI/types';
import { getCurrentPosition, GetPositionReturned } from 'utils';

test('Call fetchGeolocation with empty localityName', () => {
  const locality: FetchGeolocationParams = { localityName: '' };
  const position: GetPositionReturned = { latitude: 10, longitude: 20 };
  const geoLocation: Geolocation = {
    lat: position.latitude,
    lon: position.longitude,
    city: 'City',
    country: 'Country',
  };

  const gen = fetchGeolocation(locality);

  expect(gen.next().value).toEqual(call(getCurrentPosition));
  // @ts-ignore
  expect(gen.next(position).value).toEqual(
    call(geocodeAPI.reverse, {
      latitude: position.latitude,
      longitude: position.longitude,
    }),
  );
  // @ts-ignore
  expect(gen.next(geoLocation).value).toEqual(
    put(geolocationAC.setLocation(geoLocation)),
  );
  expect(gen.next().done).toBeTruthy();
});
