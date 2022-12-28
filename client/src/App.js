/** @format */

import "./App.scss";

import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { CartProvider } from "./components/helper/CartContext.jsx";

import Header from "./components/header/Header.jsx";
import Home from "./pages/home/Home.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess.jsx";
import PaymentCancelled from "./pages/paymentCancelled/PaymentCancelled.jsx";
import ContactUs from "./pages/contactUs/ContactUs.jsx";
import StoreLocator from "./pages/storeLocator/StoreLocator.jsx";
import SendText from "./pages/sendText/SendText.jsx";
import Footer from "./components/footer/Footer.jsx";

const SERVER_KEY_URL = process.env.REACT_APP_SERVER_KEY;

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* <h1>Main</h1> */}
      <CartProvider>
        <Header SERVER_KEY_URL={SERVER_KEY_URL} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                SERVER_KEY_URL={SERVER_KEY_URL}
                setShow={setShow}
                show={show}
              />
            }
          />
          <Route
            path="/mens"
            exact
            element={
              <ProductsPage
                SERVER_KEY_URL={SERVER_KEY_URL}
                setShow={setShow}
                show={show}
              />
            }
          />
          <Route
            path="/mens/:mensId"
            exact
            element={
              <ProductDetails
                SERVER_KEY_URL={SERVER_KEY_URL}
                setShow={setShow}
                show={show}
              />
            }
          />
          <Route
            path="/womens"
            exact
            element={
              <ProductsPage
                SERVER_KEY_URL={SERVER_KEY_URL}
                setShow={setShow}
                show={show}
              />
            }
          />
          <Route
            path="/womens/:womensId"
            exact
            element={
              <ProductDetails
                SERVER_KEY_URL={SERVER_KEY_URL}
                setShow={setShow}
                show={show}
              />
            }
          />
          <Route path="/paymentsuccess" exact element={<PaymentSuccess />} />
          <Route
            path="/paymentcancelled"
            exact
            element={<PaymentCancelled />}
          />
          <Route path="/contactus" exact element={<ContactUs />} />
          {/* <Route
            path="/storelocator"
            exact
            element={<StoreLocator SERVER_KEY_URL={SERVER_KEY_URL} />}
          /> */}
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
