/** @format */

import "./Filter.scss";
import React from "react";
import sort from "../../assets/icons/Filter.svg";

function Filter({
  totalItems,
  setFilterState,
  category,
  setSustainFilterState,
  sustainability,
}) {
  const categoryArray = [];
  category.forEach((item) => {
    categoryArray.push(item.category);
  });

  const sustainArray = [];
  sustainability.forEach((item) => {
    sustainArray.push(item.sustainability);
  });

  const categories = [...new Set(categoryArray)].map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const sustainRating = [...new Set(sustainArray)].map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  return (
    <section>
      <div className="filter">
        <div className="filter__top">
          <p className="filter__total">{totalItems} Apparel</p>
          <div className="filter__buttons">
            <div className="filter__filter">
              <select
                name="filter"
                className="filter__text"
                onChange={(e) => setFilterState(e)}
              >
                <option className="filter__text" value="All">
                  All
                </option>
                {categories}
              </select>
              {/* <img className="filter__down" src={polygon} /> */}
            </div>
            <div className="filter__filter">
              <select
                name="filter"
                className="filter__text"
                onChange={(e) => setSustainFilterState(e)}
              >
                <option className="filter__text" value="Any">
                  Any
                </option>
                {sustainRating}
              </select>
              {/* <img className="filter__down" src={polygon} /> */}
            </div>
            <img className="filter__sort" src={sort} />
          </div>
        </div>
        {/* <div className="filter__tiles"></div> */}
      </div>
    </section>
  );
}

export default Filter;
