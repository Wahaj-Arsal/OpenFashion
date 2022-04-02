/** @format */

import "./ProductTile.scss";
import fallTrend1 from "../../assets/images/fall-trends-1.svg";
import bookmarkIcon from "../../assets/icons/Bookmark.svg";

import { Link } from "react-router-dom";

export default function ProductTile({ item }) {
  // console.log(props);
  // console.log(products);

  const { title, image } = item;

  return (
    <section className="tile">
      <Link className="tile__text" to="/mens">
        <div className={item.class}>
          {/* <img className="tile__bookmark" src={bookmarkIcon} /> */}
          <p className="tile__description">{title}</p>
        </div>
      </Link>
    </section>
  );
}
