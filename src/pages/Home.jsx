import { useRef, useState, useEffect } from 'react'
import React from 'react'
 import {motion, AnimatePresence} from 'framer-motion'
import { useGeolocation } from '/src/utils/useGeolocation.js'
import { haversineDistance } from '/src/utils/haversineDistance.js'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { inferFoodType } from '/src/utils/inferFoodType.js'
import restaurants from '/src/data/restaurants.json' // Assuming you have a JSON file with restaurant data
import closeIcon from '/src/assets/close_icon.png'
import hamburgerImg from '/src/assets/hamburger_menu.png'
import burgerLogo from '/src/assets/burger_orange.png'
import '/src/App.css'
 

function Home() {

  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { location, error } = useGeolocation();
  const [radiusMeters, setRadiusMeters] = useState(1000); // Default radius 5km
  var [selectedCravings, setSelectedCravings] = useState([]);
  const [selectedPriceLevel, setSelectedPriceLevel] = useState(null);
  const navigate = useNavigate();

  {/*STEP HANDLING */}
  const [step, setStep] = useState(0);

  const priceDescriptions = {
    "1": "Under $10",
    "2": "$10 - $20",
    "3": "$20 - $40",
    "4": "Over $40"
  };
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s-1));
  const reset = () => setStep(0);

  const slide = {
    initial: {x: '100%', opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: '-100%', opacity: 0},
  };

  const toggleCraving = (value) => {
    if (selectedCravings.includes(value)) {
      setSelectedCravings(selectedCravings.filter(c => c !== value));
    } else if (selectedCravings.length < 3) {
      setSelectedCravings([...selectedCravings, value]);
    }
};


  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleClickyy = () => {
      navigate("/");
  };

  const fadeInVariant = {
  hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut"
      }
    }),
  } ;

  const toggle = () => {
    document.body.classList.toggle("light");
  }

  const sliderRef = useRef();
  const min = 1000;
  const max = 50000;

  useEffect(() => {
    const percent = ((radiusMeters - min) / (max - min)) * 100;
    if (sliderRef.current) {
      sliderRef.current.style.background = `
        linear-gradient(
          to right,
          var(--orange) 0%,
          var(--orange) ${percent}%,
          white ${percent}%,
          white 100%
        )`;
    }
  }, [radiusMeters]);



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

      console.log("selected", selectedCravings);


      return { ...r, distance, category };
    } catch (err) {
      console.error('Error mapping restaurant:', err);
      return null;
    }
  })
      .filter(r => 
        r && 
        (!radiusMeters || r.distance <= radiusMeters) &&
        (selectedCravings.length === 0 || selectedCravings.includes("any") || selectedCravings.includes(r.category)) &&
        (!selectedPriceLevel || r.price_level <= selectedPriceLevel)
    )
      .sort((a, b) => a.distance - b.distance);



      console.log("Nearby before navigate:", nearbyRestaurants);
      localStorage.setItem('restaurants', JSON.stringify(nearbyRestaurants));
      navigate('/results', { 
        state: {
          radiusMeters,
          location,
          selectedCravings,
          nearbyRestaurants
        }, 
      });
      navigate(`/restaurant/${r.place_id}`, { state: { nearbyRestaurants } });
  };

  {/* MAIN APP DESIGNING */}

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
                <li onClick={() => alert('Profile clicked')}>Profile</li>
                <li onClick={() => alert('Settings clicked')}>Settings</li>
                <li onClick={() => alert('Logout clicked')}>Logout</li>
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
                <h1 className="titleText">EatThis</h1>
            </button>

            <button className="hamburger-btn" onClick={toggleMenu} aria-label="Profile"> 
                <img src={hamburgerImg} className="MenuImg" alt="React logo" />
            </button>





            </div>

        <AnimatePresence mode="wait">

            {/*STEP 0 - HOME */}
            {step === 0 && (
              <motion.section
                key="home"
                initial="hidden"
                animate="visible"
                className="main"
              >
                <div className="home-content">

                  <div className="logo-box">

                    <motion.div className="title-box" variants={fadeInVariant} custom={1}>
                      <img src={burgerLogo} className="logo" alt="Vite logo" />
                    </motion.div>

                    <motion.div variants={fadeInVariant} custom={2}>
                      <h1 className="titleText">EatThis</h1>
                    </motion.div>

                  </div>

                  <motion.div className="startButtonWrapper" variants={fadeInVariant} custom={3}> 
                    <div className="spinningRing">
                    </div>

                      <button className="startButton" onClick={next}>
                        Get&nbsp;Started
                      </button>


                  </motion.div>

                  <motion.div className="introTextContainer" variants={fadeInVariant} custom={4}>
                    <p className="text">An app designed to help you make a food choice</p>
                  </motion.div>

                </div>
              </motion.section>
            )}

            {/*STEP 1 - CRAVING */}
            {step === 1 && (
              <motion.section
              key="craving"
              {...slide}
              transition={{ duration: 0.7 }}
              className="main"
              >
                <div className="cravingContent">
                  <h2 className="questionText">What Are You Craving?</h2>

                  <p className="text">(Choose up to 3)</p>
                
                  <div className="bubbleGrid">
                    {[
                      { value: "pizza", label: "🍕 Pizza" },
                      { value: "chicken", label: "🍗 Chicken" },
                      { value: "burgers", label: "🍔 Burgers" },
                      { value: "mexican", label: "🌮 Mexican" },
                      { value: "chinese", label: "🥡 Asian Cuisine" },
                      { value: "sandwiches", label: "🥪 Sandwiches" },
                      { value: "barbecue", label: "🍖 BBQ" },
                      { value: "hot dogs", label: "🌭 Hot Dogs" },
                      { value: "seafood", label: "🐟 Seafood" },
                      { value: "italian", label: "🍝 Italian" },
                      { value: "indian", label: "🧆 Indian" },
                      { value: "dessert", label: "🍦 Dessert" },
                      { value: "bakery", label: "🍰 Bakery" },
                      { value: "cafe", label: "☕ Cafe" },
                      { value: "any", label: "🤷‍♀️ I'm Not Sure" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        className={`bubble ${selectedCravings.includes(item.value) ? 'selected' : ''}`}
                        onClick={() => toggleCraving(item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

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
                          {priceDescriptions[val]}
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
              key="radius"
              {...slide}
              transition={{ duration: 0.5 }}
              className="main"
              >
                <div className="main">
          
                  <div className="cravingContent">

                    <div> </div>
          
                    <h1 className="questionText">How Far Do You Want To Drive?</h1>
          
                    <input 
                      className="radiusSlider"
                      ref={sliderRef} 
                      type="range" 
                      min={min}
                      max={max}
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
