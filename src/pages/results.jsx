import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Sun, SunDim } from 'lucide-react'
import RestaurantList from '../components/RestaurantList'
import WheelPicker from '../components/WheelPicker.jsx'
import '../App.css'
import wheelIcon from '../assets/LuckyWheelTransparent.png'
import closeIcon from '../assets/close_icon.png'
import hamburgerImg from '../assets/hamburger_menu.png'
import restaurantData from "../data/restaurants.json"
import logoFull from "../assets/logo-full.png"

function results() {

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleWheelMenu = () => setWheelMenuOpen(!wheelMenuOpen)
  const [wheelMenuOpen, setWheelMenuOpen] = useState(false)

  const navigate = useNavigate();
  const names = restaurantData.map((restaurants) => restaurants.name);
  const [setNames] = useState([]);
  const locationState = useLocation();
  const { radiusMeters, location, craving} = locationState.state || {};
  const nearbyRestaurants = locationState.state?.nearbyRestaurants || [] || restaurants;
  var [restaurants, setRestaurants] = useState([]);
  const [theme, setTheme] = useState('light'); // Default theme


  const handleClickyy = () => {
      navigate("/");
  };

   const toggle = () => {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        setTheme('light');
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        setTheme('dark');
    }
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
            onClick={handleClickyy}
            >

              <img src={logoFull} className="logoFull" alt="React logo" />

            </button>

            <button className="hamburger-btn" onClick={toggle} aria-label="Profile"> 
              {theme === 'light' ? <Sun color="rgb(255, 140, 0)" size="{48}"/> : <SunDim color="rgb(255, 140, 0)" size="{48}" /> }
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

              <button className="navButton" onClick={ handleClickyy  /*() => navigate('/')*/ } >
                  Go Back
              </button>

              <button className="wheelIconButton" onClick={toggleWheelMenu} >
                <img src={wheelIcon} className="wheelIcon" alt="Wheel Icon" />
              </button>

              <div className={`WheelPickerContainer ${wheelMenuOpen ? 'open' : ''}`}>  

                <WheelPicker items={restaurants} />
                
              </div> 


            </div>  
        </div>
    </>
    )  
}

export default results;
