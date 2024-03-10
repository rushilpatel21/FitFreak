import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import logo from '../assets/logo.png';

function Header() {
    const [signUpText, setSignUpText] = useState('Sign Up');
  
    const updateSignUpText = (text) => {
      setSignUpText(text);
    };
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
                          <li><Link to="/workoutLog">Workout Log</Link></li> {/*We give them suggestions too, We allow user to log workout and view their logged workout*/}
                          <li><Link>Progress</Link>
                            <ul className="submenu">
                              <li><Link to="/caloriesBurnt">Calories Burnt</Link></li>
                              <li><Link to="/workoutMinutes">Workout Minutes</Link></li>
                              <li><Link to="/waterIntake">Water Intake</Link></li>
                            </ul>
                          </li> {/*We show user a graph for their workout*/}
                          <li><Link to="/music">Music</Link></li>
                          <li><Link to="/diet">Diet</Link></li>
                          <li><Link to="/contact">Contact</Link></li>
                        </ul>
                      </nav>
                    </div>
                    <div className="header-right-btn f-right d-none d-lg-block ml-30">
                      {/* <a href="from.html" className="btn header-btn">
                      <Routes>
                      <Route path="/Signin" element={<Signin />} />
                      </Routes>
  
                      </a> */}
                      <div id='SignUp' className="btn header-btn">
                        <Link to="/signup" id='This-Text' >Sign Up</Link>
                      </div>
                      <div className="btn header-btn">
                        <Link to="/signin" >Sign In</Link>
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

export default  Header;