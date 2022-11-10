import { useContext } from "react";
import { CalculatorContext } from "../store/calculator-context";
import { Props } from "../types/types";
import "./Output.css";

const Output = (props: Props) => {
  const ctx = useContext(CalculatorContext);
  const currentVal = ctx?.currentValue;
  const pendingVal = ctx?.pendingValue;
  return (
    <div className="output">
      <span className="pendingValue">{pendingVal?.toString() || "NA"}</span>
      <span className="currentValue">{currentVal?.toString() || "0"}</span>
    </div>
  );
};

export default Output;
