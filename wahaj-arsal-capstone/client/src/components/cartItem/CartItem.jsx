/** @format */

import "./CartItem.scss";

const CartItem = ({ item, removeCartItem }) => {
  const { id, name, description, price, quantity, image } = item;
  return (
    // <h2>Product Inserted</h2>
    <div id={id} className="shopping-cart">
      <div className="shopping-cart__picture">
        <img className="shopping-cart__image" src={image} />
      </div>
      <div className="shopping-cart__information">
        <p className="shopping-cart__button" onClick={removeCartItem}></p>
        <p className="shopping-cart__title">{name}</p>
        <p className="shopping-cart__description">{description}</p>
        <p className="shopping-cart__price">£{price / 100}</p>
      </div>
    </div>
  );
};

export default CartItem;
