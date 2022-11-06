import React from "react";
import { Props } from "../types/types";
import Button from "./Button";

const Row = (props: Props) => {
  return (
    <div>
      {props.values?.map((val) => {
        return <Button value={val} />;
      })}
    </div>
  );
};

export default Row;
