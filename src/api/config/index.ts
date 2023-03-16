import axios from 'axios';

export const geoApify = axios.create({
  baseURL: process.env.REACT_APP_GEO_APIFY_LINK,
  params: {
    apiKey: process.env.REACT_APP_GEO_APIFY_API_KEY,
    lang: 'en',
    limit: 1,
    format: 'json',
  },
});

export const openWeather = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_LINK,
  params: {
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    units: 'metric',
    exclude: 'minutely',
  },
});

export const visualCrossingWeather = axios.create({
  baseURL: process.env.REACT_APP_VISUAL_CROSSING_WEATHER_LINK,
  params: {
    key: process.env.REACT_APP_VISUAL_CROSSING_WEATHER_API_KEY,
  },
});
