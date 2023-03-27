import { MINUTE_IN_HOUR, MS_IN_SECOND } from 'constantsGlobal';

export const getMyTimeZoneOffset = (): number => {
  return Math.abs(new Date().getTimezoneOffset() * MINUTE_IN_HOUR * MS_IN_SECOND);
};

export const convertToUTCDate = (unixTime: number, timezoneOffsetMS: number): number => {
  const myTimeZoneOffset = getMyTimeZoneOffset();

  return new Date(unixTime - myTimeZoneOffset + timezoneOffsetMS).getTime();
};
