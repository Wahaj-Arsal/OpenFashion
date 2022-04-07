/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// IMPORT LOCAL FILES
import "./Header.scss";
import CartItem from "../cartItem/CartItem.jsx";
import { CartContext } from "../helper/CartContext";

// IMPORT ASSETS
import menuIcon from "../../assets/icons/Menu.svg";
import logo from "../../assets/logo/logo.svg";
import search from "../../assets/icons/Search.svg";
import shoppingBag from "../../assets/icons/shopping-bag.svg";
import phone from "../../assets/icons/Call.svg";
import locator from "../../assets/icons/Location.svg";
import titleBar from "../../assets/icons/3.svg";
import twitter from "../../assets/icons/Twitter.svg";
import instagram from "../../assets/icons/Instagram.svg";
import youtube from "../../assets/icons/YouTube.svg";
import shoppingBagWhite from "../../assets/icons/shopping-bag-white.svg";

import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

// HEADER COMPONENT START
export default function Header({ SERVER_KEY_URL }) {
  const stripe = loadStripe(STRIPE_PUBLIC_KEY);
  const [sideBar, setSideBar] = useState(false);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [cart, setCart] = useContext(CartContext);

  const showSidebar = () => setSideBar(!sideBar);
  const showShoppingCart = () => setShoppingCart(!shoppingCart);

  const hideSideBar = () => setSideBar(false);
  const hideCart = () => setShoppingCart(false);

  const fetchLocalStorage = () => {
    let cartGetItemFromLS = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    const cart = cartGetItemFromLS;
    setCart(cart);
  };

  useEffect(fetchLocalStorage, []);

  // Send cart information to the server for Stripe payment
  const purchaseItem = async () => {
    const cartItem = cart.map((item) => {
      return {
        // id: item.id,
        name: item.name,
        description: item.description,
        amount: item.price,
        currency: "GBP",
        quantity: 1,
      };
    });
    axios
      .post(`${SERVER_KEY_URL}/create-checkout-session`, { cartItem })
      .then((response) => {
        window.location.href = response.data.url;
        return stripe.redirectToCheckout({ sessionId: response.data.id });
      })
      .then((result) => {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //Remove cart Item
  const removeCartItem = (e) => {
    e.preventDefault();
    const cartItem = e.target.parentElement.parentElement;
    const filterItems = cart.filter((item) => item.id !== cartItem.id);
    setCart(filterItems);
    const items = JSON.parse(localStorage.getItem("item"));
    const filter = items.filter((item) => item.id !== cartItem.id);
    localStorage.setItem("item", JSON.stringify(filter));
  };

  // Map through the cart state and pull out items
  const cartReturnItem = cart.map((item) => {
    return (
      <>
        <CartItem key={item.id} item={item} removeCartItem={removeCartItem} />
      </>
    );
  });

  // Calculate the CART Total
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal = cartTotal + cart[i].price / 100;
  }

  return (
    <>
      {/* {this.state.shoppingCart ? "cart cart--active" : "cart"} */}
      <header
        className={shoppingCart ? "header body__scroll-disabled" : "header"}
      >
        {/* <h1>Header</h1> */}
        <Link to="#" className="header__menu" onClick={showSidebar}>
          <img className="header__left" src={menuIcon} />
        </Link>
        <div className="header__logo">
          <Link to="/">
            <img className="header__center" src={logo} />
          </Link>
        </div>
        <div className="header__right">
          <img className="header__search" src={search} />
          <Link to="#">
            <img
              className="header__shopping-cart"
              src={shoppingBag}
              onClick={showShoppingCart}
            />
          </Link>
        </div>
      </header>
      <nav className={sideBar ? "sidebar sidebar--active" : "sidebar "}>
        <ul className="sidebar__list">
          <li className="sidebar__list-item">
            <Link
              to="/mens"
              className="sidebar__list-link"
              onClick={hideSideBar}
            >
              <p className="sidebar__list-text">Men</p>
            </Link>
          </li>
          <li className="sidebar__list-item">
            <Link
              to="/womens"
              className="sidebar__list-link"
              onClick={hideSideBar}
            >
              <p className="sidebar__list-text">Women</p>
            </Link>
          </li>
          <li className="sidebar__list-item">
            <p className="sidebar__list-text">Bags</p>
          </li>
          <li className="sidebar__list-item">
            <p className="sidebar__list-text">Shoes</p>
          </li>
          <li className="sidebar__list-item">
            <p className="sidebar__list-text">Beauty</p>
          </li>
          <li className="sidebar__list-item">
            <p className="sidebar__list-text">Accessories</p>
          </li>
          <li className="sidebar__list-item">
            <img className="sidebar__icon" src={phone} />
            <Link
              to="/sendtext"
              className="sidebar__list-link"
              onClick={hideSideBar}
            >
              <p className="sidebar__list-text">(+44) 546 478 1008</p>
            </Link>
          </li>
          <li className="sidebar__list-item">
            <img className="sidebar__icon" src={locator} />
            <Link
              to="/storelocator"
              className="sidebar__list-link"
              onClick={hideSideBar}
            >
              <p>Store Locator</p>
            </Link>
          </li>
        </ul>
        <div className="sidebar__bottom">
          <div className="sidebar__divider">
            <img src={titleBar} />
          </div>
          <div className="sidebar__social">
            <img className="sidebar__twitter" src={twitter} />
            <img className="sidebar__instagram" src={instagram} />
            <img className="sidebar__youtube" src={youtube} />
          </div>
        </div>
      </nav>
      <section className={shoppingCart ? "cart cart--active" : "cart"}>
        <h3 className="cart__heading">Cart</h3>
        {cart.length > 0 ? (
          <>
            {cartReturnItem}
            <div className="cart__information">
              <div className="cart__total">
                <>
                  <p className="cart__text">Sub Total</p>
                  <p className="cart__value">£{cartTotal}</p>
                </>
                <>
                  <p className="cart__shipping">
                    *shipping charges, taxes and discounts codes are calculated
                    at the time of accounting.
                  </p>
                </>
              </div>
              <div className="cart__button" onClick={purchaseItem}>
                <img className="cart__icon" src={shoppingBagWhite} />
                <p className="cart__details">Checkout</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="cart-empty__status">
              You have no items in your Shopping Bag.
            </p>
            <div className="cart-empty__button">
              <img className="cart-empty__icon" src={shoppingBagWhite} />
              <p className="cart-empty__details" onClick={hideCart}>
                Continue Shopping
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}

// export default Header;
