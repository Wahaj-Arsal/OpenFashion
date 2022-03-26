/** @format */

import "./Header.scss";

import menuIcon from "../../assets/icons/Menu.svg";
import logo from "../../assets/logo/logo.svg";
import search from "../../assets/icons/Search.svg";
import shoppingBag from "../../assets/icons/shopping-bag.svg";

const Header = () => {
  return (
    <header className="header">
      {/* <h1>Header</h1> */}
      <div className="header__menu">
        <img className="header__left" src={menuIcon} />
      </div>
      <div className="header__logo">
        <img className="header__center" src={logo} />
      </div>
      <div className="header__right">
        <img className="header__search" src={search} />
        <img className="header__shopping-cart" src={shoppingBag} />
      </div>
    </header>
  );
};

export default Header;
