import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatTime } from '../utils/formatTime'
import closeIcon from '../assets/close_icon.png';
import searchImg from '../assets/Search.jpg';
import hamburgerImg from '../assets/hamburger_menu.png';
import ReviewCarousel from '../components/ReviewCarousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';

const RestaurantProfile = () => {
    const { id } = useParams();
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const restaurant = location.state?.restaurant;
    const restaurants = location.state?.restaurants;

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


    // Display loading state
    if (!restaurant) return <p>Restaurant Data Not Found.</p>;

    return (
        <>
        <div className="mainProfile">
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
            onClick={handleClickyy}
            >
                <h1 className="titleText">EatThis</h1>
            </button>

            <button className="hamburger-btn" onClick={toggleMenu} aria-label="Profile"> 
                <img src={hamburgerImg} className="MenuImg" alt="React logo" />
            </button>





            </div>

            <div className="titleBox">

                <p className="titleText"
                >{restaurant.name}</p>

            </div>



            <div className="page-container">
                <div className="profile-container">

                    <div className="basicInfoContainer">
                        <span className="info-label"> Info </span>
                        <div className="infoColumn">
                            <div className="addressBox">
                                <p className="infoText">Address:</p>
                                <p className="infoText">{restaurant.formatted_address}</p>
                                <p className="infoText">{(restaurant.distance / 1609).toFixed(2)} mi away</p>
                            </div>
                            
                        </div>

                        <div className="infoColumn">
                            <div className="phoneNumberBox">
                                <p className="infoText">Phone Number: {restaurant.formatted_phone_number}</p>
                            </div>
                            <div className="splitInfo">
                                <div className="priceLevelBox">
                                    <p className="infoText">Price Level: { restaurant.price_level }</p>
                                </div>

                                <div className="categoryBox">
                                    <p className="infoText">Category: {restaurant.category.charAt(0).toUpperCase() + restaurant.category.slice(1)}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="buttonContainer">

                        <button
                            className="access-button"
                            onClick={() =>
                                window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.formatted_address)}`, '_blank')
                            }
                            >
                            Directions 🚩
                            </button>
                        
                        <a href={`tel:${restaurant.formatted_phone_number}`} className="access-button">
                            Call 📞
                        </a>

                    </div>


                    <div className="hoursContainer">
                        <p className="hour-label"> Hours </p>

                        <div className="hours-table">
                            <table>
                                <thead>
                                <tr>
                                    <th className="textboi">Day</th>
                                    <th className="textboi">Open</th>
                                    <th className="textboi">Close</th>
                                </tr>
                                </thead>
                                <tbody>
                                {restaurant.opening_hours?.periods?.map((period, index) => {
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

                        </div>
                    </div>

                    <div className="reviewsContainer">

                        <ReviewCarousel reviews={(restaurant.reviews)} />

                    </div>
                </div>



                </div>
                        {/* Add more fields as needed */}
                    <div className="site-link-container">

                        <button className="profile-back-button" onClick={goBack}>◀</button>

                        {restaurant.website ? (
                            <button
                            onClick={() => window.open(restaurant.website, '_blank')}
                            className="website-button"
                            >
                                Visit Website 🌍
                            </button>
                            ) : (
                                <p>No website available</p>
                            )}

                    </div>

        </div>
    </>
  );
};

export default RestaurantProfile;