import React from "react";

const Input = ({ show, time, change }) => {
  let input = null;
  input = (
    <div>
      <input
        type="number"
        min="0"
        placeholder="Hours"
        value={time[0]}
        id="hours"
        onChange={change}
      />
      <input
        type="number"
        min="0"
        max="60"
        id="minutes"
        placeholder="Minutes"
        value={time[1]}
        onChange={change}
      />
      <input
        type="number"
        min="1"
        max="60"
        id="seconds"
        placeholder="Seconds"
        value={time[2]}
        onChange={change}
      />
    </div>
  );

  return input;
};
export default Input;
