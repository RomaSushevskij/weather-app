import { rootReducer, store } from 'store/store';

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type Action<T> = {
  type: T;
};
export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}
