import { OpenWeatherIcons } from 'api/openWeatherAPI/enums';
import { WeatherIcons } from 'store/reducers/weatherReducer';
import { normalizeWeatherIcon } from 'utils/normalizeWeatherIcon/normalizeWeatherIcon';

test('The normalizeWeatherIcon function should be work correctly', () => {
  const openWeatherIcons: OpenWeatherIcons[] = [
    OpenWeatherIcons.CLEAR_DAY,
    OpenWeatherIcons.CLOUDY_DAY,
    OpenWeatherIcons.CLOUDY_NIGHT,
    OpenWeatherIcons.FOG_DAY,
    OpenWeatherIcons.FOG_NIGHT,
  ];

  const expectedIcons: WeatherIcons[] = [
    WeatherIcons.CLEAR_DAY,
    WeatherIcons.CLOUDY,
    WeatherIcons.CLOUDY,
    WeatherIcons.FOG,
    WeatherIcons.FOG,
  ];

  const defaultWeatherIcons: WeatherIcons[] = openWeatherIcons.map(icon =>
    normalizeWeatherIcon(icon),
  );

  expect(defaultWeatherIcons).toEqual(expectedIcons);
});
