/** @format */

import "./page404Error.scss";

import { Link } from "react-router-dom";

const Page404Error = () => {
  return (
    <section className="error404-container">
      <div className="error404__text">
        <h1 className="error404__heading">Uh oh, something broke.</h1>
        <h3 className="error404__subheading">Error 404 - Page Not Found</h3>
      </div>
      <div className="error404__gif">
        <iframe
          src="https://giphy.com/embed/HZzy7KcOoRpBe"
          width="280"
          height="480"
          frameBorder="0"
          // className="giphy-embed "
          // allowFullScreen
        ></iframe>
      </div>
      <Link to="/">
        <button type="button" className="error404__button">
          Back to Home
        </button>
      </Link>
    </section>
  );
};

export default Page404Error;
