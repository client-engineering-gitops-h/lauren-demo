import React, { useState, useEffect } from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";
import CollapseContent from "./CollapseContent";
import axios from "axios";

const CarCard = ({ setMapCenter, setSelectedCarMarkers }) => {
  const [cars, setCars] = useState();
  const [mileage, setMileage] = useState();
  const [initialCars, setInitialCars] = useState();
  const [initialMileage, setInitialMileage] = useState();
  const [selectedCars, setSelectedCars] = useState();
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

  const getOEMCarData = () => {
    let carData = {};
    if (vins) {
      axios
        .get("http://127.0.0.1:8080/vehicles", { params: { vins } })
        .then(({ data }) => {
          for (const car of data) {
            carData = { ...carData, [car.vid]: { ...car } };
          }
        })
        .then(() => {
          console.log("OEM Initial carData", carData);
          setInitialCars(carData);
        });
    }
  };

  const getOEMMileageData = () => {
    let carMileageData = {};
    axios
      .get("http://127.0.0.1:8080/mileage-location")
      .then(({ data }) => {
        for (const carMileage of data) {
          carMileageData = {
            ...carMileageData,
            [carMileage.vid]: { ...carMileage },
          };
        }
      })
      .then(() => {
        console.log("OEM Initial carMileageData", carMileageData);
        setInitialMileage(carMileageData);
      });
  };

  const handleCarMarkers = () => {
    if (selectedCars && Object.keys(selectedCars).length > 0) {
      const vins = Object.keys(selectedCars);
      axios
        .get("http://127.0.0.1:8080/selected-vehicles-location", {
          params: { vins },
        })
        .then(async ({ data }) => {
          await setSelectedCarMarkers(data);
        });
    } else {
      setSelectedCarMarkers([]);
    }
  };

  useEffect(() => {
    let vinData = {};
    axios
      .get("http://127.0.0.1:8080/vins")
      .then(({ data }) => {
        for (const car of data) {
          vinData = { ...vinData, [car.vid]: { ...car } };
        }
      })
      .then(() => {
        setVins(vinData);
      });
  }, [counter]);

  useEffect(() => {
    let carData = {};
    if (vins) {
      axios
        .get("http://127.0.0.1:8080/vehicles", { params: { vins } })
        .then(({ data }) => {
          for (const car of data) {
            carData = { ...carData, [car.vid]: { ...car } };
          }
        })
        .then(() => {
          console.log("polling carData", carData);
          setCars(carData);
        });
    }
  }, [vins]);

  useEffect(() => {
    let carMileageData = {};
    axios
      .get("http://127.0.0.1:8080/mileage-location")
      .then(({ data }) => {
        for (const carMileage of data) {
          carMileageData = {
            ...carMileageData,
            [carMileage.vid]: { ...carMileage },
          };
        }
      })
      .then(() => {
        console.log("polling carMileage", carMileageData);
        setMileage(carMileageData);
      });
  }, [counter]);

  useEffect(() => {
    if (vins && counter === 0) {
      getOEMCarData();
    }
  }, [initialMileage && vins]);

  useEffect(() => {
    getOEMMileageData();
  }, []);

  useEffect(() => {
    handleCarMarkers();
  }, [selectedCars]);

  return (
    <div>
      <Card>
        <h1 className="fleet-title-styling">
          Your Fleet
          <Button
            outlined={true}
            onClick={() => {
              getOEMCarData();
              getOEMMileageData();
            }}
          >
            Get OEM
          </Button>
        </h1>
      </Card>
      {mileage &&
        initialCars &&
        initialMileage &&
        Object.keys(cars).map((key, i) => {
          const car = cars[key];
          const carMileage = mileage[key];
          const initialTime = initialCars[key];
          const initialLocation = initialMileage[key];
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
                initialTime={initialTime}
                initialLocation={initialLocation}
                handleCarMarkers={handleCarMarkers}
              />
            </Card>
          );
        })}
    </div>
  );
};

export default CarCard;
