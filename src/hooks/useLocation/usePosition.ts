import { useEffect, useState } from 'react';

import { Nullable } from 'types';

type UseLocationReturned = {
  latitude: number;
  longitude: number;
  error: Nullable<string>;
};

export const usePosition = (): UseLocationReturned => {
  const [position, setPosition] = useState({} as Omit<UseLocationReturned, 'error'>);
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
    }

    geo.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setPosition({ latitude, longitude });
      },
      positionError => setError(positionError.message),
    );
  }, []);

  return { ...position, error };
};
