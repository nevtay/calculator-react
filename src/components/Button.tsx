import "./Button.css";
import { Props } from "../types/types";

const Button = (props: Props) => {
  return (
    <span className={`button ${props.value === "0" ? "button-0" : ""}`}>
      {props.value}
    </span>
  );
};

export default Button;
