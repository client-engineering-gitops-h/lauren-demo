import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import '../styles/DigitalMesh.css';


function HertzMap()  {
    return( 
        <MapContainer center={[26.417166, -81.811039]} zoom={16}>
            <TileLayer
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=09kOwvflRhlbJpyDLsaQ"
            />
        </MapContainer>
    )
}

export default HertzMap;