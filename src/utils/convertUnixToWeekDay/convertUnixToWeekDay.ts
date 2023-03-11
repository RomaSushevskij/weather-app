export const convertUnixToWeekDay = (unixTime: number): string => {
  return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(unixTime);
};
