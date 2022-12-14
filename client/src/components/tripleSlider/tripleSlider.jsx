/** @format */

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TripleSlider({ mensLatest, currentIndex, newIndex, oldIndex }) {
  const location = useLocation();

  return (
    <>
      <div className="slider__content">
        <Link to={`${location.pathname}mens/${mensLatest[oldIndex].id}`}>
          <img
            className="slider__image"
            src={require(`../../assets/images/${mensLatest[oldIndex].image}`)}
          />
        </Link>
        <div className="slider__information">
          <div className="slider__details">
            <p className="slider__name">{mensLatest[oldIndex].name}</p>
            <p className="slider__description">
              {mensLatest[oldIndex].description}
            </p>
          </div>
          <div className="slider__pricing">
            <p className="slider__cost">£{mensLatest[oldIndex].price / 100}</p>
          </div>
        </div>
      </div>
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
      <div className="slider__content">
        <Link to={`${location.pathname}mens/${mensLatest[newIndex].id}`}>
          <img
            className="slider__image"
            src={require(`../../assets/images/${mensLatest[newIndex].image}`)}
          />
        </Link>
        <div className="slider__information">
          <div className="slider__details">
            <p className="slider__name">{mensLatest[newIndex].name}</p>
            <p className="slider__description">
              {mensLatest[newIndex].description}
            </p>
          </div>
          <div className="slider__pricing">
            <p className="slider__cost">£{mensLatest[newIndex].price / 100}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default TripleSlider;
