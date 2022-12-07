/** @format */

import "./newsletterBanner.scss";

function NewsletterBanner({ setShow }) {
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
          <button onClick={() => setShow(true)} className="banner__button">
            Sign Up Here
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBanner;
