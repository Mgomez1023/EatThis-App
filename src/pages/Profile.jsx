import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatTime } from '../utils/formatTime'
import { haversineDistance } from '/src/utils/haversineDistance.js'
import { inferFoodType } from '/src/utils/inferFoodType.js'
import { Sun, SunDim } from 'lucide-react'

import closeIcon from '../assets/close_icon.png';
import hamburgerImg from '../assets/hamburger_menu.png';
import logoFull from '../assets/logo-full.png';
import ReviewCarousel from '../components/ReviewCarousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';

const RestaurantProfile = () => {
    const { placeId, distance } = useParams();
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const restaurant = location.state?.restaurant;
    const restaurants = location.state?.restaurants;
    const [ restaurantDetails, setRestaurantDetails ] = useState(null);
    const [theme, setTheme] = useState('light'); // Default theme
    var data;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const goBack = () => {
        if (restaurants && restaurants.length > 0) {
            console.log(restaurants);
            localStorage.setItem("restaurants", JSON.stringify(restaurants));
        } else {
            console.warn("No restaurants to save!");
        }
        navigate('/results');
    };

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

    const capitalizeWords = (str) => {
    if (!str) return '';
    return str
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');
    };

    const foodType = () => {
        const category = inferFoodType(restaurantDetails.name);
        return capitalizeWords(category);
    }

    useEffect(() => {
        const fetchDetails = async () => {
        try {
            const res = await fetch(`/api/placeDetails?placeId=${encodeURIComponent(placeId)}`);
            if (!res.ok) throw new Error("Failed to fetch restaurant details.");
            data = await res.json();
            console.log("API CALL: ", data.place);
            setRestaurantDetails(data.place);
        } catch (err) {
            console.error("Error fetching restaurant details:", err);
        }
        };
        if (!data) {
            fetchDetails();
        }
        
    }, [placeId]);

    // Display loading state
    if (!restaurantDetails) return <p style={{
        fontSize: '32px',
        color: 'orange',
        justifyContent: 'center',
        alignContent: 'center',
    }}>Loading... </p>;

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


            <div className="titleBox">

                <p className="titleText"
                >{restaurantDetails.name}</p>

            </div>

            <div className="mainProfile">

                <div className="page-container">
                    <div className="profile-container">

                        <div className="basicInfoContainer">
                            <div className="infoColumn">
                                <div className="addressBox">
                                    <p className="infoText">Address:</p>
                                    <p className="infoText"> { restaurantDetails.formatted_address} </p>
                                    <p className="infoText"> { (distance / 1609.34).toFixed(1)} mi away</p>
                                </div>
                                
                            </div>

                            <div className="infoColumn">
                                <div className="phoneNumberBox">
                                    <p className="infoText">Phone Number: {restaurantDetails.formatted_phone_number}</p>
                                </div>
                                <div className="splitInfo">
                                    <div className="priceLevelBox">
                                        <p className="infoText">Price Level: { restaurantDetails.price_level }</p>
                                    </div>

                                    <div className="categoryBox">
                                        <p className="infoText">Category: { foodType() }</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="buttonContainer">

                            <button
                                className="access-button"
                                onClick={() =>
                                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantDetails.formatted_address)}`, '_blank')
                                }
                                >
                                Directions 🚩
                                </button>
                            
                            <a href={`tel:${restaurantDetails.formatted_phone_number}`} className="access-button">
                                Call 📞
                            </a>

                        </div>
                        

                        <div className="hoursContainer">
                        <div className="labelContainer">

                                <div className="medText" style={{
                                    fontSize: '32px',
                                }}>Hours</div>

                                <div className="medText" style={{
                                    alignContent: 'center',
                                }}>{restaurantDetails.opening_hours?.open_now ? 'Open now ✅' : 'Closed ❌'} </div>

                        </div>
                            <div className="hours-table">
                                {restaurantDetails.opening_hours?.periods ? (
                                    <table>
                                        <thead>
                                        <tr>
                                            <th className="textboi">Day</th>
                                            <th className="textboi">Open</th>
                                            <th className="textboi">Close</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {restaurantDetails.opening_hours?.periods?.map((period, index) => {
                                            const day = daysOfWeek[period.open.day];
                                            const openTime = formatTime(period.open.time);
                                            const closeTime = formatTime(period.close.time);

                                            return (
                                            <tr key={index}>
                                                <td className="textboi">{day}</td>
                                                <td className="textboi">{openTime}</td>
                                                <td className="textboi">{closeTime}</td>

                                            </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>

                                ) : (
                                    <p className="infoText">No Hours Provided</p>
                                )}

                            </div>
                        </div>
                        

                        <div className="reviewsContainer">
                        <div className="labelContainer">

                                <div className="medText" style={{
                                    fontSize: '32px',
                                }}>Reviews</div>

                                <div className="medText" style={{
                                    alignContent: 'center',
                                    fontSize: '16px',
                                }}>Overall: {restaurantDetails.rating}
                                    <div>Total: {restaurantDetails.user_ratings_total}</div>
                                </div>

                        </div>

                            <ReviewCarousel reviews={(restaurantDetails.reviews)} />

                        </div>

                    </div>

                    </div>
                        {/* Add more fields as needed */}
                    <div className="site-link-container">

                        <button className="profile-back-button" onClick={goBack}>◀</button>

                        {restaurantDetails.website ? (
                                <button
                                    onClick={() => window.open(restaurantDetails.website, '_blank')}
                                    className="website-button"
                                >
                                    Visit Website 🌍
                                </button>
                            ) : (
                                <button
                                    className="website-button"
                                >
                                    No Website Available
                                </button>
                            )}

                    </div>

        </div>
    </>
  );
};

export default RestaurantProfile;