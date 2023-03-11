import { visualCrossingWeather } from 'api/config';
import { GetCurrentWeatherParams, GetCurrentWeatherResponse } from 'api/weatherAPI';
import { EMPTY_STRING } from 'constantsGlobal';

export const weatherAPI = {
  async getCurrentWeather({
    cityName,
    longitude,
    latitude,
    date1,
    date2,
  }: GetCurrentWeatherParams) {
    const location = cityName || `${latitude},${longitude}`;
    const startDate = date1 ? `/${date1}` : EMPTY_STRING;
    const endDate = date2 ? `/${date2}` : EMPTY_STRING;

    const { data } = await visualCrossingWeather.get<GetCurrentWeatherResponse>(
      `/timeline/${location}${startDate}${endDate}`,
      {
        params: {
          unitGroup: 'metric',
        },
      },
    );

    return data;
  },
};
