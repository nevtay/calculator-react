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
  const MAX_NUMBER_OF_INPUTS = 20;
  const [previousValue, setPreviousValue] =
    useState<IsNumberOrStringOrNull>("0");
  const [currentValue, setCurrentValue] = useState<IsNumberOrStringOrNull>("0");
  const [pendingValue, setPendingValue] = useState<IsNumberOrStringOrNull>("");

  const handlePreviousValue = (value: IsNumberOrStringOrNull): void => {
    return setPreviousValue(value);
  };

  const handleCurrentValue = (nextInput: IsNumberOrStringOrNull): void => {
    // reset all values
    if (nextInput === "AC") {
      setCurrentValue("0");
      setPendingValue("");
      return;
    }
    // prevent decimal point from being the last value
    if (
      currentValue &&
      (String(currentValue).length >= MAX_NUMBER_OF_INPUTS ||
        (String(currentValue).length >= MAX_NUMBER_OF_INPUTS - 1 &&
          nextInput === "."))
    ) {
      return;
    }
    // if initial value is 0 and the next value is not 0, replace initial 0 with an empty string
    if (
      currentValue === "0" &&
      typeof nextInput === "string" &&
      nextInput !== "."
    ) {
      const nextValue = currentValue.concat(nextInput).replace("0", "");
      setCurrentValue(nextValue);
    } else {
      const nextValue = String(currentValue) + String(nextInput);
      setCurrentValue(nextValue);
    }
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
