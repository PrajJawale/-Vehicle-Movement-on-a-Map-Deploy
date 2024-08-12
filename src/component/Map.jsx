import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SetViewOnClick from './SetViewOnClick';
 import Search from './Search';
import RouteHighlight from './RouteHighlight';


function Map() {

    const animateRef = useRef(false);

    return (
        <>
            <MapContainer  zoom={15} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Search/>
                <SetViewOnClick animateRef={animateRef} />
                <RouteHighlight />
                
            </MapContainer>
        </>
    );
}

export default Map;


