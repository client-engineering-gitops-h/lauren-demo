const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const axios = require("axios");
const server = http.createServer(app);
var bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
// delete this line in prod
require("dotenv").config({ path: "../.env" });

app.use(cors());

app.use(bodyParser.json());

server.listen(port, function () {
  console.log(`Server listening on http://localhost:${port}`);
});

app.get("/vins", (req, res) => {
  axios
    .get(
      `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/details`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": process.env.REACT_APP_API_KEY,
        },
      }
    )
    .then(({ data }) => {
      res.send(data);
    });
});

app.get("/vehicles", async (req, res) => {
  const vins = JSON.parse(req.query.vins);

  let vinArray = [];

  if (vins) {
    Object.keys(vins).forEach((vin) => {
      vinArray.push(
        axios.get(`https://pds-us.rentalmatics.com/TRIALS/vehicles/${vin}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": process.env.REACT_APP_API_KEY,
          },
        })
      );
    });

    let resultArr = [];
    Promise.all(vinArray.map((p) => p.catch((e) => e)))
      .then((values) => {
        return values.filter((result) => !(result instanceof Error));
      })
      .then((validResults) => {
        validResults.filter((result) => {
          resultArr.push(result.data);
        });
        res.json(resultArr);
      });
  }
});

app.get("/mileage-location", (req, res) => {
  axios
    .get(`https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles/`, {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": process.env.REACT_APP_API_KEY,
      },
    })
    .then(({ data }) => {
      res.json(data);
    });
});

app.get("/selected-vehicles-location", (req, res) => {
  const vins = req.query.vins;

  const selectedCarsFormatted = vins.join(",");
  axios
    .get(
      `https://pds-us.rentalmatics.com/TRIALS/rentalsystem/vehicles?vid=${selectedCarsFormatted}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": process.env.REACT_APP_API_KEY,
        },
      }
    )
    .then(({ data }) => {
      res.json(data);
    });
});

app.get("/ready", (req, res) => res.json({ status: "UP" }));
app.use(express.static(path.join(__dirname, "../build")));
console.log(`app is ready for ${process.env.NODE_ENV}`);
