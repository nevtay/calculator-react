import "./Row.css";
import { Props } from "../types/types";
import Button from "./Button";

const Row = (props: Props) => {
  return (
    <div className="row">
      {props.values?.map((val) => (
        <Button value={val} />
      ))}
    </div>
  );
};

export default Row;
