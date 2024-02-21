import React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function Campaign(props) {
  const campaign = props.campaign;
  console.log(campaign);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={campaign.photoUrl} />
        <Card.Body>
          <Card.Text>{campaign.title}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{campaign.achievementRate}% 달성률</ListGroup.Item>
          <ListGroup.Item>{campaign.nickName}</ListGroup.Item>
          <ListGroup.Item>
            <small>{campaign.categoryName}</small>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
