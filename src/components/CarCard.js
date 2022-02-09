import React, { useState, useEffect } from "react";
import { Card, Elevation, Collapse, Button, Icon } from "@blueprintjs/core";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const CarCard = ({ setSelectedCar, setCarCoordinates }) => {
  const [cars, setCars] = useState({});
  const [mileage, setMileage] = useState();
  const [counter, setCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   const intervalCount = setInterval(() => {
  //     setCounter(counter + 1);
  //   }, 1500);
  //   return () => {
  //     clearInterval(intervalCount);
  //   };
  // });

  useEffect(() => {
    console.log("api key here", API_KEY);
    axios
      .get(`https://pds-us.rentalmatics.com/TRIALS/vehicles/IBM_1`, {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": API_KEY,
        },
      })
      .then(({ data }) => {
        const id = data.vid;
        setCars({ ...cars, [id]: { ...data } });
      })
      .then(
        axios
          .get(
            `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/IBM_1/mileage-and-location`,
            {
              headers: {
                "Content-Type": "application/json",
                "X-Authorization": API_KEY,
              },
            }
          )
          .then(({ data }) => {
            const id = data.vid;
            setMileage({ ...mileage, [id]: { ...data } });
          })
      );
  }, [counter]);

  useEffect(() => {
    setCarCoordinates(mileage);
  }, [mileage]);

  return (
    <div>
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
              <Button
                className="collapse-card-button"
                minimal={true}
                onClick={() => {
                  handleClick();
                  setSelectedCar(car.vid);
                }}
              >
                <div className="collapse-card">
                  <div className="card-title-vin">
                    <Icon size={30} icon="drive-time" />
                    <h2 style={{ paddingLeft: "1rem" }}>IBM_1</h2>
                  </div>
                  <div className="icon-collapse-card">
                    <Icon size={20} icon="chevron-down" />
                  </div>
                </div>
              </Button>
              <Collapse isOpen={isOpen}>
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
                  <div>
                    <strong>Mileage: </strong>
                    {carMileage.tracker_mileage || "N/A"} mi
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
              </Collapse>
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
