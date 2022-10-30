import React, { useState } from "react";

type IsNumberOrNull = Number | null;

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

type CalculatorContextObj = {
  previousValue?: Number | null;
  currentValue?: Number | null;
  pendingValue?: Number | null;
  handlePreviousValue: (value: IsNumberOrNull) => void;
  handleCurrentValue: (value: IsNumberOrNull) => void;
  handlePendingValue: (value: IsNumberOrNull) => void;
};

export const CalculatorContext =
  React.createContext<CalculatorContextObj | null>({
    previousValue: 0,
    currentValue: 0,
    pendingValue: 0,
    handlePreviousValue: (value: IsNumberOrNull) => {},
    handleCurrentValue: (value: IsNumberOrNull) => {},
    handlePendingValue: (value: IsNumberOrNull) => {},
  });

export const CalculatorContextProvider: React.FC<Props> = (props) => {
  const [previousValue, setPreviousValue] = useState<IsNumberOrNull>(0);
  const [currentValue, setCurrentValue] = useState<IsNumberOrNull>(0);
  const [pendingValue, setPendingValue] = useState<IsNumberOrNull>(0);

  const handlePreviousValue = (value: IsNumberOrNull): void => {
    return setPreviousValue(value);
  };

  const handleCurrentValue = (value: IsNumberOrNull): void => {
    return setCurrentValue(value);
  };

  const handlePendingValue = (value: IsNumberOrNull): void => {
    return setPendingValue(value);
  };

  const contextValue: CalculatorContextObj = {
    previousValue,
    currentValue,
    pendingValue,
    handlePreviousValue,
    handleCurrentValue,
    handlePendingValue,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {props.children}
    </CalculatorContext.Provider>
  );
};
