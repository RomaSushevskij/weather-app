import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { errorMessages } from 'enum';
import { appAC, AppActionsType } from 'store/reducers/appReducer/appReducer';
import { signOut } from 'store/sagas/authSagas';

export type HandleErrorReturned = Generator<
  CallEffect<AppActionsType | void> | PutEffect<AppActionsType>,
  void,
  never
>;

export function* handleError(e: any): HandleErrorReturned {
  let errorMessage: string;

  if (e instanceof AxiosError) {
    const NOT_AUTHORIZED = 401;

    if (e.response?.status === NOT_AUTHORIZED) {
      yield call(signOut);
      errorMessage = errorMessages.NOT_AUTHORIZED;
    } else {
      errorMessage = e.response?.data.message || e.message;
    }
  } else if (e instanceof Error) {
    errorMessage = e.message;
  } else {
    errorMessage = e;
  }

  yield put(appAC.setErrorMessage({ errorMessage }));
  yield put(appAC.setStatus({ status: 'failed' }));
}
