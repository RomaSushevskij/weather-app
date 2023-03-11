import { weatherIcons } from 'api/weatherAPI';

export const getWeatherIconLink = (icon: weatherIcons): string => {
  // return `https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/${icon}.svg`;
  // eslint-disable-next-line global-require
  return require(`assets/weatherIcons/${icon}.svg`);
};
