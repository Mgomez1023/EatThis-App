import '/src/App.css'

import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list" style={{
        marginTop: '1rem',
        justifyContent: 'center',
        justifyItems: 'center',
        }}>
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={index} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
