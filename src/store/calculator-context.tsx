import React, { useState } from "react";
import {
  IsNumberOrStringOrNull,
  Props,
  CalculatorContextObj,
} from "../types/types";

export const CalculatorContext = React.createContext<CalculatorContextObj>({
  previousValue: 0,
  currentValue: 0,
  hasCalculated: false,
  operator: "",
  handlePreviousValue: (value: IsNumberOrStringOrNull) => {},
  handleCurrentValue: (value: IsNumberOrStringOrNull) => {},
  handleHasCalculated: (value: boolean) => {},
});

export const CalculatorContextProvider: React.FC<Props> = (props) => {
  const MAX_NUMBER_OF_INPUTS = 20;
  const ARITHMETHIC_OPERATORS = ["+", "-", "X", "÷"];
  const [previousValue, setPreviousValue] =
    useState<IsNumberOrStringOrNull>("0");
  const [currentValue, setCurrentValue] = useState<IsNumberOrStringOrNull>("0");
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [operator, setOperator] = useState<string>("");

  const handlePreviousValue = (value: IsNumberOrStringOrNull): void => {
    return setPreviousValue(value);
  };

  const handleHasCalculated = (value: boolean) => {
    setHasCalculated(value);
  };

  const handleCurrentValue = (nextInput: IsNumberOrStringOrNull): void => {
    // reset all values
    if (nextInput === "AC") {
      setOperator("");
      setCurrentValue("0");
      setPreviousValue("");
      setHasCalculated(false);
      return;
    }
    // add negative symbol toggle
    if (nextInput === "±" && currentValue) {
      const result = Number(currentValue) * -1;
      return setCurrentValue(String(result));
    }
    if (nextInput && nextInput === "=") {
      /**
       * prevent equal symbol from being apprended to currentValue string
       */
      if (!operator) {
        return;
      }
      /**
       * handle operations when equal symbol is clicked
       * with an operator present
       */
      let result = "";
      if (operator === "+" && currentValue && previousValue) {
        result = String(Number(currentValue) + Number(previousValue));
      } else if (operator === "-" && currentValue && previousValue) {
        result = String(Number(previousValue) - Number(currentValue));
      } else if (
        operator.toLocaleLowerCase() === "x" &&
        currentValue &&
        previousValue
      ) {
        result = String(Number(currentValue) * Number(previousValue));
      } else if (operator === "÷" && currentValue && previousValue) {
        result = String(Number(previousValue) / Number(currentValue));
      }
      setCurrentValue(result);
      setPreviousValue("");
      setOperator("");
      setHasCalculated(true);
      return;
    }
    /**
     * after a calculation is performed
     * on entering the next numerical input or decimal point
     * the 'setHasCalculated' variable is reset to false
     * and currentValue is set to nextInput value
     */
    if (
      hasCalculated &&
      nextInput &&
      typeof nextInput === "string" &&
      !ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      setHasCalculated(false);
      setCurrentValue(nextInput);
    }
    /**
     * set max number of displayed values
     * prevent decimal point from being the last value
     */
    if (
      typeof nextInput === "string" &&
      currentValue &&
      ((String(currentValue).length >= MAX_NUMBER_OF_INPUTS - 1 &&
        nextInput === ".") ||
        String(currentValue).length >= MAX_NUMBER_OF_INPUTS) &&
      !ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      return;
    }
    /**
     * append current values to display row
     */
    if (
      !hasCalculated &&
      typeof nextInput === "string" &&
      !ARITHMETHIC_OPERATORS.includes(nextInput) &&
      currentValue === "0"
    ) {
      if (nextInput === ".") {
        const nextValue = currentValue.concat(nextInput);
        setCurrentValue(nextValue);
      } else {
        const nextValue = currentValue.concat(nextInput).replace("0", "");
        setCurrentValue(nextValue);
      }
    } else if (
      !hasCalculated &&
      nextInput &&
      typeof nextInput === "string" &&
      typeof currentValue === "string" &&
      currentValue &&
      currentValue !== "0" &&
      !ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      const nextValue = currentValue.concat(nextInput);
      setCurrentValue(nextValue);
    }
    /**
     * set currentValue to previousValue when operator is clicked
     */
    if (
      nextInput &&
      typeof nextInput === "string" &&
      ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      setPreviousValue(currentValue);
      setCurrentValue("0");
      setOperator(nextInput);
    }
  };

  // const handlePendingValue = (value: IsNumberOrStringOrNull): void => {
  //   return setPendingValue(value);
  // };

  const contextValue: CalculatorContextObj = {
    previousValue,
    currentValue,
    hasCalculated,
    operator,
    handlePreviousValue,
    handleCurrentValue,
    handleHasCalculated,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {props.children}
    </CalculatorContext.Provider>
  );
};
