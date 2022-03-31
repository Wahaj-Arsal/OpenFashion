/** @format */

import "./CartItem.scss";
import image from "../../assets/images/cardigan.svg";

const CartItem = ({ item }) => {
  // console.log(item);

  const { id, name, description, price } = item;
  const { care, materials } = { ...item.additional };
  const { bleach, iron, tumble, washing } = { ...item.instructions };

  return (
    // <h2>Product Inserted</h2>
    <div className="shopping-cart">
      <div className="shopping-cart__picture">
        <img className="shopping-cart__image" src={image} />
      </div>
      <div className="shopping-cart__information">
        <p className="shopping-cart__title">{name}</p>
        <p className="shopping-cart__description">{description}</p>
        <p className="shopping-cart__price">£{price}</p>
      </div>
    </div>
  );
};

export default CartItem;
