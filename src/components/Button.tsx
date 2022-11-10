import { useContext } from "react";
import { CalculatorContext } from "../store/calculator-context";
import "./Button.css";
import { Props } from "../types/types";

const Button = (props: Props) => {
  const ctx = useContext(CalculatorContext);
  const handleCurrentValue = ctx?.handleCurrentValue;
  const currentValue = ctx?.currentValue;

  if (props.value === ".") {
    return (
      <span
        id={`btn-point`}
        onClick={() => {
          if (typeof currentValue === "string" && currentValue.includes(".")) {
            return;
          }
          if (handleCurrentValue) {
            handleCurrentValue(String(props.value));
          }
        }}
        className={`btn`}
      >
        {props.value}
      </span>
    );
  }
  if (props.value === "=") {
    return (
      <span
        id={`btn-equal`}
        onClick={() => {
          if (handleCurrentValue) {
            handleCurrentValue(String(props.value));
          }
        }}
        className={`btn`}
      >
        {props.value}
      </span>
    );
  }
  return (
    <span
      id={`btn-${props.value}`}
      onClick={() => {
        if (handleCurrentValue) {
          handleCurrentValue(String(props.value));
        }
      }}
      className={`btn`}
    >
      {props.value}
    </span>
  );
};

export default Button;
