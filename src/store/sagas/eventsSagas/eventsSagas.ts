import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { googleAPI } from 'api/googleAPI';
import { GetEventsResponseData } from 'api/googleAPI/types';
import { appAC, AppActionsType } from 'store/reducers/appReducer/appReducer';
import { eventsAC, EventsActionsType } from 'store/reducers/eventsReducer/eventsReducer';
import { handleError } from 'store/sagas/handleError/handleError';
import { normalizeState } from 'utils';

export type FetchEventsReturned = Generator<
  | CallEffect<GetEventsResponseData | void>
  | PutEffect<EventsActionsType | AppActionsType>,
  void,
  never
>;

export function* fetchEvents(): FetchEventsReturned {
  try {
    yield put(appAC.setStatus({ status: 'loading' }));
    const { items }: GetEventsResponseData = yield call(googleAPI.getEvents);
    const events = normalizeState.events(items);

    yield put(eventsAC.setEvents({ events }));
    yield put(appAC.setStatus({ status: 'succeeded' }));
  } catch (e) {
    yield call(handleError, e);
  }
}
