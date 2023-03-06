import axios from 'axios';

export const openWeather = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_LINK,
  params: {
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  },
});

export const visualCrossingWeather = axios.create({
  baseURL: process.env.REACT_APP_VISUAL_CROSSING_WEATHER_LINK,
  params: {
    key: process.env.REACT_APP_VISUAL_CROSSING_WEATHER_API_KEY,
  },
});
