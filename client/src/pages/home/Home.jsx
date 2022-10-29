/** @format */

import "./Home.scss";

import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";

import MensTile from "../../assets/images/mens-fashion.svg";
import WomensTile from "../../assets/images/womens-fashion.svg";
import ImageSlider from "../../components/imageSlider/ImageSlider";

const REACT_APP_EMAIL_SERVICE_ID = process.env.REACT_APP_EMAIL_SERVICE_ID;
const REACT_APP_EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
const REACT_APP_EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

function Home({ SERVER_KEY_URL }) {
  const [mensLatest, setMensLatest] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mensLatestImageIndex = 1;
  const womensLatestImageIndex = 0;
  const kidsLatestImageIndex = 2;

  const form = useRef();

  // const location = useLocation();

  //Get ALL items from the API
  const getItemsMens = () => {
    axios.get(`${SERVER_KEY_URL}/mensLatest`).then((response) => {
      const mensLatest = response.data;
      setMensLatest(mensLatest);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else {
      setEmail(value);
    }
  };

  const sendToServer = (e) => {
    e.preventDefault();
    // const clientInformation = {
    //   name: name,
    //   email: email,
    // };
    console.log(name);
    console.log(email);
    emailjs
      .sendForm(
        `service_o7jcgoh`,
        `template_kyxim88`,
        form.current,
        `rWH357N27s5qA9N-M`
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  //Call function to get ALL items on page refresh
  useEffect(getItemsMens, []);

  // console.log(location.pathname);

  return (
    <>
      {!mensLatest.length > 0 ? (
        <div className="loading">
          <p>Loading!!!!</p>
        </div>
      ) : (
        <>
          <section>
            <div className="home" data-testid="home">
              <h1 className="home__title">HOME</h1>
            </div>
            {/* ****** Mens Tile ****** */}
            <div className="tile">
              <Link className="tile__text" to="/mens">
                <div className="tile__card">
                  <img className="tile__image" src={MensTile} />
                  <p className="tile__description">Men</p>
                </div>
              </Link>
            </div>
            {/* ****** Womens Tile ****** */}
            <div className="tile">
              <Link className="tile__text" to="/womens">
                <div className="tile__card">
                  <img className="tile__image" src={WomensTile} />
                  <p className="tile__description">Women</p>
                </div>
              </Link>
            </div>
            {/* ****** Kids Tile ****** */}
            <div className="tile">
              <Link className="tile__text" to="/">
                <div className="tile__card tile__background-2022-trends">
                  <img className="tile__image" src={MensTile} />
                  <p className="tile__description">Kids</p>
                </div>
              </Link>
            </div>
            {/* ****** Accessories Tile ****** */}
            <div className="tile">
              <Link className="tile__text" to="/">
                <div className="tile__card tile__background-2022-trends">
                  <img className="tile__image" src={MensTile} />
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
                mensLatest={mensLatest}
                index={mensLatestImageIndex}
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
                mensLatest={mensLatest}
                index={womensLatestImageIndex}
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
                mensLatest={mensLatest}
                index={kidsLatestImageIndex}
              />
            </div>
          </section>
          {/* ****** Explore our Products ****** */}
          <section className="explore-container">
            <h2 className="explore__title">Explore our Products</h2>
            <p className="explore__para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              auctor fringilla nulla ut tempor. Nullam lobortis nunc at justo
              porttitor pellentesque vitae a metus. Suspendisse lobortis lorem a
              nisl finibus mollis.
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
              venenatis dictum. Nullam interdum dolor quam, tincidunt fringilla
              quam imperdiet et.
            </p>
            <br />
            <p className="explore__para">
              Quisque sit amet vehicula libero. Ut quam mi, mattis eu efficitur
              nec, bibendum vestibulum sem. Sed blandit lacus commodo, tincidunt
              sapien nec, varius magna.
            </p>
          </section>
          {/* ****** Newsletter ****** */}
          <form ref={form} className="newsletter" onSubmit={sendToServer}>
            <h3 className="newsletter__title">
              By Subscribing To Our Newsletter You Can Get 30% Off!
            </h3>
            <input
              id="name"
              className="newsletter__input"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
            />
            <input
              id="email"
              className="newsletter__input"
              name="email"
              placeholder="Your Email Address"
              onChange={handleChange}
            />
            <input type="submit" value="Send" className="newsletter__send" />
          </form>
        </>
      )}
    </>
  );
}

export default Home;
