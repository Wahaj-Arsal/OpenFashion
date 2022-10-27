/** @format */

import "./PaymentCancelled.scss";
import paymentCancelled from "../../assets/images/cancelled.jpg";
import { Link } from "react-router-dom";
import React from "react";

const PaymentCancelled = () => {
  return (
    <div className="cancelled" data-testid="paymentCancelled">
      <h1 className="cancelled__heading">Payment cancelled</h1>
      <img
        className="cancelled__image"
        src={paymentCancelled}
        alt="payment cancelled"
      />
      <Link className="cancelled__link" to="/">
        <button className="cancelled__button">Back To Home</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
