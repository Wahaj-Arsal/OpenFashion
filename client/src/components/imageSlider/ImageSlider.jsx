/** @format */

import "./ImageSlider.scss";

import React, { useEffect, useState } from "react";

import backwardsIcon from "../../assets/icons/Backward.svg";
import forwardsIcon from "../../assets/icons/Forward.svg";

function ImageSlider({ mensLatest, startIndex, nextIndex, previousIndex }) {
  const [oldIndex, setOldIndex] = useState(previousIndex);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [newIndex, setNewIndex] = useState(nextIndex);

  const nextImage = () => {
    if (newIndex === mensLatest.length - 1) {
      setCurrentIndex(newIndex);
      setNewIndex(0);
    } else {
      setCurrentIndex(newIndex);
      setNewIndex(newIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentIndex === 0) {
      setOldIndex(currentIndex);
      setCurrentIndex(2);
    } else {
      setOldIndex(currentIndex);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider">
      <button className="slider__button left" onClick={previousImage}>
        <img className="slider__icon" src={backwardsIcon} />
      </button>
      <div className="slider__content">
        <img
          className="slider__image"
          src={require(`../../assets/images/${mensLatest[currentIndex].image}`)}
        />
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
        <img
          className="slider__image"
          src={require(`../../assets/images/${mensLatest[newIndex].image}`)}
        />
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
      <button className="slider__button" onClick={nextImage}>
        <img className="slider__icon" src={forwardsIcon} />
      </button>
    </div>
  );
}

export default ImageSlider;
