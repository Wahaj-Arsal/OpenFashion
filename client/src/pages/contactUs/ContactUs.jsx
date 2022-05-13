/** @format */

import "./ContactUs.scss";

import location from "../../assets/icons/Location.svg";
import sms from "../../assets/icons/Sms.svg";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <>
      <h3 className="contactus__title">Contact Us</h3>
      <div className="store-finder">
        <img src={location} alt="Location Icon" className="store-finder__img" />
        <p className="store-finder__text">Come find us in store!</p>
        <Link to="/storelocator">
          <button className="store-finder__button">Store Locator</button>
        </Link>
      </div>
      <div className="sms">
        <img src={sms} alt="SMS Icon" className="sms__img" />
        <p className="sms__text">
          Urgent question? <br></br> Then send us a text!
        </p>
        <p className="sms__text-reply">
          ... we'll get back to you at our convenience.
        </p>
        <Link to="/sendtext">
          <button className="sms__button">Send a Text</button>
        </Link>
      </div>
    </>
  );
}

export default ContactUs;
