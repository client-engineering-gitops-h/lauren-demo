import React, { useState, useEffect } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import axios from "axios";

const CarCard = () => {
  const [cars, setCars] = useState({});
  const [mileage, setMileage] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3002/vehicles") //has to accept parameters
      .then(({ data }) => {
        const id = data.vid;
        setCars({ ...cars, [id]: { ...data } });
      })
      .then(
        axios.get("http://localhost:3002/mileage-location").then(({ data }) => {
          const id = data.vid;
          setMileage({ ...mileage, [id]: { ...data } });
        })
      );
  }, []);

  useEffect(() => {
    console.log("updated", cars);
  }, [cars]);

  useEffect(() => {
    console.log("updated", mileage);
  }, [mileage]);

  return (
    <div>
      {cars &&
        mileage &&
        Object.keys(cars).map((key, i) => {
          const car = cars[key];
          console.log("car", car);
          const carMileage = mileage[key];
          console.log("carMileage", carMileage);
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
                <div>
                  <strong>IMEI: </strong>
                  {car.imei || "N/A"}
                </div>
                <div>
                  <strong>Customer: </strong>IBM
                </div>
                <div>
                  <strong>Onboarded: </strong>
                  {new Date(car.created_at).toLocaleString() || "N/A"}
                </div>
                <div>
                  <strong>Last Active: </strong>
                  {new Date(car.updated_at).toLocaleString() || "N/A"}
                </div>
                <div style={{ paddingTop: "10px" }}>
                  <strong>Make: </strong>
                  {car.make || "N/A"}
                </div>
                <div>
                  <strong>Model: </strong>
                  {car.model || "N/A"}
                </div>
                <strong>Color: </strong>
                {car.colour || "N/A"}
              </div>
              <div className="location-details">
                <strong>Approx. Address: </strong>
                <div>
                  <strong>Mileage: </strong>
                  {carMileage.tracker_mileage || "N/A"}
                </div>
                <div>
                  <strong>Lat: </strong>
                  {carMileage.latitude.toFixed(3) || "N/A"}
                </div>
                <div>
                  <strong>Long: </strong>
                  {carMileage.longitude.toFixed(3) || "N/A"}
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
