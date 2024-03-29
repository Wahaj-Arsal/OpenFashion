/** @format */

import "./Home.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uniqid from "uniqid";

import openFashion from "../../assets/images/openfashion.svg";
import MensTile from "../../assets/images/mens-fashion.svg";
import WomensTile from "../../assets/images/womens-fashion.svg";
import KidsTile from "../../assets/images/kids-fashion.svg";
import Accessories from "../../assets/images/accessories.svg";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import NewsletterBanner from "../../components/newsletterBanner/newsletterBanner";
import NewsletterModal from "../../components/newsletterModal/NewsletterModal";

function Home({ SERVER_KEY_URL, setShow, show }) {
  const [mensLatest, setMensLatest] = useState([]);

  const mensLatestStartIndex = 0;
  const mensLatestNextIndex = 1;
  const mensLatestPreviousIndex = 2;

  const womensLatestStartIndex = 2;
  const womensLatestNextIndex = 3;
  const womensLatestPreviousIndex = 4;

  const kidsLatestStartIndex = 4;
  const kidsLatestNextIndex = 0;
  const kidsLatestPreviousIndex = 1;

  //Get ALL items from the API
  const getItemsMens = () => {
    axios.get(`${SERVER_KEY_URL}/mensLatest`).then((response) => {
      const mensLatest = response.data;
      setMensLatest(mensLatest);
    });
  };

  //Call function to get ALL items on page refresh
  useEffect(getItemsMens, []);

  return (
    <>
      {!mensLatest.length > 0 ? (
        <div className="loading">
          <p>Loading!!!!</p>
        </div>
      ) : (
        <>
          <section className="homepage">
            <ToastContainer />
            {/* ****** Mens Tile ****** */}
            <section className="tile-container">
              <div className="tile big">
                <div className="tile__card">
                  <img
                    className="tile__image"
                    src={openFashion}
                    alt="mens section"
                  />
                  <p className="tile__description top__tile">
                    OpenFashion <br /> An e-commerce website!
                  </p>
                </div>
              </div>
              <div className="tile small">
                <Link className="tile__text" to="/mens">
                  <div className="tile__card">
                    <img
                      className="tile__image"
                      src={MensTile}
                      alt="mens section"
                    />
                    <p className="tile__description">Men</p>
                  </div>
                </Link>
              </div>
              {/* ****** Womens Tile ****** */}
              <div className="tile small">
                <Link className="tile__text" to="/womens">
                  <div className="tile__card">
                    <img
                      className="tile__image"
                      src={WomensTile}
                      alt="womens section"
                    />
                    <p className="tile__description">Women</p>
                  </div>
                </Link>
              </div>
              {/* ****** Kids Tile ****** */}
              <div className="tile small">
                <Link className="tile__text" to="/">
                  <div className="tile__card tile__background-2022-trends">
                    <img
                      className="tile__image"
                      src={KidsTile}
                      alt="kids section"
                    />
                    <p className="tile__description">Kids</p>
                  </div>
                </Link>
              </div>
              {/* ****** Accessories Tile ****** */}
              <div className="tile small">
                <Link className="tile__text" to="/">
                  <div className="tile__card tile__background-2022-trends">
                    <img
                      className="tile__image"
                      src={Accessories}
                      alt="accessories section"
                    />
                    <p className="tile__description">Accessories</p>
                  </div>
                </Link>
              </div>
            </section>
            {/* ****** Mens Latest In Fashion ****** */}
            <section className="latest-container">
              <div className="latest">
                <h2 className="latest__title">Men's Latest in Fashion</h2>
                <p className="latest__description">
                  Details to details is what makes OpenFashion different from
                  other shops.
                </p>
              </div>
              <div className="slider-container">
                <ImageSlider
                  key={uniqid}
                  mensLatest={mensLatest}
                  startIndex={mensLatestStartIndex}
                  nextIndex={mensLatestNextIndex}
                  previousIndex={mensLatestPreviousIndex}
                />
              </div>
            </section>
            {/* ****** Womens Latest In Fashion ****** */}
            <section className="latest-container">
              <div className="latest">
                <h2 className="latest__title">Women's Latest in Fashion</h2>
                <p className="latest__description">
                  Details to details is what makes OpenFashion different from
                  other shops.
                </p>
              </div>
              <div className="slider-container">
                <ImageSlider
                  key={uniqid}
                  mensLatest={mensLatest}
                  startIndex={womensLatestStartIndex}
                  nextIndex={womensLatestNextIndex}
                  previousIndex={womensLatestPreviousIndex}
                />
              </div>
            </section>
            {/* ****** Kids Latest In Fashion ****** */}
            <section className="latest-container">
              <div className="latest">
                <h2 className="latest__title">Kids's Latest in Fashion</h2>
                <p className="latest__description">
                  Details to details is what makes OpenFashion different from
                  other shops.
                </p>
              </div>
              <div className="slider-container">
                <ImageSlider
                  key={uniqid}
                  mensLatest={mensLatest}
                  startIndex={kidsLatestStartIndex}
                  nextIndex={kidsLatestNextIndex}
                  previousIndex={kidsLatestPreviousIndex}
                />
              </div>
            </section>
            {/* ****** Explore our Products ****** */}
            <section className="explore-container">
              <h2 className="explore__title">Explore our Products</h2>
              <p className="explore__para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                auctor fringilla nulla ut tempor. Nullam lobortis nunc at justo
                porttitor pellentesque vitae a metus. Suspendisse lobortis lorem
                a nisl finibus mollis.
              </p>
              <br />
              <p className="explore__para">
                Cras non vulputate ante, eget posuere ligula. Donec molestie
                varius arcu vel cursus.
              </p>
              <br />
              <p className="explore__para">
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Maecenas in massa eget felis
                venenatis dictum. Nullam interdum dolor quam, tincidunt
                fringilla quam imperdiet et.
              </p>
              <br />
              <p className="explore__para">
                Quisque sit amet vehicula libero. Ut quam mi, mattis eu
                efficitur nec, bibendum vestibulum sem. Sed blandit lacus
                commodo, tincidunt sapien nec, varius magna.
              </p>
            </section>
          </section>
          <NewsletterBanner show={show} setShow={setShow} />
          <NewsletterModal show={show} setShow={setShow} />
        </>
      )}
    </>
  );
}

export default Home;
