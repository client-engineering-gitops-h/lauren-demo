import React, { useState, useEffect } from "react";
import { Card, Elevation, Button, Switch } from "@blueprintjs/core";
import {
  getDetailRequest,
  getFleetVinRequest,
  getMileageLocationRequest,
  getSelectedMileageLocation,
} from "../requests/requests";

import CollapseContent from "./CollapseContent";

const CarCard = ({ setMapCenter, setSelectedCarMarkers }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [initialCars, setInitialCars] = useState();
  const [initialMileage, setInitialMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();
  const [toggle, setToggle] = useState(false);
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

  const handleClick = () => {
    let carMileageData = {};
    if (selectedCars && Object.keys(selectedCars).length > 0) {
      const carVins = Object.keys(selectedCars);
      const selectedCarsFormatted = carVins.join(",");
      getSelectedMileageLocation(selectedCarsFormatted)
        .then(({ data }) => {
          setSelectedCarMarkers(data);
          for (const carMileage of data) {
            carMileageData = {
              ...carMileageData,
              [carMileage.vid]: { ...carMileage },
            };
          }
        })
        .then(() => {
          setMileage({ ...mileage, ...carMileageData });
        });
    }
  };

  useEffect(() => {
    let carData = {};
    getFleetVinRequest
      .then((res) => {
        for (const car of res.data) {
          carData = { ...carData, [car.vid]: { ...car } };
        }
      })
      .then(() => {
        setVins(carData);
        // setInitialCars(carData);
      });
  }, [counter]);

  useEffect(() => {
    let carData = {};
    if (vins) {
      getDetailRequest(Object.keys(vins))
        .then((res) => {
          for (const car of res) {
            carData = { ...carData, [car.data.vid]: { ...car.data } };
          }
        })
        .then(() => {
          setCars(carData);
        });
    }
  }, [vins]);

  useEffect(() => {
    let carMileageData = {};
    getMileageLocationRequest()
      .then((res) => {
        for (const carMileage of res.data) {
          carMileageData = {
            ...carMileageData,
            [carMileage.vid]: { ...carMileage },
          };
        }
      })
      .then(() => {
        setMileage(carMileageData);
      });
  }, [vins]);

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
        // initialCars &&
        // initialMileage &&
        Object.keys(cars).map((key, i) => {
          const car = cars[key];
          const carMileage = mileage[key];
          // const initialTime = initialCars[key];
          // const initialLocation = initialMileage[key];

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
                // initialTime={initialTime}
                // initialLocation={initialLocation}
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
