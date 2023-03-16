import { AppStateType } from 'store/types';
import { Nullable, RequestStatus } from 'types';

export const appSelectors = {
  status(state: AppStateType): RequestStatus {
    return state.app.status;
  },
  isInitialized(state: AppStateType): boolean {
    return state.app.isInitialized;
  },
  errorMessage(state: AppStateType): Nullable<string> {
    return state.app.errorMessage;
  },
};
