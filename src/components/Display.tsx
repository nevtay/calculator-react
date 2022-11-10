import "./Display.css";
import { Props } from "../types/types";
import Row from "./Row";
import Output from "./Output";

const Display = (props: Props) => {
  return (
    <div id="calculator">
      <Output />
      <Row values={["AC", "±", "%", "÷"]} />
      <Row values={["7", "8", "9", "X"]} />
      <Row values={["4", "5", "6", "-"]} />
      <Row values={["1", "2", "3", "+"]} />
      <Row values={["0", ".", "="]} />
    </div>
  );
};

export default Display;
