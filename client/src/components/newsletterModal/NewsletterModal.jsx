/** @format */

import "./NewsletterModal.scss";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

const NewsletterModal = ({ show, setShow }) => {
  const [customerName, setCustomerName] = useState([]);
  const [customerEmail, setCustomerEmail] = useState([]);

  const [newsletterName, setNewsletterName] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState(true);

  const handleChangeName = ({ target: { customerName, value } }) => {
    setCustomerName(value);
  };

  const handleChangeEmail = ({ target: { customerEmail, value } }) => {
    setCustomerEmail(value);
  };

  //grabs the reference for the form
  const form = useRef();

  const validateForm = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setNewsletterName(true);
    setNewsletterEmail(true);
    if (customerName.length === 0 && customerEmail.length === 0) {
      setNewsletterName(false);
      setNewsletterEmail(false);
      toastify(`Please - Enter your Name & Email`);
      return false;
    } else if (customerName.length === 0) {
      setNewsletterName(false);
      toastify(`Please - Enter your Name`);
      return false;
    } else if (customerEmail.length === 0) {
      setNewsletterEmail(false);
      toastify(`Please - Enter your Email`);
    } else {
      if (customerEmail.match(validRegex)) {
        return true;
      } else {
        toastify(`Please - Enter valid Email`);
        setNewsletterEmail(false);
        return false;
      }
    }
  };

  const checkValidateStatus = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendToServer();
    }
  };

  const sendToServer = () => {
    emailjs
      .sendForm(
        `${EMAIL_SERVICE_ID}`,
        `${EMAIL_TEMPLATE_ID}`,
        form.current,
        `${EMAIL_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          toastify(`${result} - Newsletter Email Sent!`);
        },
        (error) => {
          toastify(`Error! - ${error}`);
        }
      );
  };

  const toastify = (text) => {
    toast(text);
  };

  return (
    <section
      className={
        show === false ? "newsletter-container" : "newsletter-container--active"
      }
    >
      <form
        ref={form}
        // className={show === false ? "newsletter" : "newsletter--active"}
        className="newsletter"
        onSubmit={checkValidateStatus}
      >
        <div className="newsletter__heading">
          <h3 className="newsletter__title">
            By Subscribing To Our Newsletter You Can Get 15% Off!
          </h3>
          <button
            type="reset"
            onClick={() => setShow(false)}
            className="newsletter__button"
          >
            x
          </button>
        </div>
        <div className="newsletter__fields">
          <input
            id="name"
            className={
              !newsletterName == false
                ? "newsletter__input"
                : "newsletter__input--false"
            }
            name="name"
            placeholder="Your Name"
            onChange={handleChangeName}
          />
          <input
            id="from_email"
            className={
              !newsletterEmail == false
                ? "newsletter__input"
                : "newsletter__input--false"
            }
            name="from_email"
            placeholder="Your Email Address"
            onChange={handleChangeEmail}
          />
        </div>
        <div className="newsletter__send">
          <input type="submit" value="Send" className="send__button" />
        </div>
      </form>
    </section>
  );
};

export default NewsletterModal;
