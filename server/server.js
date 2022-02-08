const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const axios = require("axios");
const server = http.createServer(app);
const cors = require("cors");
const port = process.env.PORT || "8080";
const delay = 1000 * (process.env.DELAY || 0);
const API_KEY = process.env.API_KEY;
require("dotenv").config({ path: "../.env" });

server.listen(port, function () {
  console.log(`Server listening on http://localhost:${port}`);
});

setTimeout(() => {
  app.use(cors());
  app.get("/vehicles", (req, res) => {
    const carList = req.query.cars;
    axios
      .get(`https://pds-us.rentalmatics.com/TRIALS/vehicles/IBM_1`, {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": process.env.API_KEY,
        },
      })
      .then(({ data }) => {
        res.send(data);
      })
      .catch((error) => console.log("Rentalmatics", error));
  });

  app.get("/mileage-location", (req, res) => {
    axios
      .get(
        `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/IBM_1/mileage-and-location`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": process.env.API_KEY,
          },
        }
      )
      .then(({ data }) => {
        res.send(data);
      })
      .catch((error) => console.log("Rentalmatics", error));
  });

  app.get("/ready", (req, res) => res.json({ status: "UP" }));
  app.use(express.static(path.join(__dirname, "../build")));
  console.log(`app is ready for ${process.env.NODE_ENV}`);
}, delay);
