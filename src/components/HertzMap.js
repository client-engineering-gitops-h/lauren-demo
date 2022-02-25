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
          initialCars &&
          initialMileage &&
          selectedCarMarkers.map((car, i) => {
            const carLatLong = {
              lat: car.latitude,
              lng: car.longitude,
            };
            
            const registration= car.registration
            const OEMLatLong = {
              lat: initialMileage[registration].latitude,
              lng: initialMileage[registration].longitude,
            };

            return (
              <div>
              <Marker key={i} position={carLatLong}>
                <Popup>
                  VIN: {registration}
                  <br />
                  Data Source: Rentalmatics
                  <br />
                  Last Updated: {new Date(car.updated_at).toLocaleString()}
                </Popup>
              </Marker>

              <Marker key={registration} position={OEMLatLong}>
              <Popup>
                VIN: {registration}
                <br />
                Data Source: OEM
                <br />
                Last Updated: {new Date(initialCars[registration].updated_at).toLocaleString()}
              </Popup>
            </Marker>
            </div>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default HertzMap;
