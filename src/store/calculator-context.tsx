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
    // set currentValue to next input if a calculation was previously done
    // if next input is a decimal point, set currentValue to "0."
    if (
      hasCalculated &&
      currentValue &&
      nextInput &&
      typeof nextInput === "string"
    ) {
      if (nextInput === ".") {
        setCurrentValue("0.");
      } else if (ARITHMETHIC_OPERATORS.includes(nextInput)) {
        setPreviousValue(currentValue);
        setCurrentValue("0");
        setOperator(nextInput);
        return;
      } else {
        setCurrentValue(nextInput);
      }
      setHasCalculated(false);
      return;
    }
    // do nothing if input is equal sign while no operator is displayed
    if (nextInput === "=" && !operator) {
      return;
    }
    // perform calculations and show output
    if (nextInput === "=" && operator) {
      if (operator.toLowerCase() === "x") {
        setCurrentValue(String(Number(previousValue) * Number(currentValue)));
      } else if (operator === "÷") {
        setCurrentValue(String(Number(previousValue) / Number(currentValue)));
      } else if (operator === "+") {
        setCurrentValue(String(Number(previousValue) + Number(currentValue)));
      } else if (operator === "-") {
        setCurrentValue(String(Number(previousValue) - Number(currentValue)));
      } else {
        return;
      }
      setHasCalculated(true);
      setPreviousValue("");
      setOperator("");
      return;
    }
    // if arithmetic button is clicked, setPreviousValue to currentValue
    // set current value to 0
    if (
      typeof nextInput === "string" &&
      ARITHMETHIC_OPERATORS.includes(nextInput)
    ) {
      // console.log(ARITHMETHIC_OPERATORS.includes(nextInput));
      setPreviousValue(currentValue);
      setOperator(nextInput);
      setCurrentValue("0");
      setHasCalculated(true);
      return;
    }
    // if initial value is 0 and incoming value is a number, remove initial 0 from view
    // else, append incoming value to current value
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
    /**
     * set max number of displayed values
     * prevent decimal point from being the last value
     */
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
      setOperator(nextInput);
      if (typeof currentValue === "string" && currentValue.includes(".")) {
        // setPendingValue(parseFloat(currentValue));
        setCurrentValue("0");
      } else if (typeof currentValue === "string" && currentValue) {
        // setPendingValue(parseInt(currentValue));
        setCurrentValue("0");
      }
      return;
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
