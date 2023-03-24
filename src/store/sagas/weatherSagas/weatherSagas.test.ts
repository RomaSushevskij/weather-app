import { cloneableGenerator } from '@redux-saga/testing-utils';
import { AxiosError } from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { visualCrossingWeatherAPI } from 'api';
import { GetOpenWeatherResponseData, openWeatherAPI } from 'api/openWeatherAPI';
import { GetVisualCrossingWeatherResponseData } from 'api/visualCrossingWeatherAPI';
import { EMPTY_STRING } from 'constantsGlobal';
import { appAC } from 'store/reducers/appReducer/appReducer';
import { weatherAC, WeatherAPI } from 'store/reducers/weatherReducer';
import { WeatherConditionState } from 'store/reducers/weatherReducer/weatherReducer';
import { fetchGeolocation } from 'store/sagas/geolocationSagas';
import { handleError } from 'store/sagas/handleError/handleError';
import {
  fetchOpenWeather,
  fetchVisualCrossingWeather,
  fetchWeather,
  weatherSagasAC,
  weatherSagasActionsType,
} from 'store/sagas/weatherSagas/weatherSagas';
import { geolocationSelectors, weatherSelectors } from 'store/selectors';
import { normalizeState } from 'utils';
import {
  openWeatherData,
  visualCrossingWeatherData,
} from 'utils/normalizeState/normalizeState.test';

describe('Call fetchOpenWeather should work correct', () => {
  const latitude = 10;
  const longitude = 20;
  const weather: GetOpenWeatherResponseData = openWeatherData;
  const weatherState: WeatherConditionState = normalizeState.openWeather(weather);
  const gen = cloneableGenerator(fetchOpenWeather)({ latitude, longitude });

  it('Call fetchOpenWeather without errors', () => {
    const genClone = gen.clone();

    expect(genClone.next().value).toEqual(
      call(openWeatherAPI.getWeather, {
        latitude,
        longitude,
      }),
    );

    expect(genClone.next(weather).value).toEqual(
      call(normalizeState.openWeather, weather),
    );

    expect(genClone.next(weatherState).value).toEqual(
      put(weatherAC.setGeneralWeather(weatherState)),
    );
  });

  it('Call fetchOpenWeather with errors', () => {
    const error = new AxiosError('Axios error');
    const genClone = gen.clone();

    genClone.next();
    if (genClone.throw) {
      expect(genClone.throw(error).value).toEqual(call(handleError, error));
    }
  });
});

describe('Call fetchVisualCrossingWeather should work correct', () => {
  const latitude = 10;
  const longitude = 20;
  const weather: GetVisualCrossingWeatherResponseData = visualCrossingWeatherData;
  const weatherState: WeatherConditionState =
    normalizeState.visualCrossingWeather(weather);
  const gen = cloneableGenerator(fetchVisualCrossingWeather)({ latitude, longitude });

  it('Call fetchVisualCrossingWeather without errors', () => {
    const genClone = gen.clone();

    expect(genClone.next().value).toEqual(
      call(visualCrossingWeatherAPI.getCurrentWeather, { latitude, longitude }),
    );

    expect(genClone.next(weather).value).toEqual(
      call(normalizeState.visualCrossingWeather, weather),
    );

    expect(genClone.next(weatherState).value).toEqual(
      put(weatherAC.setGeneralWeather(weatherState)),
    );
  });

  it('Call fetchVisualCrossingWeather with errors', () => {
    const error = new AxiosError('Axios error');
    const genClone = gen.clone();

    genClone.next();
    if (genClone.throw) {
      expect(genClone.throw(error).value).toEqual(call(handleError, error));
    }
  });
});

describe('Call weatherSaga should work correct', () => {
  it('Call weatherSaga with empty localityName', () => {
    const action: ReturnType<typeof weatherSagasAC.getWeather> = {
      type: weatherSagasActionsType.GET_WEATHER,
      payload: { localityName: EMPTY_STRING, weatherAPI: WeatherAPI.OPEN_WEATHER },
    };
    const latitude = 10;
    const longitude = 20;

    const gen = fetchWeather(action);

    expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'loading' })));
    expect(gen.next().value).toEqual(select(geolocationSelectors.city));
    expect(gen.next().value).toEqual(select(geolocationSelectors.country));
    expect(gen.next().value).toEqual(select(weatherSelectors.weatherAPI));
    expect(gen.next().value).toEqual(select(geolocationSelectors.latitude));
    expect(gen.next().value).toEqual(select(geolocationSelectors.longitude));
    expect(gen.next().value).toEqual(call(fetchGeolocation));
    expect(gen.next().value).toEqual(select(geolocationSelectors.latitude));
    expect(gen.next().value).toEqual(select(geolocationSelectors.longitude));
    expect(gen.next({ latitude, longitude }).value).toEqual(
      call(fetchOpenWeather, { latitude: 1, longitude: 2 }),
    );

    // expect(gen.next().value).toEqual(
    //   put(weatherAC.setWeatherAPI({ weatherAPI: action.payload.weatherAPI })),
    // );
    // expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'succeeded' })));
  });
});
