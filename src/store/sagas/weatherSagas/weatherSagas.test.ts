import { call, put, select } from 'redux-saga/effects';

import { EMPTY_STRING } from 'constantsGlobal';
import { appAC } from 'store/reducers/appReducer/appReducer';
import { WeatherAPI } from 'store/reducers/weatherReducer';
import { fetchGeolocation } from 'store/sagas/geolocationSagas';
import {
  fetchWeather,
  weatherActionsType,
  weatherSagasAC,
} from 'store/sagas/weatherSagas/weatherSagas';
import { geolocationSelectors, weatherSelectors } from 'store/selectors';

test('Call weatherSaga with empty localityName', () => {
  const action: ReturnType<typeof weatherSagasAC.getWeather> = {
    type: weatherActionsType.GET_WEATHER,
    payload: { localityName: EMPTY_STRING, weatherAPI: WeatherAPI.OPEN_WEATHER },
  };
  const gen = fetchWeather(action);

  expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'loading' })));
  expect(gen.next().value).toEqual(select(geolocationSelectors.city));
  expect(gen.next().value).toEqual(select(geolocationSelectors.country));
  expect(gen.next().value).toEqual(select(weatherSelectors.weatherAPI));
  expect(gen.next().value).toEqual(select(geolocationSelectors.latitude));
  expect(gen.next().value).toEqual(select(geolocationSelectors.longitude));
  expect(gen.next().value).toEqual(call(fetchGeolocation));
});
