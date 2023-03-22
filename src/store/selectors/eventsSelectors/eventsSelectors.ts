import { EventType } from 'store/reducers/eventsReducer';
import { AppStateType } from 'store/types';

export const eventsSelectors = {
  event(state: AppStateType): EventType[] {
    return state.events.events;
  },
};
