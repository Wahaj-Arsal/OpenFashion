/** @format */

// IMPORT FROM LIBRARIES
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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

const ProductDetails = ({ SERVER_KEY_URL }) => {
  const API_URL_MENS_SINGLE = (id) => `${SERVER_KEY_URL}${id}`;
  const API_URL_ID_COMMENTS = (id) => `${SERVER_KEY_URL}${id}/reviews`;

  const location = useLocation();
  const url = location.pathname;

  // console.log(url);

  //STATES FOR POSTING COMMENT
  const [customerName, setCustomerName] = useState([]);
  const [customerComment, setCustomerComment] = useState([]);

  const [cart, setCart] = useContext(CartContext);
  const [productDetails, setProductDetails] = useState([]);

  const [className, setClassName] = useState(true);
  const [classComment, setClassComment] = useState(true);

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
    const existingItem = cartItems.findIndex(
      (item) => item.id === productDetails.id
    );
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
      // console.log("Empty Both");
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
        className="details__count"
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
          <img
            src={require(`../../assets/images/${productDetails.image}`)}
            alt="product"
            className="details__img"
          />
          <div className="details__details">
            <div className="details__heading">
              <h1 className="details__title">{name}</h1>
              <img src={exportIcon} alt="" className="details__icon" />
            </div>
            <p className="details__description">{description}</p>
            <div className="details__info">
              <p className="details__price">£{price / 100}</p>
              <div className="details__sustain">{sustainReturn}</div>
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
          <div className="comments">
            <h3 className="comments__heading">Reviews</h3>
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
                <h2 className="comments__comment-title">Leave a review:</h2>
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
            <button className="comments__submit" onClick={validationStatus}>
              Post your review
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
        </section>
      )}
    </>
  );
};

export default ProductDetails;
