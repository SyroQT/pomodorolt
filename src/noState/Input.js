import React from "react";

const Input = ({ show, time, change }) => {
  let input = null;

  if (show) {
    input = (
      <input
        type="number"
        min="1"
        placeholder="Minutes"
        value={time}
        onChange={change}
      />
    );
  }

  return input;
};
export default Input;
