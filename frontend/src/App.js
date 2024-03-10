import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './styles/App.css'; 
// import logo from './assets/logo.png';
import './styles/SignIn.css';
import './styles/SignUp.css';
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
import Music from './components/Music.js'
import Diet from './components/Diet.js'
import Contact from './components/Contact.js'
import ProfileDetails from './components/ProfileDetails.js'



// const fs = require('fs');
// function MenuBar() {
//   return (
//     <div className="menu-bar"> 
//       <div>
//         <p id="title-name">
//           <Link to="/">
//             <img id="title-image" src={logo} alt="FITFREAK" />
//           </Link> 
//         </p>
//       </div>
//       <div>
//         <p id="web-links">
//           <Link to="/music">Music</Link>
//           <Link to="/graph">Graph</Link>
//         </p>
//       </div>
//       <div>
//         <p id="datetime"></p>
//       </div>
//     </div>
//   );
// }



// function Content() {
//   return (
//     <div id="content">
//       {/* Content goes here */}
//     </div>
//   );
// }





// function Home() {
//   return (
//     <div className='color-black'>
//     <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <h2>This is rushil patel</h2>
//   );
// }

// function WorkoutLog() {
//   return (
//     <h2>Services</h2>
//   );
// }

// function CaloriesBurnt(){
//   return (
//     <h1>Hello</h1>
//   );
// }

// function WorkoutMinutes(){
//   return (
//     <h1>Hello</h1>
//   );
// }

// function WaterIntake(){
//   return (
//     <h1>Hello</h1>
//   );
// }

// function Music() {
//   return (
//     <h2>Music</h2>
//   );
// }

// function Diet() {
//   return (
//     <h2>Diet</h2>
//   );
// }

// function Contact() {
//   return (
//     <h2>Contact</h2>
//   );
// }

// function ProfileDetails(){
//   return(
//     <h2>This is Profile Details</h2>
//   );
// }
function App() {
  const [signUpText, setSignUpText] = useState('Sign Up');

  const updateSignUpText = (text) => {
    setSignUpText(text);
  };
  return (
    <Router>
      <div>
        {/* <MenuBar /> */}
        <Header />
        <Content />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workoutLog" element={<WorkoutLog />} />
          <Route path="/caloriesBurnt" element={<CaloriesBurnt />} />
          <Route path="/workoutMinutes" element={<WorkoutMinutes />} />
          <Route path="/waterIntake" element={<WaterIntake />} />
          <Route path="/music" element={<Music />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/signup" element={<Signup updateSignUpText={updateSignUpText} />} />
          <Route path="/signin" element={<Signin updateSignUpText={updateSignUpText} />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
