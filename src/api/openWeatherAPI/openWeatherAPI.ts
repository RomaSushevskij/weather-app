import { openWeather } from 'api/config';
import { GetOpenWeatherParams, GetOpenWeatherResponseData } from 'api/openWeatherAPI';
import { OpenWeatherEndpoints } from 'api/openWeatherAPI/enums';

export const openWeatherAPI = {
  async getWeather({
    latitude,
    longitude,
  }: GetOpenWeatherParams): Promise<GetOpenWeatherResponseData> {
    const { data } = await openWeather.get<GetOpenWeatherResponseData>(
      `/${OpenWeatherEndpoints.ONE_CALL}`,
      {
        params: {
          lat: latitude,
          lon: longitude,
        },
      },
    );

    return data;
  },
};
