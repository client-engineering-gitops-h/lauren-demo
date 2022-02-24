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
const CarCard = ({ setMapCenter, setSelectedCarMarkers }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [initialCars, setInitialCars] = useState();
  const [initialMileage, setInitialMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();
  const [counter, setCounter] = useState(0);
  const [vins, setVins] = useState();
  const [currPosition, setCurrPosition] = useState(coordinates[0]);
  // useEffect(() => {
  //   const intervalCount = setInterval(() => {
  //     setCounter(counter + 1);
  //   }, 3000);
  //   return () => {
  //     clearInterval(intervalCount);
  //   };
  // }, [counter]);

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

 const moveCar = async () => {
  for (let i = 0; i < coordinates.length; i++) {
    await sleep(1000);
    setCurrPosition(coordinates[i]);
  }
};
  // needs to move to carCard
  useEffect(() => {
    moveCar();
  }, []);

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
    console.log("selected car mileage", selectedCars);
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
            OEM
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
              {/* pass in currentPosition */}
              <CollapseContent
                setSelectedCars={setSelectedCars}
                setMapCenter={setMapCenter}
                car={car}
                carMileage={carMileage}
                selectedCars={selectedCars}
                initialTime={initialTime}
                initialLocation={initialLocation}
                handleCarMarkers={handleCarMarkers}
                currPosition={currPosition}
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
