export type EventData = {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
};

export type GetEventsResponseData = {
  items: EventData[];
};
export type GetUserInfoResponseData = {
  email: string;
  name: string;
};
