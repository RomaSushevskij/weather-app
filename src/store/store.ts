import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  appReducer,
  authReducer,
  eventsReducer,
  geolocationReducer,
  weatherReducer,
} from 'store/reducers';
import { rootWatcherSaga } from 'store/sagas';

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

sagaMiddleware.run(rootWatcherSaga);
