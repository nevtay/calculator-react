import "./Button.css";
import { Props } from "../types/types";

const Button = (props: Props) => {
  if (props.value === ".") {
    return (
      <span id={`btn-point`} className={`btn`}>
        {props.value}
      </span>
    );
  }
  if (props.value === "=") {
    return (
      <span id={`btn-equal`} className={`btn`}>
        {props.value}
      </span>
    );
  }
  return (
    <span id={`btn-${props.value}`} className={`btn`}>
      {props.value}
    </span>
  );
};

export default Button;
