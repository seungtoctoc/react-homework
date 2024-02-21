import React from "react";
import Campaign from "./Campaign";

export default function Board(props) {
  const campaigns = props.campaigns;

  return (
    <div>
      {campaigns.map((campaign) => (
        <Campaign campaign={campaign}></Campaign>
      ))}
    </div>
  );
}
