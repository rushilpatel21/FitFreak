import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//CSS
import './styles/Header.css'
import './styles/SignIn.css'
import './styles/SignUp.css'
import './styles/SearchMusic.css'
import './styles/RecommendedMusic.css'
import './styles/App.css'
import './styles/UserDetails.css'
import './styles/WorkoutLog.css'
import './styles/WaterLog.css'
import './styles/FoodLog.css'
import './styles/WorkoutHistory.css'
import './styles/WaterIntake.css'
import './styles/CaloriesBurnt.css'
import './styles/Home.css'
import './styles/About.css'
import './styles/Contact.css'

//Components 
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import Header from './components/Header.js'
import Home from './components/Home.js'
import About from './components/About.js'
import WorkoutLog from './components/WorkoutLog.js'
import FoodLog from './components/FoodLog.js'
import WaterLog from './components/WaterLog.js'
import CaloriesBurnt from './components/CaloriesBurnt.js'
import WaterIntake from './components/WaterIntake.js'
import SearchMusic from './components/SearchMusic.js'
import RecommendedMusic from './components/RecommendedMusic.js'
import Diet from './components/Diet.js' //For diet: two options 1) Veg 2)Non Veg and depending upon the option (ie. Bulking or Weight loss) we give them diet plan.
import Contact from './components/Contact.js'
import UserDetails from './components/UserDetails.js'
import LogOut from './components/LogOut.js'
import WorkoutHistory from './components/WorkoutHistory.js'

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

  useEffect(() => {
    console.log(userDetails);
    if(localStorage.getItem("isLoggedIn") === 'true'){
      console.log('user has already logged in');
      if(!localStorage.getItem('userDetail')){
        localStorage.setItem("isLoggedIn" , "false");
        alert("Critical Error: Error with localstorage");
        return;
      }
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      let username = storedUser.username;
      updateSignUpText(username);
      setLoggedIn(true);
      updateSignInText('Log Out');
      updateSignInRoute('/logOut');
      updateSignUpRoute('#');
    }
  }, [userDetails]); //Deploy change : Added userDetails;

  return (
    <Router>
      <div>
        <Header signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workoutLog" element={<WorkoutLog signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} showUserDetails={showUserDetails} userDetails={userDetails} />} />
          <Route path="/foodLog" element={<FoodLog signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/waterLog" element={<WaterLog signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/workoutHistory" element={<WorkoutHistory signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/caloriesBurnt" element={<CaloriesBurnt signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/waterIntake" element={<WaterIntake signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/diet" element={<Diet signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/searchMusic" element={<SearchMusic />} />
          <Route path="/recommendedMusic" element={<RecommendedMusic />} />
          <Route path="/signup" element={<Signup signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          <Route path="/signin" element={<Signin signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          <Route path="/logOut" element={<LogOut signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          
        </Routes>
        {showUserDetails && <UserDetails updateUserDetails={updateUserDetails} userDetails={userDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />}
      </div>
    </Router>
  );
}

export default App;
