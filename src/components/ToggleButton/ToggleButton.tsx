import React, { memo, ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from 'react';

import style from './ToggleButton.module.scss';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type ToggleButtonProps = DefaultRadioPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

export const ToggleButton = memo(
  ({
    name,
    options,
    value,
    onChange,
    onChangeOption,
    ...restProps
  }: ToggleButtonProps) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange?.(e);
      onChangeOption?.(e.currentTarget.value);
    };

    const mappedOptions: any[] = options
      ? options.map((option, index) => {
          const id = `${options[index]}-${index}`;
          const isChecked = option === value;
          const isFirstButton = index === 0;
          const isLastButton = index === options.length - 1;

          const buttonStyles = [style.button];

          if (isChecked) buttonStyles.push(style.checked);
          if (isFirstButton) buttonStyles.push(style.firstButton);
          if (isLastButton) buttonStyles.push(style.lastButton);

          const buttonStyle = buttonStyles.join(' ');

          return (
            <label htmlFor={id} className={buttonStyle} key={id}>
              <input
                id={id}
                type="radio"
                name={name}
                checked={isChecked}
                value={option}
                onChange={onChangeCallback}
                {...restProps}
              />
              <span>{option}</span>
            </label>
          );
        })
      : [];

    return <div className={style.toggleButtonWrp}>{mappedOptions}</div>;
  },
);
