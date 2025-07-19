import '/src/App.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const RestaurantCard = ({ restaurant, index, restaurants,}) => {
  const navigate = useNavigate();


  const handleClick = () => {
    const placeID = restaurant.place_id;
    console.log("Navigating to profile with ID:", placeID);
    navigate(`/Profile/${placeID}`);
  };

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

                }}>Distance: { restaurant.distance } meters</p>
              
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