import { all, call } from 'redux-saga/effects';

import { appWatcherSaga, authWatcherSaga, weatherWatcherSaga } from 'store/sagas';

export function* rootWatcherSaga(): Generator {
  yield all([call(weatherWatcherSaga), call(authWatcherSaga), call(appWatcherSaga)]);
}
