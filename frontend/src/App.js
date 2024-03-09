import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css'; 
import logo from './assets/logo.png';
import './SignIn.css';
import './SignUp.css';

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

function Content() {
  return (
    <div id="content">
      {/* Content goes here */}
    </div>
  );
}

function Signin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    console.log('User data:', userData); //Saving data

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="sign-in-container">
      <h2 className="sign-in-title">Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter username'
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

function Signup({updateSignUpText}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  // const [targetWeight, setTargetWeight] = useState('');
  // const [goal, setGoal] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [height, setHeight] = useState('');
  const [bmi,setBmi] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
      weight: weight,
      // targetWeight: targetWeight,
      // goal: goal,
      lifestyle: lifestyle,
      height: height,
      bmi : bmi,
      birthday: birthday,
      age: age,
      sex: sex,
    };
    console.log('User data:', userData); //Saving data

    //comment the below part 
    
    // const valueForSignUp = document.getElementById('SignUp');
    // const name1 = username;
    // // const name = '${name1}';
    // const linkElement = <Link to="/signup">{name1}</Link>;
    // ReactDOM.render(linkElement, valueForSignUp);


    // if (username) {
    //   console.log(username);
    //   console.log(document.querySelector('#This-Text').innerHTML);
    //   document.querySelector('#This-Text').innerHTML = username;
    //   document.querySelector('#This-Text').setAttribute('to','/profile-details');
    //   // document.querySelector('#This-Text') = 
    //   // updateSignUpText(username);
    // }

    //un comment the below part 

    // setUsername('');
    // setEmail('');
    // setPassword('');
    // setWeight('');
    // // setTargetWeight('');
    // // setGoal('');
    // setLifestyle('');
    // setHeight('');
    // setBmi('');
    // setBirthday('');
    // setAge('');
    // setSex('');
  };

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const ageDifference = today - birthDate;
    const calculatedAge = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));
    setAge(calculatedAge);
  };

  const calculateBmi = () => {
    if (!height || !weight) return;
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(2))); // Round BMI value to two decimal places
  };
  

  return (
    <div className="sign-up-container">
      <h2 className="sign-up-title">Sign Up</h2>
      <form onSubmit={handleSignUp} className="sign-up-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter username'
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value)
              calculateBmi();
            }}
            placeholder='Enter weight in kg'
            required
          />
        </div>
        <div>
          <label htmlFor="lifestyle">Lifestyle:</label>
          <select
            id="lifestyle"
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            required
          >
            <option value="">Select Lifestyle</option>
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value)
              calculateBmi();
            }}
            placeholder='Enter height in cm'
            required
          />
        </div>
        <div>
          <label htmlFor="bmi">Bmi:</label>
          <input
            type="number"
            id="bmi"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            readOnly
            placeholder='Calculated from height and weight'
            required
          />
        </div>
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
              calculateAge();
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            readOnly
            placeholder='Calculated from birthday'
            required
          />
        </div>
        <div>
          <label htmlFor="sex">Sex:</label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

function Home() {
  return (
    <div className='color-black'>
    <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <h2>This is rushil patel</h2>
  );
}

function WorkoutLog() {
  return (
    <h2>Services</h2>
  );
}

function CaloriesBurnt(){
  return (
    <h1>Hello</h1>
  );
}

function WorkoutMinutes(){
  return (
    <h1>Hello</h1>
  );
}

function WaterIntake(){
  return (
    <h1>Hello</h1>
  );
}

function Music() {
  return (
    <h2>Music</h2>
  );
}

function Diet() {
  return (
    <h2>Diet</h2>
  );
}

function Contact() {
  return (
    <h2>Contact</h2>
  );
}
function ProfileDetails(){
  return(
    <h2>This is Profile Details</h2>
  );
}
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
