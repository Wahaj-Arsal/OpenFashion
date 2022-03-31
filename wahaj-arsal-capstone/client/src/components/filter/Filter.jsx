/** @format */

import "./Filter.scss";

import sort from "../../assets/icons/Filter.svg";
import polygon from "../../assets/icons/Polygon.svg";

function Filter() {
  return (
    <section>
      <div className="filter">
        <div className="filter__top">
          <p className="filter__total">4500 Apparel</p>
          <div className="filter__buttons">
            <div className="filter__filter">
              <p className="filter__text">New</p>
              <img className="filter__down" src={polygon} />
            </div>
            <img className="filter__sort" src={sort} />
          </div>
        </div>
        <div className="filter__tiles"></div>
      </div>
    </section>
  );
}

export default Filter;
