/** @format */

import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Mens from "./pages/mens/Mens";
import ProductDetails from "./components/productDetails/ProductDetails";
import PaymentSuccess from "./components/paymentSuccess/PaymentSuccess";
import { CartProvider } from "./components/helper/CartContext";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

const API_URL_MENS_ALL = `http://localhost:8080/mens`;
const API_URL_MENS_SINGLE = (id) => `http://localhost:8080/mens/${id}`;

export default class App extends Component {
  render() {
    return (
      <>
        {/* <h1>Main</h1> */}
        <CartProvider>
          <Header props={this.props} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/mens"
              exact
              render={(routerProps) => <Mens {...routerProps} />}
            />
            <Route
              path="/mens/:mensId"
              exact
              render={(routerProps) => <ProductDetails {...routerProps} />}
            />
            <Route
              path="/paymentsuccess"
              exact
              render={(routerProps) => <PaymentSuccess {...routerProps} />}
            />

            {/* <Route element={<ProductDetails />} /> */}
            {/* <Route path="/womens" /> */}
            {/* <Route path="/womens/:womens" element={<ProductDetails />} /> */}
          </Switch>
        </CartProvider>
      </>
    );
  }
}
