/** @format */

import { Link } from "react-router-dom";
import "./newsletterBanner.scss";

function NewsletterBanner() {
  return (
    <section className="banner-container">
      <div className="banner">
        <div className="banner__heading">Join our Community</div>
        <div className="banner__info">
          <div className="banner__text">
            Sign up to our mailing list and head about our latest offers and
            products, plus enjoy £25 off your next order over £250. Offer Terms
            & Conditions apply.
          </div>
          <Link to="/newsletter">
            <button className="banner__button">Sign Up Here</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBanner;
