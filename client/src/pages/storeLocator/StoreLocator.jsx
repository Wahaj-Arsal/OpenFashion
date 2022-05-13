/** @format */

import "./StoreLocator.scss";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const StoreLocator = ({ SERVER_KEY_URL }) => {
  const API_URL_STORE_LOCATOR = `${SERVER_KEY_URL}/storelocator`;
  const mapContainerRef = useRef(null);
  const [storeInfo, setStoreInfo] = useState([]);

  //Get ALL items from the API
  const getStoreInformation = () => {
    axios.get(API_URL_STORE_LOCATOR).then((response) => {
      const storeInfo = response.data;
      setStoreInfo(storeInfo);
    });
  };

  //   Call function to get Store Information on page refresh
  useEffect(getStoreInformation, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-0.0773, 51.52418],
      zoom: 10,
      cooperativeGestures: true,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/driving",
      }),
      "top-left"
    );
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    storeInfo.map((location) => {
      new mapboxgl.Marker()
        .setLngLat([`${location.coordinates[0]}`, `${location.coordinates[1]}`])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `${location.name} <br> ${location.address}`
          )
        )
        .addTo(map);
    });
  }, [storeInfo]);

  return (
    <>
      <div className="map-container" ref={mapContainerRef}></div>
    </>
  );
};

export default StoreLocator;
