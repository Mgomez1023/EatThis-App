import { useState } from 'react'
import React from 'react'
 import {motion, AnimatePresence} from 'framer-motion'
import { useGeolocation } from '/src/utils/useGeolocation.js'
import { haversineDistance } from '/src/utils/haversineDistance.js'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { getNearbyRestaurants } from '../utils/getNearbyRestaurants'
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
  const navigate = useNavigate();

  
const nearbyRestaurants = restaurants
  .map(r => {
    try {
      if (!r.geometry || !r.geometry.location) {
        console.warn('Invalid restaurant object:', r);
        return null;
      }

      const { lat, lng } = r.geometry.location;
      const distance = haversineDistance(location.lat, location.lng, lat, lng);
      return { ...r, distance };
    } catch (err) {
      console.error('Error mapping restaurant:', err);
      return null;
    }
  })
      .filter(r => r && r.distance <= radiusMeters)
      .sort((a, b) => a.distance - b.distance);




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

  const handleSubmit = () => {
    const nearbyRestaurants = restaurants
  .map(r => {
    try {
      if (!r.geometry || !r.geometry.location) {
        console.warn('Invalid restaurant object:', r);
        return null;
      }

      const { lat, lng } = r.geometry.location;
      const distance = haversineDistance(location.lat, location.lng, lat, lng);
      return { ...r, distance };
    } catch (err) {
      console.error('Error mapping restaurant:', err);
      return null;
    }
  })
      .filter(r => r && r.distance <= radiusMeters)
      .sort((a, b) => a.distance - b.distance);

      console.log("Nearby before navigate:", nearbyRestaurants);
      navigate('/results', { 
        state: {
          radiusMeters,
          location,
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

                  <div className="stepFormBackground"> 
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

                  <select 
                    value={answers.craving}
                    onChange={(e) => 
                      setAnswers({...answers, craving: e.target.value})
                    }
                    className="dropdown"
                    >
                    <option value="">Select a craving</option>
                    <option value="pizza">🍕 Pizza</option>
                    <option value="sushi">🍣 Sushi</option>
                    <option value="burgers">🍔 Burgers</option>
                    <option value="tacos">🌮 Tacos</option>
                    <option value="salad">🥗 Salad</option>
                    <option value="chinese">🥡 Chinese</option>
                    <option value="indian">🍛 Indian</option>
                    <option value="dessert">🍩 Dessert</option>

                  </select>


                  <div className="buttonContainer">
                    <button className="navButton" onClick={back}>Back</button>
                    <button className="navButton" onClick={next}>Next</button>
                  </div>
                </div>
              </motion.section>
            )}

            {/*STEP 2 - BUDGET */}
            {step === 2 && (  
              <motion.section
              key="budget"
              {...slide}
              transition={{ duration: 0.5 }}
              className="main"
              >
                <div className="main">

                  <div className="cravingContent">

                    <h1 className="questionText">Within What Radius?</h1>

                    <label className="textboi" htmlFor="radius">Search radius: { (radiusMeters / 1000).toFixed(1) } km</label>
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

                    <div className="buttonContainer">
                      <button className="navButton" onClick={back}>Back</button>
                        <button className="navButton" onClick={(handleSubmit)}>
                          Show Results
                        </button>
                    </div>
                    
                    <p className="textboi"> Showing { nearbyRestaurants.length } </p>

                    <p className="textboi"> Showing { nearbyRestaurants.length } </p>


                  </div>
                </div>
              </motion.section>
            )}

        </AnimatePresence>
    </>
  )
}

export default Home;
