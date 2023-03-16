import { checkIfGeolocationIsRequired } from 'utils';

describe('The checkIfGeolocationIsRequired function should work correctly', () => {
  test('Returned value should be truthy', () => {
    const searchLocality = 'Minsk';
    const stateCity = undefined;
    const stateCountry = 'Belarus';

    const isGeolocationChanged = checkIfGeolocationIsRequired({
      searchLocality,
      stateCountry,
      stateCity,
    });

    expect(isGeolocationChanged).toBeTruthy();
  });

  test('Returned value should be falsy', () => {
    const searchLocality = 'Belarus';
    const stateCity = undefined;
    const stateCountry = 'Belarus';

    const isGeolocationChanged = checkIfGeolocationIsRequired({
      searchLocality,
      stateCountry,
      stateCity,
    });

    expect(isGeolocationChanged).toBeFalsy();
  });
  test('Returned value should be truthy', () => {
    const searchLocality = 'Minsk';
    const stateCity = 'Gomel';
    const stateCountry = 'Belarus';

    const isGeolocationChanged = checkIfGeolocationIsRequired({
      searchLocality,
      stateCountry,
      stateCity,
    });

    expect(isGeolocationChanged).toBeTruthy();
  });
  test('Returned value should be falsy', () => {
    const searchLocality = 'Minsk';
    const stateCity = 'Minsk';
    const stateCountry = 'Belarus';

    const isGeolocationChanged = checkIfGeolocationIsRequired({
      searchLocality,
      stateCountry,
      stateCity,
    });

    expect(isGeolocationChanged).toBeFalsy();
  });
});
