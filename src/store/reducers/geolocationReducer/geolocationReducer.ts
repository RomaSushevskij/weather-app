import { GeolocationData } from 'store/reducers/geolocationReducer/types';
import { PayloadAction } from 'store/types';

enum WEATHER_ACTIONS_TYPE {
  SET_LOCATION = 'weather/SET_LOCATION',
}

export type GeolocationInitialState = typeof initialState;
export type GeolocationActionsType = ReturnType<typeof geolocationAC.setLocation>;

const initialState = {
  city: null,
  lat: null,
  lon: null,
  country: null,
} as GeolocationData;

export const geolocationReducer = (
  // eslint-disable-next-line default-param-last
  state: GeolocationInitialState = initialState,
  action: GeolocationActionsType,
): GeolocationInitialState => {
  switch (action.type) {
    case WEATHER_ACTIONS_TYPE.SET_LOCATION: {
      const location = action.payload as GeolocationData;

      return { ...state, ...location };
    }
    default:
      return state;
  }
};

export const geolocationAC = {
  setLocation(
    location: GeolocationData,
  ): PayloadAction<WEATHER_ACTIONS_TYPE.SET_LOCATION, GeolocationData> {
    return {
      type: WEATHER_ACTIONS_TYPE.SET_LOCATION,
      payload: location,
    } as const;
  },
};
