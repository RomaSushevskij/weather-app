import { PayloadAction } from 'store/types';
import { Nullable } from 'types';

enum AUTH_ACTIONS_TYPE {
  SET_IS_LOGGED_IN = 'events/SET_IS_LOGGED_IN',
  SET_EMAIL = 'events/SET_EMAIL',
  SET_NAME = 'events/SET_NAME',
}

export type AuthInitialState = typeof initialAuthState;
type AuthACParam<P> = P extends AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN
  ? { isLoggedIn: boolean }
  : P extends AUTH_ACTIONS_TYPE.SET_EMAIL
  ? { email: Nullable<string> }
  : { name: Nullable<string> };
export type AuthActionsType =
  | ReturnType<typeof authAC.setIsLoggedIn>
  | ReturnType<typeof authAC.setEmail>
  | ReturnType<typeof authAC.setName>;

export const authReducer = (
  // eslint-disable-next-line default-param-last
  state: AuthInitialState = initialAuthState,
  action: AuthActionsType,
): AuthInitialState => {
  switch (action.type) {
    case AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN:
    case AUTH_ACTIONS_TYPE.SET_EMAIL:
    case AUTH_ACTIONS_TYPE.SET_NAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialAuthState = {
  isLoggedIn: false,
  email: null as Nullable<string>,
  name: null as Nullable<string>,
};

export const authAC = {
  setIsLoggedIn(
    param: AuthACParam<AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN>,
  ): PayloadAction<
    AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN,
    AuthACParam<AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN>
  > {
    return {
      type: AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN,
      payload: param,
    } as const;
  },
  setEmail(
    param: AuthACParam<AUTH_ACTIONS_TYPE.SET_EMAIL>,
  ): PayloadAction<
    AUTH_ACTIONS_TYPE.SET_EMAIL,
    AuthACParam<AUTH_ACTIONS_TYPE.SET_EMAIL>
  > {
    return {
      type: AUTH_ACTIONS_TYPE.SET_EMAIL,
      payload: param,
    } as const;
  },
  setName(
    param: AuthACParam<AUTH_ACTIONS_TYPE.SET_NAME>,
  ): PayloadAction<AUTH_ACTIONS_TYPE.SET_NAME, AuthACParam<AUTH_ACTIONS_TYPE.SET_NAME>> {
    return {
      type: AUTH_ACTIONS_TYPE.SET_NAME,
      payload: param,
    } as const;
  },
};
