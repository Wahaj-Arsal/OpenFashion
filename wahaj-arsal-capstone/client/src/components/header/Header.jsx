/** @format */

// IMPORT FROM LIBRARIES
import { useState } from "react";
import { Link } from "react-router-dom";

// IMPORT LOCAL FILES
import "./Header.scss";

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

// HEADER COMPONENT
const Header = () => {
  const [sidebar, setSideBar] = useState(false);

  const showSideBar = (e) => {
    e.preventDefault();
    setSideBar(!sidebar);
  };

  return (
    <>
      <header className="header">
        {/* <h1>Header</h1> */}
        <Link to="#" className="header__menu" onClick={showSideBar}>
          <img className="header__left" src={menuIcon} />
        </Link>
        <div className="header__logo">
          <img className="header__center" src={logo} />
        </div>
        <div className="header__right">
          <img className="header__search" src={search} />
          <img className="header__shopping-cart" src={shoppingBag} />
        </div>
      </header>
      <nav className={sidebar ? "sidebar sidebar--active" : "sidebar"}>
        <ul className="sidebar__list">
          <li className="sidebar__list-item">
            <Link to="#" className="sidebar__list-link">
              <p className="sidebar__list-text">Men</p>
            </Link>
          </li>
          <li className="sidebar__list-item">
            <Link to="#" className="sidebar__list-link">
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
    </>
  );
};

export default Header;
