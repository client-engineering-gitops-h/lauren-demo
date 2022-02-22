import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/DigitalMesh.css";

function SetViewOnSelect({ animateRef, mapCenter }) {
  // const map = useMapEvent("click", (e) => {
  //   map.setView(
  //     { lat: mapCenter.latitude, lng: mapCenter.longitude },
  //     map.getZoom(),
  //     {
  //       animate: animateRef.current || false,
  //     }
  //   );
  // });
  return null;
}

function HertzMap({ mapCenter, selectedCarMarkers }) {
  console.log("selectedCarMarkers", selectedCarMarkers);
  const animateRef = useRef(true);
  return (
    <div>
      <MapContainer center={[26.971, -82.305]} zoom={10}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
        />
        <SetViewOnSelect animateRef={animateRef} mapCenter={mapCenter} />

        {selectedCarMarkers &&
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
