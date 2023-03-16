import { WeatherData, WeatherIcons } from 'store/reducers/weatherReducer';

const weather: WeatherData = {
  icon: WeatherIcons.PARTLY_CLOUDY_DAY,
  temp: 0,
  datetimeEpoch: 1678327200000,
};

const icons: WeatherIcons[] = [
  WeatherIcons.WIND,
  WeatherIcons.SNOW,
  WeatherIcons.CLOUDY,
  WeatherIcons.RAIN,
  WeatherIcons.PARTLY_CLOUDY_DAY,
  WeatherIcons.CLEAR_DAY,
  WeatherIcons.CLEAR_NIGHT,
  WeatherIcons.FOG,
  WeatherIcons.PARTLY_CLOUDY_NIGHT,
  WeatherIcons.SHOWERS_DAY,
  WeatherIcons.SHOWERS_NIGHT,
  WeatherIcons.SNOW_SHOWERS_DAY,
  WeatherIcons.THUNDER_RAIN,
];
// eslint-disable-next-line no-magic-numbers
const temps: number[] = [0, 0, -1, -3, -4, -4, -7, -2, 0, 1, 2, 2, 3];

// eslint-disable-next-line no-magic-numbers
export const weatherData: WeatherData[] = new Array(24)
  .fill(weather)
  .map((weather, i) => {
    // eslint-disable-next-line no-magic-numbers
    return {
      // eslint-disable-next-line no-magic-numbers
      datetimeEpoch: weather.datetimeEpoch + 3600000 * i,
      icon: icons[i % icons.length],
      temp: temps[i % temps.length],
    };
  });
