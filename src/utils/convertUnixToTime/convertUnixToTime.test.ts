import { convertUnixToTime } from './convertUnixToTime';

test('The convertUnixToWeekDay should work correctly', () => {
  // eslint-disable-next-line no-magic-numbers
  const unixTimes = [1678309200000, 1678312800000, 1678316400000, 1678356000000];
  const expectedTimes = ['00:00', '01:00', '02:00', '13:00'];

  const times = unixTimes.map(unixTime => convertUnixToTime(unixTime));

  expect(times).toEqual(expectedTimes);
});
