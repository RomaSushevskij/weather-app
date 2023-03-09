import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import style from './App.module.scss';

import { WeatherBlock } from 'components/WetherBlock';
import { getCurrentWeather } from 'store/sagas/weather/weatherSagas';
import { ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather());
  }, []);

  return (
    <div className={style.app}>
      <div style={{ height: 300 }} />
      <div style={{ display: 'flex' }}>
        <WeatherBlock
          isCurrentDate
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/clear-day.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/clear-day.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/partly-cloudy-day.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/cloudy.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/rain.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/cloudy.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/snow.svg"
          date="today"
        />
        <WeatherBlock
          iconSrc="https://raw.githubusercontent.com/RomaSushevskij/weatherIcons/master/wind.svg"
          date="today"
        />
      </div>
    </div>
  );
};

export default App;
