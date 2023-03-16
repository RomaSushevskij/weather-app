import { appAC, AppInitialState, appReducer } from './appReducer';

import { RequestStatus } from 'types';

let startState: AppInitialState;

beforeEach(() => {
  startState = {
    status: 'idle',
    errorMessage: null,
    isInitialized: false,
  };
});

test('correct status should be set to state', () => {
  const newStatusValue: RequestStatus = 'loading';
  const endState = appReducer(startState, appAC.setStatus({ status: newStatusValue }));

  expect(endState.status).toBe(newStatusValue);
});

test('correct error message should be set to state', () => {
  const newErrorMessage = 'some error occurred';
  const endState = appReducer(
    startState,
    appAC.setErrorMessage({ errorMessage: newErrorMessage }),
  );

  expect(endState.errorMessage).toBe(newErrorMessage);
});

test('correct value of property isInitialized should be set to state', () => {
  const endState = appReducer(startState, appAC.setInitialized({ isInitialized: true }));

  expect(startState.isInitialized).toBeFalsy();
  expect(endState.isInitialized).toBeTruthy();
});
