import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { EMPTY_STRING } from 'constantsGlobal';

type UseInputReturned = {
  inputValue: string;
  inputError: string;
  handleSetInputValue: (newInputValue: string) => void;
  handleSetInputError: (newInputError: string) => void;
  onInputValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useInput = (initialInputValue: string): UseInputReturned => {
  const [inputValue, setInputValue] = useState(() => initialInputValue);
  const [inputError, setInputError] = useState(EMPTY_STRING);

  const handleSetInputValue = useCallback((newInputValue: string) => {
    setInputValue(newInputValue);
  }, []);

  const handleSetInputError = useCallback((newInputError: string) => {
    setInputError(newInputError);
  }, []);

  const onInputValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const currentValue = e.currentTarget.value;

      handleSetInputValue(currentValue);
    },
    [handleSetInputValue],
  );

  return useMemo(
    () => ({
      inputValue,
      inputError,
      handleSetInputValue,
      handleSetInputError,
      onInputValueChange,
    }),
    [
      inputValue,
      inputError,
      handleSetInputValue,
      handleSetInputError,
      onInputValueChange,
    ],
  );
};
