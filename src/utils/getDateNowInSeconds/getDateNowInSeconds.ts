import { MS_IN_ONE_SECOND } from 'constantsGlobal';

export const getDateNowInSeconds = (): number => {
  return Math.floor(Date.now() / MS_IN_ONE_SECOND);
};
