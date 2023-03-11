import { convertUnixToWeekDay } from 'utils';

test('The convertUnixToWeekDay should work correctly', () => {
  // eslint-disable-next-line no-magic-numbers
  const unixTimes = [1678395600000, 1678482000000, 1678575600000, 1678701600000];
  const expectedTimes = ['Fri', 'Sat', 'Sun', 'Mon'];

  const times = unixTimes.map(unixTime => convertUnixToWeekDay(unixTime));

  expect(times).toEqual(expectedTimes);
});
