export type GetCityNameParams = {
  latitude: number;
  longitude: number;
};

export type LocationFromGeoAPI = {
  country: string;
  lat: number;
  lon: number;
  name: string;
};

export type GetLocationResponse = LocationFromGeoAPI[];
