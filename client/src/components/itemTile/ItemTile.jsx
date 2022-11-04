/** @format */

// IMPORT FROM LIBRARIES

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// IMPORT LOCAL FILES & COMPONENTS
import "./ItemTile.scss";

// IMPORT ASSETS
import leafEmpty from "../../assets/icons/leaf-b.png";
import leafFull from "../../assets/icons/leaf-g.png";

function ItemTile({ id, name, description, price, image, sustainability }) {
  const [sustain, setSustain] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setSustain(sustainability);
  });
  const totalSustain = 5;
  const sustainReturn = [...Array(totalSustain)].map((sus, index) => {
    return (
      <img
        key={index}
        className="item__count"
        src={index + 1 <= sustain ? leafFull : leafEmpty}
        alt="item count"
      />
    );
  });

  return (
    <div className="item">
      <div className="item__picture">
        <Link to={`${location.pathname}/${id}`}>
          <img
            className="item__image"
            src={require(`../../assets/images/${image}`)}
            alt="item"
          />
        </Link>
      </div>
      <div className="item__details">
        <div className="item__text">
          <h3 className="item__title">{name}</h3>
          <p className="item__description">{description}</p>
        </div>
        <div className="item__info">
          <p className="item__price"> £{price / 100}</p>
          <div className="item__sustain">{sustainReturn}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemTile;

//  <div className="item__picture">
//                   <Link>
//                     <img
//                       className="item__image"
//                       src={filteredItem.image}
//                       alt="item"
//                     />
//                   </Link>
//                 </div>
//                 <div className="item__details">
//                   <h3 className="item__title">{filteredItem.name}</h3>
//                   <p className="item__description">
//                     {filteredItem.description}
//                   </p>
//                   <div className="item__info">
//                     <p className="item__price"> £{filteredItem.price}</p>
//                     <div className="item__sustain">
//                       {filteredItem.sustainability}
//                     </div>
//                   </div>
//                 </div>
