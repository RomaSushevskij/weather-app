import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { ReturnComponent } from 'types';

type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputTextProps = DefaultInputProps & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  customStyle?: string;
  startIcon?: ReturnComponent;
  endIcon?: ReturnComponent;
};
