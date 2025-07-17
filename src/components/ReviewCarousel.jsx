import Slider from "react-slick";
import closeIcon from "../assets/close_icon.png";
import "../App.css"

const ReviewCarousel = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,


  };

  return (
    <>
      <div className="sliderWrapper">

          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="reviewCard">
                <div className="reviewHeader">
                  {/* Left Side: Profile picture and name stacked */}
                  <div className="reviewLeft" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexDirection: 'column', 
                    gap: '1rem',
                  }}>
                    <img
                      src={review.profile_photo_url}
                      alt={`${review.author_name}'s profile`}
                      onError={(e) => e.target.src = closeIcon}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '10px'
                      }}
                    />
                      <div className="reviewInfo">
                        <strong className="reviewText" style={{ 
                          fontWeight: '500',
                        }}>
                          {review.author_name}
                        </strong>
                      </div>
                    </div>

                    <div className="reviewRight" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                      <p className="reviewText" style={{ 
                        margin: "0 auto", 
                      }}>⭐{review.rating}/5</p>
                      <p className="reviewTextTime" style={{ margin: 0 }}>{review.relative_time_description}</p>
                    </div>
                </div>
                <p className="reviewText">"{review.text}"</p>
              </div>
            ))}
          </Slider>
        </div>
    </>
  );
};

export default ReviewCarousel;
