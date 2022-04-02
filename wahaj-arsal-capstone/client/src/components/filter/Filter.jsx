/** @format */

import "./Filter.scss";

import sort from "../../assets/icons/Filter.svg";
import polygon from "../../assets/icons/Polygon.svg";

function Filter({ totalItems, setFilterState, category }) {
  const categoryArray = [];
  const filteredCategories = category.map((item) => {
    categoryArray.push(item.category);
  });

  const categories = [...new Set(categoryArray)].map((item) => {
    return <option value={item}>{item}</option>;
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
                <option value="All">All</option>
                {categories}
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
