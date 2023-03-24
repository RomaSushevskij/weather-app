import { useEffect } from 'react';

import style from './SnackBar.module.scss';

import { ErrorIcon, SuccessIcon } from 'components/icons';
import { Nullable, ReturnComponent } from 'types';

export enum SNACK_BAR_TYPES {
  ERROR = 'error',
  SUCCESS = 'success',
}

type ErrorBarPropsType = {
  message: Nullable<string>;
  type: SNACK_BAR_TYPES;
  onClose: () => void;
};

const THREE_SECOND = 3000;

export const SnackBar = ({
  message,
  type,
  onClose,
}: ErrorBarPropsType): ReturnComponent => {
  let finalClassName;

  if (type === SNACK_BAR_TYPES.SUCCESS) {
    finalClassName = `${style.snackBarWrapper} ${style.successBarWrapper}`;
  } else if (type === SNACK_BAR_TYPES.ERROR) {
    finalClassName = `${style.snackBarWrapper} ${style.errorBarWrapper}`;
  } else {
    finalClassName = style.snackBarWrapper;
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, THREE_SECOND);

    return () => clearTimeout(timerId);
  }, [message]);

  return (
    <div className={finalClassName}>
      <div className={style.icon}>
        {type === SNACK_BAR_TYPES.SUCCESS ? (
          <SuccessIcon width={20} height={20} />
        ) : (
          <ErrorIcon width={20} height={20} />
        )}
      </div>
      <p>{message}</p>
    </div>
  );
};
