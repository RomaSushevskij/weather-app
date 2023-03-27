# Weather-app

Приложение, отображающее погоду в городах с
дополнительной визуализацией. Реализована интеграция с двумя погодными сервисами:
- [OpenWeather](https://openweathermap.org)
- [VisualCrossing](https://www.visualcrossing.com)

Также для возможности подгрузки событий из Google Calendar реализована интеграция с:
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) - для возможности входа и выхода из аккаунта. C этой целью используется дополнительная библиотека [React OAuth2 | Google](https://www.npmjs.com/package/@react-oauth/google);
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview) - для под подгрузки событий из Google Calendar.

При разработке данного приложения использовались такие основные инструменты, как:
- TypeScript;
- React;
- Redux;
- Redux-Saga;
- Axios;

## Доступные скрипты

В директории проекта вы можете запустить:

### `yarn start`

Запускает приложение в режиме разработки. Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

### `yarn test`

Запуск тестов в интерактивном режиме просмотра. 

## Демо
:link: [Link to Demo App](https://romasushevskij.github.io/weather-app) 

