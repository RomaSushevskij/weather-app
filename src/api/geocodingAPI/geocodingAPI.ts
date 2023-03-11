import { openWeather } from 'api/config';
import { GetCityNameParams, GetLocationResponse } from 'api/geocodingAPI';

export const geocodingAPI = {
  async getLocation({ latitude, longitude }: GetCityNameParams) {
    const { data } = await openWeather.get<GetLocationResponse>(`geo/1.0/reverse`, {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });

    return data[0];
  },
};
