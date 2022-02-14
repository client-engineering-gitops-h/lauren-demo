import React, { useState, useEffect } from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import axios from "axios";

import {
  request1,
  request2,
  request3,
  request4,
  request5,
  request6,
} from "../requests/requests";

import CollapseContent from "./CollapseContent";

const CarCard = ({ setMapCenter }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();

  const handleClick = () => {
    const carVins = Object.keys(selectedCars);
    console.log("carVins", carVins);
    // string formatting for api requests
  };

  useEffect(() => {
    let carData = {};
    Promise.all([request1, request2, request3])
      .then((values) => {
        for (const car of values) {
          carData = { ...carData, [car.data.vid]: { ...car.data } };
        }
      })
      .then(() => {
        setCars(carData);
      });
  }, []);

  useEffect(() => {
    let carMileageData = {};
    Promise.all([request4, request5, request6])
      .then((values) => {
        for (const carMileage of values) {
          carMileageData = {
            ...carMileageData,
            [carMileage.data.vid]: { ...carMileage.data },
          };
        }
      })
      .then(() => {
        setMileage(carMileageData);
      });
  }, []);

  useEffect(() => {
    console.log("selectedCars", selectedCars);
  }, [selectedCars]);

  return (
    <div>
      <Card>
        <h1 className="fleet-title-styling">
          Your Fleet
          <Button
            outlined={true}
            onClick={() => {
              handleClick();
            }}
          >
            Get Fleet
          </Button>
        </h1>
      </Card>
      {cars &&
        mileage &&
        Object.keys(cars).map((key, i) => {
          const car = cars[key];
          const carMileage = mileage[key];
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
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
