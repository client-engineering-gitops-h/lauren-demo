import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getFleetVinRequest = axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/details`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);


export const getDetailRequest = async(vins) => 
 {
   let vinArray= []
     vins.forEach((vin)=>{
       vinArray.push(axios.get(
        `https://pds-us.rentalmatics.com/TRIALS/vehicles/${vin}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": API_KEY,
          },
        }
      ))
      }
      )
    const results = await Promise.all(vinArray.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));
    return validResults
  }


export const getMileageLocationRequest= () => axios.get(
  `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/1G1FZ6S04L4109518/`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
  }
);


export const getSelectedMileageLocation = (selectedCars) =>
  axios.get(
    `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles?vid=${selectedCars}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": API_KEY,
      },
    }
  );
