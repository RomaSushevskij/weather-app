export type GetCityNameParams = {
  latitude: number;
  longitude: number;
};

export type LocationFromAPI = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

export type GetLocationResponse = LocationFromAPI[];
