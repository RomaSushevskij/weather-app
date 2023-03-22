import { PayloadAction } from 'store/types';
import { Nullable, RequestStatus } from 'types';

enum APP_ACTIONS_TYPE {
  SET_APP_INITIALIZED = 'app/SET_APP_INITIALIZED',
  SET_APP_STATUS = 'app/SET_APP_STATUS',
  SET_APP_ERROR_MESSAGE = 'app/SET_APP_ERROR_MESSAGE',
}

export type AppInitialState = typeof initialAppState;
type AppACParam<P = void> = P extends boolean
  ? { isInitialized: boolean }
  : P extends RequestStatus
  ? { status: RequestStatus }
  : { errorMessage: Nullable<string> };

export type AppActionsType =
  | ReturnType<typeof appAC.setInitialized>
  | ReturnType<typeof appAC.setStatus>
  | ReturnType<typeof appAC.setErrorMessage>;

const initialAppState = {
  status: 'idle' as RequestStatus,
  errorMessage: null as Nullable<string>,
  isInitialized: false,
};

export const appReducer = (
  // eslint-disable-next-line default-param-last
  state: AppInitialState = initialAppState,
  action: AppActionsType,
): AppInitialState => {
  switch (action.type) {
    case APP_ACTIONS_TYPE.SET_APP_INITIALIZED:
    case APP_ACTIONS_TYPE.SET_APP_STATUS:
    case APP_ACTIONS_TYPE.SET_APP_ERROR_MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const appAC = {
  setInitialized(
    param: AppACParam<boolean>,
  ): PayloadAction<APP_ACTIONS_TYPE.SET_APP_INITIALIZED, AppACParam<boolean>> {
    return {
      type: APP_ACTIONS_TYPE.SET_APP_INITIALIZED,
      payload: param,
    } as const;
  },
  setStatus(
    param: AppACParam<RequestStatus>,
  ): PayloadAction<APP_ACTIONS_TYPE.SET_APP_STATUS, AppACParam<RequestStatus>> {
    return {
      type: APP_ACTIONS_TYPE.SET_APP_STATUS,
      payload: param,
    } as const;
  },
  setErrorMessage(
    param: AppACParam<Nullable<string>>,
  ): PayloadAction<APP_ACTIONS_TYPE.SET_APP_ERROR_MESSAGE, AppACParam<Nullable<string>>> {
    return {
      type: APP_ACTIONS_TYPE.SET_APP_ERROR_MESSAGE,
      payload: param,
    } as const;
  },
};
