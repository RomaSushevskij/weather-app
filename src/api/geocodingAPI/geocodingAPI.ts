import { openWeather } from 'api/config';
import { GetCityNameParams, GetCurrentWeatherResponse } from 'api/geocodingAPI/types';

export const geocodingAPI = {
  async getCityName({ latitude, longitude }: GetCityNameParams) {
    const { data } = await openWeather.get<GetCurrentWeatherResponse>(`geo/1.0/reverse`, {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });

    return data[0];
  },
};
