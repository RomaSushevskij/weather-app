import { Location } from 'api/geocodingAPI/types';
import {
  setLocation,
  WeatherInitialState,
  weatherReducer,
} from 'store/reducers/weather/weatherReducer';

let startState: WeatherInitialState;

beforeEach(() => {
  startState = {
    location: {
      latitude: null,
      longitude: null,
      cityName: null,
      country: null,
    },
    currentWeather: {
      hourlyWeather: [],
      icon: null,
      temp: null,
    },
    dailyWeather: [],
  };
});

test('The current location should be added to the state', () => {
  const location: Location = {
    lat: 52.4231,
    lon: 31.0136,
    name: 'Homiel',
    country: 'BY',
    state: 'Gomel',
  };

  const action = setLocation(location);

  const endState = weatherReducer(startState, action);

  expect(endState.location.country).toBe(location.country);
  expect(endState.location.cityName).toBe(location.name);
  expect(endState.location.longitude).toBe(location.lon);
  expect(endState.location.latitude).toBe(location.lat);
});
