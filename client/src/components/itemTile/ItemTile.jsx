/** @format */

// IMPORT FROM LIBRARIES

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// IMPORT LOCAL FILES & COMPONENTS
import "./ItemTile.scss";

// IMPORT ASSETS
import leafEmpty from "../../assets/icons/leaf-b.png";
import leafFull from "../../assets/icons/leaf-g.png";

function ItemTile({ id, name, description, price, image, match, item }) {
  const [sustain, setSustain] = useState([]);

  useEffect(() => {
    setSustain(item.sustainability);
  });
  const totalSustain = 5;
  const sustainReturn = [...Array(totalSustain)].map((sus, index) => {
    return (
      <>
        <img
          key={index}
          className="item__count"
          src={index + 1 <= sustain ? leafFull : leafEmpty}
          alt="item count"
        />
      </>
    );
  });
  return (
    <div id={id} className="item">
      <div className="item__picture">
        <Link to={`${match.url}/${id}`}>
          <img className="item__image" src={image} alt="item" />
        </Link>
      </div>
      <div className="item__details">
        <h3 className="item__title">{name}</h3>
        <p className="item__description">{description}</p>
        <div className="item__info">
          <p className="item__price"> £{price}</p>
          <div className="item__sustain">{sustainReturn}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemTile;
