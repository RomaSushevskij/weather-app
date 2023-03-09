import { memo } from 'react';

import style from './Chip.module.scss';

type ChipProps = {
  label: string;
  size?: 'small' | 'medium' | 'large';
};

export const Chip = memo(({ label, size = 'small' }: ChipProps) => {
  let iconStyle;

  switch (size) {
    case 'medium':
      iconStyle = `${style.chip} ${style.medium}`;
      break;
    case 'large':
      iconStyle = `${style.chip} ${style.large}`;
      break;
    default:
      iconStyle = style.chip;
  }

  return <p className={iconStyle}>{label}</p>;
});
