import { Nullable } from 'types';

type CheckIfGeolocationIsRequiredParams = {
  searchLocality: string;
  stateCity: Nullable<string> | undefined;
  stateCountry: Nullable<string>;
};
export const checkIfGeolocationIsRequired = ({
  searchLocality,
  stateCity,
  stateCountry,
}: CheckIfGeolocationIsRequiredParams): boolean => {
  let isGeolocationChanged: boolean;

  if (stateCity === undefined) {
    isGeolocationChanged = searchLocality !== stateCountry;
  } else {
    isGeolocationChanged = searchLocality !== stateCity;
  }

  return isGeolocationChanged;
};
