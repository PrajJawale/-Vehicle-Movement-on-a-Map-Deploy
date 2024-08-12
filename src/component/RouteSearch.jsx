import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder';

function RouteSearch() {
    const map = useMap();

    useEffect(() => {
        
        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false
        })
        .on('markgeocode', function(e) {
            const latlng = e.geocode.center;

            // Move the map view to the searched location
            map.setView(latlng, map.getZoom());

            // Update the routing control with the new destination
            L.Routing.control({
                waypoints: [
                    L.latLng(57.74, 11.94),  // Starting point
                    L.latLng(latlng.lat, latlng.lng) // New ending point
                ],
                lineOptions: {
                    styles: [{ color: "blue", weight: 6 }]
                },
                routeWhileDragging: false,
                createMarker: () => null,  // Optional: hide markers
            }).addTo(map);
        })
        .addTo(map);

        return () => map.removeControl(geocoder);
    }, [map]);

    return null;
}

export default RouteSearch;
