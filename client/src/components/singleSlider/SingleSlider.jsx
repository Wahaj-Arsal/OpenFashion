/** @format */

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SingleSlider({ mensLatest, currentIndex }) {
  const location = useLocation();

  return (
    <div className="slider__content">
      <Link to={`${location.pathname}mens/${mensLatest[currentIndex].id}`}>
        <img
          className="slider__image"
          src={require(`../../assets/images/${mensLatest[currentIndex].image}`)}
        />
      </Link>
      <div className="slider__information">
        <div className="slider__details">
          <p className="slider__name">{mensLatest[currentIndex].name}</p>
          <p className="slider__description">
            {mensLatest[currentIndex].description}
          </p>
        </div>
        <div className="slider__pricing">
          <p className="slider__cost">
            £{mensLatest[currentIndex].price / 100}
          </p>
        </div>
      </div>
    </div>
  );
}
export default SingleSlider;
