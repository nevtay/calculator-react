import React, { useState } from "react";
import {
  IsNumberOrStringOrNull,
  Props,
  CalculatorContextObj,
} from "../types/types";

export const CalculatorContext = React.createContext<CalculatorContextObj>({
  previousValue: 0,
  currentValue: 0,
  pendingValue: 0,
  handlePreviousValue: (value: IsNumberOrStringOrNull) => {},
  handleCurrentValue: (value: IsNumberOrStringOrNull) => {},
  handlePendingValue: (value: IsNumberOrStringOrNull) => {},
});

export const CalculatorContextProvider: React.FC<Props> = (props) => {
  const MAX_NUMBER_OF_INPUTS = 20;
  const ARITHMETHIC_OPERATORS = ["+", "-", "X", "÷"];
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
    // set max number of displayed values
    // prevent decimal point from being the last value
    if (
      currentValue &&
      (String(currentValue).length >= MAX_NUMBER_OF_INPUTS ||
        (String(currentValue).length >= MAX_NUMBER_OF_INPUTS - 1 &&
          nextInput === "."))
    ) {
      return;
    }
    // handle arithmethic operator functionalities
    if (
      typeof nextInput === "string" &&
      ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      if (typeof currentValue === "string" && currentValue.includes(".")) {
        setPendingValue(parseFloat(currentValue));
        setCurrentValue("0");
      } else if (typeof currentValue === "string" && currentValue) {
        setCurrentValue(parseInt(currentValue));
        setPendingValue(currentValue);
        setCurrentValue("0");
      }
      return;
    }
    if (
      currentValue === "0" &&
      typeof nextInput === "string" &&
      nextInput !== "."
    ) {
      // if initial value is 0 and the next value is not 0, replace initial 0 with an empty string
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
