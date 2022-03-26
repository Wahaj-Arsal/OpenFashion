/** @format */

import "./ProductTile.scss";
import fallTrend1 from "../../assets/images/fall-trends-1.svg";
import bookmarkIcon from "../../assets/icons/Bookmark.svg";

export default function ProductTile({ bg__img }) {
  return (
    <section className="tile">
      <div className="tile__card">
        <img className="tile__bookmark" src={bookmarkIcon} />
        <p className="tile__description">
          2021 style guide: the biggest fall trends
        </p>
      </div>
    </section>
  );
}
