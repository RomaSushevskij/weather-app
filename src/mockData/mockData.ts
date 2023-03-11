import { WeatherCondition, weatherIcons } from 'api/weatherAPI';

const weateher: WeatherCondition = {
  icon: weatherIcons.PARTLY_CLOUDY_DAY,
  temp: 0,
  datetimeEpoch: 1678327200000,
};

const icons: weatherIcons[] = [
  weatherIcons.WIND,
  weatherIcons.SNOW,
  weatherIcons.CLOUDY,
  weatherIcons.RAIN,
  weatherIcons.PARTLY_CLOUDY_DAY,
  weatherIcons.CLEAR_DAY,
  weatherIcons.CLEAR_NIGHT,
  weatherIcons.FOG,
  weatherIcons.PARTLY_CLOUDY_NIGHT,
  weatherIcons.SHOWERS_DAY,
  weatherIcons.SHOWERS_NIGHT,
  weatherIcons.SNOW_SHOWERS_DAY,
  weatherIcons.THUNDER_RAIN,
];
// eslint-disable-next-line no-magic-numbers
const temps: number[] = [0, 0, -1, -3, -4, -4, -7, -2, 0, 1, 2, 2, 3];

// eslint-disable-next-line no-magic-numbers
export const weatherData: WeatherCondition[] = new Array(24)
  .fill(weateher)
  .map((weather, i) => {
    // eslint-disable-next-line no-magic-numbers
    return {
      // eslint-disable-next-line no-magic-numbers
      datetimeEpoch: weather.datetimeEpoch + 3600000 * i,
      icon: icons[i % icons.length],
      temp: temps[i % temps.length],
    };
  });
