import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

const CardDashboard = () => {
  return (
    <div className="card-container">
      <Card className="car-card" interactive={true} elevation={Elevation.TWO}>
        <h5>
          <a href="#">IBM_1</a>
        </h5>
        <p>Card content</p>
        <Button>Submit</Button>
      </Card>
    </div>
  );
};

export default CardDashboard;
