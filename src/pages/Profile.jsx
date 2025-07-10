import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatTime } from '../utils/formatTime'
import closeIcon from '../assets/close_icon.png';
import searchImg from '../assets/Search.jpg';
import hamburgerImg from '../assets/hamburger_menu.png';
import '../App.css';

const RestaurantProfile = () => {
    const { id } = useParams();
    const { state: restaurant } = useLocation();
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


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

                <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu"> 
                <img src={closeIcon} className="closeImg" alt="React logo" />
                </button>

                <button onClick={handleClickyy}>
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

            <h2 className="titleText">{restaurant.name}</h2>
                <div className="profile-container">

                    <div className="basicInfoContainer">
                        <div className="infoColumn">
                            <div className="addressBox">
                                <p className="textboi">Address:</p>
                                <p className="textboi">{restaurant.formatted_address}</p>
                                <p className="textboi">Distance: {(restaurant.distance / 1609).toFixed(2)} mi</p>
                            </div>
                            
                        </div>

                        <div className="infoColumn">
                            <div className="phoneNumberBox">
                                <p className="textboi">Phone Number: {restaurant.formatted_phone_number}</p>
                            </div>
                            <div className="priceLevelBox">
                                <p className="textboi">Price Level: { restaurant.price_level }</p>

                            </div>
                        </div>
                    </div>



                    <div className="hoursContainer">
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



                    </div>



                        {/* Add more fields as needed */}
                    <div className="site-link-container">
                        {restaurant.website ? (
                            <button
                            onClick={() => window.open(restaurant.website, '_blank')}
                            className="website-button"
                            >
                                Visit Website
                            </button>
                            ) : (
                                <p>No website available</p>
                            )}

                    </div>

                </div>

        </div>
    </>
  );
};

export default RestaurantProfile;