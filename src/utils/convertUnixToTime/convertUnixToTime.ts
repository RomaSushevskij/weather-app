export const convertUnixToTime = (unixTime: number): string => {
  return new Intl.DateTimeFormat('en-Gb', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(unixTime);
};
