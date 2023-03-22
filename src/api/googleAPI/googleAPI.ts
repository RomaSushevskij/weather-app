import { googleCloud } from 'api/config';
import { GetEventsResponseData, GetUserInfoResponseData } from 'api/googleAPI/types';

export const googleAPI = {
  async getUserInfo(): Promise<GetUserInfoResponseData> {
    const { data } = await googleCloud.get<GetUserInfoResponseData>(
      process.env.REACT_APP_GOOGLE_CLOUD_AUTH_LINK as string,
    );

    return data;
  },
  async getEvents(): Promise<GetEventsResponseData> {
    const { data } = await googleCloud.get<GetEventsResponseData>(
      process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_LINK as string,
    );

    return data;
  },
};
