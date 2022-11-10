import React, { useState } from "react";
import {
  IsNumberOrStringOrNull,
  Props,
  CalculatorContextObj,
} from "../types/types";

export const CalculatorContext =
  React.createContext<CalculatorContextObj | null>({
    previousValue: 0,
    currentValue: 0,
    pendingValue: 0,
    handlePreviousValue: (value: IsNumberOrStringOrNull) => {},
    handleCurrentValue: (value: IsNumberOrStringOrNull) => {},
    handlePendingValue: (value: IsNumberOrStringOrNull) => {},
  });

export const CalculatorContextProvider: React.FC<Props> = (props) => {
  const [previousValue, setPreviousValue] =
    useState<IsNumberOrStringOrNull>("0");
  const [currentValue, setCurrentValue] = useState<IsNumberOrStringOrNull>("0");
  const [pendingValue, setPendingValue] = useState<IsNumberOrStringOrNull>("0");

  const handlePreviousValue = (value: IsNumberOrStringOrNull): void => {
    return setPreviousValue(value);
  };

  const handleCurrentValue = (value: IsNumberOrStringOrNull): void => {
    return setCurrentValue(value);
  };

  const handlePendingValue = (value: IsNumberOrStringOrNull): void => {
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
