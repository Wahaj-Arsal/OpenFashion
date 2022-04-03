/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// IMPORT LOCAL FILES & COMPONENTS
import "./ProductDetails.scss";
import { CartContext } from "../../components/helper/CartContext";
import exportIcon from "../../assets/icons/Export.svg";
import plus from "../../assets/icons/Plus-white.svg";
import heart from "../../assets/icons/Heart-white.svg";
import doNotBleach from "../../assets/icons/Do-Not-Bleach.svg";
import doNotTumbleDry from "../../assets/icons/Do-Not-Tumble-Dry.svg";
import doNotWash from "../../assets/icons/Do-Not-Wash.svg";
import doNotIron from "../../assets/icons/Iron-Low-Temperature.svg";

// IMPORT ASSETS

const ProductDetails = ({ match, SERVER_KEY_URL }) => {
  const API_URL_MENS_SINGLE = (id) => `${SERVER_KEY_URL}/mens/${id}`;
  const url = match.params.mensId;
  const [cart, setCart] = useContext(CartContext);
  const [productDetails, setProductDetails] = useState([]);
  const fetchData = () => {
    axios.get(API_URL_MENS_SINGLE(url)).then((response) => {
      const productDetails = response.data;
      setProductDetails(productDetails);
    });
  };

  useEffect(fetchData, []);

  const { id, name, description, price } = productDetails;
  const { care, materials } = { ...productDetails.additional };
  const { bleach, iron, tumble, washing } = { ...productDetails.instructions };

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
          <img src={productDetails.image} alt="" className="details__img" />
          <div className="details__details">
            <div className="details__heading">
              <h1 className="details__title">{name}</h1>
              <img src={exportIcon} alt="" className="details__icon" />
            </div>
            <p className="details__description">{description}</p>
            <p className="details__price">£{price / 100}</p>
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
          <div className="comments">
            <div className="comments__input">
              <div className="comments__name">
                <h2 className="comments__name-title">Name:</h2>
                <input
                  className="comments__name-input"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div className="comments__comment">
                <h2 className="comments__comment-title">Leave a review:</h2>
                <textarea
                  className="comments__comment-input"
                  type="text"
                  placeholder="Enter your review"
                />
              </div>
            </div>
            <button className="comments__submit">Post your review</button>
          </div>
          <div className="display"></div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
