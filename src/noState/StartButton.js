import React from "react";

const StartButton = ({ click, counting }) => {
  //to do format time
  return (
    <button onClick={click}>Click to {counting ? "stop" : "start"}</button>
  );
};
export default StartButton;
