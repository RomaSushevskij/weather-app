import {
  WeatherAPI,
  WeatherForecast,
  WeatherIcons,
} from 'store/reducers/weatherReducer/enums';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from 'store/reducers/weatherReducer/types';
import {
  weatherAC,
  WeatherConditionState,
  WeatherInitialState,
  weatherReducer,
} from 'store/reducers/weatherReducer/weatherReducer';

let startState: WeatherInitialState;

beforeEach(() => {
  startState = {
    currentWeather: {
      icon: null,
      temp: null,
    },
    hourlyWeather: [] as HourlyWeather,
    dailyWeather: [] as DailyWeather,
    weatherAPI: WeatherAPI.OPEN_WEATHER,
    weatherForecast: WeatherForecast.HOURLY,
    timeZoneOffset: null,
  };
});

test('The current weatherSagas should be added to the state', () => {
  const currentWeather: CurrentWeather = {
    temp: 0,
    icon: WeatherIcons.CLEAR_DAY,
  };

  const action = weatherAC.setCurrentWeather({ currentWeather });
  const endState = weatherReducer(startState, action);

  expect(endState.currentWeather.icon).toBe(currentWeather.icon);
  expect(endState.currentWeather.temp).toBe(currentWeather.temp);
});

test('The hourly weatherSagas should be added to the state', () => {
  const hourlyWeather: HourlyWeather = [
    { temp: 0, icon: WeatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200000 },
    { temp: 1, icon: WeatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200001 },
    { temp: 2, icon: WeatherIcons.PARTLY_CLOUDY_DAY, datetimeEpoch: 1678327200002 },
  ];

  const action = weatherAC.setHourlyWeather({ hourlyWeather });
  const endState = weatherReducer(startState, action);

  expect(endState.hourlyWeather).toEqual(hourlyWeather);
});

test('The daily weatherSagas should be added to the state', () => {
  const dailyWeather: DailyWeather = [
    { temp: 0, icon: WeatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200000 },
    { temp: 1, icon: WeatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200001 },
    { temp: 2, icon: WeatherIcons.PARTLY_CLOUDY_DAY, datetimeEpoch: 1678327200002 },
  ];

  const action = weatherAC.setDailyWeather({ dailyWeather });
  const endState = weatherReducer(startState, action);

  expect(endState.dailyWeather).toEqual(dailyWeather);
});

test('The weatherSagas should be added to the state', () => {
  const weatherData: WeatherConditionState = {
    currentWeather: {
      icon: WeatherIcons.CLEAR_DAY,
      temp: 1.2,
    },
    hourlyWeather: [
      { temp: 0, icon: WeatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200000 },
      { temp: 1, icon: WeatherIcons.CLEAR_DAY, datetimeEpoch: 1678327200001 },
      { temp: 2, icon: WeatherIcons.PARTLY_CLOUDY_DAY, datetimeEpoch: 1678327200002 },
    ],
    dailyWeather: [
      { temp: 3, icon: WeatherIcons.SNOW_SHOWERS_DAY, datetimeEpoch: 1678327200003 },
      { temp: 4, icon: WeatherIcons.SHOWERS_DAY, datetimeEpoch: 1678327200004 },
      { temp: 5, icon: WeatherIcons.PARTLY_CLOUDY_DAY, datetimeEpoch: 1678327200005 },
    ],
    timeZoneOffset: null,
  };

  const action = weatherAC.setGeneralWeather(weatherData);
  const endState = weatherReducer(startState, action);

  expect(endState.currentWeather).toEqual(weatherData.currentWeather);
  expect(endState.hourlyWeather).toEqual(weatherData.hourlyWeather);
  expect(endState.dailyWeather).toEqual(weatherData.dailyWeather);
});

test('The correct weatherForecast value should be set to the state', () => {
  const action = weatherAC.setForecastType({ weatherForecast: WeatherForecast.DAILY });

  const endState = weatherReducer(startState, action);

  expect(startState.weatherForecast).toBe(WeatherForecast.HOURLY);
  expect(endState.weatherForecast).toBe(WeatherForecast.DAILY);
});

test('The correct weatherAPI value should be set to the state', () => {
  const action = weatherAC.setWeatherAPI({
    weatherAPI: WeatherAPI.VISUAL_CROSSING_WEATHER,
  });

  const endState = weatherReducer(startState, action);

  expect(startState.weatherAPI).toBe(WeatherAPI.OPEN_WEATHER);
  expect(endState.weatherAPI).toBe(WeatherAPI.VISUAL_CROSSING_WEATHER);
});
