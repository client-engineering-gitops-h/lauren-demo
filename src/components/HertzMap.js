import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/DigitalMesh.css";
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

function HertzMap({ selectedCars, selectedCarMarkers, initialMileage, initialCars }) {
  return (
    <div>
      <MapContainer center={[26.971, -82.305]} zoom={10}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
        />

        {selectedCarMarkers &&
          selectedCarMarkers.map((car, i) => {
            const carLatLong = {
              lat: car.latitude,
              lng: car.longitude,
            };
            
            const registration= car.registration
            return (
              <Marker key={i} position={carLatLong}>
                <Popup>
                  VIN: {car.registration}
                  <br />
                  Last Updated: {new Date(selectedCars[registration].updated_at).toLocaleString()}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default HertzMap;
