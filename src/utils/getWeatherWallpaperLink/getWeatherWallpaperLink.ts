import { WeatherIcons } from 'store/reducers/weatherReducer';

export const getWeatherWallpaperLink = (weatherIcon: WeatherIcons): string => {
  let weatherBgc: WeatherIcons;

  switch (weatherIcon) {
    case WeatherIcons.SNOW:
      weatherBgc = WeatherIcons.SNOW_SHOWERS_DAY;
      break;
    case WeatherIcons.RAIN:
      weatherBgc = WeatherIcons.SHOWERS_DAY;
      break;
    case WeatherIcons.THUNDER_RAIN:
      weatherBgc = WeatherIcons.THUNDER_SHOWERS_DAY;
      break;
    default:
      weatherBgc = weatherIcon;
      break;
  }

  return `https://raw.githubusercontent.com/RomaSushevskij/weatherBgc/master/${weatherBgc}.webp`;
};
