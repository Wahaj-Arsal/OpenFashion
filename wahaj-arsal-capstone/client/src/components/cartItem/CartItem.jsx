/** @format */

import "./CartItem.scss";
// import image from "../../assets/images/cardigan.svg";
import uuid from "react-uuid";

const CartItem = ({ item, removeCartItem }) => {
  // console.log(item);

  const { id, name, description, price, quantity, image } = item;
  // const { care, materials } = { ...item.additional };
  // const { bleach, iron, tumble, washing } = { ...item.instructions };

  // const wholeCart = document.querySelector(".shopping-cart");

  // const removeCartItem = (e) => {
  //   e.preventDefault();
  //   const cartItem = e.target.parentElement.parentElement;
  //   wholeCart.removeChild(cartItem);
  // };

  return (
    // <h2>Product Inserted</h2>
    <div id={item.id} className="shopping-cart">
      <div className="shopping-cart__picture">
        <img className="shopping-cart__image" src={image} />
      </div>
      <div className="shopping-cart__information">
        <button className="shopping-cart__button" onClick={removeCartItem}>
          x
        </button>
        <p className="shopping-cart__title">{name}</p>
        <p className="shopping-cart__description">{description}</p>
        <p className="shopping-cart__price">£{price / 100}</p>
      </div>
    </div>
  );
};

export default CartItem;
