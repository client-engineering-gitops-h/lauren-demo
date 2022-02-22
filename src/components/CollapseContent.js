import React, { useState } from "react";
import { Collapse, Button, Icon, Checkbox } from "@blueprintjs/core";

const CollapseContent = ({
  car,
  setSelectedCars,
  selectedCars,
  carMileage,
  setMapCenter,
  initialLocation,
  initialTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  // const [carLastUpdated, setCarLastUpdated] = useState(
  //   new Date().toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   })
  // );
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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

  const handleOnChange = async (car) => {
    const vid = car.vid;

    if (checked) {
      let copy = Object.assign({}, selectedCars);
      delete copy[vid];
      await setSelectedCars(copy);
    } else {
      await setSelectedCars({
        ...selectedCars,
        [vid]: { ...car },
      });
    }

    setChecked(!checked);
  };

  return (
    <div>
      {car && carMileage && initialTime && initialLocation && (
        <>
          <div className="collapse-card">
            <div className="checkbox-select">
              <div style={{ paddingTop: "10px" }}>
                <Checkbox
                  key={car}
                  onChange={async () => {
                    await handleOnChange(car);
                  }}
                  value={checked}
                ></Checkbox>
              </div>
              <div className="card-title-vin">
                <Icon size={30} icon="drive-time" />
                <h2 style={{ paddingLeft: "1rem" }}>VIN: {car.vid}</h2>
              </div>
            </div>
            <div className="icon-collapse-card">
              <Button
                className="collapse-card-button"
                minimal={true}
                onClick={() => {
                  handleClick();
                  setMapCenter(carMileage);
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
                  {carMileage.latitude ? carMileage.latitude.toFixed(3) : "N/A"}
                </div>
                <div>
                  <strong>Long: </strong>
                  {carMileage.longitude
                    ? carMileage.longitude.toFixed(3)
                    : "N/A"}
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
                    ? initialLocation.latitude.toFixed(3)
                    : "N/A"}
                </div>
                <div>
                  <strong>Long: </strong>
                  {initialLocation.longitude && carMakes.has(car.make)
                    ? initialLocation.longitude.toFixed(3)
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
        </>
      )}
    </div>
  );
};

export default CollapseContent;
