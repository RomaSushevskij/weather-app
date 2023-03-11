import style from './App.module.scss';

import { WeatherFrame } from 'components';
import { ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  // const dispatch = useAppDispatch();
  // const weatherData = useAppSelector(state => state.weatherSelectors.currentWeather.hourlyWeather);

  // useEffect(() => {
  //   dispatch(getCurrentWeather());
  // }, []);

  return (
    <div className={style.app}>
      <WeatherFrame />
    </div>
  );
};

export default App;
