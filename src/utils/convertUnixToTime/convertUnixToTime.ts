export const convertUnixToTime = (unixTime: number): string => {
  return new Intl.DateTimeFormat('ru-RU', { timeStyle: 'short' }).format(unixTime);
};
