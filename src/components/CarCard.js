import React, { useState, useEffect } from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";

import CollapseContent from "./CollapseContent";

import {
  getOEMMileage,
  getOEMCar,
  handleCarMarkers,
  getVins,
  getCars,
  getMileage,
} from "../utils/requests";

const CarCard = ({ setMapCenter, setSelectedCarMarkers }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [initialCars, setInitialCars] = useState();
  const [initialMileage, setInitialMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();
  const [counter, setCounter] = useState(0);
  const [vins, setVins] = useState();

  // useEffect(() => {
  //   const intervalCount = setInterval(() => {
  //     setCounter(counter + 1);
  //   }, 3000);
  //   return () => {
  //     clearInterval(intervalCount);
  //   };
  // }, [counter]);

  useEffect(() => {
    getVins(setVins);
    getMileage(setMileage);
  }, [counter]);

  useEffect(() => {
    getCars(vins, setCars);
  }, [vins]);

  useEffect(() => {
    if (vins && counter === 0) {
      getOEMCar(vins, setInitialCars);
    }
  }, [initialMileage && vins]);

  useEffect(() => {
    getOEMMileage(setInitialMileage);
  }, []);

  useEffect(() => {
    handleCarMarkers(selectedCars, setSelectedCarMarkers);
  }, [selectedCars, counter]);

  return (
    <div>
      <Card>
        <h1 className="fleet-title-styling">
          Your Fleet
          <Button
            outlined={true}
            onClick={() => {
              getOEMCar(vins, setInitialCars);
              getOEMMileage(setInitialMileage);
            }}
          >
            Get OEM
          </Button>
        </h1>
      </Card>
      {mileage &&
        initialCars &&
        initialMileage &&
        Object.keys(cars).map((key, i) => {
          const car = cars[key];
          const carMileage = mileage[key];
          const initialTime = initialCars[key];
          const initialLocation = initialMileage[key];
          return (
            <Card
              key={i}
              className="car-card"
              interactive={true}
              elevation={Elevation.One}
            >
              <CollapseContent
                setSelectedCars={setSelectedCars}
                setMapCenter={setMapCenter}
                car={car}
                carMileage={carMileage}
                selectedCars={selectedCars}
                initialTime={initialTime}
                initialLocation={initialLocation}
                handleCarMarkers={handleCarMarkers}
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
