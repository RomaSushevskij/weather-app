import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';

import { googleAPI } from 'api/googleAPI';
import { GetEventsResponseData, GetUserInfoResponseData } from 'api/googleAPI/types';
import { ACCESS_TOKEN_KEY } from 'constantsGlobal';
import { appAC, AppActionsType } from 'store/reducers/appReducer';
import { authAC, AuthActionsType } from 'store/reducers/authReducer';
import { eventsAC, EventsActionsType } from 'store/reducers/eventsReducer';
import { fetchEvents } from 'store/sagas/eventsSagas';
import { handleError } from 'store/sagas/handleError';
import { Action } from 'store/types';
import { Nullable } from 'types';

export type SignInReturned = Generator<
  CallEffect<GetUserInfoResponseData> | PutEffect<AppActionsType | AuthActionsType>,
  void,
  never
>;

export type SignIOutReturned = Generator<
  PutEffect<AppActionsType | AuthActionsType | EventsActionsType>,
  void,
  never
>;

export type CheckAuthorizationInfoReturned = Generator<
  | Nullable<string>
  | CallEffect<GetUserInfoResponseData | GetEventsResponseData | void>
  | PutEffect<AuthActionsType | EventsActionsType | AppActionsType>,
  void,
  never
>;

export enum authActionsType {
  SIGN_OUT = 'auth/SIGN_OUT',
  CHECK_AUTHORIZATION_INFO = 'auth/CHECK_AUTHORIZATION_INFO',
}

export function* checkAuthorizationInfo(): CheckAuthorizationInfoReturned {
  try {
    yield put(appAC.setStatus({ status: 'loading' }));
    const accessToken = yield localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      yield call(signIn);

      yield call(fetchEvents);
      yield put(appAC.setStatus({ status: 'succeeded' }));
    } else {
      yield call(signOut);
      yield put(appAC.setStatus({ status: 'failed' }));
    }
  } catch (e) {
    yield call(handleError, e);
  }
}

export function* signIn(): SignInReturned {
  const { name, email }: GetUserInfoResponseData = yield call(googleAPI.getUserInfo);

  yield put(authAC.setEmail({ email }));
  yield put(authAC.setName({ name }));
  yield put(authAC.setIsLoggedIn({ isLoggedIn: true }));
}

export function* signOut(): SignIOutReturned {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  yield put(authAC.setEmail({ email: null }));
  yield put(authAC.setName({ name: null }));
  yield put(authAC.setIsLoggedIn({ isLoggedIn: false }));
  yield put(eventsAC.setEvents({ events: [] }));
}

export const authSagasAC = {
  signOut(): Action<authActionsType.SIGN_OUT> {
    return {
      type: authActionsType.SIGN_OUT,
    } as const;
  },
  checkAuthorizationInfo(): Action<authActionsType.CHECK_AUTHORIZATION_INFO> {
    return {
      type: authActionsType.CHECK_AUTHORIZATION_INFO,
    } as const;
  },
};

export function* authWatcherSaga(): Generator {
  yield takeLatest(authActionsType.SIGN_OUT, signOut);
  yield takeLatest(authActionsType.CHECK_AUTHORIZATION_INFO, checkAuthorizationInfo);
}
