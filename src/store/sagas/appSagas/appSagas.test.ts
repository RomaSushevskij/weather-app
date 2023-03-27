import { cloneableGenerator } from '@redux-saga/testing-utils';
import { AxiosError } from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { EMPTY_STRING } from 'constantsGlobal';
import { cacheAPI } from 'services/localStorage';
import { appAC } from 'store/reducers/appReducer';
import { GeolocationData } from 'store/reducers/geolocationReducer';
import { WeatherAPI } from 'store/reducers/weatherReducer/enums';
import { initializeApp } from 'store/sagas/appSagas';
import { checkAuthorizationInfo } from 'store/sagas/authSagas';
import { handleError } from 'store/sagas/handleError';
import { fetchWeather, weatherSagasActionsType } from 'store/sagas/weatherSagas';
import { geolocationSelectors, weatherSelectors } from 'store/selectors';

describe('Call initializeApp should work correct', () => {
  const weatherAPI: WeatherAPI = WeatherAPI.OPEN_WEATHER;
  const geolocation: GeolocationData = {
    country: 'Belarus',
    city: 'Gomel',
    lon: 52,
    lat: 31,
  };
  const gen = cloneableGenerator(initializeApp)();

  it('Call initializeApp without errors', () => {
    const genClone = gen.clone();

    expect(genClone.next().value).toEqual(select(weatherSelectors.weatherAPI));
    expect(genClone.next(weatherAPI).value).toEqual(
      select(geolocationSelectors.geoLocation),
    );
    expect(genClone.next(geolocation).value).toEqual(call(cacheAPI.updateCache));
    expect(genClone.next().value).toEqual(
      call(fetchWeather, {
        type: weatherSagasActionsType.GET_WEATHER,
        payload: {
          weatherAPI,
          localityName: geolocation.city || geolocation.country || EMPTY_STRING,
        },
      }),
    );

    expect(genClone.next().value).toEqual(call(checkAuthorizationInfo));
    expect(genClone.next().value).toEqual(
      put(appAC.setInitialized({ isInitialized: true })),
    );
    expect(genClone.next().done).toBeTruthy();
  });
  it('Call initializeApp with some errors', () => {
    const genClone = gen.clone();
    const error = new AxiosError('Request failed');

    genClone.next();
    // @ts-ignore
    expect(genClone.throw(error).value).toEqual(call(handleError, error));
    expect(genClone.next().done).toBeTruthy();
  });
});
