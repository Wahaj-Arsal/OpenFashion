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
import logo from "../../assets/logo/logoWhite.svg";
import shoppingBagWhite from "../../assets/icons/shopping-bag-white.svg";
import down from "../../assets/icons/Down.svg";
import downWhite from "../../assets/icons/Down-white.svg";

import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripe = loadStripe(STRIPE_PUBLIC_KEY);

// HEADER COMPONENT START
export default function Header({ SERVER_KEY_URL }) {
  const [sideBar, setSideBar] = useState(false);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [dropdown, setDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);

  const showSidebar = () => setSideBar(!sideBar);
  const showShoppingCart = () => setShoppingCart(!shoppingCart);

  const hideSideBar = () => setSideBar(false);
  const hideCart = () => setShoppingCart(false);
  const hideDropdownMenu = () => setMenuDropdown(false);

  const fetchLocalStorage = () => {
    let cartGetItemFromLS = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    const cart = cartGetItemFromLS;
    setCart(cart);
    cartTotalPrice(cart);
    cartTotalNumberOfItems(cart);
  };

  useEffect(fetchLocalStorage, []);

  // Send cart information to the server for Stripe payment
  const purchaseItem = async () => {
    const cartItem = cart.map((item) => {
      return {
        name: item.name,
        description: item.description,
        amount: item.price,
        currency: "GBP",
        quantity: item.quantity,
      };
    });
    axios
      .post(`${SERVER_KEY_URL}/create-checkout-session`, { cartItem })
      .then((response) => {
        console.log(response);
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
    localStorage.setItem("item", JSON.stringify(filterItems));
    setCart(filterItems);
  };

  const quantityAdd = (e) => {
    e.preventDefault();
    const cartItem = e.target.parentElement.parentElement.parentElement;
    let getLocalStorage = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    const updatedCart = getLocalStorage.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage.setItem("item", JSON.stringify(updatedCart));
    setCart(updatedCart);
    cartTotalPrice(updatedCart);
  };

  const quantityMinus = (e) => {
    e.preventDefault();
    const cartItem = e.target.parentElement.parentElement.parentElement;
    let getLocalStorage = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    const updatedCart = getLocalStorage.map((item) => {
      if (item.id === cartItem.id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    localStorage.setItem("item", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const showContactUsBurger = () => {
    if (dropdown === false) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  const showContactUsMenu = () => {
    if (menuDropdown === false) {
      setMenuDropdown(true);
    } else {
      setMenuDropdown(false);
    }
  };

  // Map through the cart state and pull out items
  const cartReturnItem = cart.map((item) => {
    return (
      <CartItem
        key={item.id}
        item={item}
        removeCartItem={removeCartItem}
        quantityAdd={quantityAdd}
        quantityMinus={quantityMinus}
      />
    );
  });

  // Calculate the CART Total
  const cartTotalPrice = (cart) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice = totalPrice + cart[i].quantity * (cart[i].price / 100);
    }
    return totalPrice;
  };

  const cartTotalNumberOfItems = (cart) => {
    let totalItems = 0;
    for (let i = 0; i < cart.length; i++) {
      totalItems = totalItems + cart[i].quantity;
    }
    return totalItems;
  };

  return (
    <section className="header-container">
      <header
        className={shoppingCart ? "header body__scroll-disabled" : "header"}
        data-testid="test_header"
      >
        {/* <h1>Header</h1> */}
        <Link
          to="#"
          className="header__menu"
          onClick={showSidebar}
          data-testid="test_sidebar"
        >
          <img className="header__left" src={menuIcon} alt="header sidebar" />
        </Link>
        <div className="header__logo">
          <Link to="/">
            <img className="header__center" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="menu__right">
          <div className="menu">
            <ul className="menu__list">
              <li className="menu__list-item">
                <Link to="/mens" className="menu__list-link">
                  <p className="menu__list-text">Men</p>
                </Link>
              </li>
              <li className="menu__list-item">
                <Link to="/womens" className="menu__list-link">
                  <p className="menu__list-text">Women</p>
                </Link>
              </li>
              <li className="menu__list-item">
                <p className="menu__list-text">Kids</p>
              </li>
              <li className="menu__list-item">
                <p className="menu__list-text">Accessories</p>
              </li>
              <li className="menu__list-item">
                <div className="menu__dropdown" onClick={showContactUsMenu}>
                  <p className="menu__list-text">Contact Us</p>
                  <img
                    className={
                      menuDropdown == false
                        ? "menu__list-img"
                        : "menu__list-img menu__list-img--active"
                    }
                    src={downWhite}
                  />
                </div>
                <div className="menu-dropdown-container">
                  <div
                    className={
                      menuDropdown == false
                        ? "menu-dropdown__list"
                        : "menu-dropdown__list menu-dropdown__list--active"
                    }
                  >
                    <ul>
                      <Link
                        className="menu__list-link"
                        to="/storelocator"
                        onClick={hideDropdownMenu}
                      >
                        <li className="menu-dropdown__list-item">
                          Our Location
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="header__right">
            <Link to="#" onClick={showShoppingCart}>
              <img
                className="header__shopping-cart"
                src={shoppingBagWhite}
                alt="shopping cart"
                data-testid="cart__button"
              />
              <p
                className={
                  cart.length > 0
                    ? "header__right-total"
                    : "header__right-total header__right-total--empty"
                }
              >
                {cartTotalNumberOfItems(cart)}
              </p>
            </Link>
          </div>
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
            <p className="sidebar__list-text">Kids</p>
          </li>
          <li className="sidebar__list-item">
            <p className="sidebar__list-text">Accessories</p>
          </li>
          <li className="sidebar__sub-list-item">
            <div className="sidebar__dropdown" onClick={showContactUsBurger}>
              <p className="sidebar__list-text">Contact Us</p>
              <img
                className={
                  dropdown == false
                    ? "sidebar__list-img"
                    : "sidebar__list-img sidebar__list-img--active"
                }
                src={down}
              />
            </div>
            <ul
              className={
                dropdown == false
                  ? "dropdown__list"
                  : "dropdown__list dropdown__list--active"
              }
            >
              <Link
                className="sidebar__list-link"
                to="/storelocator"
                onClick={hideSideBar}
              >
                <li className="dropdown__list-item">Our Location</li>
              </Link>
            </ul>
          </li>
        </ul>
        {/* <div className="sidebar__bottom">
          <div className="sidebar__social">
            <img className="sidebar__twitter" src={twitter} alt="twitter" />
            <img
              className="sidebar__instagram"
              src={instagram}
              alt="instagram"
            />
            <img className="sidebar__youtube" src={youtube} alt="youtube" />
          </div>
        </div> */}
      </nav>
      <section className="cart-container">
        <div className={shoppingCart ? "cart cart--active" : "cart"}>
          <h3 className="cart__heading">Cart</h3>
          {cart.length > 0 ? (
            <>
              {cartReturnItem}
              <div className="cart__information">
                <div className="cart__total">
                  <>
                    <p className="cart__text">Sub Total</p>
                    <p className="cart__value">£{cartTotalPrice(cart)}</p>
                  </>
                  <>
                    <p className="cart__shipping">
                      *shipping charges, taxes and discounts codes are
                      calculated at the time of accounting.
                    </p>
                  </>
                </div>
                <button className="cart__button" onClick={purchaseItem}>
                  <img
                    className="cart__icon"
                    src={shoppingBagWhite}
                    alt="shopping bag"
                  />
                  <p className="cart__details">Checkout</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="cart-empty__status" test-dataid="empty__cart">
                You have no items in your Shopping Bag.
              </p>
              <button className="cart-empty__button">
                <img
                  className="cart-empty__icon"
                  src={shoppingBagWhite}
                  alt="shopping bag"
                />
                <p className="cart-empty__details" onClick={hideCart}>
                  Continue Shopping
                </p>
              </button>
            </>
          )}
        </div>
      </section>
    </section>
  );
}

// export default Header;
