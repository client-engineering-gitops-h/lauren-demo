import React, { useState, useEffect } from "react";
import { Card, Elevation, Button, Toaster, Toast } from "@blueprintjs/core";

import CollapseContent from "./CollapseContent";

import {
  getOEMMileage,
  getOEMCar,
  handleCarMarkers,
  getVins,
  getCars,
  getMileage,
} from "../utils/requests";
import { set } from "express/lib/application";

const CarCard = ({
  setMapCenter,
  setSelectedCarMarkers,
  initialMileage,
  setInitialMileage,
  initialCars,
  setInitialCars,
  setSelectedCars,
  selectedCars,
}) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [counter, setCounter] = useState(0);
  const [vins, setVins] = useState();
  const [clicked, setClicked] = useState(false);

  let toaster;
  const refHandlers = {
    toaster: (ref) => (toaster = ref),
  };

  const showAlertToast = () => {
    toaster.show({ message: "Your car is moving without being turned on" });
  };

  useEffect(() => {
    if (clicked) {
      for (const registration in mileage) {
        if (
          mileage[registration].latitude !==
            initialMileage[registration].latitude ||
          mileage[registration].longitude !==
            initialMileage[registration].longitude
        ) {
          showAlertToast();
          setClicked(false)
        }
      }
    }
  }, [mileage]);

  useEffect(() => {
    const intervalCount = setInterval(() => {
      setCounter(counter + 1);
    }, 3000);
    return () => {
      clearInterval(intervalCount);
    };
  }, [counter]);

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
      <Toaster usePortal={false} ref={refHandlers.toaster} />
      <Card>
        <h1 className="fleet-title-styling">
          Your Fleet
          <Button
            outlined={true}
            onClick={() => {
              getOEMCar(vins, setInitialCars);
              getOEMMileage(setInitialMileage);
              setClicked(true);
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
