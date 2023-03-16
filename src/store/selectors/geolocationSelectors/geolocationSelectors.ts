import { AppStateType } from 'store/types';
import { Nullable } from 'types';

export const geolocationSelectors = {
  city(state: AppStateType): Nullable<string> | undefined {
    return state.geolocation.city;
  },
  country(state: AppStateType): Nullable<string> {
    return state.geolocation.country;
  },
  latitude(state: AppStateType): Nullable<number> {
    return state.geolocation.lat;
  },
  longitude(state: AppStateType): Nullable<number> {
    return state.geolocation.lon;
  },
};
