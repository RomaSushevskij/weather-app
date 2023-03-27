import { cloneableGenerator } from '@redux-saga/testing-utils';
import { AxiosError } from 'axios';
import { call, put } from 'redux-saga/effects';

import { googleAPI } from 'api/googleAPI';
import { GetEventsResponseData } from 'api/googleAPI/types';
import { appAC } from 'store/reducers/appReducer';
import { EventType, eventsAC } from 'store/reducers/eventsReducer';
import { fetchEvents, handleError } from 'store/sagas';
import { normalizeState } from 'utils';

describe('Call fetchEvents should work correct', () => {
  const gen = cloneableGenerator(fetchEvents)();

  it('Call fetchEvents without errors', () => {
    const data: GetEventsResponseData = {
      items: [
        {
          id: 'asdf2',
          start: { dateTime: new Date().toISOString() },
          summary: 'summary',
        },
      ],
    };
    const events: EventType[] = normalizeState.events(data.items);

    const genClone = gen.clone();

    expect(genClone.next().value).toEqual(put(appAC.setStatus({ status: 'loading' })));
    expect(genClone.next().value).toEqual(call(googleAPI.getEvents));
    expect(genClone.next(data).value).toEqual(call(normalizeState.events, data.items));
    expect(genClone.next(events).value).toEqual(put(eventsAC.setEvents({ events })));
    expect(genClone.next().value).toEqual(put(appAC.setStatus({ status: 'succeeded' })));
    expect(genClone.next().done).toBeTruthy();
  });

  it('Call fetchEvents with some errors', () => {
    const error = new AxiosError('Request failed');

    const genClone = gen.clone();

    genClone.next();

    // @ts-ignore
    expect(genClone.throw(error).value).toEqual(call(handleError, error));
    expect(genClone.next().done).toBeTruthy();
  });
});
