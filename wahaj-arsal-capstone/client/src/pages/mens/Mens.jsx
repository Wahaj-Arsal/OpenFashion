/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState } from "react";
import axios from "axios";

// IMPORT LOCAL FILES & COMPONENTS
import "./Mens.scss";
import Filter from "../../components/filter/Filter";
import ItemTile from "../../components/itemTile/ItemTile";

// IMPORT ASSETS
import leafEmpty from "../../assets/icons/leaf-e.svg";
import leafFull from "../../assets/icons/leaf-f.svg";

function Mens({ match, SERVER_KEY_URL }) {
  const [mens, setMens] = useState([]);
  const [category, setCategory] = useState([]);
  const [sustainability, setSustainability] = useState([]);

  //Get ALL items from the API
  const getItemsMens = () => {
    axios.get(`${SERVER_KEY_URL}/mens`).then((response) => {
      const mens = response.data;
      setMens(mens);
      setCategory(mens);
      setSustainability(mens);
    });
  };
  //Call function to get ALL items on page refresh
  useEffect(getItemsMens, []);
  //Filter items depending on the category
  let result = [];
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
        result = mens.filter((currentData) => {
          return currentData.category === e.target.value;
        });
        setMens(result);
      });
    }
  };

  const setSustainFilterState = async (e) => {
    e.preventDefault();
    if (e.target.value === "Any") {
      await axios.get(`${SERVER_KEY_URL}/mens`).then((response) => {
        const mens = response.data;
        setMens(mens);
      });
    } else {
      await axios.get(`${SERVER_KEY_URL}/mens`).then((response) => {
        const mens = response.data;
        // setMens(mens);
        let result = mens.filter((currentData) => {
          return currentData.sustainability === parseInt(e.target.value);
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
        setSustainFilterState={setSustainFilterState}
        sustainability={sustainability}
      />
      <section className="item-container">
        {mens.length > 0 &&
          mens.map((item, index) => {
            return (
              <ItemTile
                key={item.id}
                id={item.id}
                index={index}
                name={item.name}
                description={item.description}
                price={item.price / 100}
                image={item.image}
                item={item}
                sustainability={item.sustainability}
                match={match}
                // sustainReturn={sustainReturn}
              />
            );
          })}
      </section>
    </>
  );
}

export default Mens;
