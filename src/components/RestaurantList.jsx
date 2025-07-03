import 'C:/Users/not selected yet/Desktop/EatThis-App-1/src/App.css'

import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list" style={{
        marginTop: '1rem',
        }}>
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={index} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
