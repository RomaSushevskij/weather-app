import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import {
  appReducer,
  authReducer,
  eventsReducer,
  geolocationReducer,
} from 'store/reducers';
import { weatherReducer } from 'store/reducers/weatherReducer';
import { authWatcherSaga, weatherWatcherSaga } from 'store/sagas';
import { appWatcherSaga } from 'store/sagas/appSagas/appSagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  weather: weatherReducer,
  geolocation: geolocationReducer,
  events: eventsReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
export function* rootWatcherSaga(): Generator {
  yield all([call(weatherWatcherSaga), call(authWatcherSaga), call(appWatcherSaga)]);
}

sagaMiddleware.run(rootWatcherSaga);
