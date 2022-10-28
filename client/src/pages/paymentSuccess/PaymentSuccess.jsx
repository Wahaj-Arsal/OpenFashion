/** @format */

import "./PaymentSuccess.scss";

import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";

import { CartContext } from "../../components/helper/CartContext";
import paymentSuccess from "../../assets/icons/paymentsuccess.svg";

const PaymentSuccess = () => {
  const [cart, setCart] = useContext(CartContext);

  const resetCart = () => {
    setCart([]);
  };
  const removeFromLocalStorage = () => {
    const filter = [];
    localStorage.setItem("item", JSON.stringify(filter));
  };

  useEffect(resetCart, []);
  useEffect(removeFromLocalStorage, []);

  return (
    <div className="success" data-testid="paymentSuccess">
      <h1 className="success__heading">Payment Success</h1>
      <img
        className="success__image"
        src={paymentSuccess}
        alt="payment success"
      />
      <Link className="success__link" to="/">
        <button className="success__button">Back To Home</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
