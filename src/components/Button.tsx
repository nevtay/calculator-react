import React from "react";
import { Props } from "../types/types";

const Button = (props: Props) => {
  return <span>{props.value}</span>;
};

export default Button;
