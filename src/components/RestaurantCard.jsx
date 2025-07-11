import '/src/App.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant, index, restaurants,}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${restaurant.place_id}`, { 
      state: { 
        restaurant, 
        restaurants,
       }
    });
  };

  /* 
      <div>
      <h1>{restaurant.name}</h1>

      <h2>Reviews</h2>
      {restaurant.reviews && restaurant.reviews.length > 0 ? (
        <div className="reviews-container">
          {restaurant.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <img src={review.profile_photo_url} alt={`${review.author_name}'s profile`} className="reviewer-photo" />
              <div className="review-details textboi">
                <p><strong>{review.author_name}</strong></p>
                <p>Rating: {review.rating} ⭐</p>
                <p><em>{review.relative_time_description}</em></p>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  
  */


  return (
      <div className="restaurant-card" style={{  
        border: '5px solid orange',
        color: 'orange',
        padding: '1rem',
        marginTop: '1rem',
        marginBottom: '1rem', 
        borderRadius: '8px',
        width: '100%',
      }}>
        <button onClick={handleClick}>View Details</button>
        <h3 className="text">{index + 1}. {restaurant.name}</h3>
        {restaurant.distance !== undefined && (
          <>
            <p>Distance: {(restaurant.distance / 1000 * 0.621371).toFixed(2)} mi</p>
            <p>Price Level: {restaurant.price_level} </p>
          
          </>
        )}
        {/* Add more details here as needed */}
      </div>
  );
};

export default RestaurantCard;