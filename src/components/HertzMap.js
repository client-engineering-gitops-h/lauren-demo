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

function SetViewOnSelect({ animateRef, mapCenter, selectedCar }) {
  console.log("map center", mapCenter)

  const map = useMapEvent("click", (e) => {
    console.log("eLatLong", e.latlng);
    map.setView({lat: mapCenter.latitude, lng: mapCenter.longitude}, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

function HertzMap({ carCoordinates, selectedCar, mapCenter }) {
  const animateRef = useRef(true);
  // const map= useRef()

  return (
    <>
      <MapContainer center={[26.6594, -81.9055]} zoom={10}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
        />
        <SetViewOnSelect animateRef={animateRef} mapCenter={mapCenter}/>

        {carCoordinates &&
          Object.keys(carCoordinates).map((key, i) => {
            const carLocation = carCoordinates[key];
            const carLatLong = [carLocation.latitude, carLocation.longitude];
            return (
              <Marker key={i} position={carLatLong}>
                <Popup>
                  VIN: {carLocation.vid}
                  <br />
                  Last Updated:{" "}
                  {new Date(selectedCar.updated_at).toLocaleTimeString("en-US")}
                </Popup>
              </Marker>
            );
          })}

        <Marker position={hertz}>
          <Popup>Hertz Global Headquarters</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

// function HertzMap({ carCoordinates, selectedCar, mapCenter }) {
//   console.log("selectedCar", selectedCar)
//   // console.log("mapcenter", mapCenter)
//   console.log("car coordniates", carCoordinates)

//   // let center= [26.4194, -81.81055];
//   // useEffect(()=>{
//   //   center= [mapCenter.latitude, mapCenter.longitude]
//   // }, [selectedCar])
//   // console.log("centerChange", center)


export default HertzMap;

