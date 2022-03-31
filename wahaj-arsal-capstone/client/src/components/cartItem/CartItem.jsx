/** @format */

import "./CartItem.scss";
import image from "../../assets/images/cardigan.svg";

const CartItem = ({ item }) => {
  console.log(item);

  const { id, name, description, price } = item;
  const { care, materials } = { ...item.additional };
  const { bleach, iron, tumble, washing } = { ...item.instructions };

  return (
    // <h2>Product Inserted</h2>
    <div className="cart__status">
      <div className="cart__picture">
        <img className="cart__image" src={image} />
      </div>
      <div className="cart__information">
        <p className="cart__title">{name}</p>
        <p className="cart__description">{description}</p>
        <p className="cart__price">£{price}</p>
      </div>
    </div>
  );
};

export default CartItem;
