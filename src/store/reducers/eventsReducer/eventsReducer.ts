import { EventType } from 'store/reducers/eventsReducer';
import { PayloadAction } from 'store/types';

enum EVENTS_ACTIONS_TYPE {
  SET_EVENTS = 'events/SET_EVENTS',
}

export type EventsInitialState = typeof initialEventsState;
export type EventsActionsType = ReturnType<typeof eventsAC.setEvents>;

const initialEventsState = {
  events: [] as EventType[],
};

export const eventsReducer = (
  // eslint-disable-next-line default-param-last
  state: EventsInitialState = initialEventsState,
  action: EventsActionsType,
): EventsInitialState => {
  switch (action.type) {
    case EVENTS_ACTIONS_TYPE.SET_EVENTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const eventsAC = {
  setEvents(param: { events: EventType[] }): PayloadAction<
    EVENTS_ACTIONS_TYPE.SET_EVENTS,
    {
      events: EventType[];
    }
  > {
    return {
      type: EVENTS_ACTIONS_TYPE.SET_EVENTS,
      payload: param,
    } as const;
  },
};
