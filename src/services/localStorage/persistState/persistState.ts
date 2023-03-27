import { Geolocation } from 'api/geocodeAPI/types';
import { WeatherAPI, WeatherForecast } from 'store/reducers/weatherReducer/enums';

type WeatherSetting = {
  weatherForecast: WeatherForecast;
  weatherAPI: WeatherAPI;
};

const WEATHER_SETTING_STATE = 'WEATHER_SETTING_STATE';
const GEOLOCATION_STATE = 'GEOLOCATION_STATE';

export const setGeolocationToLocalStorage = (location: Geolocation): void => {
  try {
    const serializedGeolocation = JSON.stringify(location);

    localStorage.setItem(GEOLOCATION_STATE, serializedGeolocation);
  } catch (error) {
    console.log(error);
  }
};

export const getGeolocationFromLocalStorage = (): Geolocation | undefined => {
  try {
    const serializedGeolocation = localStorage.getItem(GEOLOCATION_STATE);

    if (serializedGeolocation) {
      return JSON.parse(serializedGeolocation);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setWeatherSettingToLocalStorage = (weatherSetting: WeatherSetting): void => {
  try {
    const serializedWeatherSetting = JSON.stringify(weatherSetting);

    localStorage.setItem(WEATHER_SETTING_STATE, serializedWeatherSetting);
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherSettingFromLocalStorage = (): WeatherSetting | undefined => {
  try {
    const serializedWeatherSetting = localStorage.getItem(WEATHER_SETTING_STATE);

    if (serializedWeatherSetting) {
      return JSON.parse(serializedWeatherSetting);
    }
  } catch (error) {
    console.log(error);
  }
};
