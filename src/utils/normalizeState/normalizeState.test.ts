import { GetOpenWeatherResponseData } from 'api/openWeatherAPI';
import { OpenWeatherIcons } from 'api/openWeatherAPI/enums';
import { GetVisualCrossingWeatherResponseData } from 'api/visualCrossingWeatherAPI';
import { HOURS_IN_DAY } from 'constantsGlobal';
import { WeatherIcons } from 'store/reducers/weatherReducer';
import { WeatherConditionState } from 'store/reducers/weatherReducer/weatherReducer';
import { normalizeState } from 'utils/normalizeState/normalizeState';
import { normalizeWeatherIcon } from 'utils/normalizeWeatherIcon/normalizeWeatherIcon';

test('The normalizeState case openWeather function should work correctly', () => {
  const openWeatherData: GetOpenWeatherResponseData = {
    current: {
      temp: 1.3,
      dt: 1291234000,
      weather: [{ icon: OpenWeatherIcons.CLEAR_DAY }],
    },
    hourly: [
      { temp: 0.5, dt: 1291234001, weather: [{ icon: OpenWeatherIcons.CLEAR_DAY }] },
      { temp: 1.5, dt: 1291234002, weather: [{ icon: OpenWeatherIcons.CLOUDY_DAY }] },
      { temp: 0.2, dt: 1291234003, weather: [{ icon: OpenWeatherIcons.CLOUDY_DAY }] },
      { temp: 2.4, dt: 1291234004, weather: [{ icon: OpenWeatherIcons.RAIN_DAY }] },
    ],
    daily: [
      {
        temp: { day: 2.5 },
        dt: 1291234011,
        weather: [{ icon: OpenWeatherIcons.CLOUDY_DAY }],
      },
      {
        temp: { day: 1.2 },
        dt: 1291234021,
        weather: [{ icon: OpenWeatherIcons.PARTLY_CLOUDY_DAY }],
      },
      {
        temp: { day: 4.8 },
        dt: 1291234031,
        weather: [{ icon: OpenWeatherIcons.PARTLY_CLOUDY_DAY }],
      },
      {
        temp: { day: 4.4 },
        dt: 1291234041,
        weather: [{ icon: OpenWeatherIcons.CLOUDY_DAY }],
      },
    ],
  };

  const weatherState: WeatherConditionState = normalizeState.openWeather(openWeatherData);

  expect(weatherState.currentWeather.temp).toEqual(1);
  expect(weatherState.currentWeather.icon).toEqual(
    normalizeWeatherIcon(openWeatherData.current.weather[0].icon),
  );
  expect(weatherState.hourlyWeather.length).toBe(openWeatherData.hourly.length - 1);
  expect(weatherState.dailyWeather.length).toBe(openWeatherData.daily.length);
  expect(weatherState.dailyWeather[0].icon).toBe(
    normalizeWeatherIcon(openWeatherData.daily[0].weather[0].icon),
  );
});

test('The normalizeState case visualCrossingWeather function should work correctly', () => {
  const visualCrossingWeatherData: GetVisualCrossingWeatherResponseData = {
    currentConditions: {
      icon: WeatherIcons.CLEAR_DAY,
      temp: 0.08,
    },
    // eslint-disable-next-line no-magic-numbers
    days: new Array(15).fill({}).map((_, index) => ({
      temp: 0.3,
      icon: WeatherIcons.CLEAR_DAY,
      datetimeEpoch: 0 + HOURS_IN_DAY * index,
      hours: new Array(HOURS_IN_DAY).fill({}).map((_, index) => ({
        temp: 0.3,
        icon: WeatherIcons.CLEAR_DAY,
        datetimeEpoch: 0 + index,
      })),
    })),
  };

  const weatherState: WeatherConditionState = normalizeState.visualCrossingWeather(
    visualCrossingWeatherData,
  );

  expect(weatherState.currentWeather).toEqual(
    visualCrossingWeatherData.currentConditions,
  );
  expect(weatherState.hourlyWeather.length).toBe(HOURS_IN_DAY);
});
