/** @format */

import "./Home.scss";

import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home" data-testid="home">
        <h1 className="home__title">HOME</h1>
      </div>
      <div className="tile">
        <Link className="tile__text" to="/mens">
          <div className="tile__card tile__background-men">
            <p className="tile__description">Men's Collection 2021</p>
          </div>
        </Link>
      </div>
      <div className="tile">
        <Link className="tile__text" to="/womens">
          <div className="tile__card tile__background-women">
            <p className="tile__description">Women's Collection 2021</p>
          </div>
        </Link>
      </div>
      <div className="tile">
        <Link className="tile__text" to="/">
          <div className="tile__card tile__background-2022-trends">
            <p className="tile__description">
              2021 style guide: the biggest fall trends
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
