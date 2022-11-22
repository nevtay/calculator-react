import { useContext } from "react";
import { CalculatorContext } from "../store/calculator-context";
import { Props } from "../types/types";
import "./Output.css";

const Output = (props: Props) => {
  const ctx = useContext(CalculatorContext);
  const currentVal = ctx?.currentValue;
  const previousVal = ctx?.previousValue;
  const operator = ctx?.operator;
  return (
    <div className="output">
      <span className="pendingValue">{previousVal?.toString() || ""}</span>
      <span className="operator">{operator}</span>
      <span className="currentValue">{currentVal?.toString() || ""}</span>
    </div>
  );
};

export default Output;
