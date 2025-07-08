import { useState } from 'react'
import React from 'react'
 import {motion, AnimatePresence} from 'framer-motion'
import { useGeolocation } from '/src/utils/useGeolocation.js'
import { haversineDistance } from '/src/utils/haversineDistance.js'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { inferFoodType } from '/src/utils/inferFoodType.js'
import restaurants from '/src/data/restaurants.json' // Assuming you have a JSON file with restaurant data
import closeIcon from '/src/assets/close_icon.png'
import searchImg from '/src/assets/Search.jpg'
import hamburgerImg from '/src/assets/hamburger_menu.png'
import burgerLogo from '/src/assets/burger_orange.jpg'
import '/src/App.css'
 

function Home() {

  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { location, error } = useGeolocation();
  const [radiusMeters, setRadiusMeters] = useState(5000); // Default radius 5km
  var [setCraving] = useState('');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState(null);
  const navigate = useNavigate();

  const cravings = [
    "any",
    "Pizza",
    "Burgers",
    "Mexican",
    "Chicken",
    "Sandwiches",
    "BBQ",
    "Chinese",
    "Hot Dogs",
    "Seafood",
    "Italian",
    "Indian",
    "Dessert",
    "Bakery",
    "Cafe"
  ];
  
  const displayCravings = [
    "🤷‍♀️ Any",
    "🍕 Pizza",
    "🍔 Burgers",
    "🌮 Mexican",
    "🍗 Chicken",
    "🥪 Sandwiches",
    "🍖 BBQ",
    "🥡 Asian Cuisine",
    "🌭 Hot Dogs",
    "🐟 Seafood",
    "🍝 Italian",
    "🧆 Indian",
    "🍦 Dessert",
    "🍰 Bakery",
    "☕ Cafe"
  ];


  const [cravingIndex, setCravingIndex] = useState(0); // default to "Any"
  var craving = cravings[cravingIndex];
  var displayCraving = displayCravings[cravingIndex];


  /* 
  const nearbyRestaurants = restaurants
  .map(r => {
    try {
      if (!r.geometry || !r.geometry.location) {
        console.warn('Invalid restaurant object:', r);
        return null;
      }

      const { lat, lng } = r.geometry.location;
      const distance = haversineDistance(location.lat, location.lng, lat, lng);
      const category = inferFoodType(r.name);
      console.log('1st nearbyRestaurant', r.price_level);

      return { ...r, distance, category };
    } catch (err) {
      console.error('Error mapping restaurant:', err);
      return null;
    }
  })
      .filter(r => 
        r && 
        (craving === "" || r.category === craving.toLowerCase()) &&
        (r.price_level === selectedPriceLevel) &&
        (radiusMeters === 5000 || r.distance <= radiusMeters)
    )
      .sort((a, b) => a.distance - b.distance);
  */


  {/*STEP HANDLING */}
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    craving: '',
    budget: '',
    dietaryRestrictions: '',
  });



  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s-1));
  const reset = () => setStep(0);

  const slide = {
    initial: {x: '100%', opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: '-100%', opacity: 0},
  };


  const toggleMenu = () => setMenuOpen(!menuOpen)

  function Click() {
    setCount((count) => count + 1)
    alert(`Clicked ${count + 1} times`)
  }


  {/*SUBMIT HANDLING */}
  const handleSubmit = () => {
    console.log("handleSubmit called");
  const nearbyRestaurants = restaurants
  .map(r => {
    try {
      if (!r.geometry || !r.geometry.location) {
        console.warn('Invalid restaurant object:', r);
        return null;
      }

      const { lat, lng } = r.geometry.location;
      const distance = haversineDistance(location.lat, location.lng, lat, lng);
      const category = inferFoodType(r.name);

      if (craving === "any") {
        craving = "";
      }

      return { ...r, distance, category };
    } catch (err) {
      console.error('Error mapping restaurant:', err);
      return null;
    }
  })
      .filter(r => 
        r && 
        (!radiusMeters || r.distance <= radiusMeters) &&
      (craving === "" || r.category === craving.toLowerCase()) &&
      (!selectedPriceLevel || r.price_level === selectedPriceLevel)
    )
      .sort((a, b) => a.distance - b.distance);



      console.log("Nearby before navigate:", nearbyRestaurants);
      navigate('/results', { 
        state: {
          radiusMeters,
          location,
          craving,
          nearbyRestaurants
        }, 
      });
  };

  {/* MAIN APP DESIGNING */}

  return (
    <>
          <div className={`dropdown-drawer ${menuOpen ? 'open' : ''}`}>   

            <div className="drawer-header"> 

              <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu"> 
                <img src={closeIcon} className="closeImg" alt="React logo" />
              </button>

              <button className="logo-btn" onClick={(back)}>
                <h1 className="titleText">EatThis</h1>
              </button>

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
          <button className="search-btn" onClick={() => alert('Search clicked')} aria-label="Search"> 
            <img src={searchImg} className="MenuImg" alt="React logo" />
          </button>
        </div>

        <AnimatePresence mode="wait">

            {/*STEP 0 - HOME */}
            {step === 0 && (
              <motion.section
              key="home"
              {...slide}
              transition={{ duration: 0.5 }}
              className="main"
              >
                  <div className="logo-box">

                    <div className="title-box">
                      <img src={burgerLogo} className="logo" alt="Vite logo" />
                    </div>

                    <h1 className="titleText">EatThis</h1>

                  </div>

                  <div className="startButtonWrapper"> 
                    <div className="spinningRing">
                    </div>
                    <button className="startButton" onClick={next}>Get&nbsp;Started</button>
                  </div>


              </motion.section>
            )}

            {/*STEP 1 - CRAVING */}
            {step === 1 && (
              <motion.section
              key="craving"
              {...slide}
              transition={{ duration: 0.5 }}
              className="main"
              >
                <div className="cravingContent">
                  <h2 className="questionText">What Are You Craving?</h2>

                  <input
                    type="range"
                    min="0"
                    max={cravings.length - 1}
                    step="1"
                    value={cravingIndex}
                    onChange={(e) => setCravingIndex(Number(e.target.value))}
                    className="radiusSlider"
                  />
                  <label className="radiusText">{displayCraving}</label>

                  <div className="buttonContainer">
                    <button className="navButton" onClick={back}>Back</button>
                    <button className="navButton" onClick={next}>Next</button>
                  </div>
                </div>
              </motion.section>
            )}

            {step === 2 && (  
              <motion.section
              key="budget"
              {...slide}
              transition={{ duration: 0.5 }}
              className="main"
              >
                <div className="main">

                  <div className="cravingContent">

                    <h1 className="questionText">How Much Do You Want To Spend?</h1>

                    <div className="price-selector">
                      <div className="grid-buttons">
                        {["1", "2", "3", "4"].map((val) => (
                          <label key={val} className="price-btn">
                            <input
                              type="radio"
                              name="price"
                              value={val}
                              checked={selectedPriceLevel === Number(val)}
                              onChange={(e) => setSelectedPriceLevel(Number(e.target.value))}
                            />
                            {"$".repeat(Number(val))}
                          </label>
                        ))}
                      </div>

                        <label className="any-price-btn">
                          <input
                            type="radio"
                            name="price"
                            value=""
                            checked={selectedPriceLevel === ""}
                            onChange={() => setSelectedPriceLevel("")}
                          />
                          Any Price
                        </label>

                    <div className="buttonContainer">
                      <button className="navButton" onClick={back}>Back</button>
                        <button className="navButton" onClick={(next)}>Next</button>
                    </div>
                    
                    </div>


                  </div>
                </div>
              </motion.section>
            )}
            {/*STEP 2 - BUDGET */}
            {step === 3 && (  
              <motion.section
              key="budget"
              {...slide}
              transition={{ duration: 0.5 }}
              className="main"
              >
                <div className="main">
          
                  <div className="cravingContent">
          
                    <h1 className="questionText">Within What Radius?</h1>
          
                    <input 
                      className="radiusSlider"
                      id="radius" 
                      type="range" 
                      min="1000" 
                      max="50000" 
                      step="1000" 
                      value={radiusMeters}
                      onChange={(e) => setRadiusMeters(Number(e.target.value))} 
                      />
                    <label className="radiusText" htmlFor="radius">{ (radiusMeters / 1000 * 0.621371).toFixed(0) } mi</label>
          
                    <div className="buttonContainer">
                      <button className="navButton" onClick={back}>Back</button>
                        <button className="navButton" onClick={(handleSubmit)}>
                          Search
                        </button>
                    </div>
                                      
          
                  </div>
                </div>
              </motion.section>
            )}
        </AnimatePresence>
    </>
  )
}

export default Home;
