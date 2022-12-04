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

  const calculate = (operator: string) => {
    let result = null;
    if (operator === "+") {
      result = String(Number(currentValue) + Number(previousValue));
    } else if (operator === "-") {
      result = String(Number(previousValue) - Number(currentValue));
    } else if (operator.toLocaleLowerCase() === "x") {
      result = String(Number(currentValue) * Number(previousValue));
    } else if (operator === "÷") {
      result = String(Number(previousValue) / Number(currentValue));
    }
    return result;
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
        return setCurrentValue(currentValue);
      }
      /**
       * handle operations when equal symbol is clicked
       * with an operator present
       */
      let result = null;
      if (currentValue && previousValue) {
        result = calculate(operator);
      }
      setCurrentValue(result);
      setPreviousValue("");
      setOperator("");
      setHasCalculated(true);
      return;
    }
    /**
     * after a calculation is performed
     * if the next input is a number or decimal point
     * the 'setHasCalculated' variable is set to false
     * and currentValue is set to nextInput value
     */
    if (
      hasCalculated &&
      nextInput &&
      typeof nextInput === "string" &&
      !ARITHMETHIC_OPERATORS.includes(nextInput) &&
      nextInput !== "="
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
     * if there's currentValue and previousValue, and an operator is clicked instead of equal
     * calculate the value, set it to previousValue, and setCurrentValue to 0
     */
    if (
      nextInput &&
      typeof nextInput === "string" &&
      ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      /**
       * prevent arithmethic operators from being entered if last value is a decimal point
       * */
      if (
        currentValue &&
        typeof currentValue === "string" &&
        String(currentValue)[currentValue.length - 1] === "."
      ) {
        setPreviousValue(currentValue.slice(0, currentValue.length));
      } else {
        setPreviousValue(currentValue);
      }
      if (!operator) {
        setCurrentValue("0");
        setOperator(nextInput);
      } else if (operator) {
        const result = calculate(operator);
        setPreviousValue(result);
        setCurrentValue(0);
        setOperator(nextInput);
        setHasCalculated(true);
        return;
      }
    }
  };

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
