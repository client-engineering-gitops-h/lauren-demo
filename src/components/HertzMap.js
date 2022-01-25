import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import '../styles/DigitalMesh.css';


// we can pass car locations through here for markers
const position= [26.977220535278, -82.31909942627] 
const hertz= [26.4194, -81.81055]
const center= [26.696076, -82.0648247131]

function HertzMap()  {
    return( 
        <MapContainer center={center} zoom={10}>
            <TileLayer
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
            />
            <Marker color={'yellow'} position={position}> 
            <Popup>
                Jeff's Car
            </Popup>
            </Marker>
            <Marker position={hertz}> 
            <Popup>
                Hertz Global Headquarters
            </Popup>
            </Marker>
        </MapContainer>
    )
}

export default HertzMap;