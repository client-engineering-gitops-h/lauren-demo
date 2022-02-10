import React, { useState, useEffect } from "react";
import { Collapse, Button, Icon } from "@blueprintjs/core";

const CollapseContent = ({
  car,
  setSelectedCar,
  carMileage,
  makeModel,
  setMapCenter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carLastUpdated, setCarLastUpdated] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  console.log("car", car);
  console.log(makeModel, "make and model in collapse");
  const { vid, updated_at } = car;

  return (
    <div>
      {/* {car && carMileage && makeModel[vid] && ( */}
      {car && carMileage && (
        <>
          <Button
            className="collapse-card-button"
            minimal={true}
            onClick={() => {
              handleClick();
              setSelectedCar({ vid, updated_at });
              // setMapCenter(carMileage);
            }}
          >
            <div className="collapse-card">
              <div className="card-title-vin">
                <Icon size={30} icon="drive-time" />
                <h2 style={{ paddingLeft: "1rem" }}>VIN: {car.vid}</h2>
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
              <div>
                <strong>OEM Timestamp: </strong>
                {carLastUpdated}
              </div>
            </div>
          </Collapse>
        </>
      )}
    </div>
  );
};

export default CollapseContent;