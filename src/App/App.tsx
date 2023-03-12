import { useEffect } from 'react';

import axios from 'axios';

import style from './App.module.scss';

import { WeatherFrame } from 'components';
import { ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(getCurrentWeatherByMyCoords());
  // }, [dispatch]);

  useEffect(() => {
    axios.get(
      // eslint-disable-next-line no-magic-numbers
      `https://api.openweathermap.org/data/2.5/onecall`,
      {
        params: {
          units: 'metric',
          lat: 52.4239,
          lon: 31.0132,
          appid: 'ad92da7f16e16b2606c4873052bbb52e',
        },
      },
    );
  }, []);

  return (
    <div className={style.app}>
      <WeatherFrame />
    </div>
  );
};

export default App;
