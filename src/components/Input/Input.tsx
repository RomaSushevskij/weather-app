import React, { ChangeEvent, ForwardedRef, forwardRef, KeyboardEvent } from 'react';

import style from './Input.module.scss';
import { InputTextProps } from './types';

import { ReturnComponent } from 'types';

export const Input = forwardRef(
  (
    props: InputTextProps,
    innerRef: ForwardedRef<HTMLInputElement | null>,
  ): ReturnComponent => {
    const {
      type,
      onChange,
      onChangeText,
      onKeyPress,
      onEnter,
      error,
      className,
      spanClassName,
      name,
      customStyle,
      disabled,
      startIcon,
      endIcon,
      ...restProps
    } = props;
    const inputWrapperStyle = customStyle
      ? `${customStyle} ${style.inputWrapper}`
      : style.inputWrapper;

    const inputStyle = `${
      error ? `${style.errorInput} ${style.input}` : style.input
    } ${className}`;

    let finalInputStyle: string;

    if (startIcon && !endIcon) {
      finalInputStyle = `${inputStyle} ${style.paddingLeft}`;
    } else if (endIcon && !startIcon) {
      finalInputStyle = `${inputStyle} ${style.paddingRight}`;
    } else if (startIcon && endIcon) {
      finalInputStyle = `${inputStyle} ${style.paddingLeft} ${style.paddingRight}`;
    } else {
      finalInputStyle = inputStyle;
    }

    const errorSpanStyle = `${style.error} ${spanClassName || ''}`;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange?.(e);
      onChangeText?.(e.currentTarget.value);
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>): void => {
      onKeyPress?.(e);
      if (onEnter && e.key === 'Enter') onEnter();
    };

    return (
      <div className={inputWrapperStyle}>
        {startIcon && <div className={style.startIcon}>{startIcon}</div>}
        <input
          name={name}
          type={type}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalInputStyle}
          disabled={disabled}
          ref={innerRef}
          {...restProps}
        />
        {endIcon && <div className={style.endIcon}>{endIcon}</div>}
        {error && <p className={errorSpanStyle}>{error}</p>}
      </div>
    );
  },
);
