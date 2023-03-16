export type Nullable<T> = T | null;
export type NullableDeep<T> = {
  [P in keyof T]: T[P] | null;
};
