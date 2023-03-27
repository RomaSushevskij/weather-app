import {
  EventType,
  eventsReducer,
  eventsAC,
  EventsInitialState,
} from 'store/reducers/eventsReducer';

let startState: EventsInitialState;

beforeEach(() => {
  startState = {
    events: [] as EventType[],
  };
});

test('Events should be set to state', () => {
  const newEvents: EventType[] = [
    { id: '2232asdfqeswf', dateTime: 1212121212, summary: 'Meeting' },
    { id: '3irfubalksdjfiq', dateTime: 1313131313, summary: 'Meeting 2' },
    { id: '293gfkjasdfasd', dateTime: 141414141414, summary: 'Meeting 3' },
  ];
  const endState = eventsReducer(startState, eventsAC.setEvents({ events: newEvents }));

  expect(startState.events).toEqual([]);
  expect(endState.events).toEqual(newEvents);
});
