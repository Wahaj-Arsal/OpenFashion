/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// IMPORT LOCAL FILES & COMPONENTS
import "./ProductsPage.scss";
import Filter from "../../components/filter/Filter";
import ItemTile from "../../components/itemTile/ItemTile";
import { Ring } from "react-awesome-spinners";
import NewsletterBanner from "../../components/newsletterBanner/newsletterBanner";
import NewsletterModal from "../../components/newsletterModal/NewsletterModal.jsx";

function ProductsPage({ SERVER_KEY_URL, setShow, show, mens, womens }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sustainability, setSustainability] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sustainabilityData, setSustainabilityData] = useState([]);
  const [activeSustainFilter, setActiveSustainFilter] = useState("Any");

  const location = useLocation();

  //Get ALL items from the API
  const getItemsMens = () => {
    axios.get(`${SERVER_KEY_URL}${location.pathname}`).then((response) => {
      const products = response.data;
      setProducts(products);
      setCategory(products);
      setSustainability(products);
      setCategoryData(products);
      setSustainabilityData(products);
    });
  };

  //Call function to get ALL items on page refresh
  useEffect(getItemsMens, []);

  //Filter items depending on the category
  // const setFilterState = async (e) => {
  //   if (!e) {
  //     // setCategoryData(mens);
  //     if (category === "All") {
  //       setCategoryData(mens);
  //     }
  //     // } else {
  //     //   let filteredItems = mens.filter((items) => {
  //     //     return items.category == categoryData;
  //     //   });
  //     //   setCategoryData(filteredItems);
  //     // }
  //   } else if (e.target.value === "All") {
  //     setCategoryData(mens);
  //     console.log(JSON.stringify(activeSustainFilter));
  //     setSustainFilterState();
  //   } else {
  //     e.preventDefault();
  //     let filteredItems = mens.filter((items) => {
  //       return items.category === e.target.value;
  //     });
  //     setCategoryData(filteredItems);
  //     // setSustainFilterState();
  //   }
  // };

  // const setSustainFilterState = async (e) => {
  //   if (!e) {
  //     //no filter set so passing data in categoryData as is filtered by category
  //     // setSustainabilityData(categoryData);
  //     if (activeSustainFilter === "Any") {
  //       setSustainabilityData(categoryData);
  //     } else {
  //       let filteredItems = categoryData.filter((items) => {
  //         return items.sustainability === activeSustainFilter;
  //       });
  //       setSustainabilityData(filteredItems);
  //     }
  //   } else if (e.target.value === "Any") {
  //     setSustainabilityData(categoryData);
  //     setFilterState();
  //   } else {
  //     setActiveSustainFilter(e.target.value);
  //     let filteredItems = categoryData.filter((currentData) => {
  //       return currentData.sustainability === parseInt(e.target.value);
  //     });
  //     setSustainabilityData(filteredItems);
  //     // setFilterState();
  //   }
  // };

  // Due to setState's async nature, the state updates may not show on first render
  // So rerun the filter functions whenever the categoryData updates

  // useEffect(() => {
  //   setFilterState();
  //   setSustainFilterState();
  // }, [categoryData]);

  //Calculate Total Apparel
  const totalItems = sustainabilityData.length;

  return (
    <>
      {!products.length > 0 ? (
        <div className="loading">
          <Ring />
        </div>
      ) : (
        <>
          <section className="hero-container">
            <div className="hero">
              <h2 className="hero__heading">Check Our Products!</h2>
            </div>
          </section>

          <div className="heading">
            <h2 className="heading__title">Our Latest Products!</h2>
            <p className="heading__description">
              Check out all of our products
            </p>
          </div>
          {/* <Filter
            totalItems={totalItems}
            setFilterState={setFilterState}
            category={category}
            setSustainFilterState={setSustainFilterState}
            sustainability={sustainability}
          /> */}
          <section className="item-container">
            {products.length > 0 &&
              products.map((item) => {
                return <ItemTile {...item} key={item.id} />;
              })}
          </section>
          <NewsletterBanner show={show} setShow={setShow} />
          <NewsletterModal show={show} setShow={setShow} />
        </>
      )}
    </>
  );
}

export default ProductsPage;
