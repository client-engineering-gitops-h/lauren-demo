const axios = require("axios");

export const getOEMCar = (vins, setInitialCars) => {
  let carData = {};
  if (vins) {
    axios
      .get("http://127.0.0.1:8080/vehicles", { params: { vins } })
      .then(({ data }) => {
        for (const car of data) {
          carData = { ...carData, [car.registration]: { ...car } };
        }
      })
      .then(() => {
        setInitialCars(carData);
      });
  }
};

export const getOEMMileage = (setInitialMileage) => {
  let carMileageData = {};
  axios
    .get("http://127.0.0.1:8080/mileage-location")
    .then(({ data }) => {
      for (const carMileage of data) {
        carMileageData = {
          ...carMileageData,
          [carMileage.registration]: { ...carMileage },
        };
      }
    })
    .then(() => {
      setInitialMileage(carMileageData);
    });
};

export const handleCarMarkers = (selectedCars, setSelectedCarMarkers) => {
  if (selectedCars && Object.keys(selectedCars).length > 0) {
    const vins = Object.keys(selectedCars);
    axios
      .get("http://127.0.0.1:8080/selected-vehicles-location", {
        params: { vins },
      })
      .then(({ data }) => {
        setSelectedCarMarkers(data);
      });
  } else {
    setSelectedCarMarkers([]);
  }
};

export const getVins = (setVins) => {
  let vinData = {};
  axios
    .get("http://127.0.0.1:8080/vins")
    .then(({ data }) => {
      for (const car of data) {
        vinData = { ...vinData, [car.registration]: { ...car } };
      }
    })
    .then(() => {
      setVins(vinData);
    });
};

export const getCars = (vins, setCars) => {
  let carData = {};
  if (vins) {
    axios
      .get("http://127.0.0.1:8080/vehicles", { params: { vins } })
      .then(({ data }) => {
        for (const car of data) {
          carData = { ...carData, [car.registration]: { ...car } };
        }
      })
      .then(() => {
        setCars(carData);
      });
  }
};

export const getMileage = (setMileage) => {
  let carMileageData = {};
  axios
    .get("http://127.0.0.1:8080/mileage-location")
    .then(({ data }) => {
      for (const carMileage of data) {
        carMileageData = {
          ...carMileageData,
          [carMileage.registration]: { ...carMileage },
        };
      }
    })
    .then(() => {
      setMileage(carMileageData);
    });
};
