import { useContext } from "react";
import { CalculatorContext } from "../store/calculator-context";
import "./Button.css";
import { Props } from "../types/types";

const Button = (props: Props) => {
  const ctx = useContext(CalculatorContext);
  const handleCurrentValue = ctx?.handleCurrentValue;
  const currentValue = ctx?.currentValue;
  const hasCalculated = ctx?.hasCalculated;

  if (props.value === ".") {
    return (
      <span
        id={`btn-point`}
        onClick={() => {
          if (
            !hasCalculated &&
            typeof currentValue === "string" &&
            currentValue.length === 0
          ) {
            handleCurrentValue("0.");
          }
          if (
            !hasCalculated &&
            typeof currentValue === "string" &&
            currentValue.includes(".") &&
            currentValue.length > 0
          ) {
            return;
          }
          if (hasCalculated && typeof currentValue === "string") {
            return handleCurrentValue("0.");
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
  if (props.value === "%") {
    return (
      <span
        id={`btn-modulo`}
        onClick={() => {
          return;
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
