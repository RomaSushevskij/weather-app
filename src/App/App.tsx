import { useEffect } from 'react';

import style from './App.module.scss';

import { WeatherFrame } from 'components';
import { useAppDispatch } from 'hooks';
import { weatherSagasAC } from 'store/sagas/weather/weatherSagas';
import { ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(getCurrentWeatherByMyCoords());
  // }, [dispatch]);

  // useEffect(() => {
  //   visualCrossingWeatherAPI
  //     .getCurrentWeather({ latitude: 53.9037, longitude: 27.5655 })
  //     .then(res => {
  //       console.log(normalizeState.visualCrossingWeather(res));
  //     });
  // }, []);
  useEffect(() => {
    dispatch(weatherSagasAC.getOpenWeather());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <WeatherFrame />
    </div>
  );
};

export default App;
