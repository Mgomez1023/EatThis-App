import '/src/App.css'

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card" style={{  
      border: '5px solid #ffa500',
      color: 'orange',
      padding: '1rem',
      marginTop: '1rem',
      marginBottom: '1rem', 
      borderRadius: '8px',
      width: '80%',
      }}>
      <h3>{restaurant.name}</h3>
      {restaurant.distance !== undefined && (
        <p>Distance: {(restaurant.distance / 1000).toFixed(2)} km</p>
      )}
      {/* Add more details here as needed */}
    </div>
  );
};

export default RestaurantCard;