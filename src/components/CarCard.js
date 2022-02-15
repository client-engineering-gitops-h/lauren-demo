import React, { useState, useEffect } from "react";
import { Card, Elevation, Button, Switch } from "@blueprintjs/core";
import {
  request1,
  request2,
  request3,
  request4,
  request5,
  request6,
  getFleetRequest,
} from "../requests/requests";

import CollapseContent from "./CollapseContent";

const CarCard = ({ setMapCenter, setSelectedCarMarkers }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [initialCars, setInitialCars] = useState();
  const [initialMileage, setInitialMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();
  const [toggleTrue, setToggleTrue]= useState(false);
  const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   const intervalCount = setInterval(() => {
  //     setCounter(counter + 1);
  //   }, 1500);
  //   return () => {
  //     clearInterval(intervalCount);
  //   };
  // },[toggle]);

  const handleClick = () => {
    if (selectedCars && Object.keys(selectedCars).length > 0) {
      const carVins = Object.keys(selectedCars);
      const selectedCarsFormatted = carVins.join(",");
      getFleetRequest(selectedCarsFormatted).then(({ data }) => {
        setSelectedCarMarkers(data);
      });

    console.log("updated times and miles", initialMileage, mileage)
    }
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
        setInitialCars(carData);
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
        setInitialMileage(carMileageData);
      });
  }, []);

  return (
    <div>
      <Card>
        <h1 className="fleet-title-styling">
          Your Fleet
          <Switch
          // checked={}
          onChange={()=> {
            if (toggleTrue) {
              setToggleTrue(!toggleTrue)
            }
          }}
          
        />
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
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
