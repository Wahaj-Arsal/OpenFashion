/** @format */

import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Mens from "./pages/mens/Mens";
import ProductDetails from "./components/productDetails/ProductDetails";
import { CartProvider } from "./components/helper/CartContext";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

const API_URL_MENS_ALL = `http://localhost:8080/mens`;
const API_URL_MENS_SINGLE = (id) => `http://localhost:8080/mens/${id}`;

export default class App extends Component {
  state = {
    mens: [],
    currentItem: [],
    cartState: [],
    cartGetItem: [],
  };

  componentDidMount() {
    this.getItemsMens();
    // this.getItemWomen();
  }

  // getItem = async () => {
  // console.log(this.props);
  // let currentId = this.props.match.params.mensId;
  // const getMenSingleItem = await axios.get(API_URL_MENS_SINGLE(currentId));
  // this.setState({
  //   currentItem: getMenSingleItem.data,
  // });
  // };

  getItemsMens = async () => {
    const getAllMens = await axios.get(API_URL_MENS_ALL);
    this.setState({
      mens: getAllMens.data,
    });
    // console.log(this.state.mens);
  };

  // addToCart = (e) => {
  //   e.preventDefault();
  //   let cartItems = localStorage.getItem("item")
  //     ? JSON.parse(localStorage.getItem("item"))
  //     : [];
  //   cartItems.push();
  //   localStorage.setItem("item", JSON.stringify(cartItems));
  // };

  // cartRender = () => {
  //   let cartGetItem = localStorage.getItem("item")
  //     ? JSON.parse(localStorage.getItem("item"))
  //     : [];
  //   this.setState({
  //     cartGetItem: cartGetItem,
  //   });
  // };

  render() {
    // console.log(this.state.mens);
    const { mens } = this.state;
    return (
      <>
        {/* <h1>Main</h1> */}
        <CartProvider>
          <Header props={this.props} />
          <Switch>
            <Route
              path="/home"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/mens"
              exact
              render={(routerProps) => (
                <Mens {...routerProps} mens={mens} getItem={this.getItem} />
              )}
            />
            <Route
              path="/mens/:mensId"
              exact
              render={(routerProps) => (
                <ProductDetails {...routerProps} addToCart={this.addToCart} />
              )}
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
