import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { appReducer, geolocationReducer } from 'store/reducers';
import { weatherReducer } from 'store/reducers/weatherReducer';
import { weatherWatcherSaga } from 'store/sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  app: appReducer,
  weather: weatherReducer,
  geolocation: geolocationReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
export function* rootWatcherSaga(): Generator {
  yield all([weatherWatcherSaga()]);
}

sagaMiddleware.run(rootWatcherSaga);
