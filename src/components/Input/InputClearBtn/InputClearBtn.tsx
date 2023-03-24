import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react';

import style from './InputClearBtn.module.scss';

import { CloseIcon } from 'components/icons/CloseIcon';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const InputClearBtn = memo(({ type, ...restProps }: DefaultButtonProps) => {
  return (
    <button
      className={style.clearBtn}
      type={type === 'submit' ? 'submit' : 'button'}
      {...restProps}
    >
      <CloseIcon width={20} height={20} color="#bac1d2" />
    </button>
  );
});
