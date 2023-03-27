import { call, put } from 'redux-saga/effects';

import { fetchGeolocation, FetchGeolocationParams } from './geolocationSagas';

import { geocodeAPI } from 'api';
import { Geolocation } from 'api/geocodeAPI/types';
import { errorMessages } from 'enum';
import { setGeolocationToLocalStorage } from 'services/localStorage';
import { appAC } from 'store/reducers/appReducer';
import { geolocationAC } from 'store/reducers/geolocationReducer';
import { weatherAC } from 'store/reducers/weatherReducer';
import { getCurrentPosition, getMyTimeZoneOffset, GetPositionReturned } from 'utils';

describe('fetchGeolocation should work correct', () => {
  const localityEmpty: FetchGeolocationParams = { localityName: '' };
  const localityFull: FetchGeolocationParams = { localityName: 'Minsk' };
  const position: GetPositionReturned = { latitude: 10, longitude: 20 };
  const geoLocation: Geolocation = {
    lat: position.latitude,
    lon: position.longitude,
    city: 'City',
    country: 'Country',
  };

  it('Call fetchGeolocation with full localityName', () => {
    const gen = fetchGeolocation(localityFull);

    expect(gen.next().value).toEqual(
      call(geocodeAPI.search, {
        localityName: localityFull.localityName,
      }),
    );
    // @ts-ignore
    expect(gen.next(geoLocation).value).toEqual(
      put(geolocationAC.setLocation(geoLocation)),
    );
    expect(gen.next().value).toEqual(call(setGeolocationToLocalStorage, geoLocation));
    expect(gen.next().done).toBeTruthy();
  });

  it('Call fetchGeolocation with empty localityName', () => {
    const gen = fetchGeolocation(localityEmpty);

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
    expect(gen.next().value).toEqual(call(setGeolocationToLocalStorage, geoLocation));
    expect(gen.next().done).toBeTruthy();
  });

  it('Call fetchGeolocation with error', () => {
    const gen = fetchGeolocation(localityFull);

    const errorMessage = new TypeError('Request failed');

    gen.next();
    expect(gen.throw(errorMessage).value).toEqual(
      put(appAC.setErrorMessage({ errorMessage: errorMessages.NOTHING_FOUND })),
    );

    expect(gen.next().value).toEqual(
      put(geolocationAC.setLocation({ lon: null, city: null, lat: null, country: null })),
    );
    expect(gen.next().value).toEqual(
      put(
        weatherAC.setGeneralWeather({
          hourlyWeather: [],
          dailyWeather: [],
          currentWeather: { icon: null, temp: null },
          timeZoneOffset: getMyTimeZoneOffset(),
        }),
      ),
    );

    expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'failed' })));
    expect(gen.next().done).toBeTruthy();
  });
});
