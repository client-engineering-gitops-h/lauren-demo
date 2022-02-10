import React, { useRef, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "../styles/DigitalMesh.css";

const hertz = [26.4194, -81.81055];

function SetViewOnSelect({ animateRef, mapCenter, selectedCar }) {

  const map = useMapEvent('click', (e) => {
    console.log("eLatLong", e.latlng)
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
  })
  })
  // useEffect(()=>{
  //   const map = map.setView({lat: mapCenter.latitude, long:mapCenter.longitude})
  // }, [selectedCar])
  
  return null
}

function HertzMap({ carCoordinates, selectedCar, mapCenter }) {
  const animateRef = useRef(true)
  console.log("selectedCar", selectedCar)
  // const map= useRef()

  return (
    <>
       <MapContainer center={[26.4194, -81.81055]} zoom={14}>
       <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
        />
      <SetViewOnSelect animateRef={animateRef} />

      {carCoordinates &&
        Object.keys(carCoordinates).map((key, i) => {
          const carLocation = carCoordinates[key];
          const carLatLong = [carLocation.latitude, carLocation.longitude];
          return (
            <Marker key={i} position={carLatLong} >
              <Popup >{carLocation.vid}<br/>{selectedCar.updated_at}</Popup>
            </Marker>
          );
        })}

      <Marker position={hertz}>
        <Popup>Hertz Global Headquarters</Popup>
      </Marker>
      </MapContainer>
    </>
  )
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

//   return (
//     <>
//       <MapContainer center={hertz} zoom={14}>
//       <TileLayer
//          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
//          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
//        />
//         {carCoordinates &&
//         Object.keys(carCoordinates).map((key, i) => {
//           const carLocation = carCoordinates[key];
//           const carLatLong = [carLocation.latitude, carLocation.longitude];
//           return (
//             <Marker key={i} position={carLatLong}>
//               <Popup>{carLocation.vid}</Popup>
//             </Marker>
//           );
//         })}

//       <Marker position={hertz}>
//         <Popup>Hertz Global Headquarters</Popup>
//       </Marker>
//       </MapContainer>
//     </>
//   )
// }

export default HertzMap;

// THIS IS HOW THEY DO ANIMATED PANNING ON REACT LEAFLET
// import { useRef } from 'react'
// import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'


