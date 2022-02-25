import React, { useState } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import HertzMap from "./HertzMap";
import CarCard from "./CarCard";

const Dashboard = () => {
  const [selectedCarMarkers, setSelectedCarMarkers] = useState();
  const [initialCars, setInitialCars] = useState();
  const [initialMileage, setInitialMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();

  return (
    <div className="card-container">
      <div>
        <h1 style={{ marginTop: "15px", marginBottom: "25px" }}>
          Car Locations
        </h1>
        <Card className="map-card">
          <HertzMap
            selectedCarMarkers={selectedCarMarkers}
            initialMileage={initialMileage}
            initialCars={initialCars}
            selectedCars={selectedCars}
          />
        </Card>
      </div>
      <Card className="fleet-card" interactive={true} elevation={Elevation.TWO}>
        <CarCard
          setSelectedCarMarkers={setSelectedCarMarkers}
          setInitialCars={setInitialCars}
          initialCars={initialCars}
          setInitialMileage={setInitialMileage}
          initialMileage={initialMileage}
          selectedCars={selectedCars}
          setSelectedCars={setSelectedCars}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
