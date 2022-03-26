/** @format */

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import { Route, Routes, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      {/* <h1>App.js</h1>; */}
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
