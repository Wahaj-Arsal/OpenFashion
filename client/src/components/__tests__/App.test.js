/** @format */

import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { render, screen, cleanup } from "@testing-library/react";

import Home from "../../pages/home/Home";
import Mens from "../../pages/mens/Mens";
// import ProductDetails from "../../pages/productDetails/ProductDetails";
// import PaymentSuccess from "../../pages/paymentSuccess/PaymentSuccess";
// import PaymentCancelled from "../../pages/paymentCancelled/PaymentCancelled";
// import ContactUs from "../../pages/contactUs/ContactUs";
// import StoreLocator from "../../pages/storeLocator/StoreLocator";

test("should render Home Page Component", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeInTheDocument();
});

test("should render Mens Page Component", () => {
  render(
    <BrowserRouter>
      <Mens />
    </BrowserRouter>
  );
  const homeElement = screen.getByTestId("mens");
  expect(homeElement).toBeInTheDocument();
});

// test("should render Product Details Page Component", () => {
//   render(
//     <BrowserRouter>
//       <ProductDetails />
//     </BrowserRouter>
//   );
//   const homeElement = screen.getByTestId("productDetails");
//   expect(homeElement).toBeInTheDocument();
// });

// test("should render Payment Success Page Component", () => {
//   render(
//     <BrowserRouter>
//       <PaymentSuccess />
//     </BrowserRouter>
//   );
//   const homeElement = screen.getByTestId("paymentSuccess");
//   expect(homeElement).toBeInTheDocument();
// });

// test("should render Payment Cancelled Page Component", () => {
//   render(
//     <BrowserRouter>
//       <PaymentCancelled />
//     </BrowserRouter>
//   );
//   const homeElement = screen.getByTestId("paymentCancelled");
//   expect(homeElement).toBeInTheDocument();
// });

// test("should render Contact Us Page Component", () => {
//   render(
//     <BrowserRouter>
//       <ContactUs />
//     </BrowserRouter>
//   );
//   const homeElement = screen.getByTestId("contactUs");
//   expect(homeElement).toBeInTheDocument();
// });

// test("should render Store Locator Page Component", () => {
//   render(
//     <BrowserRouter>
//       <StoreLocator />
//     </BrowserRouter>
//   );
//   const homeElement = screen.getByTestId("storeLocator");
//   expect(homeElement).toBeInTheDocument();
// });
