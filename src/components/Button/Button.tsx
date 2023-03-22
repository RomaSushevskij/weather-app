import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react';

import style from './Button.module.scss';

import { ReturnComponent } from 'types';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = DefaultButtonProps & {
  startIcon?: ReturnComponent;
  endIcon?: ReturnComponent;
};

export const Button = memo(
  ({
    type,
    className,
    startIcon,
    endIcon,
    ...restProps
  }: ButtonProps): ReturnComponent => {
    const buttonStyles = [style.default];

    if (className) buttonStyles.push(className);
    if (startIcon) buttonStyles.push(style.paddingLeft);
    if (endIcon) buttonStyles.push(style.paddingRight);

    const buttonStyle = buttonStyles.join(' ');

    return (
      <div className={style.btnWrp}>
        {startIcon && <div className={style.startIcon}>{startIcon}</div>}
        <button
          type={type === 'submit' ? 'submit' : 'button'}
          className={`${buttonStyle} `}
          {...restProps}
        />
        {endIcon && <div className={style.endIcon}>{endIcon}</div>}
      </div>
    );
  },
);
