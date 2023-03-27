import { EventData } from 'api/googleAPI/types';
import { GetOpenWeatherResponseData } from 'api/openWeatherAPI';
import { GetVisualCrossingWeatherResponseData } from 'api/visualCrossingWeatherAPI';
import { HOURS_IN_DAY, MS_IN_SECOND, SEC_IN_HOUR } from 'constantsGlobal';
import { EventType } from 'store/reducers/eventsReducer';
import { WeatherConditionState } from 'store/reducers/weatherReducer/weatherReducer';
import { convertToUTCDate } from 'utils/convertToUTCDate/convertToUTCDate';
import { normalizeWeatherIcon } from 'utils/normalizeWeatherIcon/normalizeWeatherIcon';
import { roundTempValue } from 'utils/roundTempValue/roundTempValue';

export const normalizeState = {
  openWeather(apiWeatherData: GetOpenWeatherResponseData): WeatherConditionState {
    const {
      current: { weather, temp },
      hourly,
      daily,
      timezone_offset: timezoneOffset,
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
          datetimeEpoch: convertToUTCDate(
            dt * MS_IN_SECOND,
            timezoneOffset * MS_IN_SECOND,
          ),
        }))
        .splice(1, HOURS_IN_DAY + 1),
      dailyWeather: daily.map(({ temp: { day }, weather, dt }) => ({
        temp: roundTempValue(day),
        icon: normalizeWeatherIcon(weather[0].icon),
        datetimeEpoch: convertToUTCDate(dt * MS_IN_SECOND, timezoneOffset * MS_IN_SECOND),
      })),
      timeZoneOffset: timezoneOffset * MS_IN_SECOND,
    };
  },
  visualCrossingWeather(
    apiWeatherData: GetVisualCrossingWeatherResponseData,
  ): WeatherConditionState {
    const {
      currentConditions: { icon, temp },
      days,
      tzoffset,
    } = apiWeatherData;

    const timeZoneOffsetMS = tzoffset * SEC_IN_HOUR * MS_IN_SECOND;

    const restCurrentDayHours = days[0].hours.filter(
      ({ datetimeEpoch }) =>
        convertToUTCDate(
          datetimeEpoch * MS_IN_SECOND,
          tzoffset * SEC_IN_HOUR * MS_IN_SECOND,
        ) >= convertToUTCDate(Date.now(), timeZoneOffsetMS),
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
          datetimeEpoch: convertToUTCDate(datetimeEpoch * MS_IN_SECOND, timeZoneOffsetMS),
        }),
      ),
      dailyWeather: days.map(({ temp, icon, datetimeEpoch }) => ({
        temp: roundTempValue(temp),
        icon,
        datetimeEpoch: convertToUTCDate(datetimeEpoch * MS_IN_SECOND, timeZoneOffsetMS),
      })),
      timeZoneOffset: timeZoneOffsetMS,
    };
  },
  events(events: EventData[]): EventType[] {
    return events.map(({ summary, start: { dateTime }, id }) => ({
      id,
      summary,
      dateTime: new Date(dateTime).getTime(),
    }));
  },
};
