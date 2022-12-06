/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// IMPORT LOCAL FILES & COMPONENTS
import "./ProductDetails.scss";
import CommentsDispaly from "../../components/commentsDisplay/CommentsDisplay";
import { CartContext } from "../../components/helper/CartContext";

// IMPORT ASSETS
import exportIcon from "../../assets/icons/Export.svg";
import plus from "../../assets/icons/Plus-white.svg";
import heart from "../../assets/icons/Heart-white.svg";
import doNotBleach from "../../assets/icons/Do-Not-Bleach.svg";
import doNotTumbleDry from "../../assets/icons/Do-Not-Tumble-Dry.svg";
import doNotWash from "../../assets/icons/Do-Not-Wash.svg";
import doNotIron from "../../assets/icons/Iron-Low-Temperature.svg";
import leafFull from "../../assets/icons/leaf-g.png";
import leafEmpty from "../../assets/icons/leaf-b.png";
import NewsletterBanner from "../../components/newsletterBanner/newsletterBanner";
import arrowUp from "../../assets/icons/Up.svg";

const ProductDetails = ({ SERVER_KEY_URL }) => {
  const API_URL_MENS_SINGLE = (id) => `${SERVER_KEY_URL}${id}`;
  const API_URL_ID_COMMENTS = (id) => `${SERVER_KEY_URL}${id}/reviews`;

  const location = useLocation();
  const url = location.pathname;

  //STATES FOR POSTING COMMENT
  const [customerName, setCustomerName] = useState([]);
  const [customerComment, setCustomerComment] = useState([]);

  const [cart, setCart] = useContext(CartContext);
  const [productDetails, setProductDetails] = useState([]);

  const [className, setClassName] = useState(true);
  const [classComment, setClassComment] = useState(true);

  const [faq, setFaq] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const showFAQTile = () => {
    if (faq === false) {
      setFaq(true);
    } else {
      setFaq(false);
    }
  };

  const showCommentsTile = () => {
    if (reviews === false) {
      setReviews(true);
    } else {
      setReviews(false);
    }
  };

  const showDeliveryTile = () => {
    if (delivery === false) {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  };

  const fetchData = () => {
    axios.get(API_URL_MENS_SINGLE(url)).then((response) => {
      const productDetails = response.data;
      setProductDetails(productDetails);
    });
  };

  useEffect(fetchData, []);

  const { id, name, description, price, sustainability } = productDetails;
  const { care, materials } = { ...productDetails.additional };
  const { bleach, iron, tumble, washing } = { ...productDetails.instructions };

  const addToCart = (e) => {
    e.preventDefault();
    let cartItems = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    const existingItem = cartItems.findIndex((item) => item.id === id);
    if (existingItem === -1) {
      cartItems.push(productDetails);
      localStorage.setItem("item", JSON.stringify(cartItems));
      setCart(cartItems);
    }
  };

  const handleChangeName = ({ target: { customerName, value } }) => {
    setCustomerName(value);
  };
  const handleChangeReview = ({ target: { customerComment, value } }) => {
    setCustomerComment(value);
  };

  //******** Comment Validation ******** */
  const validate = () => {
    if (customerName.length === 0 || customerComment.length === 0) {
      setClassName(false);
      setClassComment(false);
      return false;
    } else {
      return true;
    }
  };

  const validationStatus = () => {
    if (validate()) {
      postComment();
    }
  };

  //******** API Call To Post A Comment ******** */
  // Posts A Comment To The Video
  const postComment = async () => {
    const newComment = {
      name: customerName,
      comment: customerComment,
    };
    await axios.post(API_URL_ID_COMMENTS(url), newComment).then((response) => {
      if (response.status === 200) {
        setTimeout(() => {
          fetchData();
        }, 500);
      }
    });
  };

  const totalSustain = 5;
  const sustainReturn = [...Array(totalSustain)].map((sus, index) => {
    return (
      <img
        key={index}
        className="product__count"
        src={index + 1 <= sustainability ? leafFull : leafEmpty}
        alt="sustainability rating"
      />
    );
  });

  //******** Function To Humanise Comment Times ******** */
  const newMoment = (commentDate) => {
    let x = new moment(commentDate);
    let y = new moment();
    let duration = moment.duration(-y.diff(x)).humanize(true);
    return duration;
  };

  return (
    <>
      {!bleach && !iron && !tumble && !washing ? (
        <p>Loading...</p>
      ) : (
        <section className="details" data-testid="productDetails">
          <div className="product">
            <img
              src={require(`../../assets/images/${productDetails.image}`)}
              alt="product"
              className="product__img"
            />
            <div className="product__details">
              <div className="product__heading">
                <h1 className="product__title">{name}</h1>
                <img src={exportIcon} alt="" className="product__icon" />
              </div>
              <p className="product__description">{description}</p>
              <p className="product__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Consequat ac felis donec et. Netus et malesuada fames ac turpis
                egestas. Enim blandit volutpat maecenas volutpat blandit aliquam
                etiam. Quis auctor elit sed vulputate.
              </p>
              <div className="product__info">
                <p className="product__price">£{price / 100}</p>
                <div className="product__sustain">{sustainReturn}</div>
              </div>
              <button className="button" onClick={addToCart}>
                <div className="button__add">
                  <img className="button__plus" src={plus} alt="plus button" />
                  <p className="button__text">Add to Basket</p>
                </div>
                <div className="button__icon">
                  <img className="button__heart" src={heart} alt="heart" />
                </div>
              </button>
            </div>
          </div>
          <div className="details__details">
            {/* <div className="details__heading">
              <h1 className="details__title">{name}</h1>
              <img src={exportIcon} alt="" className="details__icon" />
            </div>
            <p className="details__description">{description}</p>
            <div className="details__info">
              <p className="details__price">£{price / 100}</p>
              <div className="details__sustain">{sustainReturn}</div>
            </div> */}
            {/* <button className="button" onClick={addToCart}>
              <div className="button__add">
                <img className="button__plus" src={plus} alt="plus button" />
                <p className="button__text">Add to Basket</p>
              </div>
              <div className="button__icon">
                <img className="button__heart" src={heart} alt="heart" />
              </div>
            </button> */}
            <div className="materials__materials">
              <h2 className="materials__title">Materials</h2>
              <p className="materials__text">{materials}</p>
            </div>
            <div className="materials__care">
              <h2 className="materials__title">Care</h2>
              <p className="materials__text">{care}</p>
              <div className="materials__bleach">
                <img src={doNotBleach} alt="do no bleach" />
                <p>{bleach.text}</p>
              </div>
              <div className="materials__tumble">
                <img src={doNotTumbleDry} alt="do not tumble dry" />
                <p>{tumble.text}</p>
              </div>
              <div className="materials__washing">
                <img src={doNotWash} alt="do not wash" />
                <p>{washing.text}</p>
              </div>
              <div className="materials__iron">
                <img src={doNotIron} alt="do not iron" />
                <p>{iron.text}</p>
              </div>
            </div>
          </div>
          <section className="product__tile-container">
            <section className="comments-container">
              <div className="comments">
                <div className="comments__tile" onClick={showCommentsTile}>
                  <h3 className="comments__title">Reviews's</h3>
                  <img
                    className={
                      reviews === false
                        ? "comments__icon"
                        : "comments__icon comments__icon--active"
                    }
                    src={arrowUp}
                    alt="open or close Comments's"
                  />
                </div>
                <div
                  className={
                    reviews === false
                      ? "comments__list"
                      : "comments__list comments__list--active"
                  }
                >
                  <div className="comments__input">
                    <div className="comments__name">
                      <h2 className="comments__name-title">Name:</h2>
                      <input
                        className={`${
                          !className
                            ? "comments__name-input comments__name-input--error"
                            : "comments__name-input"
                        }`}
                        name="customerName"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleChangeName}
                      />
                    </div>
                    <div className="comments__comment">
                      <h2 className="comments__comment-title">
                        Leave a review:
                      </h2>
                      <textarea
                        className={`${
                          !classComment
                            ? "comments__comment-input comments__comment-input--error"
                            : "comments__comment-input"
                        }`}
                        name="customerComment"
                        type="text"
                        placeholder="Enter your review"
                        onChange={handleChangeReview}
                      />
                    </div>
                  </div>
                  <div className="submit-container">
                    <button
                      className="comments__submit"
                      onClick={validationStatus}
                    >
                      Post Review
                    </button>
                  </div>
                  {productDetails.reviews.length > 0 &&
                    productDetails.reviews.map((reviews) => {
                      return (
                        <CommentsDispaly
                          key={reviews.id}
                          reviews={reviews}
                          newMoment={newMoment}
                        />
                      );
                    })}
                </div>
              </div>
            </section>
            <section className="faq-container">
              <div className="faq">
                <div className="faq__tile" onClick={showFAQTile}>
                  <div className="faq__title">FAQ's</div>
                  <img
                    className={
                      faq === false
                        ? "faq__icon"
                        : "faq__icon faq__icon--active"
                    }
                    src={arrowUp}
                    alt="open or close FAQ's"
                  />
                </div>
                <div
                  className={
                    faq === false
                      ? "faq__details"
                      : "faq__details faq__details--active"
                  }
                >
                  <div className="faq__questions">Where is my order?</div>
                  <div className="faq__answers">
                    You can track your order online; to do this you will need
                    the email address used to place your order and your order
                    number. Your order number can be found in your order
                    confirmation email and normally starts with OPN.
                  </div>
                  <div className="faq__questions">
                    How do I enter my promotion code?
                  </div>
                  <div className="faq__answers">
                    Sorry, we currently do no support this feature online... or
                    in-store. Discounted items are tagged on the website.
                  </div>
                  <div className="faq__questions">
                    Where can I find information on sizing?
                  </div>
                  <div className="faq__answers">
                    Please refer to the standard online size guides.
                  </div>
                </div>
              </div>
            </section>
            <section className="delivery-container">
              <div className="delivery">
                <div className="delivery__tile" onClick={showDeliveryTile}>
                  <div className="delivery__title">Delivery/Returns</div>
                  <img
                    className={
                      delivery === false
                        ? "delivery__icon"
                        : "delivery__icon delivery__icon--active"
                    }
                    src={arrowUp}
                    alt="open or close delivery's tile"
                  />
                </div>
                <div
                  className={
                    delivery === false
                      ? "delivery__details"
                      : "delivery__details delivery__details--active"
                  }
                >
                  <div className="delivery__type">
                    <h3 className="delivery__questions">Get it Free & Fast</h3>
                    <div className="delivery__standard">
                      <div className="delivery__times">
                        <p className="delivery__subheading">
                          <strong>UK Standard</strong>
                        </p>
                        <p className="delivery__answers">
                          Delivery between Monday - Friday
                        </p>
                      </div>
                      <div className="delivery__cost">Free</div>
                    </div>
                    <div className="delivery__standard">
                      <div className="delivery__times">
                        <p className="delivery__subheading">
                          <strong>Click & Collect</strong>
                        </p>
                        <p className="delivery__answers">
                          Collect from your local store Monday - Friday
                        </p>
                      </div>
                      <div className="delivery__cost">Free</div>
                    </div>
                  </div>
                  <div className="delivery__type">
                    <h3 className="delivery__questions">
                      Local Convenient Pickup
                    </h3>
                    <div className="delivery__standard">
                      <div className="delivery__times">
                        <p className="delivery__subheading">
                          <strong>Collect+</strong>
                        </p>
                        <p className="delivery__answers">
                          Collect your order from a convenience store local to
                          you
                        </p>
                      </div>
                      <div className="delivery__cost">Free</div>
                    </div>
                    <div className="delivery__standard">
                      <div className="delivery__times">
                        <p className="delivery__subheading">
                          <strong>UPS Access Point</strong>
                        </p>
                        <p className="delivery__answers">
                          Collect your order from a variety of convenient local
                          shops and locations
                        </p>
                      </div>
                      <div className="delivery__cost">Free</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <NewsletterBanner />
        </section>
      )}
    </>
  );
};

export default ProductDetails;
