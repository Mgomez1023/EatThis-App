import '/src/App.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

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

  return (
    <div className="restaurantCard">

      <button className="restaurantButton" onClick={handleClick}>

        <div className="buttonContent">

          <div className="textGroup">

            <h3 className="text">{index + 1}. {restaurant.name}</h3>
            {restaurant.distance !== undefined && (
              <>

                <p className="text" style={{
                  textSize: '15px',
                  color: 'var(--orange)',

                }}>Distance: {(restaurant.distance / 1000 * 0.621371).toFixed(2)} mi</p>
              
              </>
            )}
          </div>

          <FaArrowRight className="arrow" />

        </div>
        
      </button>

    </div>
  );
};

export default RestaurantCard;