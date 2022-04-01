/** @format */

// IMPORT FROM LIBRARIES
// import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import Route from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";

// IMPORT LOCAL FILES & COMPONENTS
import "./Mens.scss";
// import items from "../../data/Items.json";
import Filter from "../../components/filter/Filter";
import ItemTile from "../../components/itemTile/ItemTile";

// IMPORT ASSETS
import sort from "../../assets/icons/Filter.svg";
import polygon from "../../assets/icons/Polygon.svg";

const API_URL_MENS_ALL = `http://localhost:8080/mens`;

function Mens({ match }) {
  const [mens, setMens] = useState([]);
  // const [filter, setFilter] = useState(mens);
  const getItemsMens = async () => {
    await axios.get(API_URL_MENS_ALL).then((response) => {
      const mens = response.data;
      setMens(mens);
    });
  };
  useEffect(getItemsMens, []);

  const setFilterState = async (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      await axios.get(API_URL_MENS_ALL).then((response) => {
        const mens = response.data;
        setMens(mens);
      });
    } else {
      await axios.get(API_URL_MENS_ALL).then((response) => {
        const mens = response.data;
        // setMens(mens);
        let result = mens.filter((currentData) => {
          return currentData.category === e.target.value;
        });
        setMens(result);
      });
    }
  };

  const totalItems = mens.length;
  // console.log(totalItems);

  return (
    <>
      <Filter totalItems={totalItems} setFilterState={setFilterState} />
      <section className="item-container">
        {mens.length > 0 &&
          mens.map((item) => {
            // console.log(item.image);
            return (
              <ItemTile
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price / 100}
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
