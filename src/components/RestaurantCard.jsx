import '/src/App.css'

const RestaurantCard = ({ restaurant, index }) => {
  return (
    <div className="restaurant-card" style={{  
      border: '5px solid orange',
      color: 'orange',
      padding: '1rem',
      marginTop: '1rem',
      marginBottom: '1rem', 
      borderRadius: '8px',
      width: '75%',

      }}>
      <h3 className="text">{index + 1}. {restaurant.name}</h3>
      {restaurant.distance !== undefined && (
        <p>Distance: {(restaurant.distance / 1000).toFixed(2)} km</p>
      )}
      {/* Add more details here as needed */}
    </div>
  );
};

export default RestaurantCard;