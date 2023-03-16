import { OpenWeatherIcons } from 'api/openWeatherAPI/enums';
import { WeatherIcons } from 'store/reducers/weatherReducer';

export const normalizeWeatherIcon = (icon: OpenWeatherIcons): WeatherIcons => {
  switch (icon) {
    case OpenWeatherIcons.CLEAR_DAY:
      return WeatherIcons.CLEAR_DAY;
    case OpenWeatherIcons.CLEAR_NIGHT:
      return WeatherIcons.CLEAR_NIGHT;
    case OpenWeatherIcons.PARTLY_CLOUDY_DAY:
      return WeatherIcons.PARTLY_CLOUDY_DAY;
    case OpenWeatherIcons.PARTLY_CLOUDY_NIGHT:
      return WeatherIcons.PARTLY_CLOUDY_NIGHT;
    case OpenWeatherIcons.CLOUDY_DAY:
    case OpenWeatherIcons.CLOUDY_NIGHT:
    case OpenWeatherIcons.BROKEN_CLOUDY_DAY:
    case OpenWeatherIcons.BROKEN_CLOUDY_NIGHT:
      return WeatherIcons.CLOUDY;
    case OpenWeatherIcons.SHOWERS_DAY:
      return WeatherIcons.SHOWERS_DAY;
    case OpenWeatherIcons.SHOWERS_NIGHT:
      return WeatherIcons.SHOWERS_NIGHT;
    case OpenWeatherIcons.RAIN_DAY:
    case OpenWeatherIcons.RAIN_NIGHT:
      return WeatherIcons.RAIN;
    case OpenWeatherIcons.THUNDER_SHOWERS_DAY:
      return WeatherIcons.THUNDER_SHOWERS_DAY;
    case OpenWeatherIcons.THUNDER_SHOWERS_NIGHT:
      return WeatherIcons.THUNDER_SHOWERS_NIGHT;
    case OpenWeatherIcons.SNOW_SHOWERS_DAY:
      return WeatherIcons.SNOW_SHOWERS_DAY;
    case OpenWeatherIcons.SNOW_SHOWERS_NIGHT:
      return WeatherIcons.SNOW_SHOWERS_NIGHT;
    case OpenWeatherIcons.FOG_DAY:
    case OpenWeatherIcons.FOG_NIGHT:
      return WeatherIcons.FOG;
    default:
      return WeatherIcons.CLEAR_DAY;
  }
};
