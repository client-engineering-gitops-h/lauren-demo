import React, { useState, useEffect } from "react";
import { Collapse, Button, Icon } from "@blueprintjs/core";

const CollapseContent = ({car, setSelectedCar, carMileage }) => {

  console.log("check car data", car)
const [isOpen, setIsOpen] = useState(false);
const handleClick = () => {
  setIsOpen(!isOpen);
};

return(
  <div>
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
      <strong>Year: </strong>
      {car.year || "N/A"}
    </div>
    <div className="location-details">
      <div>
        {/* <strong>Mileage: </strong>
        {carMileage.tracker_mileage || "N/A"} mi
      </div>
      <div>
        <strong>Lat: </strong>
        {carMileage.latitude.toFixed(3) || "N/A"}
      </div>
      <div>
        <strong>Long: </strong>
        {carMileage.longitude.toFixed(3) || "N/A"} */}
      </div>
    </div>
  </Collapse>
  </div>
)}

export default CollapseContent