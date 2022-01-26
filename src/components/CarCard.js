import React, { useState, useEffect } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import axios from "axios";

const CarCard = () => {
  const [cars, setCars] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3002/mileage-location") //has to accept parameters
      .then(({ data }) => {
        const id = data.vid;
        setCars({ ...cars, [id]: { ...cars[id], ...data } });
      })
      .then(
        axios.get("http://localhost:3002/vehicles").then(({ data }) => {
          const id = data.vid;
          const currentCar = cars[id];
          setCars({ ...cars, [id]: { ...currentCar, ...data } });
        })
      );
  }, []);

  useEffect(() => {
    console.log("updated", cars);
  }, [cars]);

  return (
    <div>
      {cars &&
        Object.keys(cars).map((key, i) => {
          const car = cars[key];
          return (
            <Card
              key={i}
              className="car-card"
              interactive={true}
              elevation={Elevation.One}
            >
              <h3>
                <a href="#">IBM_1</a>
              </h3>

              <div className="customer-details">
                <div>IMEI: {car.imei}</div>
                <div>Customer: IBM</div>
                <div>Onboarded: {car.created_at}</div>
                <div>Last Active: {car.updated_at}</div>
                <div style={{ paddingTop: "10px" }}>Make: {car.make}</div>
                <div>Model: {car.model}</div>
                Color: {car.colour}
              </div>
              <div className="location-details">
                Approx. Address: (get vehicle location)
                <div>Mileage: (tracker_mileage): 365</div>
                <div>Lat:(latitude): 26.977220535278</div>
                <div>Long: (longitude): -82.31909942627</div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
