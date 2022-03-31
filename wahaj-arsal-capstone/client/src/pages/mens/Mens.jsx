/** @format */

// IMPORT FROM LIBRARIES
// import { useParams, useLocation } from "react-router-dom";
import React, { Component } from "react";
// import Route from "react-router-dom";
import axios from "axios";

// IMPORT LOCAL FILES & COMPONENTS
import "./Mens.scss";
// import items from "../../data/Items.json";
import Filter from "../../components/filter/Filter";
import ItemTile from "../../components/itemTile/ItemTile";

// IMPORT ASSETS
import sort from "../../assets/icons/Filter.svg";
import polygon from "../../assets/icons/Polygon.svg";

const API_URL_MENS_ALL = `http://localhost:8080/mens`;

function Mens({ mens, match }) {
  // console.log(mens);
  // console.log(match);
  return (
    <>
      <Filter />
      <section className="item-container">
        {mens.map((item) => {
          return (
            <ItemTile
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              match={match}
            />
          );
        })}
      </section>
    </>
  );
}

export default Mens;
