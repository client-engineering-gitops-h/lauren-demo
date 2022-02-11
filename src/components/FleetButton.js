import React, { useRef, useEffect } from "react";
import { Button } from "@blueprintjs/core";
import "../styles/DigitalMesh.css";


function FleetButton({ CarCoordinates, selectedCar}) {
  return(
      <div>
          <Button onClick={
              //in here the get fleet button should set the carcoordinates  
              }>Get Fleet</Button>
      </div>
  );
};

export default FleetButton;

