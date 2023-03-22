import { WeatherIcons } from 'store/reducers/weatherReducer';

export const getWeatherIconLink = (icon: WeatherIcons): string => {
  // return `https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/${icon}.svg`;
  // eslint-disable-next-line global-require,import/no-dynamic-require
  return require(`assets/weatherIcons/${icon}.svg`);
};
