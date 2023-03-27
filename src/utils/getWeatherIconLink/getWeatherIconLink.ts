import { WeatherIcons } from 'store/reducers/weatherReducer';

export const getWeatherIconLink = (icon: WeatherIcons): string => {
  return `https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/${icon}.svg`;
};
