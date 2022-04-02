/** @format */

import "./Home.scss";

import ProductTile from "../../components/productTile/ProductTile";
import titleBar from "../../assets/icons/3.svg";
import React, { useEffect, useState } from "react";
// import Route from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
// import Mens from "../mens/Mens";

// import items from "../../data/Items.json";
const API_URL_HOME = `http://localhost:8080/`;

function Home() {
  // console.log(props);
  const [home, setHome] = useState([]);

  const getHomePage = () => {
    axios.get(API_URL_HOME).then((response) => {
      const home = response.data;
      setHome(home);
      // console.log(response.data);
    });
  };

  useEffect(getHomePage, []);

  return (
    <>
      <div className="home">
        <h1 className="home__title">HOME</h1>
        <img className="home__underline" src={titleBar} />
      </div>
      {home.length > 0 &&
        home.map((item) => {
          return <ProductTile key={uuid()} item={item} />;
        })}
      {/* <ProductTile props={this.props} /> */}
    </>
  );
}

export default Home;
