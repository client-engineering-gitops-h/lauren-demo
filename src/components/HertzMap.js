import React, { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "../styles/DigitalMesh.css";

const hertz = [26.4194, -81.81055];

function SetViewOnSelect({ animateRef, mapCenter, selectedCars }) {
  const map = useMapEvent("click", (e) => {
    map.setView(
      { lat: mapCenter.latitude, lng: mapCenter.longitude },
      map.getZoom(),
      {
        animate: animateRef.current || false,
      }
    );
  });
  return null;
}

function HertzMap({ selectedCars, mapCenter, selectedCarMarkers }) {
  const animateRef = useRef(true);

  return (
    <div>
      <MapContainer center={[26.6594, -81.9055]} zoom={10}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
        />
        <SetViewOnSelect animateRef={animateRef} mapCenter={mapCenter} />
        <Marker position={hertz} style={{ width: "100000px" }}>
          <Popup>Hertz Global Headquarters</Popup>
        </Marker>

        {selectedCarMarkers &&
          // needs to be the data we get back from the API
          selectedCarMarkers.map((car, i) => {
            const carLatLong = {
              lat: car.latitude,
              lng: car.longitude,
            };
            return (
              <Marker key={i} position={carLatLong}>
                <Popup>
                  VIN: {car.vid}
                  <br />
                  Last Updated: {new Date().toLocaleTimeString("en-US")}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default HertzMap;
