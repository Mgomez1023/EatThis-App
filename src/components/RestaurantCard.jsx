import '/src/App.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { inferFoodType } from '/src/utils/inferFoodType.js'

const RestaurantCard = ({ restaurant, index, restaurants,}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const placeID = restaurant.place_id;
    console.log("Navigating to profile with ID:", placeID);
    navigate(`/Profile/${placeID}/${restaurant.distance}`);
  };

    const capitalizeWords = (str) => {
      if (!str) return '';
      return str
          .split(' ')
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' ');
    };

    const foodType = () => {
        const category = inferFoodType(restaurant.name);
        return capitalizeWords(category);
    }

  /*  
  const handleClick = async () => {
    try {
      const placeID = restaurant.place_id;
      console.log("Detils for ID: ", placeID);
      const res = await fetch(`/api/placeDetails?placeId=${encodeURIComponent(placeID)}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log("details: ", data);
      navigate(`/profile/${placeID}`);
      console.log("restaurant Details: ", restaurantDetails);
    } catch (err) {
      console.error("Failed to fetch place details:", err);
    }
  };
  */

  return (
    <div className="restaurantCard">

      <button className="restaurantButton" onClick={handleClick}>

        <div className="buttonContent">

          <div className="textGroup">

            <h3 key={restaurant.place_id} className="text">{index + 1}. {restaurant.name}</h3>
            {restaurant.distance !== undefined && (
              <>

                <p className="text" style={{
                  textSize: '15px',
                  color: 'var(--orange)',

                }}>Distance: { (restaurant.distance / 1609.34).toFixed(1) } mi</p>

                <p className="text" style={{
                  textSize: '15px',
                  color: 'var(--orange)',

                }}>Category: { foodType() } </p>
              
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