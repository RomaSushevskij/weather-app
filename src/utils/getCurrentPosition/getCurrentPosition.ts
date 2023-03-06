type UseLocationReturned = {
  latitude: number;
  longitude: number;
};

export const getCurrentPosition = (): Promise<UseLocationReturned> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      error => reject(error.message),
    );
  });
};
