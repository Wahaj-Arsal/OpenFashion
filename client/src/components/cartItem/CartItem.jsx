/** @format */

import "./CartItem.scss";
import React from "react";

const CartItem = ({ item, removeCartItem, quantityAdd, quantityMinus }) => {
  const { id, name, description, price, quantity, image } = item;
  return (
    // <h2>Product Inserted</h2>
    <div id={id} className="shopping-cart">
      <div className="shopping-cart__picture">
        <img
          className="shopping-cart__image"
          src={require(`../../assets/images/${image}`)}
        />
      </div>
      <div className="shopping-cart__information">
        <p className="shopping-cart__close" onClick={removeCartItem}></p>
        <p className="shopping-cart__title">{name}</p>
        <p className="shopping-cart__description">{description}</p>
        <p className="shopping-cart__price">£{price / 100}</p>
        <label className="shopping-cart__label">Quantity</label>
        <div className="shopping-cart__quantity">
          <button className="shopping-cart__button" onClick={quantityMinus}>
            -
          </button>
          <p className="shopping-cart__label">{quantity}</p>
          <button className="shopping-cart__button" onClick={quantityAdd}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
