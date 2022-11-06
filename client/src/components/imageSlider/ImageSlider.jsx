/** @format */

import "./ImageSlider.scss";

import React, { useEffect, useState } from "react";

import SingleSlider from "../singleSlider/SingleSlider";
import DoubleSlider from "../doubleSlider/DoubleSlider";
import TripleSlider from "../tripleSlider/tripleSlider";
import backwardsIcon from "../../assets/icons/Backward.svg";
import forwardsIcon from "../../assets/icons/Forward.svg";

const mobileMinWidth = 320;
const mobileMaxWidth = 767;
const tabletMinWidth = 768;
const desktopMinWidth = 1020;

function ImageSlider({ mensLatest, startIndex, nextIndex, previousIndex }) {
  const [oldIndex, setOldIndex] = useState(previousIndex);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [newIndex, setNewIndex] = useState(nextIndex);
  const [selectSlider, setSelectSlider] = useState("0");
  const [windowSize, detectWidth] = useState({
    winWidth: window.innerWidth,
  });

  const checkSize = () => {
    detectWidth({
      winWidth: window.innerWidth,
    });
  };

  const nextImage = () => {
    if (newIndex === mensLatest.length - 1) {
      setOldIndex(newIndex - 1);
      setCurrentIndex(newIndex);
      setNewIndex(0);
    } else if (currentIndex === mensLatest.length - 1) {
      setOldIndex(mensLatest.length - 1);
      setCurrentIndex(newIndex);
      setNewIndex(newIndex + 1);
    } else {
      setOldIndex(newIndex - 1);
      setCurrentIndex(newIndex);
      setNewIndex(newIndex + 1);
    }
  };

  // console.log(oldIndex, currentIndex, newIndex);

  const previousImage = () => {
    if (currentIndex === 0) {
      setNewIndex(currentIndex);
      setCurrentIndex(mensLatest.length - 1);
      setOldIndex(oldIndex - 1);
    } else if (oldIndex === 0) {
      setOldIndex(mensLatest.length - 1);
      setNewIndex(currentIndex);
      setCurrentIndex(currentIndex - 1);
    } else {
      setNewIndex(currentIndex);
      setCurrentIndex(currentIndex - 1);
      setOldIndex(currentIndex - 2);
    }
  };

  const windowCheck = () => {
    if (windowSize.winWidth < tabletMinWidth) {
      setSelectSlider("0");
    } else if (windowSize.winWidth < desktopMinWidth) {
      setSelectSlider("1");
    } else {
      setSelectSlider("2");
    }
  };

  console.log(windowSize, selectSlider);

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [windowSize]);

  useEffect(windowCheck, [windowSize]);

  const displaySlider = () => {
    switch (selectSlider) {
      case "0":
        return (
          <SingleSlider mensLatest={mensLatest} currentIndex={currentIndex} />
        );
      case "1":
        return (
          <DoubleSlider
            mensLatest={mensLatest}
            currentIndex={currentIndex}
            newIndex={newIndex}
            oldIndex={oldIndex}
          />
        );
      case "2":
        return (
          <TripleSlider
            mensLatest={mensLatest}
            currentIndex={currentIndex}
            newIndex={newIndex}
            oldIndex={oldIndex}
          />
        );
      default:
        <SingleSlider mensLatest={mensLatest} currentIndex={currentIndex} />;
    }
  };

  return (
    <>
      <div className="slider">
        <button className="slider__button left" onClick={previousImage}>
          <img className="slider__icon" src={backwardsIcon} />
        </button>
        {displaySlider()}
        <button className="slider__button" onClick={nextImage}>
          <img className="slider__icon" src={forwardsIcon} />
        </button>
      </div>
    </>
  );
}

export default ImageSlider;
