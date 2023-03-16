import style from './App.module.scss';

import { WeatherFrame } from 'components';
import { ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  return (
    <div className={style.app}>
      <WeatherFrame />
    </div>
  );
};

export default App;
