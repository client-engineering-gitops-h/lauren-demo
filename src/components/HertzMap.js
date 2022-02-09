import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/DigitalMesh.css";

const hertz = [26.4194, -81.81055];
const center = [26.696076, -82.0648247131];

function HertzMap({ carCoordinates, selectedCar }) {
  return (
    <MapContainer center={hertz} zoom={14}>
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
      />
      {carCoordinates &&
        Object.keys(carCoordinates).map((key, i) => {
          const carLocation = carCoordinates[key];
          const carLatLong = [carLocation.latitude, carLocation.longitude];
          return (
            <Marker key={i} position={carLatLong}>
              <Popup>{carLocation.vid}</Popup>
            </Marker>
          );
        })}

      <Marker position={hertz}>
        <Popup>Hertz Global Headquarters</Popup>
      </Marker>
    </MapContainer>
  );
}

export default HertzMap;
