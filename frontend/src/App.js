import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';

//CSS
import './styles/SignIn.css';
import './styles/SignUp.css';
import './styles/SearchMusic.css';
import './styles/RecommendedMusic.css'
import './styles/App.css'; 
import './styles/UserDetails.css';

//Components 
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import Header from './components/Header.js'
import Content from './components/Content.js'
import Home from './components/Home.js'
import About from './components/About.js'
import WorkoutLog from './components/WorkoutLog.js'
import CaloriesBurnt from './components/CaloriesBurnt.js'
import WorkoutMinutes from './components/WorkoutMinutes.js'
import WaterIntake from './components/WaterIntake.js'
import SearchMusic from './components/SearchMusic.js'
import RecommendedMusic from './components/RecommendedMusic.js'
import Diet from './components/Diet.js' //For diet: two options 1) Veg 2)Non Veg and depending upon the option (ie. Bulking or Weight loss) we give them diet plan.
import Contact from './components/Contact.js'
// import ProfileDetails from './components/ProfileDetails.js'
import UserDetails from './components/UserDetails.js'
import LogOut from './components/LogOut.js'

function App() {

  //State for user authentication status and username
  const [signUpText, setSignUpText] = useState('Sign Up');
  const [signInText, setSignInText] = useState('Sign In');
  const [loggedIn, setLoggedIn] = useState(false); // we need to use this to verify if the user is logged in or not, especially for Progress and Workout Log
  const [signUpRoute, setSignUpRoute] = useState('/signup');
  const [signInRoute, setSignInRoute] = useState('/signin');
  const [userDetails, setUserDetails] = useState('');
  const [showUserDetails, setShowUserDetails] = useState(false);
  
  //Methods  for handling button clicks and routing
  const toggleUserDetailsModal = () => {
    setShowUserDetails(!showUserDetails);
  };
  const updateUserDetails = (text) => {
    setUserDetails(text);
  }
  const updateSignUpRoute = (text) => {
    setSignUpRoute(text);
  }
  const updateSignInRoute = (text) => {
    setSignInRoute(text);
  }
  const updateSignUpText = (text) => {
    setSignUpText(text);
  };
  const updateSignInText = (text) => {
    setSignInText(text);
  };
  return (
    <Router>
      <div>
        {/* <MenuBar /> */}
        <Header signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />
        <Content />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workoutLog" element={<WorkoutLog signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/caloriesBurnt" element={<CaloriesBurnt signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/workoutMinutes" element={<WorkoutMinutes signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/waterIntake" element={<WaterIntake signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          {/* <Route path="/music" element={<Music />} /> */}
          <Route path="/diet" element={<Diet signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/profile-details" element={<ProfileDetails signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} /> */}
          <Route path="/searchMusic" element={<SearchMusic />} />
          <Route path="/recommendedMusic" element={<RecommendedMusic />} />
          <Route path="/signup" element={<Signup signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          <Route path="/signin" element={<Signin signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          {/* <Route path="/userDetails" element={<UserDetails userDetails={userDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} /> */}
          <Route path="/logOut" element={<LogOut signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          
        </Routes>
        {showUserDetails && <UserDetails userDetails={userDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />}
      </div>
    </Router>
  );
}

export default App;
