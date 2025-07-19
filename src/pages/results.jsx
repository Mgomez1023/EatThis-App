import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import RestaurantList from '../components/RestaurantList'
import '../App.css'
import closeIcon from '../assets/close_icon.png'
import hamburgerImg from '../assets/hamburger_menu.png'
import restaurantData from "../data/restaurants.json"
import logoFull from "../assets/logo-full.png"


function results() {

const toggleMenu = () => setMenuOpen(!menuOpen)
const [menuOpen, setMenuOpen] = useState(false)
const navigate = useNavigate();
const names = restaurantData.map((restaurants) => restaurants.name);
const [setNames] = useState([]);
const locationState = useLocation();
const { radiusMeters, location, craving} = locationState.state || {};
const nearbyRestaurants = locationState.state?.nearbyRestaurants || [] || restaurants;
var [restaurants, setRestaurants] = useState([]);

  const handleClickyy = () => {
      navigate("/");
  };

  const toggle = () => {
  document.body.classList.toggle("dark");
  } 


 useEffect(() => {
    const stored = localStorage.getItem("restaurants");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRestaurants(parsed);
        console.log("Loaded from storage:", parsed);
        console.log(radiusMeters);
        restaurants = parsed;
        console.log("restaurants: ", restaurants);
      } catch (error) {
        console.error("Failed to parse restaurants from storage", error);
      }
    } else {
      console.warn("No restaurants found in storage");
    }
  }, []);




  return (
    <>
          <div className={`dropdown-drawer ${menuOpen ? 'open' : ''}`}>   

            <div className="drawer-header"> 
                
                <button style={{
                background: 'none',
                padding: '0px',
                textDecoration: 'underline',
                textDecorationColor: 'orange',
                textDecorationThickness: '4px',
                }}
                
                onClick={handleClickyy}>
                    <h1 className="titleText">EatThis</h1>
                </button>

                <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu"> 
                <img src={closeIcon} className="closeImg" alt="React logo" />
                </button>


            </div>    
            <div className="dropdown-content">
                <ul>
                <li onClick={toggle}>Dark Mode</li>

                </ul>
            </div>
            </div>


            <div className="topbar">


            <button style={{
                background: 'none',
                padding: '0px',
                textDecoration: 'underline',
                textDecorationColor: 'orange',
                textDecorationThickness: '4px',
            }}
            onClick={toggle}
            >

              <img src={logoFull} className="logoFull" alt="React logo" />

            </button>

            <button className="hamburger-btn" onClick={toggleMenu} aria-label="Profile"> 
                <img src={hamburgerImg} className="MenuImg" alt="React logo" />
            </button>
            </div>
        

        <div className="results-page-content">
          <h2 className="midText">{ restaurants.length } { craving } Restaurants Found</h2>
            <div className="results-page-results">
              {restaurants.length === 0 ? (
                <p className="text">No restaurants found or data not passed.</p>
              ) : (
                <RestaurantList restaurants={restaurants} />
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
