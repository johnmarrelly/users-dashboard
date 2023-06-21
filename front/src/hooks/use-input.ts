import { useState } from 'react';

export const useInput = ({
  validateValue,
}: {
  validateValue: (value: any) => boolean;
}): {
  enteredValue: string;
  valueChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueBlurHandler: () => void;
  isValidValue: boolean;
  hasError: boolean;
  resetValues: () => void;
} => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValueTouched, setIsValueTouched] = useState(false);

  const isValidValue = validateValue(enteredValue);
  const hasError = !isValidValue && isValueTouched;

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  const valueBlurHandler = () => {
    setIsValueTouched(true);
  };

  const resetValues = () => {
    setEnteredValue('');
    setIsValueTouched(false);
  };

  return {
    enteredValue,
    valueChangeHandler,
    valueBlurHandler,
    isValidValue,
    hasError,
    resetValues,
  };
};
