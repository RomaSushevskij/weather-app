import { rootReducer, store } from 'store/store';

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type ActionType<T, P> = {
  type: T;
  payload?: P;
};
