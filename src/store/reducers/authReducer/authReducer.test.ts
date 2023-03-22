import {
  authAC,
  AuthInitialState,
  authReducer,
} from 'store/reducers/authReducer/authReducer';

let startState: AuthInitialState;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    email: null,
    name: null,
  };
});

describe('Correct values should be set to state', () => {
  it('Correct isLoggedIn value should be set to state', () => {
    const isLoggedIn = true;
    const endState = authReducer(startState, authAC.setIsLoggedIn({ isLoggedIn }));

    expect(startState.isLoggedIn).toBeFalsy();
    expect(endState.isLoggedIn).toBeTruthy();
  });

  it('Correct email value should be set to state', () => {
    const email = 'email@gmail.com';
    const endState = authReducer(startState, authAC.setEmail({ email }));

    expect(startState.email).toBe(null);
    expect(endState.email).toBe(email);
  });

  it('Correct name value should be set to state', () => {
    const name = 'Name';
    const endState = authReducer(startState, authAC.setName({ name }));

    expect(startState.name).toBe(null);
    expect(endState.name).toBe(name);
  });
});
