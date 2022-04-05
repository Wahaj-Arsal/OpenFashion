/** @format */

// IMPORT FROM LIBRARIES

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// IMPORT LOCAL FILES & COMPONENTS
import "./ItemTile.scss";

// IMPORT ASSETS
import leafEmpty from "../../assets/icons/leaf-b.png";
import leafFull from "../../assets/icons/leaf-g.png";

function ItemTile({
  id,
  index,
  name,
  description,
  price,
  image,
  match,
  uniqueId,
  item,
  sustainability,
}) {
  // console.log(sustainability);
  // console.log(item.sustainability);
  // const { sustainability } = item;

  const [sustain, setSustain] = useState([]);

  useEffect(() => {
    setSustain(item.sustainability);
  });
  const totalSustain = 5;
  const sustainReturn = [...Array(totalSustain)].map((sus, index) => {
    return (
      <>
        <img
          key={uniqueId}
          className="item__count"
          src={index + 1 <= sustain ? leafFull : leafEmpty}
        />
      </>
    );
  });
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
        <div className="item__info">
          <p className="item__price"> £{price}</p>
          <div className="item__sustain">{sustainReturn}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemTile;
