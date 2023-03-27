import {
  geolocationAC,
  GeolocationInitialState,
  geolocationReducer,
  GeolocationData,
} from 'store/reducers/geolocationReducer';

let startState: GeolocationInitialState;

beforeEach(() => {
  startState = {
    lat: null,
    lon: null,
    city: null,
    country: null,
  } as GeolocationData;
});

test('The current location should be added to the state', () => {
  const location: GeolocationData = {
    lat: 52.4231,
    lon: 31.0136,
    city: 'Homiel',
    country: 'BY',
  };

  const action = geolocationAC.setLocation(location);

  const endState = geolocationReducer(startState, action);

  expect(endState.country).toBe(location.country);
  expect(endState.city).toBe(location.city);
  expect(endState.lon).toBe(location.lon);
  expect(endState.lat).toBe(location.lat);
});
