/** @format */

import "./Filter.scss";

import sort from "../../assets/icons/Filter.svg";
import polygon from "../../assets/icons/Polygon.svg";

function Filter({ totalItems, setFilterState }) {
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
                <option value="All">All</option>
                <option value="Cardigan">Cardigan</option>
                <option value="Jumper">Jumper</option>
                <option value="Jacket">Jacket</option>
                <option value="Shawl">Shawl</option>
                <option value="Shoes">Shoes</option>
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
