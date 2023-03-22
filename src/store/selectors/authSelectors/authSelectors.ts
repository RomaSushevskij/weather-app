import { AppStateType } from 'store/types';
import { Nullable } from 'types';

export const authSelectors = {
  isLoggedIn(state: AppStateType): boolean {
    return state.auth.isLoggedIn;
  },
  email(state: AppStateType): Nullable<string> {
    return state.auth.email;
  },
  name(state: AppStateType): Nullable<string> {
    return state.auth.name;
  },
};
