import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getCurrentWeather } from 'store/sagas/weather/weatherSagas';
import { ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather());
  }, []);

  return <div>App</div>;
};

export default App;
