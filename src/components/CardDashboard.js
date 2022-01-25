import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import HertzMap from "./HertzMap";

const CardDashboard = () => {
  return (
    <div className="card-container">
      <Card className="map-card">
        <HertzMap/>
      </Card>
      <Card className="car-card" interactive={true} elevation={Elevation.TWO}>
        <h1>Your Fleet</h1>
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
