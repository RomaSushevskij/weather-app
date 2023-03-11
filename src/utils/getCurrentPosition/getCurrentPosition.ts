export type GetPositionReturned = {
  latitude: number;
  longitude: number;
};

export const getCurrentPosition = (): Promise<GetPositionReturned> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      error => reject(error.message),
    );
  });
};
