import { useEffect, useState } from 'react';

import style from './App.module.scss';

import { Preloader, WeatherFrame } from 'components';
import { SNACK_BAR_TYPES, SnackBar } from 'components/SnackBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useFullHeight } from 'hooks/useFullHeight/useFullHeight';
import { appAC } from 'store/reducers/appReducer/appReducer';
import { WeatherIcons } from 'store/reducers/weatherReducer';
import { appSagasAC } from 'store/sagas/appSagas/appSagas';
import { appSelectors, weatherSelectors } from 'store/selectors';
import { ReturnComponent } from 'types';
import { getWeatherStyle, StyleWeatherType } from 'utils';

const App = (): ReturnComponent => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(appSelectors.isInitialized);
  const errorMessage = useAppSelector(appSelectors.errorMessage);
  const { icon } = useAppSelector(weatherSelectors.current);

  useFullHeight();

  const [appBgcStyle, setAppBgcStyle] = useState<StyleWeatherType>(
    WeatherIcons.CLEAR_DAY,
  );

  const onSnackBarClose = (): void => {
    dispatch(appAC.setErrorMessage({ errorMessage: null }));
  };

  useEffect(() => {
    if (icon) {
      setAppBgcStyle(getWeatherStyle(icon));
    }
  }, [icon]);

  useEffect(() => {
    dispatch(appSagasAC.initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div className={`${style.app} ${style[appBgcStyle]}`}>
      <WeatherFrame />
      {!!errorMessage && (
        <div className={style.snackBar}>
          <SnackBar
            type={SNACK_BAR_TYPES.ERROR}
            message={errorMessage}
            onClose={onSnackBarClose}
          />
        </div>
      )}
    </div>
  );
};

export default App;
