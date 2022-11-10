import { Props } from "../types/types";
import "./Output.css";

const Output = (props: Props) => {
  return (
    <div className="output">
      <p className="currentValue">0</p>
    </div>
  );
};

export default Output;
