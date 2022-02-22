import { arrayLengthCompare } from "@blueprintjs/core/lib/esm/common/utils";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/DigitalMesh.css";

const coordinates = [
  {
    lat: 26.970733,
    lng: -82.305153,
  },
  {
    lat: 26.970743,
    lng: -82.305239,
  },
  {
    lat: 26.970733,
    lng: -82.305314,
  },
  {
    lat: 26.970781,
    lng: -82.305432,
  },
  {
    lat: 26.97081,
    lng: -82.30555,
  },
  {
    lat: 26.970834,
    lng: -82.305636,
  },
  {
    lat: 26.970863,
    lng: -82.305716,
  },
  {
    lat: 26.970891,
    lng: -82.305818,
  },
  {
    lat: 26.970939,
    lng: -82.305915,
  },
];

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function HertzMap({ selectedCarMarkers }) {
  const [currPosition, setCurrPosition] = useState(coordinates[0]);

  const moveCar = async () => {
    for (let i = 0; i < coordinates.length; i++) {
      await sleep(5000);
      setCurrPosition(coordinates[i]);
    }
  };

  useEffect(() => {
    moveCar();
  }, []);

  return (
    <div>
      <MapContainer center={[26.971, -82.305]} zoom={10}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
        />

        <Marker position={currPosition}>
          <Popup>
            <br />
            Last Updated: {new Date().toLocaleTimeString("en-US")}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default HertzMap;
