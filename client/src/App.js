/** @format */

import { Route, Routes } from "react-router-dom";
import React from "react";

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

export default function App() {
  return (
    <>
      {/* <h1>Main</h1> */}
      <CartProvider>
        <Header SERVER_KEY_URL={SERVER_KEY_URL} />
        <Routes>
          <Route
            path="/"
            exact
            element={<Home SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
          <Route
            path="/mens"
            exact
            element={<Mens SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
          <Route
            path="/mens/:mensId"
            exact
            element={<ProductDetails SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
          <Route
            path="/womens"
            exact
            element={<Mens SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
          <Route
            path="/womens/:mensId"
            exact
            element={<ProductDetails SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
          <Route path="/paymentsuccess" exact element={<PaymentSuccess />} />
          <Route
            path="/paymentcancelled"
            exact
            element={<PaymentCancelled />}
          />
          <Route path="/contactus" exact element={<ContactUs />} />
          <Route
            path="/storelocator"
            exact
            element={<StoreLocator SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
          <Route
            path="/sendtext"
            exact
            element={<SendText SERVER_KEY_URL={SERVER_KEY_URL} />}
          />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}
