export type GetCityNameParams = {
  latitude: number;
  longitude: number;
};

export type GetCurrentWeatherResponse = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}[];
