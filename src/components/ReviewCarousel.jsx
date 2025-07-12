import Slider from "react-slick";
import "../App.css"

const ReviewCarousel = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <>

        <h3 className="reviews-label">
            Reviews
        </h3>
      <Slider {...settings} dots={ false } >
        {reviews.map((review, index) => (
          <div key={index} className="reviewCard">
            <div className="reviewHeader">
              <div className="reviewInfo">
                <strong className="text" style={{
                    color: 'black',
                }}>{review.author_name}</strong>
                <p className="reviewText">{review.relative_time_description}</p>
                <p className="reviewText">Rating: ⭐{review.rating}/5</p>
              </div>
            </div>
            <p className="reviewText">"{review.text}"</p>
          </div>
        ))}
      </Slider>
    
    </>
  );
};

export default ReviewCarousel;
