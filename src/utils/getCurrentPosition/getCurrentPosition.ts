export type GetLocationReturned = {
  latitude: number;
  longitude: number;
};

export const getCurrentPosition = (): Promise<GetLocationReturned> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      error => reject(error.message),
    );
  });
};
