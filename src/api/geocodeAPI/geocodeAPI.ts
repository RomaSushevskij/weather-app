import { geoApify } from 'api/config';
import { GeocodeEndpoints } from 'api/geocodeAPI/enums';
import { GeocodeParams, GeocodeResponseData, Geolocation } from 'api/geocodeAPI/types';

export const geocodeAPI = {
  async search({
    localityName,
  }: GeocodeParams<GeocodeEndpoints.SEARCH>): Promise<Geolocation> {
    const { data } = await geoApify.get<GeocodeResponseData>(
      `/${GeocodeEndpoints.SEARCH}`,
      {
        params: {
          text: localityName,
        },
      },
    );
    const { lat, lon, country, city } = data.results[0];
    const geoLocation: Geolocation = {
      lat,
      lon,
      city,
      country,
    };

    return geoLocation;
  },
  async reverse({
    latitude,
    longitude,
  }: GeocodeParams<GeocodeEndpoints.REVERSE>): Promise<Geolocation> {
    const { data } = await geoApify.get<GeocodeResponseData>(
      `/${GeocodeEndpoints.REVERSE}`,
      {
        params: {
          lon: longitude,
          lat: latitude,
        },
      },
    );
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
