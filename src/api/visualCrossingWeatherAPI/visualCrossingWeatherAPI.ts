import { visualCrossingWeather } from 'api/config';
import {
  GetVisualCrossingWeatherParams,
  GetVisualCrossingWeatherResponseData,
} from 'api/visualCrossingWeatherAPI';
import { VisualCrossingWeatherEndpoints } from 'api/visualCrossingWeatherAPI/enums';
import { EMPTY_STRING } from 'constantsGlobal';
import { cacheAPI } from 'services/localStorage';

export const visualCrossingWeatherAPI = {
  async getCurrentWeather({
    localityName,
    longitude,
    latitude,
    date1,
    date2,
  }: GetVisualCrossingWeatherParams): Promise<GetVisualCrossingWeatherResponseData> {
    const cachedData = cacheAPI.getVisualCrossingWeather({ latitude, longitude });

    if (cachedData) {
      return cachedData;
    }

    const location = localityName || `${latitude},${longitude}`;
    const startDate = date1 ? `/${date1}` : EMPTY_STRING;
    const endDate = date2 ? `/${date2}` : EMPTY_STRING;

    const { data } =
      await visualCrossingWeather.get<GetVisualCrossingWeatherResponseData>(
        `/${VisualCrossingWeatherEndpoints.TIMELINE}/${location}${startDate}${endDate}`,
        {
          params: {
            unitGroup: 'metric',
          },
        },
      );

    cacheAPI.setVisualCrossingWeather({ latitude, longitude }, data);

    return data;
  },
};
