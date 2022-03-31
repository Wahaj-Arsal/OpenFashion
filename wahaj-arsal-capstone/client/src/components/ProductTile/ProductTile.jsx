/** @format */

import "./ProductTile.scss";
import fallTrend1 from "../../assets/images/fall-trends-1.svg";
import bookmarkIcon from "../../assets/icons/Bookmark.svg";

import { Link } from "react-router-dom";

export default function ProductTile() {
  // console.log(props);
  // console.log(products);

  return (
    <section className="tile">
      <Link to="/mens">
        <div className="tile__card">
          <img className="tile__bookmark" src={bookmarkIcon} />
          <p className="tile__description">Men's Collection 2021</p>
        </div>
      </Link>
    </section>
  );
}
