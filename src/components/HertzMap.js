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
    map.setView({lat: mapCenter.latitude, lng: mapCenter.longitude}, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });
  console.log("coordinates",mapCenter.latitude, mapCenter.longitude )

  return null;
}

function HertzMap({ carCoordinates, selectedCars, mapCenter }) {
  const animateRef = useRef(true);
  // const map= useRef()
  console.log("slectedcars", selectedCars)
  console.log("carcoordinates", carCoordinates)

    return(
      <div>
        <MapContainer center={[26.6594, -81.9055]} zoom={10}>
           <TileLayer
             attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
             url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
           />
           <SetViewOnSelect animateRef={animateRef} mapCenter={mapCenter}/>
           <Marker position={hertz}>
              <Popup>Hertz Global Headquarters</Popup>
            </Marker>
            
            {carCoordinates &&
              selectedCars &&
              Object.keys(carCoordinates).map((key, i) => {
                const carLocation = carCoordinates[key];
                const carLatLong = {lat: carLocation.latitude, lng: carLocation.longitude};
                return (
                  <Marker key={i} position={carLatLong}>
                    <Popup>
                      VIN: {carLocation.vid}
                      <br />
                      Last Updated:{" "}
                      {new Date(selectedCars.updated_at).toLocaleTimeString("en-US")}
                    </Popup>
                  </Marker>
                );
              })}
              </MapContainer>
      </div>
);
}

//   return (
//     <>
//       <MapContainer center={[26.6594, -81.9055]} zoom={10}>
//         <TileLayer
//           attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
//           url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
//         />
//         <SetViewOnSelect animateRef={animateRef} mapCenter={mapCenter}/>

//         {carCoordinates &&
//           selectedCars &&
//           Object.keys(carCoordinates).map((key, i) => {
//             const carLocation = carCoordinates[key];
//             const carLatLong = {lat: carLocation.latitude, lng: carLocation.longitude};
//             return (
//               <Marker key={i} position={carLatLong}>
//                 <Popup>
//                   VIN: {carLocation.vid}
//                   <br />
//                   Last Updated:{" "}
//                   {new Date(selectedCars.updated_at).toLocaleTimeString("en-US")}
//                 </Popup>
//               </Marker>
//             );
//           })}

//         <Marker position={hertz}>
//           <Popup>Hertz Global Headquarters</Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// }


export default HertzMap;

