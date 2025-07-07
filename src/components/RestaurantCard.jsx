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
      width: '100%',

      }}>
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