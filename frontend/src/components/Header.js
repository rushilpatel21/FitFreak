import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header({ updateSignUpText, signUpText, loggedIn, setLoggedIn,signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute, toggleUserDetailsModal, showUserDetails}) {
    // const [signUpText, setSignUpText] = useState('Sign Up');

    // const handleSignUp = (username) => {
    //     setSignUpText(username); // Update button text to username
    // };
    const handleShowUserDetails = () => {
        if(loggedIn === true){
            toggleUserDetailsModal();
        }
    }

    return (
        <header>
            <div className="header-area header-transparent">
                <div className="main-header header-sticky">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-2 col-md-1">
                                <div className="logo">
                                    <Link to="/"><img id='title-image' src={logo} alt="FITFREAK" /></Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10">
                                <div className="menu-main d-flex align-items-center justify-content-end">
                                    <div className="main-menu f-right d-none d-lg-block">
                                        <nav>
                                            <ul id="navigation">
                                                <li><Link to="/">Home</Link></li>
                                                <li><Link to="/about">About</Link></li>
                                                <li><Link to="/workoutLog">Workout Log</Link></li>
                                                <li><Link>Progress</Link>
                                                    <ul className="submenu">
                                                        <li><Link to="/caloriesBurnt">Calories Burnt</Link></li>
                                                        <li><Link to="/workoutMinutes">Workout Minutes</Link></li>
                                                        <li><Link to="/waterIntake">Water Intake</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link>Music</Link>
                                                    <ul className="submenu">
                                                        <li><Link to="/searchMusic">Search Music</Link></li>
                                                        <li><Link to="/recommendedMusic">Recommended Playlist</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link to="/diet">Diet</Link></li>
                                                <li><Link to="/contact">Contact</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="header-right-btn f-right d-none d-lg-block ml-30">
                                        <div className="btn header-btn">
                                            <Link to={signUpRoute} onClick={handleShowUserDetails} id='This-Text'>{signUpText}</Link>
                                        </div>
                                        <div className="btn header-btn">
                                            <Link to={signInRoute}>{signInText}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
