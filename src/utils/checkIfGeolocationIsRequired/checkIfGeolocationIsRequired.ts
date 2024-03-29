import { Nullable } from 'types';

type CheckIfGeolocationIsRequiredParams = {
  searchLocality: Nullable<string>;
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
    isGeolocationChanged = searchLocality?.toLowerCase() !== stateCountry?.toLowerCase();
  } else {
    isGeolocationChanged = searchLocality?.toLowerCase() !== stateCity?.toLowerCase();
  }

  return isGeolocationChanged;
};
