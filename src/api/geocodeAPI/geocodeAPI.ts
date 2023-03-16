import { geoApify } from 'api/config';
import { GeocodeEndpoints } from 'api/geocodeAPI/enums';
import { GeocodeParams, GeocodeReturned, Geolocation } from 'api/geocodeAPI/types';

export const geocodeAPI = {
  async search({ localityName }: GeocodeParams<GeocodeEndpoints.SEARCH>) {
    const { data } = await geoApify.get<GeocodeReturned>(`/${GeocodeEndpoints.SEARCH}`, {
      params: {
        text: localityName,
      },
    });
    const { lat, lon, country, city } = data.results[0];
    const geoLocation: Geolocation = {
      lat,
      lon,
      city,
      country,
    };

    return geoLocation;
  },
  async reverse({ latitude, longitude }: GeocodeParams<GeocodeEndpoints.REVERSE>) {
    const { data } = await geoApify.get<GeocodeReturned>(`/${GeocodeEndpoints.REVERSE}`, {
      params: {
        lon: longitude,
        lat: latitude,
      },
    });
    const { lat, lon, country, city } = data.results[0];
    const geoLocation: Geolocation = {
      lat,
      lon,
      city,
      country,
    };

    return geoLocation;
  },
};
