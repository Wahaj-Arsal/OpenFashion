/** @format */

import "./StoreLocator.scss";

import React, { useRef, useEffect, useState } from "react";

import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

const MAP_BOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

mapboxgl.accessToken = `${MAP_BOX_TOKEN}`;

function StoreLocator() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.086271);
  const [lat, setLat] = useState(51.510824);
  const [zoom, setZoom] = useState(16);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      cooperativeGestures: true,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
    });

    // Create a new marker.
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <>
      <div className="store-container">
        <h1>Location</h1>
      </div>
      <section className="location-container" id="location">
        <div ref={mapContainer} className="map-container" />
      </section>
    </>
  );
}

export default StoreLocator;
