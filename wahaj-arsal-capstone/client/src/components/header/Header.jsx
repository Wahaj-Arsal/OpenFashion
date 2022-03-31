/** @format */

// IMPORT FROM LIBRARIES
import React, { Component, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { uuid } from "uuid";
import axios from "axios";

// IMPORT LOCAL FILES
import "./Header.scss";
import CartItem from "../cartItem/CartItem.jsx";
import { CartContext } from "../helper/CartContext";
// import items from "../../data/Items.json";

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

// HEADER COMPONENT START
export default function Header(props) {
  const stripe = loadStripe(
    "pk_test_51KjOyzIMx3ChqAD6opXWVp2NlWeJQT7h7PJhnch2QH0mwQ76rOtYii8SPjX2qUHmK2QRd15mjCIDnUXWKcHiMHiz00bV9efL4i"
  );
  const [sideBar, setSideBar] = useState(false);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [cart, setCart] = useContext(CartContext);

  const showSidebar = () => setSideBar(!sideBar);
  const showShoppingCart = () => setShoppingCart(!shoppingCart);

  const fetchLocalStorage = () => {
    let cartGetItemFromLS = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    const cart = cartGetItemFromLS;
    setCart(cart);
  };

  useEffect(fetchLocalStorage, []);

  // const goToPayment = async (e) => {
  //   const checkOutSession = await axios.post("http://localhost:8080/checkout");
  // };

  // console.log(cart);

  // console.log(cart);

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
      .post(`http://localhost:8080/create-checkout-session`, { cartItem })
      .then((response) => {
        window.location.href = response.data.url;
        console.log(response);
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

  const cartReturnItem = cart.map((item, index) => {
    return (
      <>
        <CartItem key={index} item={item} />
        <div className="cart__button" onClick={purchaseItem}>
          <img className="cart__icon" src={shoppingBagWhite} />
          <p className="cart__details">Checkout</p>
        </div>
      </>
    );
  });
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
          <img className="header__center" src={logo} />
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
              // onClick={this.hideMenu}
            >
              <p className="sidebar__list-text">Men</p>
            </Link>
          </li>
          <li className="sidebar__list-item">
            <Link
              to="/womens"
              className="sidebar__list-link"
              // onClick={this.hideMenu}
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
            <p className="sidebar__list-text">(+44) 546 478 1008</p>
          </li>
          <li className="sidebar__list-item">
            <img className="sidebar__icon" src={locator} />
            <Link to="#" className="sidebar__list-link">
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
        {/* {cartReturnItem} */}
        {cart.length > 0 ? (
          <>{cartReturnItem}</>
        ) : (
          <>
            <p className="cart__status">
              You have no items in your Shopping Bag.
            </p>
            <div className="cart__button">
              <img className="cart__icon" src={shoppingBagWhite} />
              <p className="cart__details">Continue Shopping</p>
            </div>
          </>
        )}
        {/* <div className="cart__button">
          <img className="cart__icon" src={shoppingBagWhite} />
          <p className="cart__details">Continue Shopping</p>
        </div> */}
      </section>
    </>
  );
}

// export default Header;
