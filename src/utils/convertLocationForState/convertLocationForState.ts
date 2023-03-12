import { LocationFromGeoAPI } from 'api/geocodingAPI';
import { GetCurrentWeatherResponse } from 'api/weatherAPI';
import { LocationFromState } from 'store/reducers/weather';

export const convertLocationFromGeoAPIForState = (
  location: LocationFromGeoAPI,
): LocationFromState => {
  const { lat: latitude, lon: longitude, country, name: cityName } = location;

  return { cityName, longitude, country, latitude };
};

export const convertLocationFromWeatherAPIForState = (
  weather: GetCurrentWeatherResponse,
): LocationFromState => {
  const { latitude, longitude, address: cityName, resolvedAddress } = weather;
  const country = resolvedAddress.split(', ').reverse()[0];

  return { cityName, longitude, country, latitude };
};
