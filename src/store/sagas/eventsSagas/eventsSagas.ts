import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { googleAPI } from 'api/googleAPI';
import { GetEventsResponseData } from 'api/googleAPI/types';
import { appAC, AppActionsType } from 'store/reducers/appReducer';
import { EventType, eventsAC, EventsActionsType } from 'store/reducers/eventsReducer';
import { handleError } from 'store/sagas/handleError';
import { normalizeState } from 'utils';

export type FetchEventsReturned = Generator<
  | CallEffect<GetEventsResponseData | EventType[] | void>
  | PutEffect<EventsActionsType | AppActionsType>,
  void,
  never
>;

export function* fetchEvents(): FetchEventsReturned {
  try {
    yield put(appAC.setStatus({ status: 'loading' }));
    const { items }: GetEventsResponseData = yield call(googleAPI.getEvents);
    const events: EventType[] = yield call(normalizeState.events, items);

    yield put(eventsAC.setEvents({ events }));
    yield put(appAC.setStatus({ status: 'succeeded' }));
  } catch (e) {
    yield call(handleError, e);
  }
}
