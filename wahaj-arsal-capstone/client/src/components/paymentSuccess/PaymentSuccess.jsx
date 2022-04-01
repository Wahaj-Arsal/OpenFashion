/** @format */

import "./PaymentSuccess.scss";
import paymentSuccess from "../../assets/icons/paymentsuccess.svg";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="success">
      <h1 className="success__heading">Payment Success</h1>
      <img className="success__image" src={paymentSuccess} />
      <Link className="success__link" to="/">
        <button className="success__button">Back To Home</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
