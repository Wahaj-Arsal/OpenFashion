/** @format */

function SingleSlider({ mensLatest, currentIndex }) {
  return (
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
  );
}
export default SingleSlider;
