import { AxiosError, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios';
import { call, put } from 'redux-saga/effects';

import { errorMessages } from 'enum';
import { appAC } from 'store/reducers/appReducer';
import { signOut, handleError } from 'store/sagas';
import { Nullable } from 'types';

describe('Call handle error should work correct', () => {
  it('Case with AxiosError', () => {
    const errorMessage = 'Axios error';
    const error = new AxiosError(errorMessage);
    const gen = handleError(error);

    expect(gen.next().value).toEqual(put(appAC.setErrorMessage({ errorMessage })));
    expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'failed' })));
    expect(gen.next().done).toBeTruthy();
  });

  it('Case with AxiosError 401 status code', () => {
    const errorMessage = errorMessages.NOT_AUTHORIZED;
    const error = new AxiosError(errorMessage, undefined, undefined, undefined, {
      status: 401,
      config: {} as InternalAxiosRequestConfig,
      headers: {} as AxiosResponseHeaders,
      data: undefined,
      request: undefined,
      statusText: '',
    });
    const gen = handleError(error);

    expect(gen.next().value).toEqual(call(signOut));
    expect(gen.next().value).toEqual(put(appAC.setErrorMessage({ errorMessage })));
    expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'failed' })));
    expect(gen.next().done).toBeTruthy();
  });

  it('Case with Error', () => {
    const errorMessage = 'Some error';
    const error = new Error(errorMessage);
    const gen = handleError(error);

    expect(gen.next().value).toEqual(put(appAC.setErrorMessage({ errorMessage })));
    expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'failed' })));
    expect(gen.next().done).toBeTruthy();
  });

  it('Case with some another errors', () => {
    const errorMessage = 'Some error occurred';
    const error = { error: { name: errorMessage } };
    const gen = handleError(error);

    expect(gen.next().value).toEqual(
      put(appAC.setErrorMessage({ errorMessage: error as unknown as Nullable<string> })),
    );
    expect(gen.next().value).toEqual(put(appAC.setStatus({ status: 'failed' })));
    expect(gen.next().done).toBeTruthy();
  });
});
