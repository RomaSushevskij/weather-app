import { roundTempValue } from 'utils';

test('The roundTempValue function should work correctly', () => {
  // eslint-disable-next-line no-magic-numbers
  const temps = [1.2, 1.5, 1.55, 1.6, -1.2, -1.5, -1.55, -1.8];
  // eslint-disable-next-line no-magic-numbers
  const expectedTemps = [1, 2, 2, 2, -1, -2, -2, -2];

  const roundedTemps = temps.map(temp => roundTempValue(temp));

  expect(roundedTemps).toEqual(expectedTemps);
});
