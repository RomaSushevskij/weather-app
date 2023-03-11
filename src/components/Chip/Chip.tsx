import { memo } from 'react';

import style from './Chip.module.scss';

type ChipProps = {
  label: string;
  size?: 'small' | 'medium' | 'large';
};

export const Chip = memo(({ label, size = 'small' }: ChipProps) => {
  let chipStyle: string;

  switch (size) {
    case 'medium':
      chipStyle = `${style.chip} ${style.medium}`;
      break;
    case 'large':
      chipStyle = `${style.chip} ${style.large}`;
      break;
    default:
      chipStyle = style.chip;
  }

  return (
    <div className={chipStyle}>
      <p className={style.label}>{label}</p>
    </div>
  );
});
