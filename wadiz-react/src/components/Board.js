import React from "react";
import Campaign from "./Campaign";

export default function Board(props) {
  const campaigns = props.campaigns;

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {campaigns.map((campaign) => (
        <Campaign campaign={campaign}></Campaign>
      ))}
    </div>
  );
}
