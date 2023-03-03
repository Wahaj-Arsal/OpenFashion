/** @format */

import "../../pages/storeLocator/StoreLocator.scss";

import React, { useEffect, useRef } from "react";

function MyMapComponent({ center, zoom, position, storeLocation }) {
  const ref = useRef();

  const getMap = () => {
    new window.google.maps.Map(ref.current, {
      zoom: zoom,
      center: center,
      position: position,
    });
  };

  const getPosition = () => {
    map.setCenter({ lat: -34, lng: 151 });
    new google.maps.Marker({ position: { lat: -34, lng: 151 }, map: map });
  };

  useEffect(() => {
    getPosition();
  });

  return <div ref={ref} id="map" className="map-container"></div>;
}

export default MyMapComponent;
