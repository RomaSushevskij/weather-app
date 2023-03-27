import { cloneableGenerator } from '@redux-saga/testing-utils';
import { AxiosError } from 'axios';
import { call, put } from 'redux-saga/effects';

import { googleAPI } from 'api/googleAPI';
import { GetUserInfoResponseData } from 'api/googleAPI/types';
import { appAC } from 'store/reducers/appReducer/appReducer';
import { authAC } from 'store/reducers/authReducer/authReducer';
import { checkAuthorizationInfo, signIn, signOut } from 'store/sagas/authSagas/authSagas';
import { fetchEvents } from 'store/sagas/eventsSagas';
import { handleError } from 'store/sagas/handleError/handleError';

test('Call signIn should work correct', () => {
  const gen = signIn();
  const data: GetUserInfoResponseData = {
    email: 'email@gmail.com',
    name: 'Name',
  };

  expect(gen.next().value).toEqual(call(googleAPI.getUserInfo));
  // @ts-ignore
  expect(gen.next(data).value).toEqual(put(authAC.setEmail({ email: data.email })));
  expect(gen.next().value).toEqual(put(authAC.setName({ name: data.name })));
  expect(gen.next().value).toEqual(put(authAC.setIsLoggedIn({ isLoggedIn: true })));
  expect(gen.next().done).toBeTruthy();
});

describe('Call checkAuthorizationInfo should work correct', () => {
  const ACCESS_TOKEN_KEY = 'access_token_key';
  const accessToken = 'accessToken';
  const gen = cloneableGenerator(checkAuthorizationInfo)();

  it('Call checkAuthorizationInfo without errors with existing access token', () => {
    const genClone = gen.clone();

    expect(genClone.next().value).toEqual(put(appAC.setStatus({ status: 'loading' })));
    expect(genClone.next().value).toEqual(localStorage.getItem(ACCESS_TOKEN_KEY));
    expect(genClone.next(accessToken).value).toEqual(call(signIn));
    expect(genClone.next().value).toEqual(call(fetchEvents));
    expect(genClone.next().value).toEqual(put(appAC.setStatus({ status: 'succeeded' })));
    expect(genClone.next().done).toBeTruthy();
  });

  it('Call checkAuthorizationInfo without errors with not found access token', () => {
    const genClone = gen.clone();

    expect(genClone.next().value).toEqual(put(appAC.setStatus({ status: 'loading' })));
    expect(genClone.next().value).toEqual(localStorage.getItem(ACCESS_TOKEN_KEY));
    expect(genClone.next().value).toEqual(call(signOut));
    expect(genClone.next().value).toEqual(put(appAC.setStatus({ status: 'failed' })));
    expect(genClone.next().done).toBeTruthy();
  });

  it('Call checkAuthorizationInfo with some errors', () => {
    const genClone = gen.clone();
    const error = new AxiosError('Request failed');

    genClone.next();

    // @ts-ignore
    expect(genClone.throw(error).value).toEqual(call(handleError, error));
    expect(genClone.next().done).toBeTruthy();
  });
});
