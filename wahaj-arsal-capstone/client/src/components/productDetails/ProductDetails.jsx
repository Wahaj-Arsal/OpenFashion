/** @format */

// IMPORT FROM LIBRARIES
import React, { Component, useEffect, useState, useContext } from "react";
import axios from "axios";

// IMPORT LOCAL FILES & COMPONENTS
import "./ProductDetails.scss";
import { CartContext } from "../helper/CartContext";
// import items from "../../data/Items.json";
import image from "../../assets/images/cardigan.svg";
import plus from "../../assets/icons/Plus-white.svg";
import heart from "../../assets/icons/Heart-white.svg";
import doNotBleach from "../../assets/icons/Do-Not-Bleach.svg";
import doNotTumbleDry from "../../assets/icons/Do-Not-Tumble-Dry.svg";
import doNotWash from "../../assets/icons/Do-Not-Wash.svg";
import doNotIron from "../../assets/icons/Iron-Low-Temperature.svg";

// IMPORT ASSETS

// AXIOS
const API_URL_MENS_SINGLE = (id) => `http://localhost:8080/mens/${id}`;

const ProductDetails = ({ match }) => {
  const url = match.params.mensId;
  const [cart, setCart] = useContext(CartContext);
  const [productDetails, setProductDetails] = useState([]);
  const fetchData = () => {
    axios.get(API_URL_MENS_SINGLE(url)).then((response) => {
      // console.log(response);
      const productDetails = response.data;
      setProductDetails(productDetails);
    });
  };

  useEffect(fetchData, []);

  const { id, name, description, price } = productDetails;
  const { care, materials } = { ...productDetails.additional };
  const { bleach, iron, tumble, washing } = { ...productDetails.instructions };
  // console.log(bleach.text);

  const addToCart = (e) => {
    e.preventDefault();
    let cartItems = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    cartItems.push(productDetails);
    localStorage.setItem("item", JSON.stringify(cartItems));
    setCart(cartItems);
  };

  return (
    <>
      {!bleach && !iron && !tumble && !washing ? (
        <p>Loading...</p>
      ) : (
        <section id={id} className="details">
          <img src={image} alt="" className="details__img" />
          <div className="details__details">
            <div className="details__heading">
              <h1 className="details__title">{name}</h1>
              <img src="#" alt="" className="details__icon" />
            </div>
            <p className="details__description">{description}</p>
            <p className="details__price">£{price}</p>
            <div className="details__options">
              <div className="details__color">
                <p className="details__color-text">Color</p>
                <p className="details__color-options"></p>
              </div>
              <div className="details__size">
                <p className="details__size-text">Size</p>
                <p className="details__size-options"></p>
              </div>
            </div>
            <button className="button" onClick={addToCart}>
              <div className="button__add">
                <img className="button__plus" src={plus} />
                <p className="button__text">Add to Basket</p>
              </div>
              <div className="button__icon">
                <img className="button__heart" src={heart} />
              </div>
            </button>
            <div className="materials__materials">
              <h2 className="materials__title">Materials</h2>
              <p className="materials__text">{materials}</p>
            </div>
            <div className="materials__care">
              <h2 className="materials__title">Care</h2>
              <p className="materials__text">{care}</p>
              <div className="materials__bleach">
                <img src={doNotBleach} />
                <p>{bleach.text}</p>
              </div>
              <div className="materials__tumble">
                <img src={doNotTumbleDry} />
                <p>{tumble.text}</p>
              </div>
              <div className="materials__washing">
                <img src={doNotWash} />
                <p>{washing.text}</p>
              </div>
              <div className="materials__iron">
                <img src={doNotIron} />
                <p>{iron.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
