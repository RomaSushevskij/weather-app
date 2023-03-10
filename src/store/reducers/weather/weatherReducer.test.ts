import { weatherIcons } from 'api/weatherAPI';
import { CurrentWeather, LocationFromState } from 'store/reducers/weather/types';
import {
  setCurrentWeather,
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
  const location: LocationFromState = {
    latitude: 52.4231,
    longitude: 31.0136,
    cityName: 'Homiel',
    country: 'BY',
  };

  const action = setLocation(location);

  const endState = weatherReducer(startState, action);

  expect(endState.location.country).toBe(location.country);
  expect(endState.location.cityName).toBe(location.cityName);
  expect(endState.location.longitude).toBe(location.longitude);
  expect(endState.location.latitude).toBe(location.latitude);
});

test('The current weather should be added to the state', () => {
  const currentWeather: CurrentWeather = {
    temp: 0,
    icon: weatherIcons.CLEAR_DAY,
    hourlyWeather: [
      { temp: 0, icon: weatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200000 },
      { temp: 1, icon: weatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200001 },
      { temp: 2, icon: weatherIcons.PARTLY_CLOUDY_DAY, datetimeEpoch: 1678327200002 },
    ],
  };

  const action = setCurrentWeather(currentWeather);
  const endState = weatherReducer(startState, action);

  expect(endState.currentWeather.icon).toBe(currentWeather.icon);
  expect(endState.currentWeather.temp).toBe(currentWeather.temp);
  expect(endState.currentWeather.hourlyWeather).toEqual(currentWeather.hourlyWeather);
});
