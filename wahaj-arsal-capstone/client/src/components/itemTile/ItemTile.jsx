/** @format */

// IMPORT FROM LIBRARIES
import { Link, useLocation } from "react-router-dom";

// IMPORT LOCAL FILES & COMPONENTS
import "./ItemTile.scss";

// IMPORT ASSETS
import cardigan from "../../assets/images/cardigan.svg";

function ItemTile({ id, name, description, price, image, match, uniqueId }) {
  return (
    <div id={uniqueId} className="item">
      <div className="item__picture">
        <Link to={`${match.url}/${id}`}>
          <img className="item__image" src={image} />
        </Link>
      </div>
      <div className="item__details">
        <h3 className="item__title">{name}</h3>
        <p className="item__description">{description}</p>
        <p className="item__price"> £{price}</p>
      </div>
    </div>
  );
}

export default ItemTile;
