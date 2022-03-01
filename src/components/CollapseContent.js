import React, { useState } from "react";
import { Collapse, Button, Icon, Checkbox } from "@blueprintjs/core";

const carMakes = new Set([
  "Chevrolet",
  "Toyota",
  "Ford",
  "GMC",
  "Buick",
  "Cadillac",
  "Lexus",
  "Lincoln",
  "Troller",
]);

const CollapseContent = ({
  car,
  setSelectedCars,
  selectedCars,
  carMileage,
  initialLocation,
  initialTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleOnChange = (car) => {
    const registration = car.registration;

    if (selected) {
      let copy = Object.assign({}, selectedCars);
      delete copy[registration];
      setSelectedCars(copy);
    } else {
      setSelectedCars({
        ...selectedCars,
        [registration]: { ...car },
      });
    }

    setSelected(!selected);
  };

  return (
    <div>
      <div className="collapse-card">
        <div className="checkbox-select">
          <div style={{ paddingTop: "10px" }}>
            <Checkbox
              key={car}
              onChange={() => {
                handleOnChange(car);
              }}
              value={selected}
            />
          </div>
          <div className="card-title-vin">
            <Icon size={30} icon="drive-time" />
            <h2 style={{ paddingLeft: "1rem" }}>VIN: {car.registration}</h2>
          </div>
        </div>
        <div className="icon-collapse-card">
          <Button
            className="collapse-card-button"
            minimal={true}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Icon size={20} icon={isOpen ? "chevron-up" : "chevron-down"} />
          </Button>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="location-details">
          <div className="rentalmatics-location">
            <div>
              <strong>Last Active: </strong>
              {new Date(car.updated_at).toLocaleString() || "N/A"}
            </div>
            <div>
              <strong>Mileage: </strong>
              {carMileage.tracker_mileage
                ? carMileage.tracker_mileage
                : "N/A"}{" "}
              mi
            </div>
            <div>
              <strong>Lat: </strong>
              {carMileage.latitude ? carMileage.latitude : "N/A"}
            </div>
            <div>
              <strong>Long: </strong>
              {carMileage.longitude ? carMileage.longitude : "N/A"}
            </div>
          </div>
          <div className="OEM-location">
            <strong>OEM Timestamp: </strong>
            {initialTime.updated_at && carMakes.has(car.make)
              ? new Date(initialTime.updated_at).toLocaleString()
              : "N/A"}
            <div>
              <strong>Mileage: </strong>
              {initialLocation.tracker_mileage && carMakes.has(car.make)
                ? initialLocation.tracker_mileage
                : "N/A"}{" "}
              mi
            </div>
            <div>
              <strong>Lat: </strong>
              {initialLocation.latitude && carMakes.has(car.make)
                ? initialLocation.latitude
                : "N/A"}
            </div>
            <div>
              <strong>Long: </strong>
              {initialLocation.longitude && carMakes.has(car.make)
                ? initialLocation.longitude
                : "N/A"}
            </div>
          </div>
        </div>
        <div className="customer-details">
          <div style={{ paddingTop: "5px" }}>
            <strong>Make: </strong>
            {car.make || "N/A"}
          </div>
          <div>
            <strong>Model: </strong>
            {car.model || "N/A"}
          </div>
          <div style={{ paddingTop: "10px" }}>
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
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseContent;
