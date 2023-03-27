import { openWeather } from 'api/config';
import { GetOpenWeatherParams, GetOpenWeatherResponseData } from 'api/openWeatherAPI';
import { OpenWeatherEndpoints } from 'api/openWeatherAPI/enums';
import { cacheAPI } from 'services/localStorage';

export const openWeatherAPI = {
  async getWeather({
    latitude,
    longitude,
  }: GetOpenWeatherParams): Promise<GetOpenWeatherResponseData> {
    const cachedData = cacheAPI.getOpenWeather({ latitude, longitude });

    if (cachedData) {
      return cachedData;
    }
    const { data } = await openWeather.get<GetOpenWeatherResponseData>(
      `/${OpenWeatherEndpoints.ONE_CALL}`,
      {
        params: {
          lat: latitude,
          lon: longitude,
        },
      },
    );

    cacheAPI.setOpenWeather({ latitude, longitude }, data);

    return data;
  },
};
