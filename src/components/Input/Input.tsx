import React, {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react';

import style from './Input.module.scss';

import { ReturnComponent } from 'types';

type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type InputTextProps = DefaultInputProps & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  customStyle?: string;
  startIcon?: ReturnComponent;
  endIcon?: ReturnComponent;
};

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

    let InputWithIconsStyle: string;

    if (startIcon && !endIcon) {
      InputWithIconsStyle = `${inputStyle} ${style.paddingLeft}`;
    } else if (endIcon && !startIcon) {
      InputWithIconsStyle = `${inputStyle} ${style.paddingRight}`;
    } else if (startIcon && endIcon) {
      InputWithIconsStyle = `${inputStyle} ${style.paddingLeft} ${style.paddingRight}`;
    } else {
      InputWithIconsStyle = inputStyle;
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
          className={InputWithIconsStyle}
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
