import { GeocodeEndpoints } from 'api/geocodeAPI/enums';

export type LocationFromGeoAPI = {
  country: string;
  lat: number;
  lon: number;
  name: string;
};

export type GeocodeParams<T> = T extends GeocodeEndpoints.SEARCH
  ? {
      localityName: string;
    }
  : { latitude: number; longitude: number };

export type Geolocation = {
  city?: string;
  country: string;
  lat: number;
  lon: number;
};
export type GeocodeResponseData = {
  results: Geolocation[];
};
