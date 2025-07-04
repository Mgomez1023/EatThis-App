import '/src/App.css'

import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={restaurant.place_id || index} restaurant={restaurant} index={index} />
      ))}
    </div>
  );
};

export default RestaurantList;
