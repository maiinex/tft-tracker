import React, { useState } from "react";

function TestWithProps(props) {
  const [rankName, setRankName] = useState("");
  return (
    <>
      <div>{props.rankName}</div>
      <div>{props.rankTier}</div>
      <div>{props.SummonerName}</div>
      <div>{props.Yolo}</div>
    </>
  );
}
export default TestWithProps;
