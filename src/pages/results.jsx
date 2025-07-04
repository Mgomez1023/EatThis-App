import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import RestaurantList from '../components/RestaurantList'
import '../App.css'
import closeIcon from '../assets/close_icon.png'
import searchImg from '../assets/Search.jpg'
import hamburgerImg from '../assets/hamburger_menu.png'
import restaurantData from "../data/restaurants.json"


function results() {

const toggleMenu = () => setMenuOpen(!menuOpen)
const [menuOpen, setMenuOpen] = useState(false)
const navigate = useNavigate();
const names = restaurantData.map((restaurants) => restaurants.name);
const [setNames] = useState([]);

const locationState = useLocation();
const { radiusMeters, location} = locationState.state || {};
const nearbyRestaurants = locationState.state?.nearbyRestaurants || [];



console.log('radius Meters: ' + radiusMeters);
console.log(names);
console.log(location);




  useEffect(() => {
    // Simulating loading data from a JSON file
    fetch('/restaurants.json')
      .then((res) => res.json())
      .then((data) => {
        const restaurantNames = data.map((r) => r.name);
        setNames(restaurantNames);
      });
  }, []);

  return (
    <>
          <div className={`dropdown-drawer ${menuOpen ? 'open' : ''}`}>   

            <div className="drawer-header"> 

              <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu"> 
                <img src={closeIcon} className="closeImg" alt="React logo" />
              </button>

              <h1 className="titleText">EatThis</h1>

            </div>    
            <div className="dropdown-content">
              <ul>
                <li onClick={() => alert('Profile clicked')}>Profile</li>
                <li onClick={() => alert('Settings clicked')}>Settings</li>
                <li onClick={() => alert('Logout clicked')}>Logout</li>
              </ul>
            </div>
          </div>

        <div className="topbar">
            <button className="hamburger-btn" onClick={toggleMenu} aria-label="Profile"> 
                <img src={hamburgerImg} className="MenuImg" alt="React logo" />
            </button>
            
            <h1 className="titleText">EatThis</h1>

            <button className="search-btn" onClick={() => alert('Search clicked')} aria-label="Search"> 
                <img src={searchImg} className="MenuImg" alt="React logo" />
            </button>
        </div>
        

        <div className="results-page-content">
          <h2 className="midText">{ nearbyRestaurants.length } Restaurants within<br /> { radiusMeters / 1000 } kilometers of you</h2>
            <div className="results-page-results">     
              {nearbyRestaurants.length === 0 ? (
                <p>No restaurants found or data not passed.</p>
              ) : (
                <RestaurantList restaurants={nearbyRestaurants} />
              )}

            </div>
          <div className="navButtonContainer">
            <button className="navButton" onClick={() => navigate('/')}>
                Go Back
            </button>
          </div>  
        </div>
    </>
    )  
}

export default results;
