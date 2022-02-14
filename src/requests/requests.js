import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const request1 = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/vehicles/1G1FZ6S04L4109518`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);

export const request2 = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/vehicles/3C6UR5HL7FG663032`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);

export const request3 = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/vehicles/3VWSW31C06M420720`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);

export const request4 = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/1G1FZ6S04L4109518/mileage-and-location`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);

export const request5 = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/3C6UR5HL7FG663032/mileage-and-location`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);

export const request6 = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/3VWSW31C06M420720/mileage-and-location`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);

export const getFleetRequest = axios.get(
  "https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles?vid=1G1FZ6S04L4109518&vid=3C6UR5HL7FG663032&vid=3VWSW31C06M420720",
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);
