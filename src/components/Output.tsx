import { useContext } from "react";
import { CalculatorContext } from "../store/calculator-context";
import { Props } from "../types/types";
import "./Output.css";

const Output = (props: Props) => {
  const ctx = useContext(CalculatorContext);
  const currentVal = ctx?.currentValue;
  return (
    <div className="output">
      <p className="currentValue">{currentVal?.toString() || "0"}</p>
    </div>
  );
};

export default Output;
