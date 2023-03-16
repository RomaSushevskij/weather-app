import { GetOpenWeatherResponseData } from 'api/openWeatherAPI';
import { GetVisualCrossingWeatherResponseData } from 'api/visualCrossingWeatherAPI';
import { HOURS_IN_DAY, MS_IN_SECOND } from 'constantsGlobal';
import { WeatherConditionState } from 'store/reducers/weatherReducer/weatherReducer';
import { getDateNowInSeconds } from 'utils/getDateNowInSeconds/getDateNowInSeconds';
import { normalizeWeatherIcon } from 'utils/normalizeWeatherIcon/normalizeWeatherIcon';
import { roundTempValue } from 'utils/roundTempValue/roundTempValue';

export const normalizeState = {
  openWeather(apiWeatherData: GetOpenWeatherResponseData): WeatherConditionState {
    const {
      current: { weather, temp },
      hourly,
      daily,
    } = apiWeatherData;

    return {
      currentWeather: {
        temp: roundTempValue(temp),
        icon: normalizeWeatherIcon(weather[0].icon),
      },
      hourlyWeather: hourly
        .map(({ temp, weather, dt }) => ({
          temp: roundTempValue(temp),
          icon: normalizeWeatherIcon(weather[0].icon),
          datetimeEpoch: dt * MS_IN_SECOND,
        }))
        .splice(1, HOURS_IN_DAY + 1),
      dailyWeather: daily.map(({ temp: { day }, weather, dt }) => ({
        temp: roundTempValue(day),
        icon: normalizeWeatherIcon(weather[0].icon),
        datetimeEpoch: dt * MS_IN_SECOND,
      })),
    };
  },
  visualCrossingWeather(
    apiWeatherData: GetVisualCrossingWeatherResponseData,
  ): WeatherConditionState {
    const {
      currentConditions: { icon, temp },
      days,
    } = apiWeatherData;

    const restCurrentDayHours = days[0].hours.filter(
      ({ datetimeEpoch }) => datetimeEpoch >= getDateNowInSeconds(),
    );
    const restNextDayHours = [...days[1].hours].splice(
      0,
      HOURS_IN_DAY - restCurrentDayHours.length + 1,
    );

    return {
      currentWeather: {
        temp: roundTempValue(temp),
        icon,
      },
      hourlyWeather: [...restCurrentDayHours, ...restNextDayHours].map(
        ({ temp, icon, datetimeEpoch }) => ({
          temp: roundTempValue(temp),
          icon,
          datetimeEpoch: datetimeEpoch * MS_IN_SECOND,
        }),
      ),
      dailyWeather: days.map(({ temp, icon, datetimeEpoch }) => ({
        temp: roundTempValue(temp),
        icon,
        datetimeEpoch: datetimeEpoch * MS_IN_SECOND,
      })),
    };
  },
};
