export type GetCityNameParams = {
  latitude: number;
  longitude: number;
};

export type Location = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

export type GetLocationResponse = Location[];
