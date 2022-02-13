import React, { useState, useEffect } from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import axios from "axios";
import CollapseContent from "./CollapseContent";
import { use } from "express/lib/application";
const API_KEY = process.env.REACT_APP_API_KEY;

const CarCard = ({ setSelectedCar, setCarCoordinates, setMapCenter, selectedCars }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [counter, setCounter] = useState(0);
  let carMarkerData= {};

  const request1 = axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/vehicles/1G1FZ6S04L4109518`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );

  const request2 = axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/vehicles/3C6UR5HL7FG663032`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );

  const request3 = axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/vehicles/3VWSW31C06M420720`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );

  // useEffect(() => {
  //   const intervalCount = setInterval(() => {
  //     setCounter(counter + 1);
  //   }, 1500);
  //   return () => {
  //     clearInterval(intervalCount);
  //   };
  // });

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
  }, [counter]);

  const request4 = axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/1G1FZ6S04L4109518/mileage-and-location`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );

  const request5 = axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/3C6UR5HL7FG663032/mileage-and-location`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );

  const request6 = axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/3VWSW31C06M420720/mileage-and-location`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );

useEffect(() => {
    let carMileageData = {};
    Promise.all([request4, request5, request6])
      .then((values) => {
        for (const carMileage of values) {
          carMileageData = { ...carMileageData, [carMileage.data.vid]: { ...carMileage.data } };
        }
      })
      .then(() => {
         setMileage(carMileageData);
   });
  }, [counter]);

  // useEffect(() => {
  //   // let selectedMileageData = {};
  //   // for(const selectedMileage of mileage){
  //   //   selectedMileageData={...selectedMileageData, [selectedMileage.vid]: {...mileage.vid}};
  //   // }

  //   // console.log("selected car mileage", selectedMileageData)

  //   setCarCoordinates(mileage);
  //   console.log("milease", mileage);
  // }, [mileage]);

  useEffect(() => {
    carMarkerData={...carMarkerData, ...mileage}
    console.log("marlercar", carMarkerData)
  }, [selectedCars]);

  return (
    <div>
      <Card>
      <h1 className="fleet-title-styling">
          Your Fleet
          <Button outlined={true} onClick={() => {setCarCoordinates(carMarkerData)}}>Get Fleet</Button>

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
                setSelectedCar={setSelectedCar}
                setMapCenter={setMapCenter}
                car={car}
                carMileage={carMileage}
                
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
