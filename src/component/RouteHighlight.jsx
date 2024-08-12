// RouteHighlight.js
import React, { useEffect, useState, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../index.css';
import ControlPanel from './ControlPnael'

function RouteHighlight() {
    const map = useMap();
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [marker, setMarker] = useState(null);
    const animationIntervalRef = useRef(null);
    const startPosition = useRef([17.385044, 78.486671]);
    const [data, setData] = useState([
        {
          "latitude": 19.9975,
          "longitude": 73.7898,
          "timestamp": "2024-07-20T10:00:00"
        },
        {
          "latitude": 18.5204,
          "longitude": 73.8567,
          "timestamp": "2024-07-20T10:00:05"
        },
        {
          "latitude": 19.8849,
          "longitude": 74.4728,
          "timestamp": "2024-07-20T10:00:10"
        }
      ]
      );
    const [speed, setSpeed] = useState(50);

    const DefaultIcon = L.icon({
        iconUrl: "/lamb.png",
        iconSize: [40, 40],
    });

    // useEffect(() => {
    //     fetch('http://localhost:8080/api/vehicle/route')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(json => {
    //             setData(json);
    //         })
    //         .catch(error => {
    //             console.error('There was a problem with the fetch operation:', error);
    //         });
    // }, []);

    
    useEffect(() => {
        if (data.length === 0) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(data[0].latitude, data[0].longitude),
                L.latLng(data[1].latitude, data[1].longitude)
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#348ceb', weight: 8 }]
            },
            geocoder: L.Control.Geocoder.nominatim(),
            addWaypoints: true,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: true,
            createMarker: (i, waypoint) => {
                const iconHtml = i === 0
                    ? '<i class="fas fa-location-arrow" style="color: Blue; font-size: 40px;"></i>'
                    : '<i class="fas fa-map-marker-alt" style="color: Red; font-size: 40px;"></i>';

                const markerIcon = L.divIcon({
                    className: 'leaflet-div-icon',
                    html: iconHtml,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                });

                return L.marker(waypoint.latLng, { icon: markerIcon });
            }
        }).addTo(map);

        routingControl.on("routesfound", (e) => {
            setRouteCoordinates(e.routes[0].coordinates);
        });

        const newMarker = L.marker(startPosition.current, { icon: DefaultIcon }).addTo(map);
        setMarker(newMarker);

        return () => {
            map.removeControl(routingControl);
            if (marker) {
                map.removeLayer(marker);
            }
            stopAnimation();
        };
    }, [map, data]);

    const animateMarker = () => {
        if (isAnimating || routeCoordinates.length === 0 || !marker) return;

        setIsAnimating(true);
        let i = 0;
        animationIntervalRef.current = setInterval(() => {
            if (i < routeCoordinates.length) {
                marker.setLatLng([routeCoordinates[i].lat, routeCoordinates[i].lng]);
                i++;
            } else {
                stopAnimation();
            }
        }, 50 - speed);
    };

    const stopAnimation = () => {
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
            animationIntervalRef.current = null;
        }
        setIsAnimating(false);

        if (marker) {
            marker.setLatLng(startPosition.current);
        }
    };

    const handleSpeedChange = (event) => {
        setSpeed(Number(event.target.value));
        if (isAnimating) {
            stopAnimation();
            animateMarker();
        }
    };

    return (
       

            <ControlPanel
                isAnimating={isAnimating}
                animateMarker={animateMarker}
                stopAnimation={stopAnimation}
                speed={speed}
                handleSpeedChange={handleSpeedChange}
            />
        
    );
}

export default RouteHighlight;
