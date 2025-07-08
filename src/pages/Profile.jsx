import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    const handleClickyy = () => {
        navigate("/");
    };


  // Display loading state
  if (!restaurant) return <p>Restaurant Data Not Found.</p>;

  return (
    <>
        <div className="main">
            <div className={`dropdown-drawer ${menuOpen ? 'open' : ''}`}>   

            <div className="drawer-header"> 

                <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu"> 
                <img src={closeIcon} className="closeImg" alt="React logo" />
                </button>

                <button onCLick={handleClickyy}>
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
                {/* Add more fields as needed */}
        </div>
    </>
  );
};

export default RestaurantProfile;