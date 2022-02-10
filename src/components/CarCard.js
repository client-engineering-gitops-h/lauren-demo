import React, { useState, useEffect } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import axios from "axios";
import CollapseContent from "./CollapseContent";
const API_KEY = process.env.REACT_APP_API_KEY;

const CarCard = ({ setSelectedCar, setCarCoordinates, setMapCenter }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [makeModel, setMakeModel] = useState();

  const [counter, setCounter] = useState(0);

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

  useEffect(() => {
    axios
      .get(
        `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/1G1FZ6S04L4109518/mileage-and-location`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": API_KEY,
          },
        }
      )
      .then(async ({ data }) => {
        const id = data.vid;
        await setMileage({ ...mileage, [id]: { ...data } });
      });
  }, [counter]);

  useEffect(() => {
    console.log("mileage data", mileage);
    console.log("car data", cars);
    setCarCoordinates(mileage);
  }, [mileage, cars]);

  return (
    <div>
      {cars &&
        // mileage &&
        // makeModel &&
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
                // setMapCenter={setMapCenter}
                car={car}
                carMileage={carMileage}
                makeModel={makeModel}
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
