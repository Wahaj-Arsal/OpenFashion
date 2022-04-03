/** @format */

import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Mens from "./pages/mens/Mens";
import ProductDetails from "./pages/productDetails/ProductDetails";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import PaymentCancelled from "./pages/paymentCancelled/PaymentCancelled";
import ContactUs from "./pages/contactUs/ContactUs";
import StoreLocator from "./pages/storeLocator/StoreLocator";
import SendText from "./pages/sendText/SendText";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./components/helper/CartContext";

const SERVER_KEY_URL = process.env.REACT_APP_SERVER_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

export default class App extends Component {
  render() {
    return (
      <>
        {/* <h1>Main</h1> */}
        <CartProvider>
          <Header props={this.props} SERVER_KEY_URL={SERVER_KEY_URL} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/mens"
              exact
              render={(routerProps) => (
                <Mens {...routerProps} SERVER_KEY_URL={SERVER_KEY_URL} />
              )}
            />
            <Route
              path="/mens/:mensId"
              exact
              render={(routerProps) => (
                <ProductDetails
                  {...routerProps}
                  SERVER_KEY_URL={SERVER_KEY_URL}
                />
              )}
            />
            <Route
              path="/womens"
              exact
              render={(routerProps) => (
                <Mens {...routerProps} SERVER_KEY_URL={SERVER_KEY_URL} />
              )}
            />
            <Route
              path="/womens/:mensId"
              exact
              render={(routerProps) => (
                <ProductDetails
                  {...routerProps}
                  SERVER_KEY_URL={SERVER_KEY_URL}
                />
              )}
            />
            <Route
              path="/paymentsuccess"
              exact
              render={(routerProps) => <PaymentSuccess {...routerProps} />}
            />
            <Route
              path="/paymentcancelled"
              exact
              render={(routerProps) => <PaymentCancelled {...routerProps} />}
            />
            <Route
              path="/contactus"
              exact
              render={(routerProps) => <ContactUs {...routerProps} />}
            />
            <Route
              path="/storelocator"
              exact
              render={(routerProps) => (
                <StoreLocator
                  {...routerProps}
                  SERVER_KEY_URL={SERVER_KEY_URL}
                />
              )}
            />
            <Route
              path="/sendtext"
              exact
              render={(routerProps) => (
                <SendText {...routerProps} SERVER_KEY_URL={SERVER_KEY_URL} />
              )}
            />
            {/* <Route element={<ProductDetails />} /> */}
            {/* <Route path="/womens" /> */}
            {/* <Route path="/womens/:womens" element={<ProductDetails />} /> */}
          </Switch>
          <Footer />
        </CartProvider>
      </>
    );
  }
}
