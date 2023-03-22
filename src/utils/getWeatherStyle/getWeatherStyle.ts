import { WeatherIcons } from 'store/reducers/weatherReducer';

export type StyleWeatherType =
  | WeatherIcons.CLEAR_DAY
  | WeatherIcons.CLOUDY
  | WeatherIcons.CLEAR_NIGHT;

export const getWeatherStyle = (weather: WeatherIcons): StyleWeatherType => {
  switch (weather) {
    case WeatherIcons.CLEAR_DAY:
    case WeatherIcons.WIND:
      return WeatherIcons.CLEAR_DAY;
    case WeatherIcons.RAIN:
    case WeatherIcons.SHOWERS_DAY:
    case WeatherIcons.THUNDER_RAIN:
    case WeatherIcons.CLOUDY:
    case WeatherIcons.FOG:
    case WeatherIcons.THUNDER_SHOWERS_DAY:
    case WeatherIcons.SNOW:
    case WeatherIcons.SNOW_SHOWERS_DAY:
    case WeatherIcons.PARTLY_CLOUDY_DAY:
      return WeatherIcons.CLOUDY;
    case WeatherIcons.CLEAR_NIGHT:
    case WeatherIcons.PARTLY_CLOUDY_NIGHT:
    case WeatherIcons.SHOWERS_NIGHT:
    case WeatherIcons.SNOW_SHOWERS_NIGHT:
    case WeatherIcons.THUNDER_SHOWERS_NIGHT:
      return WeatherIcons.CLEAR_NIGHT;
    default:
      return WeatherIcons.CLEAR_DAY;
  }
};
