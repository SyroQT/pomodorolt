import React from "react";

const info = (props) => {
  return <h1> Now is your {props.isBreak ? "break" : "work"} time</h1>;
};

export default info;
