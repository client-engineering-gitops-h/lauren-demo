import React, { useState } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import HertzMap from "./HertzMap";
import CarCard from "./CarCard";
const coordinates = [
  {
    lat: 26.970733,
    lng: -82.305153,
  },
  {
    lat: 26.970743,
    lng: -82.305239,
  },
  {
    lat: 26.970733,
    lng: -82.305314,
  },
  {
    lat: 26.9707,
    lng: -82.305432,
  },
  {
    lat: 26.97081,
    lng: -82.30555,
  },
  {
    lat: 26.970834,
    lng: -82.305636,
  },
  {
    lat: 26.970863,
    lng: -82.305716,
  },
  {
    lat: 26.970891,
    lng: -82.305818,
  },
  {
    lat: 26.970939,
    lng: -82.305915,
  },
];


const Dashboard = () => {
  const [selectedCarMarkers, setSelectedCarMarkers] = useState();

  // move in currPosition here
  const [currPosition, setCurrPosition] = useState(coordinates[0]);

  return (
    <div className="card-container">
      <div>
        <h1 style={{ marginTop: "15px", marginBottom: "25px" }}>
          Car Locations
        </h1>
        <Card className="map-card">
          {/* pass in currPosition */}
          <HertzMap 
             selectedCarMarkers={selectedCarMarkers} 
             currPosition={currPosition}
                 />
        </Card>
      </div>
      <Card className="fleet-card" interactive={true} elevation={Elevation.TWO}>
        {/* pass in currPosition */}
        <CarCard 
           setSelectedCarMarkers={setSelectedCarMarkers}
           setCurrPosition={setCurrPosition}
           currPosition={currPosition}
         />
      </Card>
    </div>
  );
};

export default Dashboard;
