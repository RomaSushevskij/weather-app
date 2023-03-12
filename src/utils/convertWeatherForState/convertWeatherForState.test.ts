import { weatherIcons } from 'api/weatherAPI';
import { GetCurrentWeatherResponse } from 'api/weatherAPI/types';
import { CurrentWeather } from 'store/reducers/weather/types';
import { convertWeatherForState } from 'utils';

test('The convertWeatherForState function should work correctly', () => {
  const weatherFromAPI: GetCurrentWeatherResponse = {
    currentConditions: {
      icon: weatherIcons.SNOW,
      temp: 0,
      address: 'Minsk',
    },
    days: [
      {
        hours: [
          { datetimeEpoch: 1999999999991, temp: 0, icon: weatherIcons.SNOW },
          {
            datetimeEpoch: 1999999999992,
            temp: -1.55,
            icon: weatherIcons.SNOW_SHOWERS_DAY,
          },
          { datetimeEpoch: 1999999999993, temp: -2, icon: weatherIcons.SNOW_SHOWERS_DAY },
          { datetimeEpoch: 1999999999994, temp: -2, icon: weatherIcons.SNOW_SHOWERS_DAY },
          { datetimeEpoch: 1999999999995, temp: 1, icon: weatherIcons.PARTLY_CLOUDY_DAY },
          {
            datetimeEpoch: 1999999999996,
            temp: -3,
            icon: weatherIcons.PARTLY_CLOUDY_DAY,
          },
          {
            datetimeEpoch: 12345678,
            temp: -1,
            icon: weatherIcons.PARTLY_CLOUDY_DAY,
          },
        ],
      },
    ],
    longitude: 23.7139,
    latitude: 52.0587,
    address: 'Brest',
    resolvedAddress: 'Брест, Брестский район, Брестская область, Беларусь',
  };

  const weatherForState: CurrentWeather = convertWeatherForState(weatherFromAPI);

  expect(weatherForState.icon).toBe(weatherFromAPI.currentConditions.icon);
  expect(weatherForState.temp).toBe(weatherFromAPI.currentConditions.temp);
  // eslint-disable-next-line no-magic-numbers
  expect(weatherForState.hourlyWeather.length).toBe(6);
});
