import React, { useState } from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import HertzMap from "./HertzMap";
import CarCard from "./CarCard";
import FleetButton from "./FleetButton";

const Dashboard = () => {
  const [carCoordinates, setCarCoordinates] = useState();
  const [selectedCar, setSelectedCar] = useState({});
  const [mapCenter, setMapCenter] = useState({});

  return (
    <div className="card-container">
      <div>
        <h1 style={{ marginTop: "15px", marginBottom: "25px" }}>
          Car Locations
        </h1>
        <Card className="map-card">
          <HertzMap selectedCar={selectedCar}  carCoordinates={carCoordinates} mapCenter={mapCenter}/>
        </Card>
      </div>
      <Card className="fleet-card" interactive={true} elevation={Elevation.TWO}>
        <h1 className="fleet-title-styling">
          Your Fleet
          {/* <FleetButton/> */}
        </h1>
        <CarCard
          setSelectedCar={setSelectedCar}
          selectedCar={selectedCar}
          setCarCoordinates={setCarCoordinates}
          setMapCenter={setMapCenter}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
