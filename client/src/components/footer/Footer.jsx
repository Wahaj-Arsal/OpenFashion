/** @format */

import "./Footer.scss";

import { Link } from "react-router-dom";

import twitter from "../../assets/icons/Twitter.svg";
import instagram from "../../assets/icons/Instagram.svg";
import youtube from "../../assets/icons/YouTube.svg";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer__icons">
          <Link
            to={{ pathname: "https://twitter.com/?lang=en" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__twitter" src={twitter} />
          </Link>
          <Link
            to={{ pathname: "https://www.instagram.com/?hl=en" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__instagram" src={instagram} />
          </Link>
          <Link
            to={{ pathname: "https://www.youtube.com" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__youtube" src={youtube} />
          </Link>
        </div>
        <div className="footer__details">
          <div className="footer__email">support@openfashion.co.uk</div>
          <div className="footer__phone">(+44) 546 478 1008</div>
          <div className="footer__times">08:00 - 22:00 - Everyday</div>
        </div>
        <div className="footer__links">
          <ul className="footer__ul">
            <li className="footer__li">About</li>
            <Link to="/contactus" className="footer__li-link">
              <li className="footer__li">Contact Us</li>
            </Link>
            <li className="footer__li">Blog</li>
          </ul>
        </div>
        <div className="footer__copyright">
          Copyright © OpenUI All Rights Reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
