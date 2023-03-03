/** @format */

import "./StoreLocator.scss";

import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "../../components/mapComponent/MapComponent";

const GoogleMapKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <>Loading</>;
    case Status.FAILURE:
      return <>Error</>;
    case Status.SUCCESS:
      return <MyMapComponent />;
  }
};

function StoreLocator() {
  const center = { lat: 51.500998, lng: -0.12613 };
  const zoom = 10;
  const position = { lat: 51.500998, lng: -0.12613 };

  return (
    <Wrapper apiKey={GoogleMapKey} render={render}>
      <MyMapComponent
        center={center}
        zoom={zoom}
        position={position}
        // storeLocation={storeLocation}
      />
    </Wrapper>
  );
}

export default StoreLocator;
