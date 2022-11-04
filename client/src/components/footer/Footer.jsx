/** @format */

import "./Footer.scss";

import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo/logoWhite.svg";
import twitter from "../../assets/icons/Twitter.svg";
import instagram from "../../assets/icons/Instagram.svg";
import youtube from "../../assets/icons/YouTube.svg";

function Footer() {
  const location = useLocation();

  const scrollToTheTop = () => {
    if (location === "/") {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      window.location = "/";
    }
  };

  return (
    <>
      <div className="footer">
        <div className="footer__contact">
          <div onClick={scrollToTheTop}>
            <img src={logo} alt="" className="footer__logo" />
          </div>
          <div className="footer__email">support@openfashion.co.uk</div>
          <div className="footer__phone">(+44) 546 478 1008</div>
          <div className="footer__times">08:00 - 22:00 - Everyday</div>
        </div>
        <div className="footer-categories">
          <h3 className="footer__heading">Shopping & Categories</h3>
          <ul className="footer__ul">
            <Link to="/mens" className="footer__li-link">
              <li className="footer__li">Men's Shopping</li>
            </Link>
            <Link to="/womens" className="footer__li-link">
              <li className="footer__li">Women's Shopping</li>
            </Link>
            <Link to="/kids" className="footer__li-link">
              <li className="footer__li">Kid's Shopping</li>
            </Link>
            <li className="footer__li">Accessories Shopping</li>
          </ul>
        </div>
        <div className="footer__links">
          <h3 className="footer__heading">Useful Links</h3>
          <ul className="footer__ul">
            <li className="footer__li">About</li>
            <Link to="/contactus" className="footer__li-link">
              <li className="footer__li">Contact Us</li>
            </Link>
            <li className="footer__li">Blog</li>
          </ul>
        </div>
        <div className="footer__social">
          <Link
            to={{ pathname: "https://twitter.com/" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__icons" src={twitter} alt="twitterIcon" />
          </Link>
          <Link
            to={{ pathname: "https://www.instagram.com/" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer__icons"
              src={instagram}
              alt="instagramIcon"
            />
          </Link>
          <Link
            to={{ pathname: "https://www.youtube.com" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__icons" src={youtube} alt="youtubeIcon" />
          </Link>
        </div>
        <div className="footer__copyright">
          Copyright © OpenUI All Rights Reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
