import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { weatherReducer } from 'store/reducers/weather';
import { weatherWatcherSaga } from 'store/sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  weather: weatherReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
export function* rootWatcherSaga(): Generator {
  yield all([weatherWatcherSaga()]);
}

sagaMiddleware.run(rootWatcherSaga);
