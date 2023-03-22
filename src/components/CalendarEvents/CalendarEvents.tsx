import { memo } from 'react';

import style from './CalendarEvents.module.scss';

import { Event } from 'components/CalendarEvents/Event';
import { EventType } from 'store/reducers/eventsReducer';

type CalendarEventsProps = {
  events: EventType[];
};
export const CalendarEvents = memo(({ events }: CalendarEventsProps) => {
  const eventsElements = events.map(({ summary, id, dateTime }) => {
    const eventStartDateTime = new Date(dateTime).toLocaleString('ru', {
      timeStyle: 'short',
      dateStyle: 'short',
    });

    return (
      <div key={id} className={style.eventBlock}>
        <Event dateTime={eventStartDateTime} summary={summary} />
      </div>
    );
  });

  return <div className={style.events}>{eventsElements}</div>;
});
