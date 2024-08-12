import { useState } from 'react'
import './App.css'
import Map from './component/Map'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function App() {
  

  return (
    <>
       <Map/>
       {/* <LoadAnimateMap/> */}
    </>
  )
}

export default App
