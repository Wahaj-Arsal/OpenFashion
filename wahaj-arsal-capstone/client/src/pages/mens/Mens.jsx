/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState } from "react";
import axios from "axios";

// IMPORT LOCAL FILES & COMPONENTS
import "./Mens.scss";
import Filter from "../../components/filter/Filter";
import ItemTile from "../../components/itemTile/ItemTile";

// IMPORT ASSETS

function Mens({ match, SERVER_KEY_URL }) {
  const [mens, setMens] = useState([]);
  const [category, setCategory] = useState([]);

  //Get ALL items from the API
  const getItemsMens = () => {
    axios.get(`${SERVER_KEY_URL}/mens`).then((response) => {
      const mens = response.data;
      setMens(mens);
      setCategory(mens);
    });
  };
  //Call function to get ALL items on page refresh
  useEffect(getItemsMens, []);

  //Filter items depending on the category
  const setFilterState = async (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      await axios.get(`${SERVER_KEY_URL}/mens`).then((response) => {
        const mens = response.data;
        setMens(mens);
      });
    } else {
      await axios.get(`${SERVER_KEY_URL}/mens`).then((response) => {
        const mens = response.data;
        // setMens(mens);
        let result = mens.filter((currentData) => {
          return currentData.category === e.target.value;
        });
        setMens(result);
      });
    }
  };

  //Calculate Total Apparel
  const totalItems = mens.length;

  return (
    <>
      <h3 className="mens__title">Men's</h3>
      <Filter
        totalItems={totalItems}
        setFilterState={setFilterState}
        category={category}
      />
      <section className="item-container">
        {mens.length > 0 &&
          mens.map((item) => {
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
