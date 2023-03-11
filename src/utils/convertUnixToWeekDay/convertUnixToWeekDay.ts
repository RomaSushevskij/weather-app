export const convertUnixToWeekDay = (unixTime: number): string => {
  return new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(unixTime);
};
