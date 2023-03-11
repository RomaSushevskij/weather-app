import { GetCurrentWeatherResponse } from 'api/weatherAPI';
import { MS_IN_ONE_SECOND } from 'constantsGlobal';
import { CurrentWeather } from 'store/reducers/weather';
import { getDateNowInSeconds } from 'utils';

export const convertWeatherForState = (
  weatherFromAPI: GetCurrentWeatherResponse,
): CurrentWeather => {
  const weatherForState = {} as CurrentWeather;
  const {
    currentConditions: { icon, temp },
    days: [{ hours }],
  } = weatherFromAPI;

  weatherForState.temp =
    Math.abs(temp) === temp ? Math.round(temp) : Math.abs(Math.round(temp));
  weatherForState.icon = icon;
  const remainingHours = hours
    .filter(({ datetimeEpoch }) => datetimeEpoch >= getDateNowInSeconds())
    .map(({ datetimeEpoch, icon, temp }) => ({
      temp: Math.round(temp),
      icon,
      datetimeEpoch: datetimeEpoch * MS_IN_ONE_SECOND,
    }));

  weatherForState.hourlyWeather = remainingHours;

  return weatherForState;
};
