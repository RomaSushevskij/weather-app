import { memo } from 'react';

import style from './Event.module.scss';

import { Chip } from 'components/Chip';

type EventProps = {
  dateTime: string;
  summary: string;
};

export const Event = memo(({ dateTime, summary }: EventProps) => {
  return (
    <div className={style.event}>
      <div className={style.dateTime}>
        <Chip label={dateTime} size="small" />
      </div>
      <p className={style.description}>{summary}</p>
    </div>
  );
});
